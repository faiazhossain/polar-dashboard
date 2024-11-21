//@ts-nocheck
import Image from 'next/image';
import React, { useState } from 'react';
import export_png from '@/public/statistics/export.png';
import { useAppSelector } from '@/lib/store/hooks';
import * as XLSX from 'xlsx';
import { message } from 'antd'; // Import Ant Design's message component

// Define the type for geocoded data
type GeocodedData = {
  latitude: number;
  longitude: number;
  address: string;
  place: {
    address: string;
    [key: string]: any;
  };
  rank: number; // Add rank to the type
};

type State = {
  leftPanel: {
    selectedRegion: {
      value: string;
    };
  };
};

const Export = () => {
  const clickedZoneMarkers = useAppSelector(
    (state) => state.mapdata.clickedCoordinates
  );
  const region = useAppSelector((state) => state.leftPanel.selectedRegion);
  const [geocodedData, setGeocodedData] = useState<GeocodedData[]>([]);

  const handleExport = async () => {
    if (clickedZoneMarkers.length === 0) {
      message.error('No addresses to export!'); // Use Ant Design message.error for error notification
      return;
    }

    try {
      const results = await Promise.all(
        clickedZoneMarkers.map(async (coord) => {
          const [longitude, latitude] = coord.coordinates; // Assuming `coordinates` contains [longitude, latitude, rank]
          const rank = coord.rank;
          const response = await fetch(
            `/api/reverse-geocode?latitude=${latitude}&longitude=${longitude}`
          );
          if (!response.ok) throw new Error('API request failed');

          const data = await response.json();

          // Return the full object including latitude, longitude, rank, and geocoded data
          return { ...data, latitude, longitude, rank };
        })
      );

      setGeocodedData(results);
      exportToExcel(results);
      message.success('Export completed successfully!'); // Use Ant Design message.success for success notification
    } catch (error) {
      console.error('Error during export:', error);
      message.error('Failed to export coordinates!'); // Use Ant Design message.error for error notification
    }
  };

  const exportToExcel = (data: any) => {
    // Format the data for Excel
    const formattedData = data.map((item: any, index: number) => ({
      Index: index + 1,
      Latitude: item.latitude, // Use latitude from the updated response
      Longitude: item.longitude, // Use longitude from the updated response
      Address: item.place.address, // Use the address from the response
      Area: item.place.area,
      District: item.place.district,
      Division: item.place.division,
      Rank: item.rank, // Include the rank in the export data
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Exported Data');

    // Write and trigger download
    XLSX.writeFile(workbook, `Exported_Addresses of ${region?.value}.xlsx`);
  };

  return (
    <>
      <button
        className="bg-[#EC1B23] text-white px-2 w-full py-4 rounded-[8px] hover:bg-[#dC1B23] transition-colors flex justify-center items-center gap-4"
        onClick={handleExport}
      >
        <p>EXPORT</p>
        <Image src={export_png} width={18} height={16} alt="export logo" />
      </button>
    </>
  );
};

export default Export;
