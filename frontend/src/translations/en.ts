export const en = {
  landing: {
    navbar: {
      features: "Features",
      privacy: "Privacy",
      howItWorks: "How it Works",
      login: "Log In",
      signup: "Sign Up",
    },
    hero: {
      title: "Connect instantly. Collaborate endlessly.",
      subtitle:
        "Experience high-fidelity video conferencing directly in your browser. No downloads, No lags, just instant collaboration.",
      getStarted: "Get Started",
      howItWorks: "How It Works",
    },
    features: {
      title: "Powerful Features",
      titleLine2: "designed for modern",
      titleLine3: "teams.",
      subtitle:
        "Everything you need to communicate effectively, packaged in a sleek, browser-based interface.",
      viewAll: "View all features",
      items: {
        audio: {
          title: "Crystal Clear Audio",
          description:
            "High-definition voice quality with noise suppression technology powered by AI.",
        },
        encryption: {
          title: "End-to-End Encryption",
          description:
            "Your conversations are private and secure. We can't listen in, even if we wanted to.",
        },
        sharing: {
          title: "Zero-Latency Sharing",
          description:
            "Share your screen, files, or whiteboard in real-time with virtually no delay.",
        },
        privacy: {
          title: "No Logs Policy",
          description:
            "We don't store your call data, messages, or recordings. Your privacy is guaranteed.",
        },
        browser: {
          title: "Browser Based",
          description:
            "Works seamlessly on any device with a web browser. No downloads or installations required.",
        },
        files: {
          title: "Instant File Sharing",
          description:
            "Share documents, images, and files instantly during calls with drag-and-drop simplicity.",
        },
      },
    },
    cta: {
      title: "Ready to transform your",
      titleLine2: "meetings?",
      subtitle:
        "Join thousands of teams using Enlace for clearer, faster, and more secure communication.",
      emailLabel: "Email",
      button: "Get Started",
    },
    footer: {
      tagline:
        "The next generation of web connectivity. Making remote work feel like you are in the same room.",
      copyright: "© 2026 Enlace Inc. All rights reserved.",
      product: "Product",
      resources: "Resources",
      legal: "Legal",
      features: "Features",
      changelog: "Changelog",
      documentation: "Documentation",
      apiReference: "API Reference",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      cookiePolicy: "Cookie Policy",
    },
  },
  signup: {
    title: "Sign Up",
    step: "Step {{current}} of {{total}}",
    email: {
      title: "Let's get started",
      subtitle: "Enter your email address to create your account",
      label: "Email Address",
      placeholder: "name@company.com",
      button: "Continue",
    },
    otp: {
      title: "Verify your email",
      subtitle: "We sent a 6-digit code to",
      didntReceive: "Didn't receive the code?",
      resend: "Resend code",
      resendIn: "Resend in {{seconds}}s",
      button: "Verify",
    },
    name: {
      title: "What should we call you?",
      subtitle: "This is how you'll appear to your contacts on Enlace.",
      subtitleExtra: "You can always change this later in your settings.",
      label: "Full Name",
      placeholder: "e.g. Jane Doe",
      button: "Next",
    },
    photo: {
      title: "Add a photo",
      subtitle: "Help your teammates recognize you on Enlace.",
      subtitleExtra: "You can change this later in your settings.",
      chooseFromComputer: "Choose from computer",
      takePhoto: "Take a photo with Webcam",
      skipForNow: "Skip for now",
      finishSetup: "Finish Setup",
      webcamTitle: "Take a Photo",
      captureButton: "Capture Photo",
      positionFace: "Position your face in the circle",
    },
  },
  common: {
    buttons: {
      continue: "Continue",
      cancel: "Cancel",
      save: "Save",
      close: "Close",
      back: "Back",
      next: "Next",
    },
    errors: {
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      invalidImage: "Please select a valid image file",
    },
  },
};

// Type definition that allows flexible string values
export type TranslationKeys = typeof en;
