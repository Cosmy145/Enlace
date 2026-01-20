// OTP API service functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface SendOTPRequest {
  email: string;
}

interface VerifyOTPRequest {
  email: string;
  otp: string;
}

interface OTPResponse {
  message: string;
}

interface VerifyOTPResponse {
  message: string;
  verified?: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    profileImage?: string;
  };
}

export const sendOtp = async (email: string): Promise<OTPResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/otp/send_otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email } as SendOTPRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send OTP");
    }

    const data: OTPResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyOtp = async (
  email: string,
  otp: string,
  isLogin: boolean = false
): Promise<VerifyOTPResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/otp/verify_otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp, isLogin }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify OTP");
    }

    const data: VerifyOTPResponse = await response.json();
    return { ...data, verified: true };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export const checkEmail = async (
  email: string
): Promise<{ exists: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/check-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { exists: false, message: data.message || "Email not found" };
    }

    return { exists: true, message: data.message };
  } catch (error) {
    console.error("Error checking email:", error);
    throw error;
  }
};
