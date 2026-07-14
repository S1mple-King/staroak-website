export type StrapiResponse<T> = {
  data?: T;
  error?: unknown;
};

export function getStrapiBaseUrl(): string | null {
  const base = process.env.STRAPI_API_URL?.replace(/\/$/, '');
  return base || null;
}

export async function strapiFetch<T>(path: string, init?: RequestInit): Promise<StrapiResponse<T>> {
  const base = getStrapiBaseUrl();
  if (!base) return { error: 'STRAPI_API_URL_NOT_CONFIGURED' };

  const token = process.env.STRAPI_API_TOKEN;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${base}${normalizedPath}`, {
    ...init,
    headers,
    next: { revalidate: 300 }
  });

  const json = await response.json().catch(() => null);
  if (!response.ok) return { error: json || response.statusText };
  return { data: json as T };
}

export async function createStrapiEntry<T>(collection: string, data: Record<string, unknown>): Promise<StrapiResponse<T>> {
  return strapiFetch<T>(`/api/${collection}`, {
    method: 'POST',
    body: JSON.stringify({ data })
  });
}
