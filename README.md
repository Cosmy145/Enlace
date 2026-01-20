# 🌐 Enlace

> **Enlace** (Spanish for "Link" or "Connection") is a comprehensive, feature-rich web application designed to bridge the gap in digital communication. Built with a modern tech stack centered around Next.js 15 and Node.js, Enlace offers a seamless experience for video conferencing, real-time messaging, and efficient personal dashboard management.

![Enlace Banner](https://via.placeholder.com/1200x400?text=Enlace+Dashboard+Preview)
_(Note: Replace with actual screenshot)_

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
  - [Authentication Flow](#authentication-flow)
  - [Video Meetings](#video-meetings)
  - [Dashboard Ecosystem](#dashboard-ecosystem)
- [Tech Stack](#-tech-stack)
- [Architecture & Design](#-architecture--design)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Reference](#-api-reference)
- [Project Structure](#-project-structure)
- [Future Roadmap](#-future-roadmap)
- [License](#-license)
- [Author](#-author)

---

## � About the Project

Enlace is a personal project developed by **Shivansh Kavatra** to demonstrate the integration of real-time communication technologies with modern web frameworks. It represents a "full-stack" approach to building scalable, interactive applications, solving real-world problems like secure remote collaboration and personal organization.

The core philosophy of Enlace is **simplicity meets power**: a user interface that feels intuitive and premium, backed by a robust and secure backend infrastructure.

## ✨ Key Features

### 🔐 Authentication Flow

Security is paramount. Enlace moves away from traditional passwords to a secure, OTP-based flow.

- **Multi-Step Onboarding**: A guided "wizard" style signup process (Name -> Email -> OTP -> Profile Picture).
- **Secure Sessions**: Uses **JWT (JSON Web Tokens)** stored in **HttpOnly, Secure Cookies**. This prevents XSS attacks from accessing tokens.
- **Nodemailer Integration**: High-reliability email delivery for One-Time Passwords (OTP).
- **Persistent Login**: Automatic session validation on app load via the `UserContext`.

### 📹 Video Meetings

The heart of Enlace is its WebRTC-powered video capabilities.

- **Crystal Clear Video**: Peer-to-peer streaming for minimal latency.
- **Meeting Management**:
  - **Instant Meetings**: One-click creation of meeting rooms via unique IDs.
  - **Lobby/Preview**: Users can check their camera and microphone before joining.
  - **In-Call Controls**: Toggle mute, blind video, and leave meeting dynamically.
- **Real-Time Signaling**: Powered by **Socket.io** to handle peer discovery and connection handshakes.

### 📊 Dashboard Ecosystem

A private, protected space for every user.

- **Dynamic Sidebar**: Navigation that adapts to your current context.
- **Modules**:
  - **Home**: A summary view of your day.
  - **Chat**: Instant text messaging with other users (Socket.io).
  - **Calendar**: Interactive calendar to schedule and view recurring meetings.
  - **Contacts**: Address book management.
  - **Settings**: Global app preferences (Language, Theme).
- **Internationalization (i18n)**: Fully translated interface supporting **English, Spanish, French, German, Hindi, Japanese, and Korean**.

---

## 🛠 Tech Stack

### Frontend (Client)

| Technology                  | Purpose                                                |
| --------------------------- | ------------------------------------------------------ |
| **Next.js 15 (App Router)** | React framework for server-side rendering and routing. |
| **TypeScript**              | Static typing for cleaner, bug-free code.              |
| **Tailwind CSS**            | Utility-first CSS framework for rapid styling.         |
| **Material UI (MUI)**       | Pre-built accessible components (Icons, Buttons).      |
| **Framer Motion & GSAP**    | High-performance animations and transitions.           |
| **Recoil / Context API**    | Global state management (User, UI states).             |
| **Socket.io Client**        | Real-time bidirectional event-based communication.     |
| **React Webcam**            | Handling media streams for video calls.                |

### Backend (Server)

| Technology             | Purpose                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| **Node.js**            | JavaScript runtime environment.                                   |
| **Express.js**         | Web server framework.                                             |
| **MongoDB**            | NoSQL database for flexible data storage.                         |
| **Mongoose**           | ODM (Object Data Modeling) library for MongoDB.                   |
| **Socket.io**          | Real-time signaling server.                                       |
| **JWT (JsonWebToken)** | Stateless authentication.                                         |
| **Nodemailer**         | Sending transactional emails (OTPs).                              |
| **Cloudinary**         | Cloud storage for profile images.                                 |
| **Bcrypt**             | Hashing sensitive data (though we use OTPs, ready for passwords). |

---

## 🏗 Architecture & Design

Enlace follows a **Client-Server Architecture**:

1.  **Frontend**: The Next.js app serves as the presentation layer. It communicates with the backend via REST APIs (for CRUD operations) and WebSockets (for real-time events).
2.  **Backend**: The Express server handles business logic, database interactions, and authentication. It exposes API endpoints consumed by the frontend.
3.  **Database**: MongoDB stores User profiles, Meeting history, and OTP records.
4.  **Signaling**: The Socket.io server acts as the "handshake" broker for WebRTC, allowing two clients to find each other and exchange media streams directly (Peer-to-Peer).

**Security Measures:**

- **CORS Protection**: Restricted to trusted frontend domains.
- **HttpOnly Cookies**: Prevents client-side scripts from reading auth tokens.
- **Input Validation**: Ensuring data integrity before processing.

---

## 🏁 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **Git**
- **MongoDB**: A running instance (local or MongoDB Atlas)

### Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/Cosmy145/Enlace.git
    cd Enlace
    ```

2.  **Install Dependencies**
    You need to install dependencies for both the `frontend` and `backend` folders.

    _Terminal 1 (Backend):_

    ```bash
    cd backend
    npm install
    ```

    _Terminal 2 (Frontend):_

    ```bash
    cd frontend
    npm install
    ```

### Environment Variables

You **must** configure these variables for the app to function.

**Backend (`backend/.env`):**

```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/enlace_db
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@gmail.com (for sending OTPs)
EMAIL_PASS=your_app_specific_password
CLIENT_URL=http://localhost:3000
```

**Frontend (`frontend/.env.local`):**

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
```

3.  **Run the Application**

    _Terminal 1 (Start Backend):_

    ```bash
    cd backend
    npm run dev
    ```

    > The server will start on port 8000.

    _Terminal 2 (Start Frontend):_

    ```bash
    cd frontend
    npm run dev
    ```

    > The client will start on port 3000.

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Reference

Here are the primary API routes available in the system:

**Status**

- `GET /api/v1/status` - Check if API is running

**Authentication (`/api/v1/users`)**

- `POST /register` - Create a new user account.
- `POST /login` - Login with Email & OTP.
- `POST /logout` - Clear session cookies.
- `GET /me` - Get current authenticated user details.

**OTP Service (`/api/v1/otp`)**

- `POST /send-otp` - Trigger an email with a verification code.
- `POST /verify-otp` - Validate the entered code.

**Meetings (`/api/v1/meeting`)**

- `POST /createMeeting` - Generate a new meeting room ID.
- `GET /validate/:meetingId` - Check if a meeting ID is valid.

---

## 📂 Project Structure

```bash
Enlace/
├── backend/                # Express Server
│   ├── src/
│   │   ├── controllers/    # Business Logic (User, Meeting, OTP)
│   │   ├── models/         # Database Schemas (Mongoose)
│   │   ├── routes/         # Endpoint Definitions
│   │   ├── utils/          # Helpers (JWT, Mailer, Cloudinary)
│   │   └── app.tsx         # App Entry Point
│   └── package.json
│
├── frontend/               # Next.js Client
│   ├── src/
│   │   ├── app/            # Next.js 15 App Router
│   │   │   ├── (private)/  # Protected Routes (Dashboard, Meet)
│   │   │   └── (public)/   # Auth Routes (Login, Signup)
│   │   ├── components/     # UI Components (Atomic Design)
│   │   ├── contexts/       # Global State (User, Snackbar)
│   │   ├── lib/            # API Clients & Utilities
│   │   └── translations/   # i18n JSON/TS files
│   └── package.json
│
└── README.md
```

---

## 🔮 Future Roadmap

- [ ] **Screen Sharing**: Allow users to share their screen during calls.
- [ ] **Group Calls**: Expand WebRTC mesh/SFU to support 3+ participants.
- [ ] **Chat History**: Persist chat messages in MongoDB.
- [ ] **Mobile App**: React Native adaptation for iOS/Android.
- [ ] **Recording**: Ability to record meeting sessions.

---

## 📄 License

This project is open-source and available under the **ISC License**.

## 👤 Author

**Shivansh Kavatra**

- GitHub: [@Cosmy145](https://github.com/Cosmy145)
- Email: [shivanshkavatra@gmail.com](mailto:shivanshkavatra@gmail.com)

---

_Made with 💻 and ☕ by Shivansh._
