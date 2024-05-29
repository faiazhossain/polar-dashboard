// Dashboard.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Dashboard/Navbar/Navbar";
import LeftCard from "@/components/Dashboard/LeftCard/LeftCard";
import MapComponent from "@/components/Dashboard/MapComponent/MapComponent";
import Statistics from "@/components/Dashboard/Statistics/Statistics";
const Dashboard = () => {
  const router = useRouter();
  const handleLogout = async () => {
    // Clear the session token (remove cookie)
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div className="h-full pb-8 relative">
      <Navbar />
      <div className="flex flex-col px-1 h-[86vh] md:px-4 md:flex-row mt-24 gap-6 ">
        <LeftCard />
        <div className="flex flex-col grow gap-4">
          <MapComponent />
          <Statistics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
