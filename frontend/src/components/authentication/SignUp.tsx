"use client";
import React, { useState } from "react";
import EmailStep from "./EmailStep";
import { Paper, Stack, Typography, Box } from "@mui/material";
import Logo from "@/components/icons/Logo.svg";
import ProgressBar from "../common/ProgressBar";
import { SignUpData } from "@/types";
import OTPStep from "./OTPStep";
import NameStep from "./NameStep";
import PfpStep from "./PfpStep";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Content() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<SignUpData>({
    step: 1,
    email: "",
    otp: "",
    name: "",
    profileImage: null as File | null,
  });

  const nextStep = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value, step: prev.step + 1 }));
  };
  const prevStep = () => {
    setFormData((prev) => ({ ...prev, step: prev.step - 1 }));
  };

  return (
    <Paper
      elevation={24}
      sx={{
        width: { xs: "95%", sm: "500px" },
        minHeight: "65vh",
        borderRadius: "20px",
        backgroundColor: "rgba(21, 2, 63, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(139, 61, 255, 0.2)",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(139, 61, 255, 0.3)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #8b3dff, transparent)",
        },
      }}
    >
      <Stack
        direction="column"
        spacing={5}
        alignItems="center"
        pt={3}
        pb={4}
        px={3}
        height="100%"
      >
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          sx={{ width: "100%", mb: 3 }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#5a2d8f",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(139, 61, 255, 0.4)",
            }}
          >
            <img src={Logo.src} alt="Enlace Logo" width="30px" height="30px" />
          </Box>

          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            px={2}
          >
            <Typography
              variant="body1"
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {t("signup.title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "0.95rem",
              }}
            >
              {t("signup.step", { current: formData.step, total: 4 })}
            </Typography>
          </Stack>

          <Box sx={{ width: "100%", px: 2 }}>
            <ProgressBar value={formData.step * 25} />
          </Box>
        </Stack>

        {/* <PfpStep formData={formData} nextStep={nextStep} prevStep={prevStep} /> */}

        {[EmailStep, OTPStep, NameStep, PfpStep].map((StepComponent, index) => {
          const stepNumber = index + 1;
          return (
            formData.step === stepNumber && (
              <StepComponent
                key={stepNumber}
                formData={formData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )
          );
        })}
      </Stack>
    </Paper>
  );
}
