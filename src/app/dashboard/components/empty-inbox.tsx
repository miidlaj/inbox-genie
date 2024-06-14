import ResizableIcon from "@/app/(components)/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function EmptyInbox() {
  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="max-w-md w-full px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className=" rounded-full w-20 h-20 flex items-center justify-center">
              <ResizableIcon className="h-20 w-20" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight ">
                Your inbox is empty
              </h2>
              <p className="mt-2 ">
                Get started by composing a new message or click on classify button
              </p>
            </div>

            <Link href="https://mail.google.com/mail/u/0/#inbox?compose=new" target="_blank">
            <Button variant={"link"}>Compose</Button>
            </Link>

           
          </div>
        </div>
      </div>
    </div>
  );
}
