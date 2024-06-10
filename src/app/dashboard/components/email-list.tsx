"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ListFilter, BotMessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

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
  const [selected, setSelected] = useState<string | null>(null);

  if (error) {
    toast({
      title: "Loading Mails",
      description: error || "Unexpected error",
      variant: "destructive",
    });
  }

  const categories = {
    all: emails,
    important: emails?.filter((email) => email.category === "important"),
    spam: emails?.filter((email) => email.category === "spam"),
    marketing: emails?.filter((email) => email.category === "marketing"),
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 h-full">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="important">Important</TabsTrigger>
            <TabsTrigger value="spam">Spam</TabsTrigger>
            <TabsTrigger value="marketing" className="hidden sm:flex">
              Marketing
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    No. Mails
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>15</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>20</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>25</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="sm" className="h-7 gap-1 animate-pulse">
              <BotMessageSquare className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Classify
              </span>
            </Button>
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
                  <div className="flex flex-col gap-2 p-4 pt-0">
                    {emails?.map((item) => (
                      <button
                        key={item.id}
                        className={cn(
                          "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                          selected === item.id && "bg-muted"
                        )}
                        onClick={() => setSelected(item.id)}
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
                  Showing <strong>1-10</strong> of{" "}
                  <strong>{emails?.length}</strong> emails
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
