import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accountId, reason } = body;

    // Validate input
    if (!accountId || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"AuraVPN Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: `Delete Account Request - Account ID: ${accountId}`,
      text: `
        Delete Account Request
        
        Account ID: ${accountId}
        
        Reason:
        ${reason}
      `,
      html: `
        <h3>Delete Account Request</h3>
        <p><strong>Account ID:</strong> ${accountId}</p>
        <p><strong>Reason:</strong></p>
        <p>${reason.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Request sent successfully' });
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send request' },
      { status: 500 }
    );
  }
}
