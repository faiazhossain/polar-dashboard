'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Dashboard/Navbar/Navbar';
import LeftCard from '@/components/Dashboard/LeftCard/LeftCard';
import MapComponent from '@/components/Dashboard/MapComponent/MapComponent';
import Statistics from '@/components/Dashboard/Statistics/Statistics';
import { MapProvider } from 'react-map-gl';
import GuideModal from '@/components/Dashboard/GuideModal/GuideModal';
import { QuestionCircleOutlined } from '@ant-design/icons';
const Dashboard: React.FC = () => {
  const router = useRouter();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleLogout = async () => {
    // Clear the session token (remove cookie)
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

    // Redirect to the login page
    router.push('/login');
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
        <button
          onClick={() => setIsGuideOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 focus:outline-none"
          title="Click to view Dashboard Guide"
        >
          <QuestionCircleOutlined className="text-white text-2xl" />
        </button>
        <GuideModal
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
        />
      </MapProvider>
    </div>
  );
};

export default Dashboard;
