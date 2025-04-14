import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from 'react-hot-toast';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SpaceTech",
  description: "SpaceTech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <CartProvider> 
        <Navbar />
        
          {children}
        
        <Footer />
        <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
