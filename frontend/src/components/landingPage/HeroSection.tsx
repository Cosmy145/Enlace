import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import Antigravity from "@/components/common/Antigravity";
import VideocamIcon from "@mui/icons-material/Videocam";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useTranslation } from "@/contexts/LanguageContext";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 80px)",
        overflow: "hidden",
        // background:
        // "linear-gradient(180deg, #8b2bee 0%, #2d1b69 40%, #1a0f3d 70%, #0a0118 100%)",
        // "linear-gradient(135deg, #8b2bee 0%, #2d1b69 50%, #1a0f3d 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Antigravity
          count={500}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.7}
          waveAmplitude={1}
          particleSize={1}
          lerpSpeed={0.05}
          color={"#FF9FFC"}
          autoAnimate={true}
          particleVariance={1}
        />
      </Box>

      <Stack
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 4,
          pointerEvents: "none",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.5rem" },
            fontWeight: 700,
            color: "white",
            mb: 2,
            lineHeight: 1.2,
            pointerEvents: "none",
          }}
        >
          {t("landing.hero.title").split(". ")[0]}.
          <br />
          <Box
            // component="span"
            sx={{
              background:
                "linear-gradient(90deg, #881beeff 0%, #e9dee3ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("landing.hero.title").split(". ")[1]}
          </Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "0.9rem", md: "1.1rem" },
            color: "rgba(255, 255, 255, 0.7)",
            mb: 4,
            fontWeight: 400,
            pointerEvents: "none",
            width: "100%",
          }}
        >
          {t("landing.hero.subtitle")}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ pointerEvents: "auto" }}
        >
          <Button
            variant="contained"
            href='/signup'
            size="large"
            startIcon={<VideocamIcon />}
            sx={{
              backgroundColor: "#8b3dff",
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "12px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#7a2eef",
              },
            }}
          >
            {t("landing.hero.getStarted")}
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<PlayCircleIcon />}
            sx={{
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "white",
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "12px",
              textTransform: "none",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.5)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {t("landing.hero.howItWorks")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
