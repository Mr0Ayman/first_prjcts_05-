import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-xl border-t border-surface-container-low/50 mt-auto">
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex flex-col items-center md:items-start gap-space-xs">
          <div className="flex items-center gap-space-sm">
            <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase">
              NODE::CORE_PORTFOLIO
            </span>
            <span className="font-label-mono-sm text-label-mono-sm text-outline">
              |
            </span>
            <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">
              v2.4.0-RELEASE
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-left">
            Specialized in Kernel Architecture, Low-Level Systems, Distributed
            Topologies &amp; Defensive Protocols.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-gutter">
          <a
            className="font-label-mono-sm text-label-mono-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-space-xs"
            href="https://github.com/Mr0Ayman"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[16px]">
              terminal
            </span>
            <span>GITHUB</span>
          </a>
          <a
            className="font-label-mono-sm text-label-mono-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-space-xs"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
            <span>LINKEDIN</span>
          </a>
          <a
            className="font-label-mono-sm text-label-mono-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-space-xs"
            href="#contact"
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>ENCRYPTED_MAIL</span>
          </a>
          <a
            className="font-label-mono-sm text-label-mono-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-space-xs"
            href="#contact"
          >
            <span className="material-symbols-outlined text-[16px]">key</span>
            <span>PGP_PUBKEY</span>
          </a>
        </div>

        <div className="font-label-mono-sm text-label-mono-sm text-outline-variant text-center md:text-right">
          © 2026 AYMAN. SYSTEMS ARCHITECT. ZERO DOWNTIME.
        </div>
      </div>
    </footer>
  );
}
