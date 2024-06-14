"use server";

import { authOptions } from "@/lib/auth";
import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OpenAI from "openai";

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

interface Email {
  id: string;
  snippet: string;
  subject: string;
  link: string;
  labelIds: string[];
  from: string;
  category: string;
  recieved: string;
}

interface FetchEmailsResult {
  error: string | null;
  data: Email[] | null;
}

export const fetchData = async (
  classify = false,
  api_key: string | undefined,
  mail_count = 15
): Promise<FetchEmailsResult> => {
  if (classify && api_key) {
    const email_res = await fetchEmails(mail_count);
    if (!email_res.data) {
      return email_res;
    } else {
      const class_res = await classifyEmailsTest(email_res.data, api_key);
      if (class_res) {
        return {
          data: class_res,
          error: null,
        };
      } else {
        return {
          data: email_res.data,
          error: "Cannot classify emails",
        };
      }
    }
  } else {
    return await fetchEmails(mail_count);
  }
};

export async function fetchEmails(
  mail_count: number
): Promise<FetchEmailsResult> {
  try {
    const auth = new google.auth.OAuth2();

    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
      return { error: "Unauthorized!", data: null };
    }

    const accessToken = session.accessToken;

    auth.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth });

    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: mail_count <= 25 ? mail_count : 15,
    });

    if (!response.data.messages) {
      return { error: "No messages found", data: null };
    }

    const messages = await Promise.all(
      response.data.messages.map(async (message) => {
        if (message.id) {
          const msg = await gmail.users.messages.get({
            userId: "me",
            id: message.id,
          });

          const email = msg.data;
          const email_headers = email.payload?.headers;

          return {
            id: email.id,
            snippet: email.snippet,
            subject: email_headers?.find((x) => x.name === "Subject")?.value,
            link: `https://mail.google.com/mail/u/0/#inbox/${email.id}`,
            labelIds: email.labelIds || [],
            from: email_headers
              ?.find((x) => x.name === "From")
              ?.value?.split("<")[0],
            category: "all",
            recieved: email_headers?.find((x) => x.name === "Date")?.value,
          } as Email;
        }
        return null;
      })
    );
    const validMessages = messages.filter((msg): msg is Email => msg !== null);
    if (validMessages.length > 0) {
      return { error: null, data: validMessages };
    } else {
      return { error: "Cannot parse email data", data: null };
    }
  } catch (error: any) {
    return {
      error: error.message || "Uncaught Exception",
      data: null,
    };
  }
}

const classifyEmailsTest = async (emails: Email[], api_key: string) => {
  try {
    const categories = [
      "important",
      "promotions",
      "social",
      "marketing",
      "spam",
      "general",
    ];

    const updatedEmails = await Promise.all(
      emails.map(async (email) => {
        const randomCategory =
          categories[Math.floor(Math.random() * categories.length)];

        return {
          ...email,
          category: randomCategory,
        };
      })
    );
    return updatedEmails;
  } catch (error) {
    console.error("Error classifying emails:", error);
  }
};

const classifyEmails = async (emails: Email[], api_key: string) => {
  try {
    const openai = new OpenAI({
      apiKey: api_key,
    });

    const updatedEmails = await Promise.all(
      emails.map(async (email) => {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a helpful assistant that classifies emails into the following categories:
                    - important: Emails that are personal or work-related and require immediate attention.
                    - promotions: Emails related to sales, discounts, and marketing campaigns.
                    - social: Emails from social networks, friends, and family.
                    - marketing: Emails related to marketing, newsletters, and notifications.
                    - spam: Unwanted or unsolicited emails.
                    - general: If none of the above are matched, use General.
                    Please respond only with the exact category in lowercase.`,
            },
            {
              role: "user",
              content: `Classify this email: 
                              Subject: ${email.subject}
                              Snippet: ${email.snippet}
                              From: ${email.from}`,
            },
          ],
        });

        console.log(response);

        const classification = response.choices[0]?.message?.content;

        // Update the email category
        return {
          ...email,
          // category: classification,
        };
      })
    );
  } catch (error) {
    console.error("Error classifying emails:", error);
  }
};

export const vercel_sdk = async (emails: Email[], api_key: string) => {
  const openai = createOpenAI({
    apiKey: api_key,
  });

  const updatedEmails = await Promise.all(
    emails.map(async (email) => {
      try {
        const response = await generateText({
          model: openai("gpt-3.5-turbo"),
          prompt: `You are a helpful assistant that classifies emails into the following categories:
          - important: Emails that are personal or work-related and require immediate attention.
          - promotions: Emails related to sales, discounts, and marketing campaigns.
          - social: Emails from social networks, friends, and family.
          - marketing: Emails related to marketing, newsletters, and notifications.
          - spam: Unwanted or unsolicited emails.
          - general: If none of the above are matched, use General.
          Please respond only with the exact category in lowercase.
          
          Classify this email:
          Subject: ${email.subject}
          Snippet: ${email.snippet}
          From: ${email.from}`,
        });

        const classification = response.text.trim();

        return {
          ...email,
          category: classification,
        };
      } catch (error) {
        console.error("Error classifying email:", error);
        return email;
      }
    })
  );

  return updatedEmails;
};
