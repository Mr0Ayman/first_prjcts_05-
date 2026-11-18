import React from "react";

interface TechItem {
  icon: string;
  name: string;
  subtitle: string;
  iconColor: string;
}

const techItems: TechItem[] = [
  {
    icon: "terminal",
    name: "Linux OS",
    subtitle: "Debian Environment",
    iconColor: "text-primary",
  },
  {
    icon: "hub",
    name: "Wireshark",
    subtitle: "Packet Analysis",
    iconColor: "text-tertiary",
  },
  {
    icon: "code",
    name: "C Language",
    subtitle: "Memory • Sockets",
    iconColor: "text-secondary",
  },
  {
    icon: "terminal",
    name: "Bash",
    subtitle: "Scripting • Crons",
    iconColor: "text-primary",
  },
  {
    icon: "layers",
    name: "VirtualBox",
    subtitle: "Hypervisor Lab",
    iconColor: "text-tertiary",
  },
  {
    icon: "radar",
    name: "Nmap",
    subtitle: "Port Discovery",
    iconColor: "text-primary",
  },
  {
    icon: "data_object",
    name: "Python",
    subtitle: "Automation",
    iconColor: "text-secondary",
  },
  {
    icon: "arrows_outward",
    name: "Git / GitHub",
    subtitle: "Version Control",
    iconColor: "text-primary",
  },
  {
    icon: "router",
    name: "Cisco Tools",
    subtitle: "GNS3 • Packet Tracer",
    iconColor: "text-tertiary",
  },
  {
    icon: "shield",
    name: "iptables / UFW",
    subtitle: "Packet Filtering",
    iconColor: "text-primary",
  },
  {
    icon: "laptop_windows",
    name: "Windows OS",
    subtitle: "Active Directory base",
    iconColor: "text-on-surface-variant",
  },
];

export function TechStackSection() {
  return (
    <section
      className="w-full bg-surface-container-lowest py-space-xl border-t border-surface-container-low/40"
      id="tech-stack"
    >
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-space-lg">
        <div className="flex items-center justify-between pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider">
              05 // ARTIFACTS_AND_TOOLING
            </span>
          </div>
          <span className="font-label-mono-sm text-label-mono-sm text-outline">
            PRIMARY SYSTEM UTILITIES
          </span>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-space-md">
          {techItems.map((item, index) => (
            <div
              key={index}
              className="bg-surface-container p-space-md rounded-lg flex items-center gap-space-sm hover:bg-surface-container-high transition-colors border border-surface-container-high/40"
            >
              <span
                className={`material-symbols-outlined ${item.iconColor} text-[20px]`}
              >
                {item.icon}
              </span>
              <div className="flex flex-col">
                <span className="font-label-mono-sm text-body-sm text-on-surface font-semibold">
                  {item.name}
                </span>
                <span className="font-label-mono-sm text-[10px] text-outline">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
