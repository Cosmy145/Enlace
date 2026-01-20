import {
  Stack,
  Box,
  Typography,
  ButtonGroup,
  Button,
  Paper,
} from "@mui/material";
import React from "react";
import Logo from "@/components/icons/Logo.svg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ContactsIcon from "@mui/icons-material/Contacts";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePathname, useRouter } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname?.includes(path);

  const menuItems = [
    {
      id: "home",
      label: "Home",
      path: "/dashboard/home",
      icon: HomeRoundedIcon,
    },
    {
      id: "chat",
      label: "Chat",
      path: "/dashboard/chat",
      icon: ChatBubbleOutlineIcon,
    },
    {
      id: "contacts",
      label: "Contacts",
      path: "/dashboard/contacts",
      icon: ContactsIcon,
    },
    {
      id: "calendar",
      label: "Calendar",
      path: "/dashboard/calendar",
      icon: CalendarMonthRoundedIcon,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/dashboard/settings",
      icon: SettingsIcon,
    },
  ];

  return (
    <Paper elevation={5}>
      <Stack
        direction="column"
        alignItems="start"
        spacing={4}
        sx={{
          height: "100vh",
          width: "300px",
          backgroundColor: "#00012dff",
          px: 2,
          py: 2,
          borderRight: "0.5px solid #5e5e5eff",
        }}
      >
        <Stack direction="row" gap={1} alignItems="center" sx={{ pl: 1 }}>
          <Box
            width={30}
            height={30}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: "#3a1d5bff", borderRadius: "20%" }}
          >
            <img src={Logo.src} alt="Logo" width="20px" height="20px" />
          </Box>
          <Typography fontWeight={800}>Enlace</Typography>
        </Stack>
        <ButtonGroup
          orientation="vertical"
          variant="text"
          aria-label="Vertical button group"
          sx={{
            width: "100%",
            "& .MuiButtonGroup-grouped": {
              borderColor: "transparent",
              borderRadius: "8px !important",
            },
            "& .MuiButtonGroup-grouped:not(:last-of-type)": {
              borderRight: "none",
              borderBottom: "none",
            },
          }}
        >
          {menuItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;

            return (
              <Button
                key={item.id}
                variant="text"
                onClick={() => router.push(item.path)}
                sx={{
                  textTransform: "none",
                  justifyContent: "flex-start",
                  borderRadius: "8px",
                  py: 1.5,
                  borderLeft: "3px solid transparent",
                  color: active ? "white" : "grey",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                  ...(active && {
                    backgroundColor: "#3d2f5e",
                    transform: "translateX(4px)",
                    borderLeft: "3px solid #8b5cf6 !important",
                  }),
                  "&:hover": {
                    backgroundColor: "#3d2f5e",
                    transform: "translateY(-2px) translateX(4px)",
                    borderLeft: "3px solid #8b5cf6 !important",
                    color: "white",
                    "& .MuiSvgIcon-root": {
                      color: "#8b5cf6",
                    },
                  },
                }}
              >
                <Icon sx={{ mr: 1, color: active ? "#8b5cf6" : "inherit" }} />
                {item.label}
              </Button>
            );
          })}
        </ButtonGroup>
      </Stack>
    </Paper>
  );
}
