import { AppBackground } from "@/components/AppBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppBackground>{children}</AppBackground>;
}
