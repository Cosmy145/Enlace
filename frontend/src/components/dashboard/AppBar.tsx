"use client";

import { ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import Logo from "@/components/icons/Logo.svg";
import { Paper } from "@mui/material";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Logout from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Divider from "@mui/material/Divider";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import { useState, MouseEvent, useEffect } from "react";
import Person from "@mui/icons-material/Person";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { logoutUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";

export interface UserData {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
}

export default function AppBar({ user, setUser }: { user: UserData | null, setUser: React.Dispatch<React.SetStateAction<UserData | null>> }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get user initials for fallback
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logoutUser();
      // Clear user state
      setUser(null);
      showSnackbar("Logged out successfully. See you soon!", "success");
      // Redirect to login page
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect even if API call fails
      router.push("/");
    } finally {
      setLoggingOut(false);
      handleClose();
    }
  };

  let pfp = user?.profileImage;

  return (
    
    <Paper elevation={5}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundColor: "#00012dff",
          px: 4,
          py: 1.5,
          // borderBottom: "1px solid #1a1a2e",
          height: "64px",
          color: "#d4d4d4ff",
          borderBottom: "0.5px solid #5e5e5eff",
        }}
      >
        <Typography fontWeight={800}>Dashboard</Typography>
        <Stack direction="row" gap={2} alignItems="center">
          <NotificationsRoundedIcon />
          <Divider orientation="vertical" flexItem sx={{ borderWidth: 1 }} />
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              // sx={{ ml: 0 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                src={pfp}
                sx={{ width: 42, height: 42, outline: "2px solid #8b5cf6" }}
              >
                {getUserInitials()}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,

                sx: {
                  px: 1,
                  borderRadius: 2,
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              disableRipple
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,

                "&:hover": {
                  backgroundColor: "transparent",
                  cursor: "default",
                },
              }}
            >
              <Avatar
                src={pfp}
                sx={{
                  width: "54px !important",
                  height: "54px !important",
                  fontSize: "1.5rem",
                }}
              >
                {getUserInitials()}
              </Avatar>
              <Stack direction="column" spacing={0.5}>
                <Typography variant="body1" fontWeight={600}>
                  {user?.name || "Hey Cosmy!"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize="0.875rem"
                >
                  {user?.email}
                </Typography>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  // backgroundColor: "transparent",
                  // cursor: "default",
                  borderLeft: "3px solid #8b5cf6",
                  transform: "translateY(-2px) translateX(4px)",
                  "& .MuiSvgIcon-root": {
                    color: "#8b5cf6",
                  },
                },
              }}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  // backgroundColor: "transparent",
                  // cursor: "default",
                  borderLeft: "3px solid #8b5cf6",
                  transform: "translateY(-2px) translateX(4px)",
                  "& .MuiSvgIcon-root": {
                    color: "#8b5cf6",
                  },
                },
              }}
            >
              <ListItemIcon>
                <ContactSupportOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Support
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              disabled={loggingOut}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  // backgroundColor: "transparent",
                  // cursor: "default",
                  borderLeft: "3px solid #8b5cf6",
                  transform: "translateY(-2px) translateX(4px)",
                  "& .MuiSvgIcon-root": {
                    color: "#8b5cf6",
                  },
                },
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              {loggingOut ? "Logging out..." : "Logout"}
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Paper>
  );
}
