import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Logo from "@/components/icons/Logo.svg";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTranslation } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <Paper
      elevation={3}
      sx={{
        px: 12,
        py: 6,
        backgroundColor: "rgba(21, 20, 20, 1)",
        borderRadius: "0px",
      }}
    >
      <Grid
        container
        spacing={2}
        borderBottom={1}
        borderColor="#585757ff"
        paddingBottom={5}
      >
        <Grid size={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <img src={Logo.src} alt="Logo" width="20px" height="20px" />
            <Typography variant="h6" fontWeight={600} color="white">
              Enlace
            </Typography>
          </Box>
        </Grid>
        <Grid size={3}>
          <Typography variant="subtitle1" fontWeight={600} color="white">
            {t("landing.footer.product")}
          </Typography>
        </Grid>
        <Grid size={3}>
          <Typography variant="subtitle1" fontWeight={600} color="white">
            {t("landing.footer.resources")}
          </Typography>
        </Grid>
        <Grid size={3}>
          <Typography variant="subtitle1" fontWeight={600} color="white">
            {t("landing.footer.legal")}
          </Typography>
        </Grid>
        <Grid size={3}>
          <Typography variant="body2" color="grey">
            {t("landing.footer.tagline")}
          </Typography>
        </Grid>
        <Grid size={3}>
          <Stack direction="column" spacing={1}>
            <Typography variant="subtitle2" fontWeight={500} color="#bbb9b9ff">
              {t("landing.footer.features")}
            </Typography>
            <Typography variant="subtitle2" fontWeight={500} color="#bbb9b9ff">
              {t("landing.footer.changelog")}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={3}>
          <Stack direction="column" spacing={1}>
            <Typography variant="subtitle2" fontWeight={500} color="#bbb9b9ff">
              {t("landing.footer.documentation")}
            </Typography>
            <Typography variant="subtitle2" fontWeight={500} color="#bbb9b9ff">
              {t("landing.footer.apiReference")}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={3}>
          <Stack direction="column" spacing={1}>
            <Typography variant="subtitle2" fontWeight={500} color="#bbb9b9ff">
              {t("landing.footer.privacyPolicy")}
            </Typography>
            <Typography variant="subtitle2" fontWeight={500} color="#bbb9b9ff">
              {t("landing.footer.termsOfService")}
            </Typography>
            <Typography variant="subtitle2" fontWeight={500} color="#bbb9b9ff">
              {t("landing.footer.cookiePolicy")}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={3}>
          <Stack direction="row" spacing={2}>
            <XIcon sx={{ color: "white" }} />
            <GitHubIcon sx={{ color: "white" }} />
          </Stack>
        </Grid>
      </Grid>
      <Typography mt={5} align="center" variant="body1" color="#585757ff">
        {t("landing.footer.copyright")}
      </Typography>
    </Paper>
  );
}
