import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    ok: true,
    service: 'staroak-official-website',
    version: '3.4.0',
    timestamp: new Date().toISOString()
  });
}
