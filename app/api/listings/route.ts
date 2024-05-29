import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const type = searchParams.get('type') || 'mlb_card';
  const sort = searchParams.get('sort') || 'rank';
  const order = searchParams.get('order') || 'asc';
  const rarity = searchParams.get('rarity') || 'diamond';

  try {
    const response = await axios.get(`https://mlb24.theshow.com/apis/listings.json?type=${type}&page=${page}&sort=${sort}&order=${order}&rarity=${rarity}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching listings data:', error);
    return NextResponse.json({ error: 'Failed to fetch captains data' }, { status: 500 });
  }
}