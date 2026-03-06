import { NextRequest, NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (record.count >= 5) return false;
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body: ContactPayload = await request.json();

    // Honeypot
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Send email via Resend if configured
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_TO) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "MSMM Website <noreply@msmmeng.com>",
          to: process.env.CONTACT_EMAIL_TO,
          subject: `Contact Form: ${body.subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone || "N/A"}</p>
            <p><strong>Company:</strong> ${body.company || "N/A"}</p>
            <p><strong>Subject:</strong> ${body.subject}</p>
            <hr />
            <p>${body.message.replace(/\n/g, "<br />")}</p>
          `,
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json(
          { error: "Failed to send email." },
          { status: 500 }
        );
      }
    } else {
      // Log to console if Resend not configured
      console.log("Contact form submission (Resend not configured):", body);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
