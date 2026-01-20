import { RefObject, useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  LinearProgress,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import KeyboardVoiceRoundedIcon from "@mui/icons-material/KeyboardVoiceRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import VideocamOffRoundedIcon from "@mui/icons-material/VideocamOffRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

interface MeetingPreviewProps {
  localVideoRef: RefObject<HTMLVideoElement | null>;
  audioDevices: MediaDeviceInfo[];
  selectedAudioDevice: string;
  setSelectedAudioDevice: (deviceId: string) => void;
  videoDevices: MediaDeviceInfo[];
  selectedVideoDevice: string;
  setSelectedVideoDevice: (deviceId: string) => void;
  speakerDevices: MediaDeviceInfo[];
  selectedSpeakerDevice: string;
  setSelectedSpeakerDevice: (deviceId: string) => void;
  video: boolean;
  audio: boolean;
  audioLevel: number;
  toggleVideo: () => void;
  toggleAudio: () => void;
  meetingNameRef: React.RefObject<string>;
  setHasJoined: (hasJoined: boolean) => void;
  isHost: boolean | null;
}

export default function MeetingPreview({
  localVideoRef,
  audioDevices,
  selectedAudioDevice,
  setSelectedAudioDevice,
  videoDevices,
  selectedVideoDevice,
  setSelectedVideoDevice,
  speakerDevices,
  selectedSpeakerDevice,
  setSelectedSpeakerDevice,
  video,
  audio,
  audioLevel,
  toggleVideo,
  toggleAudio,
  meetingNameRef,
  setHasJoined,
  isHost,
}: MeetingPreviewProps) {
  const [error, setError] = useState(false);
  // console.log(isHost);

  const handleMeetingNameChange = (value: string) => {
    if (meetingNameRef.current !== undefined) {
      (meetingNameRef as React.MutableRefObject<string>).current = value;
    }
    if (value.trim()) {
      setError(false);
    }
  };

  const handleJoinMeeting = () => {
    const name = meetingNameRef.current;
    if (!name || !name.trim()) {
      setError(true);
      return;
    }
    setHasJoined(true);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        gap={5}
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Paper
          elevation={4}
          width="100%"
          height="100%"
          sx={{ borderRadius: "30px", overflow: "hidden" }}
        >
          <Stack
            direction="column"
            alignItems="flex-start"
            sx={{
              width: "400px",
              height: "500px",
              backgroundColor: "#110221ff",
              borderRadius: "30px",
              // border: "0.5px solid #7d7d7dff",
            }}
            padding="2rem"
            gap={3}
          >
            <Typography variant="h5" fontWeight={800}>
              <TuneRoundedIcon
                fontSize="medium"
                sx={{
                  color: "#a855f7",
                  marginRight: "0.5rem",
                  marginBottom: "0.2rem",
                }}
              />
              Device Settings
            </Typography>
            <Stack width="100%" gap={1}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <KeyboardVoiceRoundedIcon sx={{ color: "#a855f7" }} />
                <Typography variant="body2" fontWeight={500}>
                  Microphone
                </Typography>
              </Box>
              <FormControl fullWidth>
                <Select
                  value={selectedAudioDevice}
                  onChange={(e) => setSelectedAudioDevice(e.target.value)}
                  displayEmpty
                  size="medium"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a855f7",
                    },
                  }}
                >
                  {audioDevices.length === 0 ? (
                    <MenuItem value="">
                      <em>Permissions Required</em>
                    </MenuItem>
                  ) : (
                    audioDevices.map((device) => (
                      <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.label || <em>Permissions Required</em>}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              <Box sx={{ mt: 0.5 }}>
                <Typography
                  variant="caption"
                  color="rgba(255, 255, 255, 0.6)"
                  sx={{ mb: 0.5, display: "block" }}
                >
                  Input Level
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={audioLevel * 100}
                  sx={{
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#a855f7",
                      borderRadius: 2,
                    },
                  }}
                />
              </Box>
            </Stack>
            <Stack width="100%" gap={1}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <VolumeUpRoundedIcon sx={{ color: "#a855f7" }} />
                <Typography variant="body2" fontWeight={500}>
                  Speaker
                </Typography>
              </Box>
              <FormControl fullWidth>
                <Select
                  value={selectedSpeakerDevice}
                  onChange={(e) => setSelectedSpeakerDevice(e.target.value)}
                  displayEmpty
                  size="medium"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a855f7",
                    },
                  }}
                >
                  {speakerDevices.length === 0 ? (
                    <MenuItem value="">
                      <em>Permissions Required</em>
                    </MenuItem>
                  ) : (
                    speakerDevices.map((device) => (
                      <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.label || <em>Permissions Required</em>}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Stack>
            <Stack width="100%" gap={1}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <CameraAltRoundedIcon sx={{ color: "#a855f7" }} />
                <Typography variant="body2" fontWeight={500}>
                  Camera
                </Typography>
              </Box>
              <FormControl fullWidth>
                <Select
                  value={selectedVideoDevice}
                  onChange={(e) => setSelectedVideoDevice(e.target.value)}
                  displayEmpty
                  size="medium"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a855f7",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#a855f7",
                    },
                  }}
                >
                  {videoDevices.length === 0 ? (
                    <MenuItem value="">
                      <em>Permissions Required</em>
                    </MenuItem>
                  ) : (
                    videoDevices.map((device) => (
                      <MenuItem key={device.deviceId} value={device.deviceId}>
                        {device.label || <em>Permissions Required</em>}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Paper>
        <Stack
          maxWidth="700px"
          position="relative"
          // height="auto"
          sx={{
            borderRadius: "30px",
            overflow: "hidden",
            aspectRatio: "16/9",
            minHeight: "500px",
            backgroundColor: "#000",
          }}
        >
          {/* Camera Status Badge */}
          <Box
            sx={{
              position: "absolute",
              top: "16px",
              left: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 10,
            }}
          >
            <Box
              sx={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: video ? "#22c55e" : "#ef4444",
                boxShadow: video ? "0 0 8px #22c55e" : "0 0 8px #ef4444",
              }}
            />
            <Typography variant="caption" fontWeight={500} color="white">
              Camera {video ? "On" : "Off"}
            </Typography>
          </Box>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              backgroundColor: "#000",
              transform: "scaleX(-1)",
            }}
          ></video>
          <Button
            onClick={toggleVideo}
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "52%",
              backgroundColor: video
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(255, 0, 0, 0.2)",

              backdropFilter: "blur(10px)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              minWidth: "50px",
              border: "none",
              padding: 0,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                color: video ? "primary.main" : "error.main",
              },
              color: video ? "primary.main" : "error.main",
            }}
          >
            {video ? <VideocamRoundedIcon /> : <VideocamOffRoundedIcon />}
          </Button>
          <Button
            onClick={toggleAudio}
            sx={{
              position: "absolute",
              bottom: "10px",
              left: "52%",
              backgroundColor: audio
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(255, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              minWidth: "50px",
              border: "none",
              padding: 0,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
                color: audio ? "primary.main" : "error.main",
              },
              color: audio ? "primary.main" : "error.main",
            }}
          >
            {audio ? <MicRoundedIcon /> : <MicOffRoundedIcon />}
          </Button>
        </Stack>

        <Paper
          elevation={4}
          width="100%"
          height="100%"
          sx={{ borderRadius: "30px", overflow: "hidden" }}
        >
          <Stack
            direction="column"
            alignItems="flex-start"
            sx={{
              width: "400px",
              height: "auto",
              backgroundColor: "#110221ff",
              borderRadius: "30px",
              // border: "0.5px solid #7d7d7dff",
            }}
            padding="2rem"
            gap={5}
          >
            <Typography variant="h5" fontWeight={800}>
              <VideocamRoundedIcon
                fontSize="large"
                sx={{
                  color: "#a855f7",
                  marginRight: "0.5rem",
                  marginBottom: "0.2rem",
                }}
              />
              {isHost ? meetingNameRef.current : "Create Room"}
            </Typography>
            {!isHost && (
              <TextField
                label="Meeting Name"
                variant="outlined"
                fullWidth
                error={error}
                helperText={error ? "Meeting Name is required" : ""}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a855f7",
                  },
                }}
                defaultValue=""
                onChange={(e) => handleMeetingNameChange(e.target.value)}
              />
            )}
            <Button
              variant="contained"
              onClick={handleJoinMeeting}
              sx={{
                width: "100%",
                height: "50px",
                borderRadius: "8px",
                backgroundColor: "primary.main",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "primary.dark",
                  transform: "scale(1.02)",
                },
              }}
            >
              <RocketLaunchIcon fontSize="large" />
              Join Meeting
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}
