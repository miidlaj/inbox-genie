import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Skeleton className="h-10 w-10 rounded-full sm:hidden" />
        <Skeleton className="h-6 w-20" />

        <div className="relative ml-auto flex-1 md:grow-0">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </header>

      <div className="p-4 sm:px-6 sm:py-0">
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="flex items-center space-x-4 mb-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2 border p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-64" />
              <div className="flex items-center space-x-2 mt-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
