import React, { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import { Box, TextField } from "@mui/material";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}

export default function OTPInput({
  length = 6,
  value,
  onChange,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(
    value ? value.split("").slice(0, length) : Array(length).fill("")
  );

  const handleChange = (index: number, newValue: string) => {
    // Only allow numbers
    if (newValue && !/^\d$/.test(newValue)) return;

    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Auto-focus next input
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);

    // Only allow numbers
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    while (newOtp.length < length) {
      newOtp.push("");
    }

    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus the last filled input or the next empty one
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleFocus = (index: number) => {
    // Select the text when focused
    inputRefs.current[index]?.select();
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1, sm: 1.5 },
        justifyContent: "center",
        width: "100%",
      }}
    >
      {Array.from({ length }).map((_, index) => (
        <TextField
          key={index}
          autoFocus={index === 0}
          inputRef={(el) => (inputRefs.current[index] = el)}
          value={otp[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e as any)}
          onPaste={handlePaste}
          onFocus={() => handleFocus(index)}
          placeholder="-"
          slotProps={{
            htmlInput: {
              maxLength: 1,
              style: { textAlign: "center", fontSize: "1.5rem", fontWeight: 600 },
            },
          }}
          sx={{
            "& input:focus::placeholder": {
              color: "transparent",
            },
            width: { xs: "45px", sm: "56px" },
            "& .MuiOutlinedInput-root": {
              color: "white",
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              transition: "all 0.3s ease",
              height: { xs: "50px", sm: "60px" },
              "& fieldset": {
                borderColor: otp[index]
                  ? "rgba(139, 61, 255, 0.6)"
                  : "rgba(139, 61, 255, 0.3)",
                borderWidth: "2px",
              },
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                "& fieldset": {
                  borderColor: "rgba(139, 61, 255, 0.5)",
                },
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                "& fieldset": {
                  borderColor: "primary.main",
                  borderWidth: "2.5px",
                  boxShadow: "0 0 0 3px rgba(139, 61, 255, 0.1)",
                },
              },
            },
          }}
        />
      ))}
    </Box>
  );
}
