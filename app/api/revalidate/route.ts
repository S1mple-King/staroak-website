import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const input: unknown = await request.json().catch(() => ({}));
  const body = input && typeof input === 'object' ? input as Record<string, unknown> : {};
  if (!secret || body.secret !== secret) {
    return NextResponse.json({ ok: false, error: 'invalid_secret' }, { status: 401 });
  }

  const paths: unknown[] = Array.isArray(body.paths) ? body.paths : [body.path || '/'];
  const normalized = paths
    .filter((path: unknown): path is string => typeof path === 'string')
    .map((path) => (path.startsWith('/') ? path : `/${path}`));

  normalized.forEach((path) => revalidatePath(path));
  return NextResponse.json({ ok: true, revalidated: normalized, timestamp: new Date().toISOString() });
}
