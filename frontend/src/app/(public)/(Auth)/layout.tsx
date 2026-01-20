export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware handles authentication check
  // If user reaches this component, they're not authenticated
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
}
