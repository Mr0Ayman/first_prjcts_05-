"use client";

import React, { useState } from "react";

type Category = "all" | "net" | "sys" | "sec";

export interface Project {
  id: string;
  category: "net" | "sys" | "sec";
  code: string;
  title: string;
  icon: string;
  accentColor: "primary" | "tertiary" | "secondary";
  description: string;
  learned: string;
  badges: Array<{ name: string; color?: "primary" | "secondary" | "tertiary" }>;
  primaryActionLabel: string;
  primaryActionUrl: string;
  githubUrl: string;
}

// Staging array: leave empty for future projects as requested
const projects: Project[] = [];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      className="w-full bg-surface-container-lowest py-space-xl lg:py-24 border-y border-surface-container-low/40"
      id="projects"
    >
      <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin-desktop flex flex-col gap-space-xl">
        {/* Projects Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs max-w-xl">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider">
                03 // LAB_IMPLEMENTATIONS
              </span>
              <span className="h-px w-12 bg-primary/40"></span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Featured Technical Projects
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Documented lab builds, low-level implementations, and
              architecture topologies with reproducible configurations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1.5 rounded-lg border border-surface-container-high/40">
            <button
              onClick={() => setActiveFilter("all")}
              className={`filter-btn px-space-md py-1 rounded font-label-mono-sm text-label-mono-sm uppercase transition-colors ${
                activeFilter === "all"
                  ? "bg-primary text-on-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter("net")}
              className={`filter-btn px-space-md py-1 rounded font-label-mono-sm text-label-mono-sm uppercase transition-colors ${
                activeFilter === "net"
                  ? "bg-primary text-on-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Networking
            </button>
            <button
              onClick={() => setActiveFilter("sys")}
              className={`filter-btn px-space-md py-1 rounded font-label-mono-sm text-label-mono-sm uppercase transition-colors ${
                activeFilter === "sys"
                  ? "bg-primary text-on-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Systems &amp; Linux
            </button>
            <button
              onClick={() => setActiveFilter("sec")}
              className={`filter-btn px-space-md py-1 rounded font-label-mono-sm text-label-mono-sm uppercase transition-colors ${
                activeFilter === "sec"
                  ? "bg-primary text-on-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Code &amp; Security
            </button>
          </div>
        </div>

        {/* Projects Grid or Future Slot Placeholder */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-lg">
            {filteredProjects.map((project) => {
              const iconBg =
                project.accentColor === "primary"
                  ? "bg-primary/10 text-primary"
                  : project.accentColor === "tertiary"
                  ? "bg-tertiary/10 text-tertiary"
                  : "bg-secondary/10 text-secondary";

              const titleHover =
                project.accentColor === "primary"
                  ? "group-hover:text-primary"
                  : project.accentColor === "tertiary"
                  ? "group-hover:text-tertiary"
                  : "group-hover:text-secondary";

              return (
                <div
                  key={project.id}
                  className="project-card flex flex-col bg-surface-container rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-all border border-surface-container-high/40"
                >
                  <div className="p-space-lg flex flex-col gap-space-md flex-1">
                    <div className="flex items-start justify-between gap-space-sm">
                      <div className="flex flex-col gap-1">
                        <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider">
                          {project.code}
                        </span>
                        <h3
                          className={`font-headline-md text-headline-md text-on-surface font-semibold transition-colors ${titleHover}`}
                        >
                          {project.title}
                        </h3>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[28px] p-2 rounded-lg ${iconBg}`}
                      >
                        {project.icon}
                      </span>
                    </div>

                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {project.description}
                    </p>

                    {/* Key Insight Callout Box */}
                    <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-1 border border-surface-container-high/30">
                      <span className="font-label-mono-sm text-[10px] text-tertiary uppercase font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          insights
                        </span>{" "}
                        What I Learned &amp; Debugged:
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface">
                        {project.learned}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-space-xs">
                      {project.badges.map((badge, idx) => {
                        const textColor =
                          badge.color === "primary"
                            ? "text-primary"
                            : badge.color === "tertiary"
                            ? "text-tertiary"
                            : badge.color === "secondary"
                            ? "text-secondary"
                            : "text-on-surface-variant";

                        return (
                          <span
                            key={idx}
                            className={`px-2 py-0.5 rounded bg-surface-container-high font-label-mono-sm text-label-mono-sm ${textColor}`}
                          >
                            {badge.name}
                          </span>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-space-md pt-space-sm mt-auto border-t border-surface-container-high/30">
                      <a
                        href={project.primaryActionUrl}
                        className="font-label-mono-sm text-label-mono-sm text-primary hover:text-primary-fixed uppercase tracking-wider font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>{project.primaryActionLabel}</span>
                        <span className="material-symbols-outlined text-[16px]">
                          open_in_new
                        </span>
                      </a>
                      <span className="text-outline-variant">•</span>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-label-mono-sm text-label-mono-sm text-on-surface-variant hover:text-on-surface uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          code
                        </span>
                        <span>GitHub Repo</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full bg-surface-container-low/60 rounded-xl p-space-lg lg:p-space-xl border border-dashed border-surface-container-high/70 flex flex-col items-center justify-center text-center gap-space-md py-16">
            <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center border border-surface-container-high/60 shadow-sm">
              <span className="material-symbols-outlined text-primary text-[28px]">
                terminal
              </span>
            </div>
            <div className="flex flex-col gap-1 max-w-lg">
              <span className="font-label-mono-sm text-label-mono-sm text-primary uppercase tracking-wider font-semibold">
                SYSTEM_STATUS // LAB_REPOSITORIES_STAGING
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                Projects Under Active Development
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Laboratory topologies, systems programming implementations, and
                network defense writeups will be published here as documentation
                and testing are completed.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-space-xs">
              <span className="px-3 py-1 rounded bg-surface-container font-label-mono-sm text-label-mono-sm text-outline border border-surface-container-high/40">
                SLOT_01: NETWORKING_TOPOLOGIES [STAGED]
              </span>
              <span className="px-3 py-1 rounded bg-surface-container font-label-mono-sm text-label-mono-sm text-outline border border-surface-container-high/40">
                SLOT_02: LINUX_SYSTEMS_LABS [STAGED]
              </span>
              <span className="px-3 py-1 rounded bg-surface-container font-label-mono-sm text-label-mono-sm text-outline border border-surface-container-high/40">
                SLOT_03: C_SYSTEMS_CODE [STAGED]
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
