"use client";
import { useEffect, useRef, useState } from "react";

import CTASection from "./CTASection";
import Footer from "./Footer";
import { Container } from "@mui/material";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import LanguageSelector from "@/components/common/LanguageSelector";

export default function LandingPage() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setBottom(!entry.isIntersecting);
      });
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Navbar bottom={bottom} />
      <HeroSection />
      <div ref={sentinelRef} style={{ height: "1px" }} />
      <FeaturesSection />
      <CTASection />
      <Footer />
      <LanguageSelector />
    </Container>
  );
}
