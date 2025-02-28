"use client";

import { Button } from "@/components/ui/button";
import { useChatStore } from "@/lib/store";
import { CreatePresetDialog } from "./create-preset-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function ChatSidebar() {
  const { presets, currentPreset, setCurrentPreset } = useChatStore();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHomePage = pathname === "/";

  const handlePresetChange = (preset: (typeof presets)[0]) => {
    setCurrentPreset(preset);
    // Create new URLSearchParams object to modify the query
    const params = new URLSearchParams(searchParams);
    params.set("preset", preset.id);
    // Update the URL without refreshing the page
    router.replace(`/chat?${params.toString()}`);
  };

  return (
    <div className="w-64 border-r h-screen p-4 flex flex-col gap-2">
      <h2 className="font-semibold mb-4">Chatbots</h2>
      <CreatePresetDialog />
      <div className="h-px bg-border my-2" />
      {presets.map((preset) =>
        isHomePage ? (
          <Link
            key={preset.id}
            href={`/chat?preset=${preset.id}`}
            className="w-full"
          >
            <Button variant="ghost" className="w-full justify-start">
              {preset.name}
            </Button>
          </Link>
        ) : (
          <Button
            key={preset.id}
            variant={currentPreset?.id === preset.id ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => handlePresetChange(preset)}
          >
            {preset.name}
          </Button>
        )
      )}
    </div>
  );
}
