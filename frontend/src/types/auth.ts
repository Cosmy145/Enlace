// Authentication & Signup related types
export interface SignUpData {
  step: number;
  email: string;
  otp: string;
  name: string;
  profileImage: File | null;
}

export interface LoginData {
  step: number;
  email: string;
  otp: string;
}

export interface EmailStepProps<
  T extends SignUpData | LoginData = SignUpData | LoginData
> {
  formData: T;
  nextStep: (field: keyof T, value: any) => void;
}

export interface OTPStepProps<
  T extends SignUpData | LoginData = SignUpData | LoginData
> {
  formData: T;
  nextStep: (field: keyof T, value: any) => void;
}

export interface NameStepProps {
  formData: SignUpData;
  nextStep: (field: keyof SignUpData, value: any) => void;
}

export interface PfpStepProps {
  formData: SignUpData;
  nextStep: (field: keyof SignUpData, value: any) => void;
  prevStep: () => void;
}
