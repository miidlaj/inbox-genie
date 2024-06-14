"use client";

import ResizableIcon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

export default function ClientLoginPage() {


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
        <div className="space-y-2 text-center flex flex-col justify-center items-center">
          <ResizableIcon />
          <h1 className="text-3xl font-bold">
            Welcome to <span className="text-primary">InBox Genie!</span>
          </h1>
          <p className="text-gray-500">
            Sign in with your Google account to get started.
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => signIn("google")}
        >
          <div className="w-5">
            <GoogleIcon />
          </div>
          Sign in with Google
        </Button>
      </div>
    </>
  );
}

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 48"
    >
      <defs>
        <path
          id="a"
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
        />
      </defs>
      <clipPath id="b">
        <use xlinkHref="#a" overflow="visible" />
      </clipPath>
      <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
      <path
        clipPath="url(#b)"
        fill="#EA4335"
        d="M0 11l17 13 7-6.1L48 14V0H0z"
      />
      <path
        clipPath="url(#b)"
        fill="#34A853"
        d="M0 37l30-23 7.9 1L48 0v48H0z"
      />
      <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
    </svg>
  );
};
