import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className="grid min-h-[100dvh]"
        style={{ gridTemplateRows: "auto 1fr auto" }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
