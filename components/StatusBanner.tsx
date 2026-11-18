import React from "react";

export function StatusBanner() {
  return (
    <div className="w-full bg-surface-container-lowest px-margin-mobile lg:px-margin-desktop py-space-xs border-b border-surface-container-low/50">
      <div className="max-w-[1360px] mx-auto flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center justify-center px-space-xs py-0.5 rounded bg-surface-container font-label-mono-sm text-label-mono-sm text-primary uppercase">
            STATUS::DEV_MODE
          </span>
          <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">
            Undergraduate in Computer Science • Specialized Path: Infrastructure Security
          </span>
        </div>
        <div className="flex items-center gap-gutter-sm font-label-mono-sm text-label-mono-sm text-on-surface-variant">
          <span className="flex items-center gap-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>{" "}
            CASABLANCA_POP :: LIVE
          </span>
          <span className="text-outline-variant">|</span>
          <span className="text-primary font-semibold">LAB_UPTIME: 142d 18h</span>
        </div>
      </div>
    </div>
  );
}
