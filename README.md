# Enlace

Enlace is a comprehensive, feature-rich web application designed to bridge the gap in digital communication. Built with a modern tech stack centered around Next.js and Node.js, Enlace offers a seamless experience for video conferencing, real-time messaging, and efficient personal dashboard management.

## 🚀 Overview

Enlace (Spanish for "Link" or "Connection") is a personal project by **Shivansh Kavatra** that aims to provide a robust platform for connecting people. Whether it's through high-quality video calls, instant chats, or managing your personal calendar and contacts, Enlace handles it all with a focus on security, performance, and a premium user interface.

## ✨ Key Features

### 📹 Video Conferencing

- **High-Quality Video Calls:** Powered by WebRTC for low-latency, peer-to-peer video communication.
- **Meeting Management:** Create, join, and manage meetings effortlessly.
- **In-Call Controls:** Real-time audio/video toggles and meeting controls.

### 🔐 Advanced Authentication & Security

- **Secure Access:** Robust JWT-based authentication using HttpOnly cookies.
- **Multi-Step Signup:** User-friendly onboarding flow (Name, Email, OTP Verification, Profile Picture).
- **OTP Verification:** Secure email verification using one-time passwords via Nodemailer.
- **Profile Management:** Users can customize their profiles, including uploading profile pictures (stored via Cloudinary).

### 📊 Interactive Dashboard

A fully featured private dashboard for logged-in users:

- **Home:** Overview of your activities.
- **Chat:** Real-time messaging powered by Socket.io.
- **Calendar:** Manage your schedule and upcoming meetings.
- **Contacts:** Keep track of your connections.
- **Settings:** Customize your application preferences.

### 🌍 Internationalization (i18n)

- **Multi-language Support:** Built-in support for multiple languages including English, Spanish, French, German, Hindi, Japanese, and Korean.

### 🎨 Modern UI/UX

- **Responsive Design:** Fully responsive layout working across desktop, tablet, and mobile.
- **Rich Animations:** Smooth transitions and interactions using **Framer Motion** and **GSAP**.
- **Styling:** Beautifully crafted UI using **Tailwind CSS** and **Material UI** components.

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Material UI (@mui/material), Emotion
- **Animations:** Framer Motion, GSAP
- **State/Data:** React Context API, Axios
- **Real-time:** Socket.io Client
- **Media:** React Webcam

### Backend

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** TypeScript (executed via `tsx`)
- **Database:** MongoDB (via Mongoose ODM)
- **Real-time:** Socket.io
- **Authentication:** JSON Web Tokens (JWT), BCrypt
- **File Storage:** Cloudinary
- **Email:** Nodemailer

## 🏁 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (Local or Atlas)
- Cloudinary Account
- Email Service Credentials (for SMTP)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Cosmy145/Enlace.git
cd Enlace
```

#### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
CLIENT_URL=http://localhost:3000
```

Start the backend server:

```bash
npm run dev
```

#### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📂 Project Structure

```
Enlace/
├── backend/                # Express.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers (Auth, Meeting, etc.)
│   │   ├── models/         # Mongoose models (User, Meeting, OTP)
│   │   ├── routes/         # API routes definitions
│   │   ├── utils/          # Utilities (Cloudinary, JWT, Email)
│   │   └── app.tsx         # Entry point
│   └── package.json
│
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/            # App Router pages & layouts
│   │   │   ├── (private)/  # Protected routes (Dashboard, Meet)
│   │   │   └── (public)/   # Public routes (Login, Signup)
│   │   ├── components/     # Reusable React components
│   │   ├── contexts/       # React Context provider
│   │   ├── lib/            # API clients and utilities
│   │   └── translations/   # i18n translation files
│   └── package.json
│
└── README.md
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Cosmy145/Enlace/issues).

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Shivansh Kavatra**

- GitHub: [@Cosmy145](https://github.com/Cosmy145)

---

_Built with ❤️ using TypeScript_
