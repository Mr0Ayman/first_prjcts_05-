"use client";

import React from "react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex items-center justify-between gap-gutter">
        {/* Brand identity */}
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="h-9 px-space-sm bg-surface-container-high rounded-lg flex items-center justify-center">
              <span className="font-label-mono-sm text-label-mono-sm text-primary tracking-wider uppercase font-semibold">
                SEC::SYS
              </span>
            </div>
            <a
              href="#"
              className="font-headline-sm text-headline-sm text-on-surface hidden sm:inline-block tracking-tight font-semibold hover:text-primary transition-colors"
            >
              AYMAN.DEV
            </a>
          </div>
          <div className="hidden md:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-low">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="font-label-mono-sm text-label-mono-sm text-tertiary uppercase">
              Open to internships &amp; collabs
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-gutter">
          <a
            href="#about"
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#skills"
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
          >
            Skills
          </a>
          <a
            href="#projects"
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
          >
            Projects
          </a>
          <a
            href="#journey"
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
          >
            Journey
          </a>
          <a
            href="#tech-stack"
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
          >
            Tech Stack
          </a>
          <a
            href="#contact"
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Action button */}
        <div className="flex items-center gap-space-md">
          <a
            href="#contact"
            className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary-container font-label-mono-sm text-label-mono-sm uppercase tracking-wider font-semibold hover:bg-primary hover:text-on-primary transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] flex items-center gap-space-xs"
          >
            <span>View Resume</span>
          </a>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
