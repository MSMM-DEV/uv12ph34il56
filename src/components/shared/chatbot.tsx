"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "bot" | "user";
  text: string;
};

const FAQ: { question: string; answer: string }[] = [
  {
    question: "What does MSMM Engineering do?",
    answer:
      "MSMM Engineering is a New Orleans-based civil engineering firm specializing in flood protection, water/wastewater systems, coastal and ecosystem restoration, public infrastructure, and hydraulic & hydrologic modeling. We've been delivering expert engineering solutions across the Gulf South since our founding in 2011.",
  },
  {
    question: "How much experience does your team have?",
    answer:
      "Our leadership team brings over 150 years of combined engineering experience. We're led by Manish Mardia, P.E., and supported by seasoned professionals including Mark Wingate (EVP), Jim Wilson (VP), and Scott Chehardy (VP).",
  },
  {
    question: "Where are your offices located?",
    answer:
      "We have four offices across the Gulf South:\n\u2022 Metairie, LA \u2014 4508 Clearview Pkwy, Suite 200\n\u2022 New Orleans, LA \u2014 4640 Carrollton Ave, Suite 220\n\u2022 Houston, TX \u2014 13850 Gulf Freeway, Suite 202A\n\u2022 Prairieville, LA \u2014 16018 Highway 73",
  },
  {
    question: "What services do you offer?",
    answer:
      "Our core services include Public Infrastructure, Flood Control, Water & Wastewater Systems, Ecosystem Restoration, Coastal Restoration, Hydraulic & Hydrologic Modeling, and Database/GIS Mapping.",
  },
  {
    question: "Is MSMM a certified DBE?",
    answer:
      "Yes! MSMM Engineering is a certified Disadvantaged Business Enterprise (DBE). We're also a small business committed to delivering large-scale impact on critical infrastructure projects.",
  },
  {
    question: "How can I contact you?",
    answer:
      "You can reach our main office at (504) 570-6098, or visit our Contact page to send us a message directly. We'd love to hear from you!",
  },
];

/* Small arrow icon for question buttons */
function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleQuestion(question: string) {
    const match = FAQ.find(
      (f) => f.question.toLowerCase() === question.toLowerCase()
    );
    setActiveQuestion(question);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      {
        role: "bot",
        text:
          match?.answer ??
          "I don't have an answer for that yet. Please visit our Contact page or call us at (504) 570-6098!",
      },
    ]);
  }

  function handleBack() {
    setActiveQuestion(null);
  }

  const asked = new Set(
    messages.filter((m) => m.role === "user").map((m) => m.text.toLowerCase())
  );
  const suggestions = FAQ.filter(
    (f) => !asked.has(f.question.toLowerCase())
  );

  // Get the last bot answer (for detail view)
  const lastBotMsg = [...messages].reverse().find((m) => m.role === "bot");

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          if (open) {
            setActiveQuestion(null);
          }
        }}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`chatbot-fab fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full text-white cursor-pointer ${open ? "chatbot-fab-open" : ""}`}
      >
        <span className="chatbot-icon">
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3l3.5 3.5a.7.7 0 0 0 1 0L15 18h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"
                fill="white"
                opacity="0.2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="8" cy="10" r="1.25" fill="white">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" begin="0s" />
              </circle>
              <circle cx="12" cy="10" r="1.25" fill="white">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" begin="0.2s" />
              </circle>
              <circle cx="16" cy="10" r="1.25" fill="white">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite" begin="0.4s" />
              </circle>
            </svg>
          )}
        </span>
      </button>

      {/* Chat popup */}
      {open && (
        <div className="chatbot-window fixed bottom-[72px] right-3 sm:bottom-24 sm:right-6 z-50 flex w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-[0_24px_80px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)] max-h-[75vh] sm:max-h-[80vh] sm:w-[360px] md:w-[380px]">

          {/* ── Header ── */}
          <div className="chatbot-header relative overflow-hidden px-5 pb-5 pt-6">
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/[0.07]" />
            <div className="absolute -right-2 top-8 h-14 w-14 rounded-full bg-white/[0.05]" />
            <div className="absolute left-1/2 -bottom-3 h-10 w-10 rounded-full bg-white/[0.04]" />

            <div className="relative flex items-center gap-3.5">
              {/* Avatar */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/25">
                <span className="text-base font-bold text-white tracking-tight">M</span>
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-white leading-tight tracking-[-0.01em]">
                  MSMM Engineering
                </p>
                <p className="mt-0.5 text-xs text-white/60 font-medium">
                  Quick answers about our firm
                </p>
              </div>
            </div>

            {/* Greeting */}
            <p className="relative mt-4 text-[13px] leading-relaxed text-white/80">
              Have a question? Tap a topic below and we&apos;ll get you an answer right away.
            </p>
          </div>

          {/* ── Body ── */}
          <div ref={scrollRef} className="chatbot-body flex-1 overflow-y-auto">
            {activeQuestion && lastBotMsg ? (
              /* ── Answer detail view ── */
              <div className="px-5 py-5">
                <button
                  onClick={handleBack}
                  className="group mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-foreground/50 uppercase tracking-wide transition-colors hover:text-primary cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:-translate-x-0.5"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  All topics
                </button>

                {/* Question */}
                <div className="mb-4 rounded-2xl bg-secondary/[0.06] border border-secondary/10 px-5 py-4">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
                    Question
                  </span>
                  <p className="mt-1.5 text-[15px] font-bold text-foreground leading-snug">
                    {activeQuestion}
                  </p>
                </div>

                {/* Answer */}
                <div className="chatbot-answer relative rounded-2xl border border-border bg-white px-5 py-4 shadow-sm">
                  <div className="absolute left-5 top-0 h-[3px] w-10 -translate-y-1/2 rounded-full bg-primary" />
                  <p className="text-[14px] leading-[1.75] text-foreground whitespace-pre-line">
                    {lastBotMsg.text}
                  </p>
                </div>

                {/* More questions */}
                {suggestions.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-foreground/40">
                      More questions
                    </p>
                    <div className="space-y-2">
                      {suggestions.map((faq) => {
                        const idx = FAQ.findIndex((f) => f.question === faq.question);
                        const num = String(idx + 1).padStart(2, "0");
                        return (
                          <button
                            key={faq.question}
                            onClick={() => handleQuestion(faq.question)}
                            className="group flex w-full items-center gap-3.5 rounded-xl border border-border bg-white px-4 py-3.5 text-left transition-all hover:border-primary/30 hover:shadow-sm cursor-pointer"
                          >
                            <span className="shrink-0 text-xs font-bold text-primary/50 group-hover:text-primary transition-colors">
                              {num}
                            </span>
                            <span className="flex-1 text-[13.5px] font-semibold text-foreground group-hover:text-primary transition-colors">
                              {faq.question}
                            </span>
                            <ArrowIcon />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Questions list view ── */
              <div className="px-5 py-5">
                <p className="mb-3.5 text-[11px] font-bold uppercase tracking-widest text-foreground/40">
                  Frequently asked
                </p>
                <div className="space-y-2.5">
                  {FAQ.map((faq, i) => {
                    const num = String(i + 1).padStart(2, "0");
                    const wasAsked = asked.has(faq.question.toLowerCase());
                    return (
                      <button
                        key={faq.question}
                        onClick={() => handleQuestion(faq.question)}
                        className="chatbot-question-btn group flex w-full items-center gap-3.5 rounded-xl border border-border bg-white px-4 py-4 text-left transition-all hover:border-primary/30 hover:shadow-md cursor-pointer"
                        style={{
                          animationDelay: `${i * 60}ms`,
                        }}
                      >
                        {/* Number */}
                        <span
                          className={`shrink-0 text-sm font-bold tabular-nums transition-colors ${
                            wasAsked
                              ? "text-foreground/20"
                              : "text-primary/40 group-hover:text-primary"
                          }`}
                        >
                          {num}
                        </span>

                        {/* Question text */}
                        <span
                          className={`flex-1 text-[14px] font-semibold leading-snug transition-colors ${
                            wasAsked
                              ? "text-foreground/30"
                              : "text-foreground group-hover:text-primary"
                          }`}
                        >
                          {faq.question}
                        </span>

                        {/* Arrow */}
                        <span className={wasAsked ? "text-foreground/20" : "text-foreground/40 group-hover:text-primary"}>
                          <ArrowIcon />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="border-t border-border/50 px-5 py-3">
            <p className="text-center text-[11px] text-muted/60">
              Need more help?{" "}
              <a
                href="/contact"
                className="font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
