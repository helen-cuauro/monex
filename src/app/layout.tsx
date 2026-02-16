import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ThemeRegistry from "@/components/ThemeRegistry";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="grid min-h-[100dvh]"
        style={{ gridTemplateRows: "auto 1fr auto" }}
        suppressHydrationWarning
      >
        <ThemeRegistry>
          <Header />
          {children}
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
