// Dashboard.tsx
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Dashboard/Navbar/Navbar";
import LeftCard from "@/components/Dashboard/LeftCard/LeftCard";
import MapComponent from "@/components/Dashboard/MapComponent/MapComponent";
import Statistics from "@/components/Dashboard/Statistics/Statistics";
import { MapProvider } from "react-map-gl";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear the session token (remove cookie)
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div className="h-full md:min-h-[80vh] pb-8 relative">
      <MapProvider>
        <Navbar onLogout={handleLogout} />
        <div className="flex flex-col px-1 mx-auto max-w-[1382px] md:flex-row mt-8 gap-6">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <LeftCard />
          </div>
          <div className="flex flex-col grow gap-4 w-full md:w-1/2 lg:w-2/3">
            <MapComponent />
            <Statistics />
          </div>
        </div>
      </MapProvider>
    </div>
  );
};

export default Dashboard;
