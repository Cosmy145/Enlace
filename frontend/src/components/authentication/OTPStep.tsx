import React, { useState, useEffect } from "react";
import { OTPStepProps } from "@/types";
import {
  Stack,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import MarkEmailUnreadRoundedIcon from "@mui/icons-material/MarkEmailUnreadRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import OTPInput from "@/components/common/OTPInput";
import { useTranslation } from "@/contexts/LanguageContext";
import { verifyOtp, sendOtp } from "@/lib/api/otp";
import { loginUser } from "@/lib/api/user";
import { usePathname, useRouter } from "next/navigation";
import { useSnackbar } from "@/contexts/SnackbarContext";

// Helper function to mask email address for privacy
const maskEmail = (email: string): string => {
  if (!email) return "";

  const [username, domain] = email.split("@");
  if (!username || !domain) return email;

  // Show first character and mask the rest with asterisks
  const maskedUsername =
    username.charAt(0) + "****" + username.charAt(username.length - 1);
  return `${maskedUsername}@${domain}`;
};

export default function OTPStep({ formData, nextStep }: OTPStepProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const isLogin = pathname?.includes("/login");
  const [otp, setOtp] = useState(formData.otp);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResend = async () => {
    setLoading(true);
    setError(null);

    try {
      await sendOtp(formData.email);
      console.log("OTP resent to:", formData.email);

      // Reset timer
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login Request - backend creates session automatically
        await loginUser(formData.email, otp);
        showSnackbar("Login successful! Welcome back.", "success");
        router.push("/dashboard/home");
      } else {
        // Signup Verification Request
        const result = await verifyOtp(formData.email, otp);
        if (result.verified) {
          nextStep("otp", otp);
        } else {
          setError("Invalid OTP. Please try again.");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
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
        <MarkEmailUnreadRoundedIcon
          sx={{ fontSize: 40, color: "primary.main" }}
        />
      </Box>

      <Stack spacing={1} alignItems="center" textAlign="center">
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "1.75rem", sm: "2rem" },
          }}
        >
          {t("signup.otp.title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "0.95rem",
            maxWidth: "350px",
          }}
        >
          {t("signup.otp.subtitle")} {maskEmail(formData.email)}
        </Typography>
      </Stack>

      <Stack spacing={2.5} width="100%" maxWidth="400px">
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        <OTPInput length={6} value={otp} onChange={setOtp} />

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
          onClick={handleVerifyOTP}
          disabled={loading || otp.length !== 6}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            <>
              <Typography variant="body1" fontWeight={600} mr={1}>
                {t("signup.otp.button")}
              </Typography>
              <ArrowForwardRoundedIcon fontSize="small" />
            </>
          )}
        </Button>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          justifyContent="center"
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.9rem" }}
          >
            {t("signup.otp.didntReceive")}
          </Typography>
          <Button
            variant="text"
            disabled={!canResend}
            onClick={handleResend}
            sx={{
              textTransform: "none",
              color: canResend ? "primary.main" : "rgba(255, 255, 255, 0.4)",
              fontWeight: 600,
              fontSize: "0.9rem",
              minWidth: "auto",
              padding: "4px 8px",
              "&:hover": {
                backgroundColor: canResend
                  ? "rgba(139, 61, 255, 0.1)"
                  : "transparent",
              },
              "&.Mui-disabled": {
                color: "rgba(255, 255, 255, 0.4)",
              },
            }}
          >
            {canResend
              ? t("signup.otp.resend")
              : t("signup.otp.resendIn", { seconds: timer })}
          </Button>
        </Stack>
        {/* <Button
          variant="outlined"
          fullWidth
          sx={{
            height: "52px",
            borderRadius: "12px",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            borderColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "primary.main",
              backgroundColor: "rgba(139, 61, 255, 0.1)",
              transform: "translateY(-2px)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          }}
          onClick={() => prevStep()}
        >
          <ArrowBackRoundedIcon fontSize="small" />
          <Typography variant="body1" fontWeight={600} ml={1}>
            Back
          </Typography>
        </Button> */}
      </Stack>
    </Stack>
  );
}
