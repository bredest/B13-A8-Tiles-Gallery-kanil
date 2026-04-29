import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Tiles Gallery — Discover Beautiful Tiles",
    template: "%s | Tiles Gallery",
  },
  description:
    "Explore our curated collection of premium tiles — from Italian marble to Moroccan zellige. Find the perfect tile for your space.",
  keywords: ["tiles", "gallery", "marble", "ceramic", "interior design", "flooring"],
  openGraph: {
    title: "Tiles Gallery",
    description: "Discover beautiful, premium tiles for every space.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="tilegallery">
      <body className={`${inter.className} bg-base-100 text-base-content min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a2035",
                color: "#e8eaf0",
                border: "1px solid rgba(240,129,15,0.3)",
              },
              success: { iconTheme: { primary: "#f0810f", secondary: "#fff" } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
