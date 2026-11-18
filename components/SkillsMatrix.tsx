import React from "react";

export function SkillsMatrix() {
  return (
    <section className="w-full bg-background py-space-xl lg:py-24" id="skills">
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-xl">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider">
                02 // CAPABILITY_INDEX
              </span>
              <span className="h-px w-12 bg-primary/40"></span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Honest Competency Breakdown
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Categorized by practical operational exposure rather than
              inflated self-ratings.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-space-md bg-surface-container p-space-xs px-space-md rounded-lg font-label-mono-sm text-label-mono-sm border border-surface-container-high/40">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary"></span> Core
              Study
            </span>
            <span className="flex items-center gap-1.5 text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span> Active
              Lab Practice
            </span>
            <span className="flex items-center gap-1.5 text-secondary">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>{" "}
              Foundational
            </span>
          </div>
        </div>

        {/* Skills 4-Column Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Category 1: Networking */}
          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm hover:shadow-md transition-shadow border border-surface-container-high/40">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider font-semibold">
                NETWORKING
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">
                hub
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                TCP/IP &amp; OSI
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                IPv4 / Subnetting
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
                VLANs &amp; 802.1Q
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" "}
                Routing (Static / OSPF)
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                Switching &amp; STP
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                DNS / DHCP
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" "}
                Wireshark PCAP
              </span>
            </div>
            <p className="mt-auto pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
              Deep dive into packet header mechanics, NAT configurations, and
              frame forwarding.
            </p>
          </div>

          {/* Category 2: Systems & Linux */}
          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm hover:shadow-md transition-shadow border border-surface-container-high/40">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="font-label-mono-sm text-label-mono-sm text-secondary uppercase tracking-wider font-semibold">
                SYSTEMS &amp; OS
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">
                terminal
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                Linux (Debian/Ubuntu)
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                Bash Automation
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
                VirtualBox / VMware
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" "}
                Proxmox Concepts
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" "}
                Windows Server Basics
              </span>
            </div>
            <p className="mt-auto pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
              Command-line fluency, process management, user access controls,
              systemd daemon management.
            </p>
          </div>

          {/* Category 3: Code & Development */}
          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm hover:shadow-md transition-shadow border border-surface-container-high/40">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider font-semibold">
                LOW-LEVEL &amp; DEV
              </span>
              <span className="material-symbols-outlined text-primary text-[20px]">
                code
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> C
                (Pointers &amp; Memory)
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                Python (Net Scripts)
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                Git / GitHub Flow
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" "}
                POSIX Sockets (C)
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" "}
                Valgrind &amp; GCC
              </span>
            </div>
            <p className="mt-auto pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
              Memory lifecycle awareness, preventing segmentation faults,
              automating network scans with Python.
            </p>
          </div>

          {/* Category 4: Defensive Security */}
          <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm hover:shadow-md transition-shadow border border-surface-container-high/40">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="font-label-mono-sm text-label-mono-sm text-tertiary uppercase tracking-wider font-semibold">
                SECURITY &amp; DEFENSE
              </span>
              <span className="material-symbols-outlined text-tertiary text-[20px]">
                security
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                Linux Hardening
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
                UFW / iptables
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" "}
                Nmap Scan Mechanics
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>{" "}
                SSH Key Authentication
              </span>
              <span className="px-2 py-1 rounded bg-surface-container text-on-surface font-label-mono-sm text-label-mono-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>{" "}
                CTF Basics (PicoCTF)
              </span>
            </div>
            <p className="mt-auto pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
              Attack surface reduction, auditing open listening sockets,
              baseline network perimeter protection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
