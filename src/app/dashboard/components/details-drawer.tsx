"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Copy,
  Truck,
  MoreVertical,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Mail,
  MailCheck,
  MailX,
  TrendingUp,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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

export default function DetailsDrawer({
  details_data,
}: {
  details_data: Email;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const handleOnOpenChange = (open: boolean) => {
    if (details_data && open) {
      newParams.set("selected_mail", details_data?.id);
      router.push(`/dashboard?${newParams.toString()}`);
    }

    if (details_data && !open) {
      newParams.delete("selected_mail");
      router.push(`/dashboard?${newParams.toString()}`);
    }
  };

  return (
    <Drawer
      open={details_data ? true : false}
      direction="right"
      onOpenChange={handleOnOpenChange}
    >
      <DrawerContent
        noNotch
        noOverlay
        className="max-h-screen top-0 right-0 left-auto m-5 w-[500px] overflow-hidden rounded-[10px]"
      >
        <ScrollArea className="h-screen">
          <Card className="rounded-none h-full">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  {details_data?.from}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy From Email</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Recieved:{" "}
                  {details_data && format(details_data?.recieved, "PPP pp")}
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Link href={details_data?.link || "/"} target="_blank">
                  <Button size="sm" variant="link" className="h-8 gap-1">
                    <GmailIcon />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap text-white">
                      View in Gmail
                    </span>
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Export</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Trash</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm h-full min-h-[70vh]">
              <div className="grid gap-3">
                <div className="font-semibold underline">Email Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground text-lg">
                      {details_data?.subject}
                    </span>
                  </li>
                  <Separator className="my-4" />
                  <li className="flex items-center justify-between">
                    <span>{details_data?.snippet}</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                Updated{" "}
                <time>
                  {details_data && format(details_data?.recieved, "PPP")}
                </time>
              </div>
            </CardFooter>
          </Card>
        </ScrollArea>

        <DrawerFooter className="bg-card border-t ">
          <Button
            onClick={() => handleOnOpenChange(false)}
            className="w-full"
            variant="outline"
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const GmailIcon = () => {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1249 4.72501L11.6666 5.52709L10.2083 6.91251V11.6667H12.2499C12.7332 11.6667 13.1249 11.275 13.1249 10.7917V4.72501Z"
        fill="#4CAF50"
      />
      <path
        d="M0.875 4.72501L1.92908 5.22376L3.79167 6.91251V11.6667H1.75C1.26671 11.6667 0.875 11.275 0.875 10.7917V4.72501Z"
        fill="#1E88E5"
      />
      <path
        d="M10.2083 3.26666L7 5.67291L3.79167 3.26666L3.5 4.95833L3.79167 6.9125L7 9.31875L10.2083 6.9125L10.5 4.95833L10.2083 3.26666Z"
        fill="#E53935"
      />
      <path
        d="M0.875 3.58693V4.72501L3.79167 6.91251V3.26668L2.8805 2.58389C2.6635 2.42114 2.39983 2.33334 2.12858 2.33334C1.43617 2.33334 0.875 2.89451 0.875 3.58693Z"
        fill="#C62828"
      />
      <path
        d="M13.1249 3.58693V4.72501L10.2083 6.91251V3.26668L11.1194 2.58389C11.3364 2.42114 11.6001 2.33334 11.8713 2.33334C12.5638 2.33334 13.1249 2.89451 13.1249 3.58693Z"
        fill="#FBC02D"
      />
    </svg>
  );
};
