"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { google } from "googleapis";
import { getServerSession } from "next-auth";
import OpenAI from "openai";

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

export async function fetchEmails(): Promise<FetchEmailsResult> {

  // classifyEmails([
  //   {
  //     id: "18ffc1199abd8441",
  //     snippet:
  //       "Infoorigin Inc is hiring Glassdoor Jobs Your daily job listings for 9 June 2024 Software Engineer Nāgpur, Maharashtra AMEC Technology Private Limited Backend Developer India Easy Apply Virtual Galaxy",
  //     subject:
  //       "Dot Net Developer at Infoorigin Inc and 9 more jobs in Nāgpur, Maharashtra for you. Apply Now.",
  //     link: "https://mail.google.com/mail/u/0/#inbox/18ffc1199abd8441",
  //     labelIds: ["UNREAD"],
  //     from: "Glassdoor Jobs ",
  //     category: "all",
  //     recieved: "Sun, 09 Jun 2024 08:16:02 +0000 (UTC)",
  //   },
  // ]);


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
      maxResults: 15,
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

const classifyEmails = async (emails: Email[]) => {
  try {
    const openai = new OpenAI({
      apiKey:
        process.env["OPENAI_API_KEY"] ||
        "sk-proj-UaOY5GZuM42zO7A6xgbCT3BlbkFJWeWhsODmNmDvmqNzrJMV",
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

    console.log(updatedEmails);
  } catch (error) {
    console.error("Error classifying emails:", error);
  }
};
