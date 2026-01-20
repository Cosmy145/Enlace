"use client";

import { createTheme } from "@mui/material/styles";
import { colors } from "@/styles/colors";

export const theme = createTheme({
  typography: {
    fontFamily: "var(--font-lato), sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      main: colors.brand,
      dark: colors.brandHover,
    },
    secondary: {
      main: colors.brandDark,
    },
  },
});
