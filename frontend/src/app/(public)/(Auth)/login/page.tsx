import { Metadata } from "next";
import Login from "@/components/authentication/Login";

export const metadata: Metadata = {
  title: "Enlace - Login",
  description: "Login page",
};

export default function LoginPage() {
  return <Login />;
}
