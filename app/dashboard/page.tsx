"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Clear the session token (remove cookie)
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
