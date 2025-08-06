import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      'SELECT id, title, description, date FROM events ORDER BY date ASC'
    );
    
    const events = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      date: row.date.toISOString().split('T')[0] // Format as YYYY-MM-DD
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
