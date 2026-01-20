"use client";
import { useEffect, useRef, useState } from "react";
import MeetingPreview from "@/components/meeting/MeetingPreview";
import VideoMeet from "@/components/meeting/VideoMeet";

export default function VideoMeetPreview() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isMediaInitialized = useRef(false);

  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>("");
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>("");
  const [speakerDevices, setSpeakerDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedSpeakerDevice, setSelectedSpeakerDevice] =
    useState<string>("");
  const [video, setVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const meetingNameRef = useRef<string>("");
  const [hasJoined, setHasJoined] = useState(false);
  const [isHost, setIsHost] = useState<boolean | null>(false);
  const didIOfferRef = useRef(false);

  const getDevices = async (updateDefaults = false) => {
    try {
      // Enumerate devices first (will show without labels if no permission)
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("All devices:", devices);

      const audioInputs = devices.filter(
        (device) => device.kind === "audioinput",
      );
      const videoInputs = devices.filter(
        (device) => device.kind === "videoinput",
      );
      const speakerDevices = devices.filter(
        (device) => device.kind === "audiooutput",
      );

      console.log("Audio inputs:", audioInputs);
      console.log("Video inputs:", videoInputs);
      console.log("Speakers:", speakerDevices);

      setAudioDevices(audioInputs);
      setVideoDevices(videoInputs);
      setSpeakerDevices(speakerDevices);

      // Update to default device if requested or if no device is selected
      if (audioInputs.length > 0 && (updateDefaults || !selectedAudioDevice)) {
        const defaultDevice = audioInputs[0].deviceId;
        setSelectedAudioDevice(defaultDevice);
        console.log("Selected default audio device:", audioInputs[0]);
      }
      if (videoInputs.length > 0 && (updateDefaults || !selectedVideoDevice)) {
        const defaultDevice = videoInputs[0].deviceId;
        setSelectedVideoDevice(defaultDevice);
        console.log("Selected default video device:", videoInputs[0]);
      }
      if (
        speakerDevices.length > 0 &&
        (updateDefaults || !selectedSpeakerDevice)
      ) {
        const defaultDevice = speakerDevices[0].deviceId;
        setSelectedSpeakerDevice(defaultDevice);
        console.log("Selected default speaker device:", speakerDevices[0]);
      }
    } catch (error) {
      console.error("Error enumerating devices:", error);
    }
  };

  const getMedia = async () => {
    const tracks: MediaStreamTrack[] = [];

    // Try to get video independently
    if (selectedVideoDevice) {
      try {
        const videoConstraints = selectedVideoDevice
          ? { deviceId: { exact: selectedVideoDevice } }
          : true;
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
          audio: false,
        });

        // Only set video to true on initial setup
        if (videoStream && !isMediaInitialized.current) {
          setVideo(true);
        }
        tracks.push(...videoStream.getVideoTracks());
        console.log("Video access granted");

        // Re-enumerate devices to get labels after permission granted
        getDevices();
      } catch (error) {
        console.warn("Video permission denied or device unavailable:", error);
        // Re-enumerate even on error to update device list
        getDevices();
      }
    }

    // Try to get audio independently
    if (selectedAudioDevice) {
      try {
        const audioConstraints = selectedAudioDevice
          ? { deviceId: { exact: selectedAudioDevice } }
          : true;
        const audioStream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: audioConstraints,
        });

        // Only set audio to true on initial setup
        if (audioStream && !isMediaInitialized.current) {
          setAudio(true);
        }
        tracks.push(...audioStream.getAudioTracks());
        console.log("Audio access granted");

        // Re-enumerate devices to get labels after permission granted
        getDevices();
      } catch (error) {
        console.warn("Audio permission denied or device unavailable:", error);
        // Re-enumerate even on error to update device list
        getDevices();
      }
    }

    // Create a combined stream from the tracks we successfully got
    if (tracks.length > 0) {
      const combinedStream = new MediaStream(tracks);

      // Apply current toggle states to new tracks (important for device switching)
      const videoTracks = combinedStream.getVideoTracks();
      const audioTracks = combinedStream.getAudioTracks();

      // On initial setup, enable tracks by default. On device change, preserve state.
      const shouldEnableVideo = !isMediaInitialized.current ? true : video;
      const shouldEnableAudio = !isMediaInitialized.current ? true : audio;

      videoTracks.forEach((track) => {
        track.enabled = shouldEnableVideo;
      });

      audioTracks.forEach((track) => {
        track.enabled = shouldEnableAudio;
      });

      // Store the stream in a ref so it persists across component switches
      localStreamRef.current = combinedStream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = combinedStream;
      }

      // Setup audio level monitoring if we have audio tracks
      if (audioTracks.length > 0) {
        setupAudioMonitoring(combinedStream);
      }

      // Mark as initialized after first successful setup
      isMediaInitialized.current = true;
    } else {
      console.warn("No media tracks available");
    }
  };

  const setupAudioMonitoring = (stream: MediaStream) => {
    try {
      // Clean up previous audio context if exists
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }

      // Create new audio context and analyser
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      // Configure analyser for better accuracy
      analyser.fftSize = 512; // Larger FFT size for better resolution
      analyser.smoothingTimeConstant = 0.3; // Less smoothing for more responsive feedback
      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      // Use time-domain data for more accurate volume measurement
      const dataArray = new Uint8Array(analyser.fftSize);

      const updateLevel = () => {
        if (analyserRef.current) {
          // Get time-domain data (waveform)
          analyserRef.current.getByteTimeDomainData(dataArray);

          // Calculate RMS (Root Mean Square) for accurate volume
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            const normalized = (dataArray[i] - 128) / 128; // Normalize to -1 to 1
            sum += normalized * normalized;
          }
          const rms = Math.sqrt(sum / dataArray.length);

          // Apply some gain to make it more visible (adjust multiplier as needed)
          const normalizedLevel = Math.min(rms * 3, 1); // Multiply by 3 for better visibility

          setAudioLevel(normalizedLevel);
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        }
      };

      updateLevel();
      console.log("Audio monitoring setup complete");
    } catch (error) {
      console.error("Error setting up audio monitoring:", error);
    }
  };

  const toggleVideo = () => {
    console.log("toggleVideo called, current video state:", video);

    // If srcObject is missing but we have a stream in the ref, re-apply it
    if (
      localVideoRef.current &&
      !localVideoRef.current.srcObject &&
      localStreamRef.current
    ) {
      console.log("Re-applying stream to video element");
      localVideoRef.current.srcObject = localStreamRef.current;
    }

    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTracks = stream.getVideoTracks();
      console.log("Video tracks:", videoTracks);

      if (videoTracks.length > 0) {
        const currentTrackState = videoTracks[0].enabled;
        const newVideoState = !currentTrackState;
        console.log(
          `Current track enabled: ${currentTrackState}, setting to: ${newVideoState}`,
        );

        videoTracks.forEach((track) => {
          track.enabled = newVideoState;
        });
        setVideo(newVideoState);
        console.log(`Video ${newVideoState ? "enabled" : "disabled"}`);
      } else {
        console.log("No video tracks found");
      }
    } else {
      console.log("No video ref or srcObject");
    }
  };

  const toggleAudio = () => {
    console.log("toggleAudio called, current audio state:", audio);

    // If srcObject is missing but we have a stream in the ref, re-apply it
    if (
      localVideoRef.current &&
      !localVideoRef.current.srcObject &&
      localStreamRef.current
    ) {
      console.log("Re-applying stream to video element");
      localVideoRef.current.srcObject = localStreamRef.current;
    }

    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const audioTracks = stream.getAudioTracks();
      console.log("Audio tracks:", audioTracks);

      if (audioTracks.length > 0) {
        const currentTrackState = audioTracks[0].enabled;
        const newAudioState = !currentTrackState;
        console.log(
          `Current track enabled: ${currentTrackState}, setting to: ${newAudioState}`,
        );

        audioTracks.forEach((track) => {
          track.enabled = newAudioState;
        });
        setAudio(newAudioState);
        console.log(`Audio ${newAudioState ? "enabled" : "disabled"}`);
      } else {
        console.log("No audio tracks found");
      }
    } else {
      console.log("No audio ref or srcObject");
    }
  };

  useEffect(() => {
    const requestPermissionsAndInit = async () => {
      try {
        // Explicitly request video and audio permissions to unlock device labels
        // and ensure the browser prompts the user.
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Permissions granted! Stop this temporary stream.
        stream.getTracks().forEach((track) => track.stop());

        // Now enumerate devices (labels will be populated)
        getDevices(true);
      } catch (error) {
        console.error("Error requesting permissions or enumerating:", error);
        // Even if failed (e.g. denied), try to list devices anyway
        // because maybe they allowed one but not the other, or to show "Permission Denied" UI
        getDevices();
      }
    };

    if (navigator.mediaDevices) {
      requestPermissionsAndInit();
    } else {
      console.error(
        "navigator.mediaDevices is not supported or insecure context",
      );
      // Fallback
      getDevices();
    }

    // Listen for device changes (when devices are connected/disconnected)
    const handleDeviceChange = () => {
      console.log("Device change detected!");
      getDevices(true); // Update to new default devices
    };

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange,
      );
    };
  }, []);

  useEffect(() => {
    if (selectedAudioDevice || selectedVideoDevice || selectedSpeakerDevice) {
      getMedia();
    }
  }, [selectedAudioDevice, selectedVideoDevice, selectedSpeakerDevice]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Ensure stream is applied to video element when switching components
  useEffect(() => {
    if (localVideoRef.current && localStreamRef.current) {
      console.log("Applying stream to video element:", localStreamRef.current);
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [hasJoined]); // Re-apply when switching between preview and meeting

  return hasJoined ? (
    // <Stack
    //   sx={{
    //     height: "100vh",
    //     width: "100vw",
    //     backgroundColor: "#1d0343ff",
    //   }}
    // >
    <VideoMeet
      localVideoRef={localVideoRef}
      localStreamRef={localStreamRef}
      audioDevices={audioDevices}
      selectedAudioDevice={selectedAudioDevice}
      setSelectedAudioDevice={setSelectedAudioDevice}
      videoDevices={videoDevices}
      selectedVideoDevice={selectedVideoDevice}
      setSelectedVideoDevice={setSelectedVideoDevice}
      speakerDevices={speakerDevices}
      selectedSpeakerDevice={selectedSpeakerDevice}
      setSelectedSpeakerDevice={setSelectedSpeakerDevice}
      video={video}
      audio={audio}
      audioLevel={audioLevel}
      toggleVideo={toggleVideo}
      toggleAudio={toggleAudio}
      meetingNameRef={meetingNameRef}
      didIOfferRef={didIOfferRef}
      setIsHost={setIsHost}
    />
  ) : (
    // </Stack>
    <MeetingPreview
      localVideoRef={localVideoRef}
      audioDevices={audioDevices}
      selectedAudioDevice={selectedAudioDevice}
      setSelectedAudioDevice={setSelectedAudioDevice}
      videoDevices={videoDevices}
      selectedVideoDevice={selectedVideoDevice}
      setSelectedVideoDevice={setSelectedVideoDevice}
      speakerDevices={speakerDevices}
      selectedSpeakerDevice={selectedSpeakerDevice}
      setSelectedSpeakerDevice={setSelectedSpeakerDevice}
      video={video}
      audio={audio}
      audioLevel={audioLevel}
      toggleVideo={toggleVideo}
      toggleAudio={toggleAudio}
      meetingNameRef={meetingNameRef}
      setHasJoined={setHasJoined}
      isHost={isHost}
    />
  );
}
