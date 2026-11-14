import type { NextRequest } from 'next/server';

export function verifyAdminRequest(req: NextRequest): { ok: true } | { ok: false; status: number; error: string } {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return { ok: true };
  }
  const provided = req.headers.get('x-admin-secret');
  if (provided !== secret) {
    return { ok: false, status: 401, error: 'Unauthorized admin request' };
  }
  return { ok: true };
}
