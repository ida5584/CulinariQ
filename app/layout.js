// "use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Outlet, useNavigate } from 'react-router-dom';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CulinariQ",
  description: "Meal planning service to the next Level!",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider>      
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
