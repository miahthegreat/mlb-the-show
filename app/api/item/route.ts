import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uuid = searchParams.get('uuid') || 'a03aad508e99fc341087a8b9ec12c053';

  try {
    const response = await axios.get(`https://mlb24.theshow.com/apis/item.json?uuid=${uuid}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching captains data:', error);
    return NextResponse.json({ error: 'Failed to fetch captains data' }, { status: 500 });
  }
}