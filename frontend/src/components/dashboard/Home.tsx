"use client";

import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Link,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useUser } from "@/contexts/UserContext";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Paper } from "@mui/material";
import KeyboardAltRoundedIcon from "@mui/icons-material/KeyboardAltRounded";
import { useRouter } from "next/navigation";
import { createMeeting } from "@/lib/api/meeting";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("");
  const [location, setLocation] = useState("Locating...");
  const [meetingIdInput, setMeetingIdInput] = useState("");

  const handleCreateMeeting = async () => {
    try {
      const meetingId = await createMeeting();
      if (meetingId) {
        router.push(`/meet/${meetingId}`);
      }
    } catch (error) {
      console.error("Failed to create meeting:", error);
    }
  };

  const handleJoinMeeting = () => {
    if (meetingIdInput.trim()) {
      router.push(`/meet/${meetingIdInput}`);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/v1/geocode/reverse?lat=${latitude}&lon=${longitude}`,
              {
                credentials: "include",
              },
            );
            const data = await response.json();
            const city =
              data.address.city || data.address.town || data.address.village;
            const state = data.address.state;
            const country = data.address.country;

            const parts = [city, state, country].filter(Boolean);
            if (parts.length > 0) {
              setLocation(parts.join(", "));
            } else {
              setLocation("Location Found");
            }
          } catch (err) {
            setLocation("Unknown Location");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocation("Permission Denied");
              break;
            case error.POSITION_UNAVAILABLE:
              setLocation("Location Unavailable");
              break;
            case error.TIMEOUT:
              setLocation("Location Timeout");
              break;
            default:
              setLocation("Location Error");
          }
        },
      );
    } else {
      setLocation("Not Supported");
    }
  }, []);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "short",
        day: "numeric",
      };
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      setFormattedDate(
        `${now.toLocaleDateString(
          "en-US",
          dateOptions,
        )} \u00A0 • \u00A0 ${now.toLocaleTimeString("en-US", timeOptions)}`,
      );
    };

    updateDate();
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
      <Box sx={{ px: "3rem", pt: "3rem", pb: "1rem", width: "100%" }}>
        <Typography
          variant="h4"
          sx={{
            background: "linear-gradient(to right, #fff, #8425bfff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            width: "fit-content",
            display: "inline-block",
          }}
        >
          Hello, {user?.name}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1, width: "100%" }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ color: "text.secondary" }}
          >
            <AccessTimeFilledIcon sx={{ color: "#9d4dcfff" }} />
            <Typography variant="body2">{formattedDate}</Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              px: 2,
              py: 0.75,
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <LocationOnIcon fontSize="small" sx={{ color: "#9d4dcfff" }} />
            <Typography variant="body2">{location}</Typography>
          </Box>
        </Stack>
      </Box>
      <Stack
        direction="column"
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "60%",
          height: "100%",
          padding: "3rem",
          paddingTop: "1rem",
          // backgroundColor: "brown",
        }}
      >
        <Stack
          direction="row"
          spacing={5}
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <Link
            // href="/preview"
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => {
              handleCreateMeeting();
            }}
          >
            <Paper elevation={4} sx={{ borderRadius: "20px" }}>
              <Stack
                direction="column"
                justifyContent="space-around"
                alignItems="flex-start"
                sx={{
                  bgcolor: "rgba(111, 31, 181, 1)",
                  px: 4,
                  py: 0.75,
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  width: "300px",
                  height: "300px",
                }}
                // gap={8}
              >
                <Stack
                  height="3rem"
                  width="3rem"
                  sx={{
                    direction: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#ffffff66",
                    borderRadius: "20%",
                    // border: "2px solid black"
                  }}
                >
                  <VideocamRoundedIcon />
                </Stack>
                <Stack gap={2}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Start New Meeting
                  </Typography>
                  <Typography variant="body2">
                    Create an instant meeting and invite others.
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Link>
          <Link
            sx={{
              textDecoration: "none",
              color: "inherit",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <Stack
              direction="column"
              justifyContent="space-around"
              alignItems="flex-start"
              sx={{
                bgcolor: "rgba(35, 29, 41, 1)",
                px: 4,
                py: 0.75,
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                width: "300px",
                height: "300px",
              }}
              // gap={8}
            >
              <Stack
                height="3rem"
                width="3rem"
                sx={{
                  direction: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#ffffff66",
                  borderRadius: "20%",
                  // border: "2px solid black"
                }}
              >
                <CalendarTodayRoundedIcon />
              </Stack>
              <Stack gap={2}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Schedule Meeting
                </Typography>
                <Typography variant="body2">
                  Plan ahead and send invites to calendar.
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Stack>
        {/* <TextField variant="outlined" label="Search" sx={{ width: "90%"}}></TextField> */}
        <TextField
          placeholder="Enter Meeting ID"
          variant="outlined"
          value={meetingIdInput}
          onChange={(e) => setMeetingIdInput(e.target.value)}
          sx={{
            width: "90%",
            m: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              bgcolor: "rgba(20, 20, 20, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              pr: 1,
              pl: 1,
              color: "white",
              "& fieldset": { border: "none" },
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": {
                border: "1px solid rgba(132, 37, 191, 0.5)",
              },
              height: "60px", // Make it slightly taller for premium feel
            },
            "& input::placeholder": {
              color: "rgba(255, 255, 255, 0.5)",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{
                  px: 1.5,
                  py: "20px !important",
                  backgroundColor: "rgba(67, 64, 64, 0.74)",
                  borderRadius: "10px",
                }}
              >
                <KeyboardAltRoundedIcon
                  sx={{ color: "text.secondary", fontSize: 28 }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleJoinMeeting}
                  sx={{
                    borderRadius: "15px",
                    textTransform: "none",
                    background:
                      "linear-gradient(to right, #9d4dcfff, #8425bfff)",
                    px: 3,
                    py: 1,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(132, 37, 191, 0.4)",
                    "&:hover": {
                      background:
                        "linear-gradient(to right, #8425bfff, #9d4dcfff)",
                      boxShadow: "0 6px 16px rgba(132, 37, 191, 0.6)",
                    },
                  }}
                >
                  Join Meeting
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}
