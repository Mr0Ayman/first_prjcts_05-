import React from "react";

export function AboutSection() {
  return (
    <section
      className="w-full bg-surface-container-lowest py-space-xl lg:py-24 border-y border-surface-container-low/40"
      id="about"
    >
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-space-xl">
        {/* Section Tag Header */}
        <div className="flex flex-col gap-space-xs max-w-2xl">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider">
              01 // POSITION_BRIEF
            </span>
            <span className="h-px w-12 bg-primary/40"></span>
          </div>

          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Building foundations, one packet &amp; kernel at a time.
          </h2>
        </div>

        {/* Core Narrative + Metrics Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left: Candid student manifesto */}
          <div className="lg:col-span-7 flex flex-col gap-space-md text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
            <p>
              I do not claim decades of penetration testing or mythical exploit
              crafting. Instead, I focus with relentless discipline on what
              actually matters:{" "}
              <strong className="text-on-surface font-semibold">
                ground-truth fundamentals
              </strong>
              . Understanding how raw bytes traverse physical Ethernet
              interfaces, how the Linux VFS organizes file descriptors, and how
              the TCP three-way handshake truly behaves when networks fail.
            </p>

            <p>
              My current work centers on building reproducible home lab
              environments, configuring virtual switches and isolated subnets,
              studying low-level C memory allocations, and dissecting anomalous
              traffic traces. I believe exceptional security engineers are built
              from exceptional systems engineers first.
            </p>

            {/* Stat Callout Pills Array */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-sm">
              <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-1 shadow-sm border border-surface-container-high/40">
                <span className="font-display-hero text-headline-lg text-primary font-bold">
                  600+
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-on-surface uppercase tracking-wider">
                  Lab Hours Logged
                </span>
                <span className="font-body-sm text-body-sm text-outline">
                  Hands-on GNS3 &amp; Linux VMs
                </span>
              </div>

              <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-1 shadow-sm border border-surface-container-high/40">
                <span className="font-display-hero text-headline-lg text-tertiary font-bold">
                  28+
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-on-surface uppercase tracking-wider">
                  Virtual Topologies
                </span>
                <span className="font-body-sm text-body-sm text-outline">
                  VLANs, Firewalls &amp; Relays
                </span>
              </div>

              <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-1 shadow-sm border border-surface-container-high/40">
                <span className="font-display-hero text-headline-lg text-secondary font-bold">
                  120K
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-on-surface uppercase tracking-wider">
                  Packets Dissected
                </span>
                <span className="font-body-sm text-body-sm text-outline">
                  PCAP forensics &amp; filters
                </span>
              </div>
            </div>
          </div>

          {/* Right: Currently Learning Interactive Focus Matrix */}
          <div className="lg:col-span-5 bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-md shadow-md border border-surface-container-high/50">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/40">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  psychology
                </span>

                <span className="font-label-mono-sm text-label-mono-sm text-on-surface uppercase tracking-wider font-semibold">
                  ACTIVE LEARNING TRACKS
                </span>
              </div>

              <span className="font-label-mono-sm text-[10px] text-tertiary">
                SEMESTER_Q2_SYNC
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Topics actively under structured study, university coursework,
              and local hypervisor testbeds:
            </p>

            <div className="flex flex-col gap-space-sm">
              {/* Learning Item 1 */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>

                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    Computer Networking &amp; Subnetting
                  </span>
                </div>

                <span className="font-label-mono-sm text-label-mono-sm text-primary bg-primary/10 px-2 py-0.5 rounded">
                  CIDR / 802.1Q
                </span>
              </div>

              {/* Learning Item 2 */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>

                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    Linux System Administration
                  </span>
                </div>

                <span className="font-label-mono-sm text-label-mono-sm text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Systemd / VFS / Permissions
                </span>
              </div>

              {/* Learning Item 3 */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>

                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    Network Security Fundamentals
                  </span>
                </div>

                <span className="font-label-mono-sm text-label-mono-sm text-tertiary bg-tertiary/10 px-2 py-0.5 rounded">
                  UFW / iptables / ACLs
                </span>
              </div>

              {/* Learning Item 4 */}
              <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-lg hover:bg-surface-container-high transition-colors">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>

                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    C Systems Programming
                  </span>
                </div>

                <span className="font-label-mono-sm text-label-mono-sm text-secondary bg-secondary/10 px-2 py-0.5 rounded">
                  Pointers / Sockets
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}