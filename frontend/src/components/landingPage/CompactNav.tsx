import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "@/components/icons/Logo.svg";
import { useTranslation } from "@/contexts/LanguageContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export default function CompactNav({
  visible,
  bottom,
}: {
  visible: boolean;
  bottom: boolean;
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box
      display="flex"
      position="fixed"
      top={0}
      width="100%"
      alignItems="center"
      justifyContent="center"
      py={{ xs: 2, sm: 3, md: 4 }}
      px={{ xs: 2, sm: 3, md: 0 }}
      zIndex={1000}
      sx={{
        pointerEvents: "none", // Allow scroll events to pass through
        transform: visible
          ? // ? "translateX(0) translateY(0)"
            //   : "translateX(0) translateY(-150%)",
            // transition: "all 0.3s ease",
            bottom
            ? "translateY(calc(100vh - 100%))" // Move to bottom of viewport
            : "translateY(0)" // Stay at top
          : "translateY(-150%)", // Hide above viewport
        transition: "all 0.5s ease",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: {
            xs: "100%",
            sm: "95%",
            md: "85%",
            lg: "70%",
            xl: "50%",
          },
          p: { xs: 1.5, sm: 2 },
          backgroundColor: "transparent",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          color: "white",
          px: { xs: 2, sm: 3 },
          borderRadius: { xs: "15px", sm: "20px" },
          border: "1px solid rgba(255, 255, 255, 0.1)",
          pointerEvents: "none",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left: Logo */}
          <Stack
            direction="row"
            gap={{ xs: 0.5, sm: 1 }}
            alignItems="center"
            sx={{ pointerEvents: "auto" }}
          >
            <Box
              width={{ xs: 25, sm: 30 }}
              height={{ xs: 25, sm: 30 }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ backgroundColor: "#5a2d8f", borderRadius: "20%" }}
            >
              <img
                src={Logo.src}
                alt="Logo"
                width={isMobile ? "16px" : "20px"}
                height={isMobile ? "16px" : "20px"}
              />
            </Box>
            <Typography
              fontWeight={600}
              sx={{ fontSize: { xs: "14px", sm: "16px" } }}
            >
              Enlace
            </Typography>
          </Stack>

          {/* Center: Navigation buttons - Hidden on mobile */}
          {!isMobile && (
            <Stack
              direction="row"
              gap={{ md: 1, lg: 2 }}
              sx={{ ml: { md: 4, lg: 7 }, pointerEvents: "auto" }}
            >
              <Button
                sx={{
                  color: "#b8b8b8",
                  textTransform: "none",
                  fontSize: { md: "13px", lg: "14px" },
                  px: { md: 1.5, lg: 2 },
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
                  fontSize: { md: "13px", lg: "14px" },
                  px: { md: 1.5, lg: 2 },
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
                  fontSize: { md: "13px", lg: "14px" },
                  px: { md: 1.5, lg: 2 },
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {t("landing.navbar.howItWorks")}
              </Button>
            </Stack>
          )}

          {/* Right: Login & Sign Up or Mobile Menu */}
          <Stack
            direction="row"
            gap={{ xs: 0.5, sm: 1 }}
            alignItems="center"
            sx={{ pointerEvents: "auto" }}
          >
            {isMobile ? (
              // Mobile: Show menu icon
              <IconButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            ) : (
              // Desktop/Tablet: Show login and signup buttons
              <>
                <Button
                  variant="text"
                  href="/login"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: { sm: "13px", md: "14px" },
                    fontWeight: "600",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {t("landing.navbar.login")}
                </Button>
                <Button
                  variant="contained"
                  href="/signup"
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#8b3dff",
                    textTransform: "none",
                    fontSize: { sm: "13px", md: "14px" },
                    fontWeight: "600",
                    px: { sm: 2, md: 3 },
                    "&:hover": {
                      backgroundColor: "#7a2eef",
                    },
                  }}
                >
                  {t("landing.navbar.signup")}
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Paper>

      {/* Mobile Menu Dropdown */}
      {isMobile && mobileMenuOpen && (
        <Paper
          elevation={0}
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            width: {
              xs: "calc(100% - 32px)",
              sm: "95%",
            },
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: "white",
            borderRadius: "15px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            pointerEvents: "auto",
            animation: "slideDown 0.3s ease",
            "@keyframes slideDown": {
              from: {
                opacity: 0,
                transform: "translateY(-10px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <Stack spacing={1} p={2}>
            {/* Navigation Links */}
            <Button
              fullWidth
              sx={{
                color: "#b8b8b8",
                textTransform: "none",
                fontSize: "14px",
                justifyContent: "flex-start",
                px: 2,
                py: 1.5,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("landing.navbar.features")}
            </Button>
            <Button
              fullWidth
              sx={{
                color: "#b8b8b8",
                textTransform: "none",
                fontSize: "14px",
                justifyContent: "flex-start",
                px: 2,
                py: 1.5,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("landing.navbar.privacy")}
            </Button>
            <Button
              fullWidth
              sx={{
                color: "#b8b8b8",
                textTransform: "none",
                fontSize: "14px",
                justifyContent: "flex-start",
                px: 2,
                py: 1.5,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("landing.navbar.howItWorks")}
            </Button>

            {/* Divider */}
            <Box
              sx={{
                height: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                my: 1,
              }}
            />

            {/* Auth Buttons */}
            <Button
              fullWidth
              variant="text"
              href="/login"
              sx={{
                color: "white",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "600",
                justifyContent: "flex-start",
                px: 2,
                py: 1.5,
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {t("landing.navbar.login")}
            </Button>
            <Button
              fullWidth
              variant="contained"
              href="/signup"
              sx={{
                borderRadius: "10px",
                backgroundColor: "#8b3dff",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "600",
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#7a2eef",
                },
              }}
            >
              {t("landing.navbar.signup")}
            </Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
