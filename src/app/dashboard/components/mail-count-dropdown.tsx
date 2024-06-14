"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function MailCountDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const [selected, setSelected] = React.useState(
    newParams.get("mail_count") || "15"
  );

  const handleSelecting = (item: string) => {
    setSelected(item);
    newParams.set("mail_count", item);
    router.push(`/dashboard?${newParams.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1 items-center">
          <div className="h-3.5 w-3.5">{selected}</div>
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            No. Mails
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSeparator />
        {["5", "10", "15", "20", "25"].map((item, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            onCheckedChange={(e) => handleSelecting(item)}
            checked={selected === item}
          >
            {item}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
