import { Metadata } from "next";
import Content from "@/components/authentication/SignUp";

export const metadata: Metadata = {
  title: "Enlace - Signup",
  description: "Signup page",
};

export default function SignUpPage() {
  return <Content />;
}
