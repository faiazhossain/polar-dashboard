import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { MapProvider } from "react-map-gl";
// import TanstackProvider from "@/providers/TanstackProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Polar Dashboard",
  description:
    "Welcome to the Polar Ice Cream Outlet Dashboard, your comprehensive solution for managing and optimizing outlets. With our state-of-the-art dashboard, you can seamlessly monitor all your locations, ensuring top-notch performance and customer satisfaction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={`${lato.className} mx-auto`}>
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </StoreProvider>
    </html>
  );
}
