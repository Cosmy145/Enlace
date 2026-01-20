import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import MicIcon from "@mui/icons-material/Mic";
import LockIcon from "@mui/icons-material/Lock";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PolicyIcon from "@mui/icons-material/Policy";
import LanguageIcon from "@mui/icons-material/Language";
import SendIcon from "@mui/icons-material/Send";
import SpotlightCard from "@/components/common/SpotlightCard";
import { useTranslation } from "@/contexts/LanguageContext";

export default function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <MicIcon sx={{ fontSize: 40 }} />,
      titleKey: "landing.features.items.audio.title",
      descriptionKey: "landing.features.items.audio.description",
    },
    {
      icon: <LockIcon sx={{ fontSize: 40 }} />,
      titleKey: "landing.features.items.encryption.title",
      descriptionKey: "landing.features.items.encryption.description",
    },
    {
      icon: <ScreenShareIcon sx={{ fontSize: 40 }} />,
      titleKey: "landing.features.items.sharing.title",
      descriptionKey: "landing.features.items.sharing.description",
    },
    {
      icon: <PolicyIcon sx={{ fontSize: 40 }} />,
      titleKey: "landing.features.items.privacy.title",
      descriptionKey: "landing.features.items.privacy.description",
    },
    {
      icon: <LanguageIcon sx={{ fontSize: 40 }} />,
      titleKey: "landing.features.items.browser.title",
      descriptionKey: "landing.features.items.browser.description",
    },
    {
      icon: <SendIcon sx={{ fontSize: 40 }} />,
      titleKey: "landing.features.items.files.title",
      descriptionKey: "landing.features.items.files.description",
    },
  ];
  return (
    <Paper
      elevation={2}
      sx={{
        m: 5,
        py: 8,
        px: 13,
        background: "linear-gradient(135deg, #3a155f 0%, #000000 100%)",
        borderRadius: "20px",
      }}
    >
      <Stack spacing={6}>
        {/* Header */}
        <Stack spacing={2}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
              fontWeight: 700,
              color: "white",
              lineHeight: 1.2,
            }}
          >
            {t("landing.features.title")}
            <br />
            {t("landing.features.titleLine2")}
            <br />
            {t("landing.features.titleLine3")}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.9rem", md: "1rem" },
                color: "rgba(255, 255, 255, 0.6)",
                maxWidth: "550px",
              }}
            >
              {t("landing.features.subtitle")}
            </Typography>
          </Stack>
        </Stack>

        {/* Feature Cards */}
        <Grid container justifyContent="center" spacing={6} px={0}>
          {/* {features.map((feature, index) => ( */}
          {features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                maxWidth: { xs: "100%", sm: 500, md: 380 },
                width: "100%",
              }}
            >
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(72, 29, 140, 1)"
              >
                <CardContent
                  sx={{
                    p: 4,
                    height: "100%",
                    minHeight: { xs: "auto", md: 280 },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Stack spacing={2} justifyContent="center" alignItems="center">
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "12px",
                        background:
                          "linear-gradient(135deg, #8548beff 0%, #37061fff 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {feature.icon}
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.25rem",
                        fontWeight: 600,
                        color: "white",
                      }}
                    >
                      {t(feature.titleKey)}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.95rem",
                        color: "rgba(255, 255, 255, 0.6)",
                        lineHeight: 1.6,
                        textAlign: "center",
                      }}
                    >
                      {t(feature.descriptionKey)}
                    </Typography>
                  </Stack>
                </CardContent>
              </SpotlightCard>
            </Grid>
            // <Grid item xs={12} md={4} key={index}>
            //   <Card
            //     sx={{
            //       backgroundColor: "rgba(255, 255, 255, 0.05)",
            //       backdropFilter: "blur(10px)",
            //       border: "1px solid rgba(255, 255, 255, 0.1)",
            //       borderRadius: "16px",
            //       // height: "100%",
            //       // transition: "all 0.3s ease",
            //       // "&:hover": {
            //       //   backgroundColor: "rgba(255, 255, 255, 0.08)",
            //       //   transform: "translateY(-4px)",
            //       //   boxShadow: "0 8px 32px rgba(168, 85, 247, 0.2)",
            //       // },
            //     }}
            //   >
            //     <CardContent sx={{ p: 4 }}>
            //       <Stack spacing={2}>
            //         {/* Icon */}
            //         <Box
            //           sx={{
            //             width: 64,
            //             height: 64,
            //             borderRadius: "12px",
            //             background:
            //               "linear-gradient(135deg, #421070ff 0%, #37061fff 100%)",
            //             display: "flex",
            //             alignItems: "center",
            //             justifyContent: "center",
            //             color: "white",
            //           }}
            //         >
            //           {feature.icon}
            //         </Box>

            //         {/* Title */}
            //         <Typography
            //           variant="h6"
            //           sx={{
            //             fontSize: "1.25rem",
            //             fontWeight: 600,
            //             color: "white",
            //           }}
            //         >
            //           {feature.title}
            //         </Typography>

            //         {/* Description */}
            //         <Typography
            //           variant="body2"
            //           sx={{
            //             fontSize: "0.95rem",
            //             color: "rgba(255, 255, 255, 0.6)",
            //             lineHeight: 1.6,
            //           }}
            //         >
            //           {feature.description}
            //         </Typography>
            //       </Stack>
            //     </CardContent>
            //   </Card>
            // </Grid>
          ))}
        </Grid>

        {/* Mobile "View all features" button */}
        <Button
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: "#a855f7",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            display: { xs: "flex", md: "none" },
            alignSelf: "center",
            "&:hover": {
              backgroundColor: "rgba(168, 85, 247, 0.1)",
            },
          }}
        >
          {t("landing.features.viewAll")}
        </Button>
      </Stack>
    </Paper>
  );
}
