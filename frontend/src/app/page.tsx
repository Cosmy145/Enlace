import LandingPage from "@/components/landingPage/LandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enlace - Landing",
  description: "Landing page",
};

export default function Page() {
  return (
    <LandingPage />
  );
}
