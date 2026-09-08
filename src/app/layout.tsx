import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "El-Ksas | القصاص", description: "Motorcycle reviews and guides." };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
