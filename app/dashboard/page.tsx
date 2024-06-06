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
    <div className="h-full md:min-h-[98vh] pb-8 relative">
      <MapProvider>
        <Navbar onLogout={handleLogout} />
        <div className="flex flex-col px-1 md:px-4 md:flex-row mt-8 gap-6">
          <LeftCard />
          <div className="flex flex-col grow gap-4">
            <MapComponent />
            <Statistics />
          </div>
        </div>
      </MapProvider>
    </div>
  );
};

export default Dashboard;
