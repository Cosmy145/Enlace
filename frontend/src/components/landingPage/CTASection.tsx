import {
  Box,
  Button,
  InputAdornment,
  inputBaseClasses,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useTranslation } from "@/contexts/LanguageContext";

export default function CTASection() {
  const { t } = useTranslation();
  return (
    <Paper
      elevation={7}
      sx={{
        mx: { xs: 3, md: 10, lg: 30 },
        my: { xs: 8, md: 15 },
        py: { xs: 6, md: 12 },
        px: { xs: 3, md: 8 },
        background: "linear-gradient(135deg, #3a155f 0%, #1a0a2e 100%)",
        // border: "0.2px solid black",
        borderRadius: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stack
        spacing={4}
        alignItems="center"
        sx={{ position: "relative", zIndex: 1 }}
      >
        {/* Heading */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1.75rem", md: "2.5rem", lg: "3rem" },
            fontWeight: 700,
            color: "white",
            textAlign: "center",
          }}
        >
          {t("landing.cta.title")}
          <br />
          {t("landing.cta.titleLine2")}
        </Typography>

        {/* Subheading */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "0.95rem", md: "1.1rem" },
            color: "rgba(255, 255, 255, 0.7)",
            textAlign: "center",
          }}
        >
          {t("landing.cta.subtitle")}
        </Typography>

        {/* Email Form */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "550px",
            mt: 2,
          }}
        >
          <form>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={4}
              justifyContent="center"
            >
              <TextField
                variant="outlined"
                label={t("landing.cta.emailLabel")}
                type="email"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#b4b4b4ff",
                    borderRadius: "10px",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#b4b4b4ff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#b4b4b4ff",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255, 255, 255, 0.7)",
                    "&.Mui-focused": {
                      color: "#b4b4b4ff",
                    },
                  },
                }}
                // required
              />
              <Button
                variant="contained"
                sx={{
                  width: { xs: "100%", sm: "200px" },
                  borderRadius: "10px",
                  backgroundColor: "#7a2eef",
                }}
              >
                <Typography
                  variant="body2"
                  textTransform="none"
                  fontWeight={600}
                >
                  {t("landing.cta.button")}
                </Typography>
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Paper>
  );
}
