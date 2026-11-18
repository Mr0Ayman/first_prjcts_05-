"use client";

import React from "react";
import { Header } from "@/components/Header";
import { StatusBanner } from "@/components/StatusBanner";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { ProjectsSection } from "@/components/ProjectsSection";
import { JourneySection } from "@/components/JourneySection";
import { TechStackSection } from "@/components/TechStackSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-background flex-1 relative flex flex-col">
        <StatusBanner />
        <Hero />
        <AboutSection />
        <SkillsMatrix />
        <ProjectsSection />
        <JourneySection />
        <TechStackSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

