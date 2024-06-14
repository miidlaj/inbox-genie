import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default async function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <div className="space-y-2 text-center flex flex-col justify-center items-center">
        <Skeleton className="w-16 h-16 rounded-full" />{" "}
        {/* ResizableIcon Skeleton */}
        <Skeleton className="h-8 w-48" /> {/* Heading Skeleton */}
        <Skeleton className="h-4 w-64" /> {/* Subheading Skeleton */}
      </div>
      <Skeleton className="h-10 w-60" /> {/* Google Sign-in Button Skeleton */}
    </div>
  );
}
