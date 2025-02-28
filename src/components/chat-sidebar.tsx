"use client";

import { Button } from "@/components/ui/button";
import { useChatStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ChatSidebar() {
  const { presets, currentPreset, setCurrentPreset } = useChatStore();

  return (
    <div className="w-64 border-r h-screen p-4 flex flex-col gap-2">
      <h2 className="font-semibold mb-4">Preset Prompts</h2>
      {presets.map((preset) => (
        <Button
          key={preset.id}
          variant={currentPreset?.id === preset.id ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setCurrentPreset(preset)}
        >
          {preset.name}
        </Button>
      ))}
    </div>
  );
}
