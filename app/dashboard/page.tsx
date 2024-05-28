// Dashboard.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Dashboard/Navbar/Navbar";
import LeftCard from "@/components/Dashboard/LeftCard/LeftCard";
import MapComponent from "@/components/Dashboard/MapComponent/MapComponent";
const Dashboard = () => {
  const router = useRouter();
  const handleLogout = async () => {
    // Clear the session token (remove cookie)
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div className="bg-[#f1f1f1] h-screen">
      <Navbar />
      <div className="flex flex-col px-1 md:px-4 md:flex-row mt-[16px] gap-6">
        <LeftCard />
        <MapComponent />
      </div>
    </div>
  );
};

export default Dashboard;
