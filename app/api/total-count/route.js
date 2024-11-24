// File: app/api/bkoi/updateUser/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the incoming JSON body
    const { user_id, api_count } = await req.json();

    // Validate the input
    if (!user_id || !api_count) {
      return NextResponse.json(
        { error: 'user_id and api_count are required' },
        { status: 400 }
      );
    }

    // Forward the data to the external API
    const externalResponse = await fetch(
      'https://usage.bmapsbd.com/bkoi/update/dashboard/users',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, api_count }),
      }
    );

    // Check if the external API call was successful
    if (!externalResponse.ok) {
      const errorData = await externalResponse.json();
      return NextResponse.json(
        { error: errorData },
        { status: externalResponse.status }
      );
    }

    // Parse the external API response
    const data = await externalResponse.json();

    // Return the success response
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
