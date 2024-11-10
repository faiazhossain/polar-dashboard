// app/api/reverse-geocode/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const longitude = searchParams.get("longitude");
  const latitude = searchParams.get("latitude");

  if (!longitude || !latitude) {
    return NextResponse.json(
      { error: "Longitude and latitude are required" },
      { status: 400 }
    );
  }

  const apiUrl = `https://barikoi.xyz/v2/api/search/reverse/geocode?api_key=bkoi_d41c8ce598cb4c2dbdaa67d34bcfd2f9e06e90a2c10620fddb7f2ff280ffe939&longitude=${longitude}&latitude=${latitude}&district=true&post_code=true&country=true&sub_district=true&union=true&pauroshova=true&location_type=true&division=true&address=true&area=true&bangla=true`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
