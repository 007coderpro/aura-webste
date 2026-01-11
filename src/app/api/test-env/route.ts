import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const hasUser = !!process.env.SMTP_USER;
  const hasPass = !!process.env.SMTP_PASS;
  const hasHost = !!process.env.SMTP_HOST;

  return NextResponse.json({
    status: 'Environment Check',
    hasSmtpUser: hasUser,
    hasSmtpPass: hasPass,
    hasSmtpHost: hasHost,
    hostValue: process.env.SMTP_HOST // Safe to show host, not password
  });
}
