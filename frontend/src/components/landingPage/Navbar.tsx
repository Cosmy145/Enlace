"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Logo from "@/components/icons/Logo.svg";
import CompactNav from "./CompactNav";
import { useTranslation } from "@/contexts/LanguageContext";
import router from "next/router";

export default function Navbar({ bottom }: { bottom: boolean }) {
  const { t } = useTranslation();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsSticky(!entry.isIntersecting);
      });
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          p: 2,
          backgroundColor: "rgba(81, 81, 81, 0.3)", // Semi-transparent
          // backgroundColor: "transparent", // Semi-transparent
          // backdropFilter: "blur(10px)", // Glassmorphism blur
          // WebkitBackdropFilter: "blur(10px)", // Safari support
          color: "white",
          px: 3,
          borderRadius: "0px",
          border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left: Logo */}
          <Stack direction="row" gap={1} alignItems="center">
            <Box
              width={30}
              height={30}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: "#5a2d8f", borderRadius: "20%" }}
            >
              <img src={Logo.src} alt="Logo" width="20px" height="20px" />
            </Box>
            <Typography fontWeight={600}>Enlace</Typography>
          </Stack>

          {/* Center: Navigation buttons*/}
          <Stack direction="row" gap={2} ml={8}>
            <Button
              sx={{
                color: "#b8b8b8",
                textTransform: "none",
                fontSize: "14px",
                px: 2,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {t("landing.navbar.features")}
            </Button>
            <Button
              sx={{
                color: "#b8b8b8",
                textTransform: "none",
                fontSize: "14px",
                px: 2,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {t("landing.navbar.privacy")}
            </Button>
            <Button
              sx={{
                color: "#b8b8b8",
                textTransform: "none",
                fontSize: "14px",
                px: 2,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {t("landing.navbar.howItWorks")}
            </Button>
          </Stack>

          {/* Right: Login & Sign Up */}
          <Stack direction="row" gap={1} alignItems="center">
            <Link href="/login">
              <Button
                variant="text"
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {t("landing.navbar.login")}
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#8b3dff",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  px: 3,
                  "&:hover": {
                    backgroundColor: "#7a2eef",
                  },
                }}
              >
                {t("landing.navbar.signup")}
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>
      <div ref={sentinelRef} style={{ height: "1px" }} />
      <CompactNav visible={isSticky} bottom={bottom} />
    </>
  );
}
