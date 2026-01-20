"use client";

import React, { useEffect } from "react";
import SideNav from "@/components/dashboard/SideNav";
import AppBar from "@/components/dashboard/AppBar";
import { Box } from "@mui/material";
import { UserProvider, useUser } from "@/contexts/UserContext";

// Inner component to consume the context
function DashboardContent({ children }: { children: React.ReactNode }) {
  const { user, setUser } = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <SideNav />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <AppBar user={user} setUser={setUser} />

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "#190d35ff",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Set page metadata dynamically
    document.title = "Enlace - Dashboard";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Enlace Dashboard - Manage your meetings, chats, and contacts"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Enlace Dashboard - Manage your meetings, chats, and contacts";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <UserProvider>
      <DashboardContent>{children}</DashboardContent>
    </UserProvider>
  );
}
