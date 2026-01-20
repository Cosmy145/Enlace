"use client";

import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "@/contexts/LanguageContext";
import { languages } from "@/translations";

export default function LanguageSelector() {
  const { language, changeLanguage } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode as any);
    handleClose();
  };

  return (
    <>
      {/* Floating Language Button */}
      <IconButton
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          backgroundColor: "rgba(139, 61, 255, 0.9)",
          color: "white",
          boxShadow: "0 4px 20px rgba(139, 61, 255, 0.4)",
          zIndex: 1000,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(139, 61, 255, 1)",
            transform: "scale(1.1)",
            boxShadow: "0 6px 25px rgba(139, 61, 255, 0.6)",
          },
        }}
      >
        <LanguageIcon fontSize="medium" />
      </IconButton>

      {/* Language Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "rgba(21, 2, 63, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "12px",
            border: "1px solid rgba(139, 61, 255, 0.3)",
            boxShadow: "0 8px 32px rgba(139, 61, 255, 0.3)",
            mt: -1,
            minWidth: 180,
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={language === lang.code}
            sx={{
              color: "white",
              py: 1.5,
              px: 2,
              "&:hover": {
                backgroundColor: "rgba(139, 61, 255, 0.2)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(139, 61, 255, 0.3)",
                "&:hover": {
                  backgroundColor: "rgba(139, 61, 255, 0.4)",
                },
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              width="100%"
            >
              <Typography fontSize="1.5rem">{lang.flag}</Typography>
              <Typography
                flex={1}
                fontWeight={language === lang.code ? 600 : 400}
              >
                {lang.name}
              </Typography>
              {language === lang.code && (
                <CheckIcon fontSize="small" sx={{ color: "#8b3dff" }} />
              )}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
