"use client";

import React from "react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-space-xl lg:py-24">
      {/* Atmospheric subtle background glow */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center relative z-10">
        {/* Left Hero Column (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col items-start gap-space-md">
          {/* Location & Live Ping Badge */}
          <div className="inline-flex items-center gap-space-sm px-space-md py-1.5 rounded-full bg-surface-container-low shadow-sm">
            <span className="text-[14px]">📍</span>
            <span className="font-label-mono-sm text-label-mono-sm text-on-surface uppercase tracking-wider">
              Morocco • Computer Science Student
            </span>
            <span className="h-3 w-px bg-surface-variant"></span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="font-label-mono-sm text-label-mono-sm text-tertiary font-semibold">
              RTT ~14ms
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-on-surface tracking-tight max-w-xl">
            Building my path from{" "}
            <span className="text-primary font-semibold">Networking</span> to{" "}
            <span className="text-tertiary font-semibold">Cybersecurity</span>.
          </h1>

          {/* Supporting Text */}
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
            I&apos;m a computer science and networking student dedicated to
            understanding how distributed systems communicate, dissecting
            low-level protocol exchanges, and building robust defense layers
            from the socket up.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-md pt-space-sm w-full sm:w-auto">
            <a
              href="#projects"
              className="px-space-lg py-space-sm rounded-lg bg-primary text-on-primary font-label-mono-sm text-label-mono-sm uppercase tracking-wider font-semibold hover:bg-primary-fixed-dim transition-all shadow-[0_0_16px_rgba(6,182,212,0.35)] flex items-center gap-space-sm"
            >
              <span>Explore Projects</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </a>
            <a
              href="#contact"
              className="px-space-lg py-space-sm rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-bright transition-all font-label-mono-sm text-label-mono-sm uppercase tracking-wider flex items-center gap-space-sm"
            >
              <span>Contact Me</span>
              <span className="material-symbols-outlined text-[18px]">
                mail
              </span>
            </a>
          </div>

          {/* Quick Links Pill Row */}
          <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
            <span className="font-label-mono-sm text-label-mono-sm text-outline uppercase tracking-wider">
              Direct Terminal:
            </span>
            <a
              href="https://github.com/Mr0Ayman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container font-label-mono-sm text-label-mono-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">
                terminal
              </span>
              <span>github.com/Mr0Ayman</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-space-xs px-space-sm py-1 rounded bg-surface-container font-label-mono-sm text-label-mono-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">link</span>
              <span>linkedin/in/ayman-netsec</span>
            </a>
          </div>
        </div>

        {/* Right Hero Column: Interactive Network & Systems Telemetry Panel (6 Cols) */}
        <div className="lg:col-span-6 w-full">
          <div className="w-full bg-surface-container-low rounded-xl shadow-xl overflow-hidden p-space-md lg:p-space-lg flex flex-col gap-space-md border border-surface-container-high/50">
            {/* Terminal / Topology Header */}
            <div className="flex items-center justify-between pb-space-sm bg-surface-container-lowest/40 -mx-space-md -mt-space-md px-space-md py-space-sm border-b border-surface-container-high/40">
              <div className="flex items-center gap-space-sm">
                <span className="w-3 h-3 rounded-full bg-error/70"></span>
                <span className="w-3 h-3 rounded-full bg-secondary-container/70"></span>
                <span className="w-3 h-3 rounded-full bg-tertiary/70"></span>
                <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant ml-space-xs">
                  topotrace::vlan-10 (eth0: promiscuous)
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                <span className="font-label-mono-sm text-label-mono-sm text-tertiary font-semibold">
                  CAPTURE_ACTIVE
                </span>
              </div>
            </div>

            {/* Network Architecture SVG Node Graph */}
            <div className="w-full bg-surface-container-lowest rounded-lg p-space-md border border-surface-container/50">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-label-mono-sm text-label-mono-sm text-outline uppercase tracking-wider">
                  PHYSICAL_LOGICAL_LINK_TRACE
                </span>
                <span className="font-label-mono-sm text-label-mono-sm text-primary">
                  SUBNET: 192.168.10.0/24
                </span>
              </div>
              <div className="w-full overflow-x-auto py-space-xs">
                <svg
                  className="w-full min-w-[480px] h-28"
                  fill="none"
                  viewBox="0 0 520 110"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Data Flow Path Lines */}
                  <path
                    className="text-surface-variant"
                    d="M 60 55 L 140 55"
                    stroke="currentColor"
                    strokeDasharray="4 4"
                    strokeWidth="2"
                  />
                  <path
                    className="text-primary/60"
                    d="M 170 55 L 250 55"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    className="text-secondary/60"
                    d="M 280 55 L 360 55"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    className="text-tertiary/60"
                    d="M 390 55 L 470 55"
                    stroke="currentColor"
                    strokeDasharray="2 2"
                    strokeWidth="2"
                  />

                  {/* Node 1: WAN / Gateway */}
                  <g transform="translate(30, 25)">
                    <rect
                      className="fill-surface-container-high"
                      height="60"
                      rx="8"
                      width="60"
                    />
                    <circle
                      className="fill-primary/20"
                      cx="30"
                      cy="22"
                      r="10"
                    />
                    <text
                      className="font-label-mono-sm text-label-mono-sm fill-primary font-bold"
                      textAnchor="middle"
                      x="30"
                      y="26"
                    >
                      GW
                    </text>
                    <text
                      className="font-label-mono-sm text-[9px] fill-on-surface-variant"
                      textAnchor="middle"
                      x="30"
                      y="48"
                    >
                      .10.1
                    </text>
                  </g>

                  {/* Node 2: Managed Switch */}
                  <g transform="translate(140, 25)">
                    <rect
                      className="fill-surface-container-high"
                      height="60"
                      rx="8"
                      width="60"
                    />
                    <circle
                      className="fill-secondary/20"
                      cx="30"
                      cy="22"
                      r="10"
                    />
                    <text
                      className="font-label-mono-sm text-label-mono-sm fill-secondary font-bold"
                      textAnchor="middle"
                      x="30"
                      y="26"
                    >
                      SW
                    </text>
                    <text
                      className="font-label-mono-sm text-[9px] fill-on-surface-variant"
                      textAnchor="middle"
                      x="30"
                      y="48"
                    >
                      VLAN 10
                    </text>
                  </g>

                  {/* Node 3: Linux Host / VM */}
                  <g transform="translate(250, 25)">
                    <rect
                      className="fill-surface-container-high"
                      height="60"
                      rx="8"
                      width="60"
                    />
                    <circle
                      className="fill-primary/20"
                      cx="30"
                      cy="22"
                      r="10"
                    />
                    <text
                      className="font-label-mono-sm text-label-mono-sm fill-primary font-bold"
                      textAnchor="middle"
                      x="30"
                      y="26"
                    >
                      HOST
                    </text>
                    <text
                      className="font-label-mono-sm text-[9px] fill-on-surface-variant"
                      textAnchor="middle"
                      x="30"
                      y="48"
                    >
                      .10.45
                    </text>
                  </g>

                  {/* Node 4: Firewall / UFW */}
                  <g transform="translate(360, 25)">
                    <rect
                      className="fill-surface-container-high"
                      height="60"
                      rx="8"
                      width="60"
                    />
                    <circle
                      className="fill-tertiary/20"
                      cx="30"
                      cy="22"
                      r="10"
                    />
                    <text
                      className="font-label-mono-sm text-label-mono-sm fill-tertiary font-bold"
                      textAnchor="middle"
                      x="30"
                      y="26"
                    >
                      FW
                    </text>
                    <text
                      className="font-label-mono-sm text-[9px] fill-on-surface-variant"
                      textAnchor="middle"
                      x="30"
                      y="48"
                    >
                      DROP:0
                    </text>
                  </g>

                  {/* Node 5: Target Service */}
                  <g transform="translate(470, 25)">
                    <rect
                      className="fill-surface-container-high"
                      height="60"
                      rx="8"
                      width="45"
                    />
                    <circle
                      className="fill-on-surface-variant/20"
                      cx="22"
                      cy="22"
                      r="10"
                    />
                    <text
                      className="font-label-mono-sm text-label-mono-sm fill-on-surface font-bold"
                      textAnchor="middle"
                      x="22"
                      y="26"
                    >
                      SRV
                    </text>
                    <text
                      className="font-label-mono-sm text-[9px] fill-on-surface-variant"
                      textAnchor="middle"
                      x="22"
                      y="48"
                    >
                      :443
                    </text>
                  </g>

                  {/* Moving Packet Animation simulation */}
                  <circle className="fill-primary" cx="210" cy="55" r="3.5">
                    <animate
                      attributeName="cx"
                      dur="2.4s"
                      from="140"
                      repeatCount="indefinite"
                      to="250"
                    />
                    <animate
                      attributeName="opacity"
                      dur="2.4s"
                      repeatCount="indefinite"
                      values="0;1;1;0"
                    />
                  </circle>
                </svg>
              </div>
            </div>

            {/* Wireshark-Style Micro Stream Sniffer */}
            <div className="flex flex-col gap-1 font-code-stream text-[11px] bg-surface-container-lowest p-space-sm rounded-lg overflow-x-auto border border-surface-container/50">
              <div className="flex items-center text-outline font-label-mono-sm pb-1">
                <span className="w-10">NO.</span>
                <span className="w-16">TIME</span>
                <span className="w-28">SOURCE</span>
                <span className="w-28">DESTINATION</span>
                <span className="w-14">PROTO</span>
                <span className="w-12">LEN</span>
                <span>INFO</span>
              </div>
              <div className="flex items-center text-primary-fixed-dim hover:bg-surface-container py-0.5 px-1 rounded transition-colors">
                <span className="w-10">001</span>
                <span className="w-16">0.000000</span>
                <span className="w-28">192.168.10.45</span>
                <span className="w-28">192.168.10.1</span>
                <span className="w-14 font-semibold text-primary">TCP</span>
                <span className="w-12">74</span>
                <span className="truncate">
                  51422 &gt; 443 [SYN] Seq=0 Win=64240 MSS=1460
                </span>
              </div>
              <div className="flex items-center text-tertiary-fixed-dim hover:bg-surface-container py-0.5 px-1 rounded transition-colors">
                <span className="w-10">002</span>
                <span className="w-16">0.000184</span>
                <span className="w-28">192.168.10.1</span>
                <span className="w-28">192.168.10.45</span>
                <span className="w-14 font-semibold text-tertiary">TCP</span>
                <span className="w-12">74</span>
                <span className="truncate">
                  443 &gt; 51422 [SYN, ACK] Seq=0 Ack=1
                </span>
              </div>
              <div className="flex items-center text-on-surface-variant hover:bg-surface-container py-0.5 px-1 rounded transition-colors">
                <span className="w-10">003</span>
                <span className="w-16">0.000210</span>
                <span className="w-28">192.168.10.45</span>
                <span className="w-28">192.168.10.1</span>
                <span className="w-14 font-semibold text-secondary">TCP</span>
                <span className="w-12">66</span>
                <span className="truncate">
                  51422 &gt; 443 [ACK] Seq=1 Ack=1 Win=64240
                </span>
              </div>
              <div className="flex items-center text-error hover:bg-surface-container py-0.5 px-1 rounded transition-colors">
                <span className="w-10">004</span>
                <span className="w-16">0.003112</span>
                <span className="w-28">10.0.8.12</span>
                <span className="w-28">192.168.10.45</span>
                <span className="w-14 font-semibold text-error">ICMP</span>
                <span className="w-12">98</span>
                <span className="truncate">
                  Echo (ping) request - [UFW REJECT LOGGED]
                </span>
              </div>
            </div>

            {/* Socket Diagnostics Bar */}
            <div className="grid grid-cols-3 gap-space-sm pt-space-xs text-center">
              <div className="bg-surface-container p-space-xs rounded">
                <span className="font-label-mono-sm text-[10px] text-outline uppercase block">
                  RX Packets
                </span>
                <span className="font-label-mono-sm text-body-sm text-on-surface font-semibold">
                  1,489,204
                </span>
              </div>
              <div className="bg-surface-container p-space-xs rounded">
                <span className="font-label-mono-sm text-[10px] text-outline uppercase block">
                  Drops / Err
                </span>
                <span className="font-label-mono-sm text-body-sm text-tertiary font-semibold">
                  0 / 0
                </span>
              </div>
              <div className="bg-surface-container p-space-xs rounded">
                <span className="font-label-mono-sm text-[10px] text-outline uppercase block">
                  Socket Mode
                </span>
                <span className="font-label-mono-sm text-body-sm text-primary font-semibold">
                  RAW_AF_INET
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
