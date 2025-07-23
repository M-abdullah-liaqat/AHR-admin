import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/conponents/NavBar";
import ContextRapper from "@/conponents/ContextRapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AHR admin area",
  description: "AHR admin area is created to post products on AHR official",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextRapper>
         <NavBar/>
        {children}
        </ContextRapper>
      </body>
    </html>
  );
}
