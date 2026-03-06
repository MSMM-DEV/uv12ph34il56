"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      honeypot: formData.get("website") as string,
    };

    // Honeypot check
    if (data.honeypot) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "mt-1 block w-full rounded-md border border-border bg-white px-4 py-3 text-sm input-glow focus:border-primary focus:outline-none";

  if (status === "success") {
    return (
      <div
        className="rounded-lg border border-green-200 bg-green-50 p-8 text-center"
        style={{ animation: "scale-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
      >
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100"
          style={{ animation: "scale-in 400ms cubic-bezier(0.34, 1.56, 0.64, 1) 200ms both" }}
        >
          <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-green-800">Message Sent!</h3>
        <p className="mt-2 text-green-700">
          Thank you for reaching out. We&apos;ll get back to you within 1-2 business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-green-700 underline cursor-pointer hover:text-green-900"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" name="website" id="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className={inputClasses}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className={inputClasses}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className={inputClasses}
            placeholder="(504) 555-0123"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground">
            Company / Organization
          </label>
          <input
            type="text"
            name="company"
            id="company"
            className={inputClasses}
            placeholder="Your organization"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground">
          Subject *
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          className={inputClasses}
          placeholder="How can we help?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message *
        </label>
        <textarea
          name="message"
          id="message"
          required
          rows={5}
          className={`${inputClasses} resize-none`}
          placeholder="Tell us about your project..."
        />
      </div>

      {status === "error" && (
        <div
          className="rounded-md bg-red-50 p-4 text-sm text-red-700"
          style={{ animation: "fade-up 300ms ease both" }}
        >
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
