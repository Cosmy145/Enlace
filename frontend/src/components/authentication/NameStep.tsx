import React, { useState } from "react";
import { NameStepProps } from "@/types";
import { Stack, Box, Typography, TextField, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useTranslation } from "@/contexts/LanguageContext";

export default function NameStep({ formData, nextStep }: NameStepProps) {
  const { t } = useTranslation();
  const [name, setName] = useState(formData.name);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      spacing={4}
      alignItems="center"
      width="100%"
      height="80%"
      px={2}
    >
      {/* Icon */}
      <Box
        sx={{
          p: 2.5,
          backgroundColor: "rgba(139, 61, 255, 0.1)",
          borderRadius: "50%",
          border: "2px solid rgba(139, 61, 255, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            borderColor: "rgba(139, 61, 255, 0.5)",
            backgroundColor: "rgba(139, 61, 255, 0.15)",
          },
        }}
      >
        <PersonIcon sx={{ fontSize: 40, color: "primary.main" }} />
      </Box>

      {/* Title & Subtitle */}
      <Stack spacing={1} alignItems="center" textAlign="center">
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "1.75rem", sm: "2rem" },
          }}
        >
          {t("signup.name.title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "0.95rem",
            maxWidth: "380px",
            lineHeight: 1.6,
          }}
        >
          {t("signup.name.subtitle")}
          <br />
          {t("signup.name.subtitleExtra")}
        </Typography>
      </Stack>

      {/* Form */}
      <Stack spacing={2.5} width="100%" maxWidth="400px">
        <TextField
          variant="outlined"
          label={t("signup.name.label")}
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("signup.name.placeholder")}
          slotProps={{
            input: {
              endAdornment: (
                <EditRoundedIcon
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "1.2rem",
                  }}
                />
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "white",
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              transition: "all 0.3s ease",
              "& fieldset": {
                borderColor: "rgba(139, 61, 255, 0.3)",
                borderWidth: "1.5px",
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                "& fieldset": {
                  borderColor: "rgba(139, 61, 255, 0.5)",
                },
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                "& fieldset": {
                  borderColor: "primary.main",
                  borderWidth: "2px",
                },
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.6)",
              "&.Mui-focused": {
                color: "primary.main",
              },
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "rgba(255, 255, 255, 0.4)",
              opacity: 1,
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            height: "52px",
            borderRadius: "12px",
            backgroundColor: "primary.secondary",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            boxShadow: "0 4px 14px rgba(127, 19, 236, 0.4)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "primary.main",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(127, 19, 236, 0.6)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
          onClick={() => nextStep("name", name)}
        >
          <Typography variant="body1" fontWeight={600} mr={1}>
            {t("signup.name.button")}
          </Typography>
          <ArrowForwardRoundedIcon fontSize="small" />
        </Button>
      </Stack>
    </Stack>
  );
}
