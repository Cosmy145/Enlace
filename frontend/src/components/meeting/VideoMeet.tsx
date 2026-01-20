"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import { Button, Stack, Box } from "@mui/material";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import VideocamOffRoundedIcon from "@mui/icons-material/VideocamOffRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import MicOffRoundedIcon from "@mui/icons-material/MicOffRounded";
import { useUser } from "@/contexts/UserContext";
import { useParams } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

// export default function VideoMeet() {
//   var socketRef = useRef<Socket | null>(null);
//   let socketIdRef = useRef(null);

//   let localVideoRef = useRef<HTMLVideoElement | null>(null);
//   let localStreamRef = useRef<MediaStream | null>(null);

//   let [videoAvailable, setVideoAvailable] = useState(false);
//   let [audioAvailable, setAudioAvailable] = useState(false);

//   let [video, setVideo] = useState(false);
//   let [audio, setAudio] = useState(false);
//   let [screenShare, setScreenShare] = useState(false);

//   let [showModal, setShowModal] = useState(false);

//   let [messages, setMessages] = useState([]);

//   let [message, setMessage] = useState("");

//   let [newMessages, setNewMessages] = useState(0);

//   let [askForUsername, setAskForUsername] = useState(true);

//   let [username, setUsername] = useState("");

//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   let [videos, setVideos] = useState([]);

//   const getPermissions = async () => {
//     let hasVideo = false;
//     let hasAudio = false;

//     // Try to get video permission
//     try {
//       const videoPermission = await navigator.mediaDevices.getUserMedia({
//         video: true,
//       });
//       if (videoPermission) {
//         hasVideo = true;
//         setVideoAvailable(true);
//         console.log("Video permission granted");
//         // Stop the test stream since we'll request a combined one later
//         videoPermission.getTracks().forEach((track) => track.stop());
//       }
//     } catch (error) {
//       console.log("Video permission denied or not available:", error);
//       setVideoAvailable(false);
//     }

//     // Try to get audio permission
//     try {
//       const audioPermission = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//       });
//       if (audioPermission) {
//         hasAudio = true;
//         setAudioAvailable(true);
//         console.log("Audio permission granted");
//         // Stop the test stream since we'll request a combined one later
//         audioPermission.getTracks().forEach((track) => track.stop());
//       }
//     } catch (error) {
//       console.log("Audio permission denied or not available:", error);
//       setAudioAvailable(false);
//     }

//     // Log the actual permission values
//     console.log("Permissions - Video:", hasVideo, "Audio:", hasAudio);

//     // Now request the actual stream we'll use, based on what's available
//     if (hasVideo || hasAudio) {
//       try {
//         const userMediaStream = await navigator.mediaDevices.getUserMedia({
//           video: hasVideo,
//           audio: hasAudio,
//         });
//         console.log("User media stream:", userMediaStream);
//         localStreamRef.current = userMediaStream;

//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = userMediaStream;
//           console.log("Video stream assigned to video element");
//         }
//       } catch (error) {
//         console.error("Error getting user media stream:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     getPermissions();
//     console.log("Permissions granted");
//   }, []);

//   let connectToSocketServer = () => {
//     socketRef.current = io(API_BASE_URL, { secure: false });
//   };

//   let getMedia = () => {
//     setVideo(videoAvailable);
//     setAudio(audioAvailable);
//     connectToSocketServer();
//   };

//   let getUserMediaSuccess = (stream: MediaStream) => {};

//   let getUserMedia = () => {
//     if (video || (videoAvailable && audio) || audioAvailable) {
//       navigator.mediaDevices
//         .getUserMedia({
//           video: video || videoAvailable,
//           audio: audio || audioAvailable,
//         })
//         .then(getUserMediaSuccess)
//         .then((stream) => {})
//         .catch((error) => {
//           console.error("Error getting user media stream:", error);
//         });
//     } else {
//       try {
//         let tracks = localStreamRef.current?.getTracks();
//         tracks?.forEach((track) => {
//           track.stop();
//         });
//       } catch (error) {
//         console.error("Error getting user media stream:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (video !== undefined && audio !== undefined) {
//       getUserMedia();
//     }
//   }, [video, audio]);

//   useEffect(() => {
//     if (video && audio) {
//       getMedia();
//     }
//   }, [video, audio]);

//   return (
//     <>
//       <div style={{ padding: "20px" }}>
//         <h2>Video Meet</h2>

//         <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             style={{
//               width: "400px",
//               height: "300px",
//               backgroundColor: "#000",
//               borderRadius: "8px",
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

export default function VideoMeet({
  localVideoRef,
  audio,
  video,
  toggleAudio,
  toggleVideo,
  audioDevices,
  selectedAudioDevice,
  setSelectedAudioDevice,
  videoDevices,
  selectedVideoDevice,
  setSelectedVideoDevice,
  speakerDevices,
  selectedSpeakerDevice,
  setSelectedSpeakerDevice,
  audioLevel,
  localStreamRef,
  meetingNameRef,
  didIOfferRef,
  setIsHost,
}: {
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  localStreamRef: React.RefObject<MediaStream | null>;
  audio: boolean;
  video: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  audioDevices: MediaDeviceInfo[];
  selectedAudioDevice: string;
  setSelectedAudioDevice: (deviceId: string) => void;
  videoDevices: MediaDeviceInfo[];
  selectedVideoDevice: string;
  setSelectedVideoDevice: (deviceId: string) => void;
  speakerDevices: MediaDeviceInfo[];
  selectedSpeakerDevice: string;
  setSelectedSpeakerDevice: (deviceId: string) => void;
  audioLevel: number;
  meetingNameRef: React.RefObject<string>;
  didIOfferRef: React.MutableRefObject<boolean>;
  setIsHost: (isHost: boolean) => void;
}) {
  const { user } = useUser();
  const { meetingId } = useParams();
  const socketRef = useRef<Socket | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const [remoteUser, setRemoteUser] = useState<string>("");

  const peerConfiguration = {
    iceServers: [
      {
        urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
      },
    ],
  };

  const createPeerConnection = async (offerObj?: any) => {
    try {
      peerConnectionRef.current = new RTCPeerConnection(peerConfiguration);
      remoteStreamRef.current = new MediaStream();

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStreamRef.current;
      }

      localStreamRef.current?.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, localStreamRef.current!);
      });

      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current?.emit("sendIceCandidateToSignalingServer", {
            iceCandidate: event.candidate,
            iceUserName: user?.name,
            didIOffer: didIOfferRef.current,
            meetingId,
          });
        }
      };

      peerConnectionRef.current.ontrack = (event) => {
        console.log("Track received");
        // Directly use the remote stream from the event
        if (event.streams && event.streams[0]) {
          remoteStreamRef.current = event.streams[0];
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        }
      };

      if (offerObj) {
        // The offerObj received from backend MIGHT be the wrapper (with user info) OR just SDP
        // Use .offer if it exists, otherwise use the object itself
        await peerConnectionRef.current.setRemoteDescription(
          offerObj.offer || offerObj,
        );
      }

      console.log("Peer connection created");
    } catch (error) {
      console.error("Error creating peer connection:", error);
    }
  };

  const createOffer = async () => {
    try {
      await createPeerConnection();
      const offer = await peerConnectionRef.current?.createOffer();
      await peerConnectionRef.current?.setLocalDescription(offer);
      didIOfferRef.current = true;
      setIsHost(true); // We're the host/offerer
      socketRef.current?.emit("newOffer", { offer, meetingId });
      console.log("Offer created and sent");
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const answerOffer = async (offerObj: any) => {
    try {
      setRemoteUser(offerObj.offererUserName); // Set remote user name
      setIsHost(false); // We're the joiner/answerer
      await createPeerConnection(offerObj);
      const answer = await peerConnectionRef.current?.createAnswer({});
      await peerConnectionRef.current?.setLocalDescription(answer);

      offerObj.answer = answer; // Attach answer to offer object

      // Emit answer and get ICE candidates response
      const offerIceCandidates = await socketRef.current?.emitWithAck(
        "newAnswer",
        offerObj,
        meetingId,
      );

      if (offerIceCandidates && Array.isArray(offerIceCandidates)) {
        offerIceCandidates.forEach((c: any) => {
          peerConnectionRef.current?.addIceCandidate(c);
        });
      }
      console.log("Answer created and sent");
    } catch (error) {
      console.error("Error answering offer:", error);
    }
  };

  const addAnswer = async (offerObj: any) => {
    try {
      setRemoteUser(offerObj.answererUserName); // Set remote user name
      await peerConnectionRef.current?.setRemoteDescription(offerObj.answer);
      console.log("Remote Answer set");
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  const addNewIceCandidate = async (iceCandidate: any) => {
    try {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(iceCandidate);
        console.log("Added new ICE candidate");
      }
    } catch (error) {
      console.error("Error adding ice candidate:", error);
    }
  };

  const connectToSocketServer = async () => {
    // Only connect if not already connected
    if (!socketRef.current) {
      console.log("Connecting to socket server...");
      socketRef.current = io(API_BASE_URL, {
        secure: false,
        auth: {
          userName: user?.name,
          meetingId: meetingId,
        },
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current?.id);
      });

      // Listen for existing offers
      socketRef.current.on("newOfferAwaiting", (offerObj) => {
        console.log("Received new offer awaiting:", offerObj);
        answerOffer(offerObj);
      });

      // Listen for answer to our offer
      socketRef.current.on("answerResponse", (offerObj) => {
        console.log("Received answer response:", offerObj);
        addAnswer(offerObj);
      });

      // Listen for ICE candidates
      socketRef.current.on("receivedIceCandidateFromServer", (iceCandidate) => {
        addNewIceCandidate(iceCandidate);
      });

      // Check if we need to create an offer (if no offer received after short delay)
      // This is a simple heuristic: if we don't get an offer within 1s, we assume we are the host
      setTimeout(() => {
        if (!peerConnectionRef.current && socketRef.current?.connected) {
          console.log("No offer received, creating one...");
          createOffer();
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (meetingId && user) {
      connectToSocketServer();
    }

    // Ensure local video is attached (safeguard)
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }

    return () => {
      if (socketRef.current) {
        // socketRef.current.disconnect(); // Keep connection alive for now if navigating back/forth? Best to cleanup.
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }
    };
  }, [meetingId, user]);

  return (
    <>
      <Stack
        direction="row" // Changed to row for side-by-side
        spacing={2}
        sx={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: remoteUser ? "45%" : "65%",
            height: "auto",
            position: "relative",
            transition: "width 0.5s ease",
          }}
        >
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              objectFit: "cover",
              transform: "scaleX(-1) scale(1)",
              // padding: "100px",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: 10,
              color: "white",
              background: "rgba(0,0,0,0.5)",
              padding: "2px 5px",
              borderRadius: "4px",
            }}
          >
            {user?.name}
          </div>
        </Box>
        {remoteUser && (
          <Box sx={{ width: "45%", height: "auto", position: "relative" }}>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              // REMOVED MUTED
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                objectFit: "cover",
                transform: "scaleX(-1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 10,
                color: "white",
                background: "rgba(0,0,0,0.5)",
                padding: "2px 5px",
                borderRadius: "4px",
              }}
            >
              {remoteUser || "Remote"}
            </div>
          </Box>
        )}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <Button
            onClick={toggleVideo}
            sx={{
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
      </Stack>
    </>
  );
}
