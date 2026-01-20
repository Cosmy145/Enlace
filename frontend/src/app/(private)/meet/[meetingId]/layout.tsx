"use client";

import React from "react";
import { Box } from "@mui/material";
import { UserProvider } from "@/contexts/UserContext";

export default function MeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          // backgroundColor: "#000",
        }}
      >
        {children}
      </Box>
    </UserProvider>
  );
}
