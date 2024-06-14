"use client";

import React, { ComponentProps, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

import ClassifyButton from "./classify-button";
import { signOut } from "next-auth/react";
import MailCountDropdown from "./mail-count-dropdown";
import { useRouter, useSearchParams } from "next/navigation";
import DetailsDrawer from "./details-drawer";
import EmptyInbox from "./empty-inbox";

interface Email {
  id: string;
  snippet: string;
  link: string;
  labelIds: string[];
  category: string;
  subject: string;
  from: string;
  recieved: string;
}

interface EmailListProps {
  emails: Email[] | null;
  error: string | null;
}

const EmailList: React.FC<EmailListProps> = ({ emails, error }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const [selected, setSelected] = React.useState(
    newParams.get("selected_mail") || null
  );

  const handleSelecting = (item: string) => {
    setSelected(item);
    newParams.set("selected_mail", item);
    router.push(`/dashboard?${newParams.toString()}`);
  };

  if (error) {
    toast({
      title: "Loading Mails",
      description: error || "Unexpected error",
      variant: "destructive",
    });

    if (error === "Invalid Credentials") {
      signOut();
    }
  }

  const categories = {
    all: emails,
    important: emails?.filter((email) => email.category === "important"),
    spam: emails?.filter((email) => email.category === "spam"),
    marketing: emails?.filter((email) => email.category === "marketing"),
    promotions: emails?.filter((email) => email.category === "promotions"),
    social: emails?.filter((email) => email.category === "social"),
    general: emails?.filter((email) => email.category === "general"),
  };

  const details_data =
    newParams.get("selected_mail") && emails?.find((x) => x.id === selected);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 h-full">
      <DetailsDrawer details_data={details_data as any} />
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="important">Important</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="spam">Spam</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <MailCountDropdown />

            <ClassifyButton />
          </div>
        </div>

        {Object.entries(categories).map(([key, emails]) => (
          <TabsContent value={key} key={key}>
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Inbox</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh]">
                  {emails?.length === 0 && (
                    <div className="h-full">
                      <EmptyInbox />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    {emails?.map((item) => (
                      <button
                        key={item.id}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                          selected === item.id && "bg-muted"
                        )}
                        onClick={() => handleSelecting(item.id)}
                      >
                        <div className="flex w-full flex-col gap-1">
                          <div className="flex items-center">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">{item?.from}</div>
                              {item?.labelIds?.includes("UNREAD") && (
                                <span className="flex h-2 w-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <div
                              className={cn(
                                "ml-auto text-xs",
                                selected === item.id
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {formatDistanceToNow(item?.recieved, {
                                addSuffix: true,
                              })}
                            </div>
                          </div>
                          <div className="text-xs font-medium">
                            {item?.subject}
                          </div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">
                          {item?.snippet.trimEnd().trim() + "..."}
                        </div>
                        {item.labelIds.length ? (
                          <div className="flex items-center gap-2">
                            {item.category !== "all" && (
                              <Badge>{item?.category.toUpperCase()}</Badge>
                            )}

                            {item.labelIds.map((label) => (
                              <Badge
                                key={label}
                                variant={getBadgeVariantFromLabel(label)}
                              >
                                {label.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-{emails?.length}</strong> of{" "}
                  <strong>{categories.all?.length}</strong> emails
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}

export default EmailList;
