import React from "react";

export function JourneySection() {
  return (
    <section className="w-full bg-background py-space-xl lg:py-24" id="journey">
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-space-xl">
        <div className="flex flex-col gap-space-xs max-w-xl">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider">
              04 // EVOLUTIONARY_VECTOR
            </span>
            <span className="h-px w-12 bg-primary/40"></span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Learning Trajectory &amp; Milestones
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            A clear roadmap mapping foundational education to advanced defensive
            security specializations.
          </p>
        </div>

        {/* Timeline Rail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          {/* Milestone 1 */}
          <div className="relative bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-md shadow-sm border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <span className="font-label-mono-sm text-label-mono-sm text-outline uppercase tracking-wider font-semibold">
                STAGE 01 // 2026
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-label-mono-sm text-[10px] text-tertiary font-semibold">
                COMPLETED / FOUNDATION
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Academic Launch &amp; Core CS Immersion
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Graduated high school / scientific baccalaureate and entered
              higher Computer Science education in Morocco. Immersed in
              algorithmic thought, discrete mathematics, digital logic, and
              foundational programming fundamentals.
            </p>
            <div className="mt-auto pt-space-xs flex items-center gap-space-xs text-on-surface-variant font-label-mono-sm text-label-mono-sm">
              <span className="material-symbols-outlined text-[16px] text-primary">
                school
              </span>
              <span>University Coursework • Morocco</span>
            </div>
          </div>

          {/* Milestone 2: Active (Highlighted) */}
          <div className="relative bg-surface-container p-space-lg rounded-xl flex flex-col gap-space-md shadow-lg border border-primary/30">
            <div className="flex items-center justify-between">
              <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider font-semibold">
                STAGE 02 // CURRENT MILESTONE
              </span>
              <span className="px-2 py-0.5 rounded bg-primary/10 font-label-mono-sm text-[10px] text-primary font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>{" "}
                IN PROGRESS
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold text-primary">
              Networking &amp; Linux System Architecture
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Mastering the OSI/TCP-IP stacks, subnet planning, packet
              dissection, Linux kernel file systems, and C socket programming.
              Building and debugging multi-node virtual labs with GNS3 and
              isolated VM subnets.
            </p>
            <div className="mt-auto pt-space-xs flex items-center gap-space-xs text-primary font-label-mono-sm text-label-mono-sm">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Intensive Self-Directed Lab Practice</span>
            </div>
          </div>

          {/* Milestone 3: Upcoming Vector */}
          <div className="relative bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-md shadow-sm opacity-90 border border-surface-container-high/40">
            <div className="flex items-center justify-between">
              <span className="font-label-mono-sm text-label-mono-sm text-outline uppercase tracking-wider font-semibold">
                STAGE 03 // TARGET VECTOR
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-label-mono-sm text-[10px] text-secondary font-semibold">
                PLANNED HORIZON
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Cybersecurity Specialization &amp; SOC Operations
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Advancing toward blue team defense architectures: log telemetry
              parsing (SIEM/ELK), protocol vulnerability analysis, incident
              response protocols, Linux kernel security modules, and preparing
              for CCNA &amp; Security+ certifications.
            </p>
            <div className="mt-auto pt-space-xs flex items-center gap-space-xs text-on-surface-variant font-label-mono-sm text-label-mono-sm">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                verified_user
              </span>
              <span>Target: Defense Analyst • NetOps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
