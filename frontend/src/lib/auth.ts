const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

/**
 * Check if user is authenticated by calling the backend /me endpoint
 * This checks the session cookie automatically sent with the request
 */
export const isAuthenticated = async (): Promise<boolean> => {
  if (typeof window === "undefined") {
    return false; // Server-side, can't check session
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
      method: "GET",
      credentials: "include", // Important: sends session cookie
    });

    return response.ok;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

/**
 * Get the current user data from the backend session
 */
export const getCurrentUser = async (): Promise<any | null> => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
      method: "GET",
      credentials: "include", // Important: sends session cookie
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

/**
 * Clear authentication by calling logout endpoint
 * This destroys the session on the backend
 */
export const clearAuth = async (): Promise<void> => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    await fetch(`${API_BASE_URL}/api/v1/users/logout`, {
      method: "POST",
      credentials: "include", // Important: sends session cookie
    });
  } catch (error) {
    console.error("Error clearing auth:", error);
  }
};

/**
 * No need for setAuth - the backend sets the session cookie automatically
 * when you login or register
 */
