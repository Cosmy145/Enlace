import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { PfpStepProps } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";
import { registerUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/contexts/SnackbarContext";

export default function PfpStep({
  formData,
  nextStep,
  prevStep,
}: PfpStepProps) {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();
  const [selectedImage, setSelectedImage] = useState<File | null>(
    formData.profileImage
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [webcamOpen, setWebcamOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  // Create preview URL when image is selected
  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);

      // Cleanup function to revoke the object URL
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedImage]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        setSelectedImage(file);
      } else {
        alert("Please select a valid image file");
      }
      // Validate file type (any image format)
      // if (file.type.startsWith("image/")) {
      //   setSelectedImage(file);
      // } else {
      //   alert("Please select a valid image file");
      // }
    }
  };

  const handleChooseFromComputer = () => {
    fileInputRef.current?.click();
  };

  const handleOpenWebcam = () => {
    setWebcamOpen(true);
  };

  const handleCloseWebcam = () => {
    setWebcamOpen(false);
  };

  const handleCapturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convert base64 to File object
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          // -> Use this for faster conversion
          // // Split the data URL to get the base64 part
          // const base64Data = imageSrc.split(",")[1];

          // // Decode base64 to binary string
          // const binaryString = atob(base64Data);

          // // Convert binary string to byte array
          // const bytes = new Uint8Array(binaryString.length);
          // for (let i = 0; i < binaryString.length; i++) {
          //   bytes[i] = binaryString.charCodeAt(i);
          // }

          // // Create Blob from byte array
          // const blob = new Blob([bytes], { type: "image/jpeg" });

          // Create File from Blob
          const file = new File([blob], "webcam-photo.jpg", {
            type: "image/jpeg",
          });

          setSelectedImage(file);
          setWebcamOpen(false);
        });
    }
  }, [webcamRef]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async (image?: File | null) => {
    setLoading(true);
    setError(null);

    try {
      let imageUrl = "";
      if (image) {
        // Convert File to Base64 string
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(image);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
        imageUrl = base64;
      }

      // Register user - backend creates session automatically
      await registerUser(formData.name, formData.email, imageUrl);

      showSnackbar(
        "Account created successfully! Welcome to Enlace.",
        "success"
      );

      // Redirect to dashboard
      router.push("/dashboard/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      spacing={4}
      alignItems="center"
      width="100%"
      height="100%"
      px={2}
      position="relative"
    >
      {/* Title & Subtitle */}
      <Stack spacing={1} alignItems="center" textAlign="center">
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={40}
          width={40}
          top={"10px"}
          left={"16px"}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "20%",
          }}
        >
          <Button variant="text" color="white" onClick={() => prevStep()}>
            <ArrowBackIcon fontSize="small" color="white" />
          </Button>
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "1.75rem", sm: "2rem" },
            pb: 2,
          }}
        >
          {t("signup.photo.title")}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.6)",
            fontSize: "0.95rem",
            maxWidth: "350px",
          }}
        >
          {t("signup.photo.subtitle")}
          <br />
          {t("signup.photo.subtitleExtra")}
        </Typography>
      </Stack>

      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          ...(previewUrl
            ? {
                border: "none",
                boxShadow: "0 4px 12px rgba(139, 61, 255, 0.4)",
                "&:hover": {
                  transform: "scale(2)",
                },
              }
            : { border: "5px dashed rgba(139, 61, 255, 0.41)" }),
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          overflow: "hidden",
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "rgba(139, 61, 255, 0.6)",
            transform: "scale(1.05)",
          },
        }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        ) : (
          <AddAPhotoIcon fontSize="large" color="primary" />
        )}
      </Stack>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <Stack spacing={1} alignItems="center" width="100%">
        <Button
          variant="outlined"
          color="white"
          fullWidth
          onClick={handleChooseFromComputer}
          sx={{
            textTransform: "none",
            fontSize: "0.95rem",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            height: "52px",
            border: "none",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.12)",
            },
          }}
        >
          <UploadFileIcon fontSize="small" color="white" sx={{ mr: 1 }} />
          {t("signup.photo.chooseFromComputer")}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleOpenWebcam}
          sx={{
            textTransform: "none",
            fontSize: "0.95rem",
            borderRadius: "20px",
            height: "52px",
            border: "none",
          }}
        >
          <CameraAltIcon fontSize="small" color="white" sx={{ mr: 1 }} />
          {t("signup.photo.takePhoto")}
        </Button>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Button
            variant="text"
            onClick={() => handleFinish(null)}
            disabled={loading}
            sx={{
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.56)",
              "&:hover": {
                color: "rgba(255, 255, 255, 0.8)",
              },
            }}
          >
            {t("signup.photo.skipForNow")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleFinish(selectedImage)}
            disabled={loading}
            sx={{
              textTransform: "none",
              fontSize: "0.95rem",
              borderRadius: "20px",
              fontWeight: 600,
              height: "52px",
              border: "none",
              boxShadow: "0 4px 14px rgba(127, 19, 236, 0.4)",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(127, 19, 236, 0.6)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>
                {t("signup.photo.finishSetup")}{" "}
                <ArrowForwardIcon fontSize="small" sx={{ ml: 1 }} />
              </>
            )}
          </Button>
        </Stack>
      </Stack>

      {/* Webcam Modal */}
      <Modal
        open={webcamOpen}
        onClose={(event: any, reason: string) => {
          if (reason === "backdropClick") return;
          handleCloseWebcam();
        }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(1px)",
            },
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "90%", sm: "500px" },
            backgroundColor: "rgba(21, 2, 63, 0.98)",
            borderRadius: "20px",
            border: "1px solid rgba(139, 61, 255, 0.3)",
            boxShadow: "0 20px 60px rgba(139, 61, 255, 0.4)",
            overflow: "hidden",
            p: 3,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseWebcam}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Stack spacing={3} alignItems="center">
            {/* Title */}
            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {t("signup.photo.webcamTitle")}
            </Typography>

            {/* Webcam Feed */}
            <Box
              sx={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "16px",
                overflow: "hidden",
                border: "3px solid rgba(139, 61, 255, 0.4)",
                position: "relative",
                backgroundColor: "black",
              }}
            >
              <Webcam
                ref={webcamRef}
                audio={false}
                mirrored={true}
                screenshotFormat="image/jpeg"
                screenshotQuality={1}
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: "user",
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Circular Crop Guide Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                {/* Dark overlay with circular cutout */}
                <Box
                  sx={{
                    // width:"70%",
                    // aspectRatio:"1",
                    // borderRadius:"50%",
                    // maxWidth:"300px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    maskImage:
                      "radial-gradient(circle at center, transparent 52%, black 52%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at center, transparent 52%, black 52%)",
                  }}
                />

                {/* Circular guide border */}
                <Box
                  sx={{
                    width: "60%",
                    aspectRatio: "1",
                    maxWidth: "300px",
                    borderRadius: "50%",
                    border: "3px dashed rgba(139, 61, 255, 0.8)",
                    boxShadow: "0 0 20px rgba(139, 61, 255, 0.4)",
                  }}
                />
              </Box>

              {/* Helper Text */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "20px",
                  px: 2,
                  py: 1,
                  pointerEvents: "none",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  {t("signup.photo.positionFace")}
                </Typography>
              </Box>
            </Box>

            {/* Capture Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCapturePhoto}
              sx={{
                height: "52px",
                borderRadius: "12px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(127, 19, 236, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(127, 19, 236, 0.6)",
                },
              }}
            >
              <CameraAltIcon sx={{ mr: 1 }} />
              {t("signup.photo.captureButton")}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}
