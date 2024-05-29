import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const type = searchParams.get('type') || 'mlb_card';

  try {
    const response = await axios.get(`https://mlb24.theshow.com/apis/items.json?type=${type}&page=${page}`, {
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