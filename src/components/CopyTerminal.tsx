"use client";

import { useState } from "react";

type CopyTerminalProps = {
  command: string;
};

export function CopyTerminal({ command }: CopyTerminalProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="terminal relative pr-24!">
      <code>{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className="absolute top-2 right-2 rounded-(--radius) bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
      >
        {copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  );
}
