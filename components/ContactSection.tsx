"use client";

import React, { useState } from "react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    message: "",
  });

  const emailAddress = "contact@ayman.dev";

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormData({ senderName: "", senderEmail: "", message: "" });
    setTimeout(() => {
      setSent(false);
    }, 4500);
  };

  return (
    <section className="w-full bg-background py-space-xl lg:py-24" id="contact">
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
        {/* Left Contact Info */}
        <div className="lg:col-span-6 flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider">
              06 // DIRECT_TRANSMISSION
            </span>
            <span className="h-px w-12 bg-primary/40"></span>
          </div>
          <h2 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface tracking-tight">
            Let&apos;s build something.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
            I&apos;m always interested in learning, collaborating with fellow
            students or senior engineers, and connecting with anyone passionate
            about systems, network topologies, and security defenses.
          </p>

          {/* Direct Channel Cards */}
          <div className="flex flex-col gap-space-sm pt-space-sm max-w-md">
            {/* Email with Copy Trigger */}
            <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between shadow-sm border border-surface-container-high/40">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  mail
                </span>
                <div className="flex flex-col">
                  <span className="font-label-mono-sm text-[10px] text-outline uppercase">
                    Primary Dispatch
                  </span>
                  <span className="font-label-mono-sm text-body-sm text-on-surface font-semibold">
                    {emailAddress}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`px-space-sm py-1 rounded bg-surface-container hover:bg-surface-container-high font-label-mono-sm text-label-mono-sm uppercase transition-colors flex items-center gap-1 ${
                  copied ? "text-tertiary" : "text-primary"
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copied ? "check" : "content_copy"}
                </span>
                <span>{copied ? "COPIED!" : "Copy"}</span>
              </button>
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/Mr0Ayman"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between shadow-sm hover:bg-surface-container transition-colors border border-surface-container-high/40"
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  terminal
                </span>
                <div className="flex flex-col">
                  <span className="font-label-mono-sm text-[10px] text-outline uppercase">
                    Code Repository
                  </span>
                  <span className="font-label-mono-sm text-body-sm text-on-surface font-semibold">
                    github.com/Mr0Ayman
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                arrow_outward
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between shadow-sm hover:bg-surface-container transition-colors border border-surface-container-high/40"
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-tertiary text-[20px]">
                  share
                </span>
                <div className="flex flex-col">
                  <span className="font-label-mono-sm text-[10px] text-outline uppercase">
                    Professional Network
                  </span>
                  <span className="font-label-mono-sm text-body-sm text-on-surface font-semibold">
                    linkedin.com/in/ayman-netsec
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                arrow_outward
              </span>
            </a>
          </div>
        </div>

        {/* Right Mock Terminal Dispatch Form */}
        <div className="lg:col-span-6 bg-surface-container-low p-space-lg rounded-xl shadow-lg flex flex-col gap-space-md border border-surface-container-high/40">
          <div className="flex items-center justify-between pb-space-xs border-b border-surface-container-high/30">
            <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase font-semibold">
              SEND_PACKET // MESSAGE_GATEWAY
            </span>
            <span className="font-label-mono-sm text-[10px] text-outline">
              TLS 1.3 ENCRYPTED
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
            <div className="flex flex-col gap-1">
              <label className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                SENDER_NAME
              </label>
              <input
                className="bg-surface-container px-space-md py-space-sm rounded-lg text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary transition-all border border-surface-container-high/30"
                placeholder="e.g. Reda El Mansouri"
                required
                type="text"
                value={formData.senderName}
                onChange={(e) =>
                  setFormData({ ...formData, senderName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                RETURN_SOCKET_ADDRESS (EMAIL)
              </label>
              <input
                className="bg-surface-container px-space-md py-space-sm rounded-lg text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary transition-all border border-surface-container-high/30"
                placeholder="e.g. colleague@lab.edu"
                required
                type="email"
                value={formData.senderEmail}
                onChange={(e) =>
                  setFormData({ ...formData, senderEmail: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                PACKET_PAYLOAD (MESSAGE)
              </label>
              <textarea
                className="bg-surface-container px-space-md py-space-sm rounded-lg text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none border border-surface-container-high/30"
                placeholder="Hello! I saw your networking labs and wanted to chat about..."
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              className="w-full py-space-sm rounded-lg bg-primary text-on-primary font-label-mono-sm text-label-mono-sm uppercase tracking-wider font-semibold hover:bg-primary-fixed-dim transition-all shadow-[0_0_12px_rgba(6,182,212,0.25)] flex items-center justify-center gap-space-xs"
              type="submit"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Transmit Message</span>
            </button>

            {sent && (
              <div className="p-space-sm rounded bg-tertiary/10 text-tertiary font-label-mono-sm text-label-mono-sm text-center border border-tertiary/30 animate-fade-in">
                ✓ PACKET_RECEIVED: Message transmitted successfully to Ayman&apos;s
                inbox.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
