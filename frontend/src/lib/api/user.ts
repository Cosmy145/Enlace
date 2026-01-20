// User API service functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface RegisterRequest {
  name: string;
  email: string;
  profileImage?: string;
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
  };
}

export const registerUser = async (
  name: string,
  email: string,
  profileImage?: string
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, profileImage } as RegisterRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to register user");
    }

    const data: RegisterResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
  };
}

export const loginUser = async (
  email: string,
  otp: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to login");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to logout");
    }

    // Backend handles session destruction
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};
