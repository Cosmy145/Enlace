import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { EmailStepProps } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";
import { sendOtp, checkEmail } from "@/lib/api/otp";
import { usePathname } from "next/navigation";

export default function EmailStep({ formData, nextStep }: EmailStepProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const isSignup = pathname?.includes("/signup");
  const [email, setEmail] = useState(formData.email);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOTP = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // For login route, first check if user exists
      const emailCheck = await checkEmail(email);
      if (!isSignup) {
        if (!emailCheck.exists) {
          setError("No account found with this email. Please sign up first.");
          setLoading(false);
          return;
        }
      }
      if (isSignup) {
        if (emailCheck.exists) {
          setError("Account already exists with this email. Please log in.");
          setLoading(false);
          return;
        }
      }
      // Send OTP
      await sendOtp(email);
      // OTP sent successfully, proceed to next step
      nextStep("email", email);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
        <EmailIcon sx={{ fontSize: 40, color: "primary.main" }} />
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
          {isSignup ? "Sign Up" : "Log In"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "0.95rem",
            maxWidth: "350px",
          }}
        >
          {isSignup
            ? t("signup.email.subtitle")
            : "Welcome back! Please enter your email."}
        </Typography>
      </Stack>

      {/* Form */}
      <Stack spacing={2.5} width="100%" maxWidth="400px">
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        <TextField
          variant="outlined"
          label={t("signup.email.label")}
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("signup.email.placeholder")}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ ml: 0.5 }}>
                  <EmailIcon sx={{ color: "rgba(255, 255, 255, 0.5)" }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            // Chrome, Safari, Edge
            "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active":
              {
                WebkitBoxShadow:
                  "0 0 0 30px rgba(255, 255, 255, 0.05) inset !important",
                WebkitTextFillColor: "white !important",
                transition: "background-color 5000s ease-in-out 0s",
              },
            // Firefox
            "& input:-moz-autofill, & input:-moz-autofill-preview": {
              filter: "none",
            },
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
          onClick={handleSendOTP}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            <>
              <Typography variant="body1" fontWeight={600} mr={1}>
                {t("signup.email.button")}
              </Typography>
              <ArrowForwardRoundedIcon fontSize="small" />
            </>
          )}
        </Button>
        {!isSignup && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
              New here?
            </Typography>
            <Button
              variant="text"
              sx={{ textTransform: "none", color: "primary.main" }}
              href="/signup"
            >
              Create an account
            </Button>
          </Stack>
        )}
        {isSignup && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body2" color="rgba(255, 255, 255, 0.6)">
              Already have an account?
            </Typography>
            <Button
              variant="text"
              sx={{ textTransform: "none", color: "primary.main" }}
              href="/login"
            >
              Log In
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
