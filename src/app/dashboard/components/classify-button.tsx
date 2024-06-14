"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useTransition } from "react";
import { BotMessageSquare, Key, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { openai_localstorage_key } from "@/utils/contants";
import ResizableIcon from "@/components/icon";

export default function ClassifyButton() {
  const [openApiKeyModal, setOpenApiKeyModal] = React.useState<boolean>(false);
  const [newApiKey, setNewApiKey] = React.useState<string>("");

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  const handleClassify = () => {
    const openai_access_token = localStorage.getItem(openai_localstorage_key);

    if (openai_access_token) {
      setOpenApiKeyModal(false);
      newParams.set("classify", openai_access_token);
      router.push(`/dashboard?${newParams.toString()}`);
    } else {
      setNewApiKey(openai_access_token || "");
      setOpenApiKeyModal(true);
    }
  };

  const handleSaveModal = () => {
    startTransition(async () => {
      try {
        const response = await fetch("https://api.openai.com/v1/models", {
          headers: {
            Authorization: `Bearer ${newApiKey}`,
          },
        });

        if (!response.ok) {
          toast({
            title: "Inavlid Api Key",
            description: "The provided openai api key is invalid or expired.",
            variant: "destructive",
          });
          return;
        }

        localStorage.setItem(openai_localstorage_key, newApiKey);
        toast({
          title: "Success",
          description: "New api key added successfully.",
        });
        handleClassify();

        return;
      } catch (error) {
        toast({
          title: "Failed to validate api key",
          description: "Please try again after sometimes.",
          variant: "destructive",
        });
        console.error("Failed to validate API key:", error);
      }
    });
  };

  return (
    <>
      <Dialog open={openApiKeyModal} onOpenChange={setOpenApiKeyModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>OPENAI API</DialogTitle>
            <DialogDescription>
              please add an openai api key to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right">
                API KEY
              </Label>
              <Input
                onChange={(e) => setNewApiKey(e.target.value)}
                value={newApiKey}
                id="api-key"
                placeholder="sk-xxxxxxx-xxxxxxxx"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {isPending && (
              <Button disabled>
                <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}
            {!isPending && (
              <Button type="button" onClick={() => handleSaveModal()}>
                Save
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        size="sm"
        variant="outline"
        className="h-7 gap-1"
        onClick={() => {
          setNewApiKey(localStorage.getItem(openai_localstorage_key) || "");
          setOpenApiKeyModal(true);
        }}
      >
        <Key className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          API KEY
        </span>
      </Button>

      <Button
        size="sm"
        className={`h-7 gap-1 ${
          !newParams.get("classify") && "animate-bounce"
        }`}
        onClick={() => handleClassify()}
      >
        <ResizableIcon className="h-6 w-6" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap ">
          Classify
        </span>
      </Button>
    </>
  );
}
