export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware handles authentication check
  // If user reaches this component, they're authenticated
  return <>{children}</>;
}
