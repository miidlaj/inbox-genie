"use client";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import React from "react";
import ResizableIcon from "../components/icon";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <Link href={"/signin"}>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-sm"
          >
            <ResizableIcon className="size-6" />
            <span>Dashboard</span>
          </HoverBorderGradient>
        </Link>
      </div>

      <HeroParallax products={products} />
    </div>
  );
}
const products = [
  {
    title: "Dashboard",
    link: "https://inboxgenie.vercel.app/dashboard",
    thumbnail: "/hero/dashboard.png",
  },
  {
    title: "SignIn",
    link: "https://inboxgenie.vercel.app/signin",
    thumbnail: "/hero/dark.png",
  },
  {
    title: "Light/Dark Mode",
    link: "https://inboxgenie.vercel.app/",
    thumbnail: "/hero/light.png",
  },

  {
    title: "Details",
    link: "https://inboxgenie.vercel.app/dashboard",
    thumbnail: "/hero/details.png",
  },
  {
    title: "API",
    link: "https://inboxgenie.vercel.app/dashboard",
    thumbnail: "/hero/api.png",
  },
  {
    title: "Landing Page",
    link: "https://inboxgenie.vercel.app/",
    thumbnail: "/hero/landing.png",
  },

  {
    title: "Empty Inbox",
    link: "https://inboxgenie.vercel.app/dashboard",
    thumbnail: "/hero/empty.png",
  },
  {
    title: "Dark Mode",
    link: "https://inboxgenie.vercel.app/dashboard",
    thumbnail: "/hero/details-dark.png",
  },
];
