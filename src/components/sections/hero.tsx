import Link from "next/link";
import { Container } from "@/components/ui";

const SERVICES = [
  "Flood Protection",
  "Water Systems",
  "Coastal Restoration",
  "Civil Infrastructure",
];

const PARTICLES = [
  { size: 4, top: "10%", left: "8%", duration: 12, delay: 0 },
  { size: 3, top: "18%", left: "78%", duration: 15, delay: 2 },
  { size: 5, top: "42%", left: "68%", duration: 18, delay: 1 },
  { size: 3, top: "52%", left: "15%", duration: 14, delay: 3 },
  { size: 4, top: "28%", left: "50%", duration: 16, delay: 0.5 },
  { size: 3, top: "60%", left: "38%", duration: 13, delay: 2.5 },
  { size: 4, top: "16%", left: "32%", duration: 17, delay: 1.5 },
  { size: 3, top: "35%", left: "85%", duration: 11, delay: 4 },
  { size: 5, top: "8%", left: "60%", duration: 14, delay: 1 },
  { size: 3, top: "48%", left: "25%", duration: 16, delay: 3.5 },
  { size: 4, top: "22%", left: "92%", duration: 13, delay: 0 },
  { size: 3, top: "58%", left: "55%", duration: 15, delay: 2 },
];

function HeroWord({ word, delay, accent }: { word: string; delay: number; accent?: boolean }) {
  return (
    <span className="inline-block overflow-hidden">
      <span
        className={`inline-block ${accent ? "text-primary-light" : ""}`}
        style={{
          animation: `hero-word-up 800ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms both`,
        }}
      >
        {word}
      </span>
    </span>
  );
}

/* ─── Levee cross-section SVG ─── */
function LeveeSilhouette() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[42%] md:h-[48%] pointer-events-none" aria-hidden="true">
      {/* ═══ FULL-WIDTH WATER ═══ */}
      {/* Deep water base — spans entire bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] overflow-hidden">
        {/* Deep water gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(30,58,95,0) 0%, rgba(30,58,95,0.35) 30%, rgba(20,42,69,0.5) 100%)",
          }}
        />

        {/* Wave layer 1 — big swells, lively motion */}
        <div
          className="absolute bottom-0 left-0 h-full"
          style={{
            width: "200%",
            animation: "wave-live 6s ease-in-out infinite",
          }}
        >
          <svg viewBox="0 0 2400 200" fill="none" className="absolute bottom-0 h-full w-full" preserveAspectRatio="none">
            <path
              d="M0,50 C120,20 240,80 360,50 C480,20 600,80 720,50 C840,20 960,80 1080,50 C1200,20 1320,80 1440,50 C1560,20 1680,80 1800,50 C1920,20 2040,80 2160,50 C2280,20 2400,80 2400,50 L2400,200 L0,200 Z"
              fill="rgba(42,80,128,0.45)"
            />
          </svg>
        </div>

        {/* Wave layer 2 — mid swells, counter-direction */}
        <div
          className="absolute bottom-0 left-0 h-full"
          style={{
            width: "200%",
            animation: "wave-live-reverse 8s ease-in-out infinite",
          }}
        >
          <svg viewBox="0 0 2400 200" fill="none" className="absolute bottom-0 h-full w-full" preserveAspectRatio="none">
            <path
              d="M0,70 C180,35 300,100 450,65 C600,30 720,100 870,65 C1020,30 1140,100 1290,65 C1440,30 1560,100 1710,65 C1860,30 1980,100 2130,65 C2280,30 2400,70 2400,70 L2400,200 L0,200 Z"
              fill="rgba(42,80,128,0.35)"
            />
          </svg>
        </div>

        {/* Wave layer 3 — fast chop on top */}
        <div
          className="absolute bottom-[20%] left-0 h-[50%]"
          style={{
            width: "200%",
            animation: "wave-live 4s ease-in-out infinite",
          }}
        >
          <svg viewBox="0 0 2400 120" fill="none" className="h-full w-full" preserveAspectRatio="none">
            <path
              d="M0,60 C80,35 160,85 240,60 C320,35 400,85 480,60 C560,35 640,85 720,60 C800,35 880,85 960,60 C1040,35 1120,85 1200,60 C1280,35 1360,85 1440,60 C1520,35 1600,85 1680,60 C1760,35 1840,85 1920,60 C2000,35 2080,85 2160,60 C2240,35 2320,85 2400,60"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Wave layer 4 — secondary ripple line */}
        <div
          className="absolute bottom-[35%] left-0 h-[30%]"
          style={{
            width: "200%",
            animation: "wave-live-reverse 5s ease-in-out 0.5s infinite",
          }}
        >
          <svg viewBox="0 0 2400 80" fill="none" className="h-full w-full" preserveAspectRatio="none">
            <path
              d="M0,40 C100,20 200,60 300,40 C400,20 500,60 600,40 C700,20 800,60 900,40 C1000,20 1100,60 1200,40 C1300,20 1400,60 1500,40 C1600,20 1700,60 1800,40 C1900,20 2000,60 2100,40 C2200,20 2300,60 2400,40"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        {/* Foam / whitecap highlights */}
        <div
          className="absolute bottom-[30%] left-0 h-[15%]"
          style={{
            width: "300%",
            animation: "foam-drift 12s linear infinite",
          }}
        >
          <svg viewBox="0 0 3600 40" fill="none" className="h-full w-full" preserveAspectRatio="none">
            {/* Foam dots scattered along surface */}
            <circle cx="120" cy="20" r="3" fill="rgba(255,255,255,0.3)" />
            <circle cx="380" cy="15" r="2" fill="rgba(255,255,255,0.25)" />
            <circle cx="600" cy="22" r="2.5" fill="rgba(255,255,255,0.3)" />
            <circle cx="850" cy="18" r="2" fill="rgba(255,255,255,0.2)" />
            <circle cx="1100" cy="20" r="3" fill="rgba(255,255,255,0.25)" />
            <circle cx="1350" cy="16" r="2" fill="rgba(255,255,255,0.3)" />
            <circle cx="1600" cy="22" r="2.5" fill="rgba(255,255,255,0.2)" />
            <circle cx="1900" cy="18" r="3" fill="rgba(255,255,255,0.25)" />
            <circle cx="2150" cy="20" r="2" fill="rgba(255,255,255,0.3)" />
            <circle cx="2400" cy="16" r="2.5" fill="rgba(255,255,255,0.25)" />
            <circle cx="2700" cy="22" r="2" fill="rgba(255,255,255,0.2)" />
            <circle cx="2950" cy="18" r="3" fill="rgba(255,255,255,0.3)" />
            <circle cx="3200" cy="20" r="2.5" fill="rgba(255,255,255,0.25)" />
            <circle cx="3450" cy="16" r="2" fill="rgba(255,255,255,0.3)" />
          </svg>
        </div>

        {/* Shimmer/sparkle layer */}
        <div
          className="absolute bottom-[25%] left-[10%] h-2 w-2 rounded-full bg-white/40"
          style={{ animation: "water-shimmer 3s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[32%] left-[35%] h-1.5 w-1.5 rounded-full bg-white/30"
          style={{ animation: "water-shimmer 2.5s ease-in-out 0.8s infinite" }}
        />
        <div
          className="absolute bottom-[28%] left-[60%] h-2 w-2 rounded-full bg-white/35"
          style={{ animation: "water-shimmer 3.5s ease-in-out 1.5s infinite" }}
        />
        <div
          className="absolute bottom-[35%] left-[80%] h-1.5 w-1.5 rounded-full bg-white/25"
          style={{ animation: "water-shimmer 2.8s ease-in-out 0.3s infinite" }}
        />
        <div
          className="absolute bottom-[22%] left-[50%] h-1 w-1 rounded-full bg-white/40"
          style={{ animation: "water-shimmer 2s ease-in-out 2s infinite" }}
        />
        <div
          className="absolute bottom-[40%] left-[25%] h-1.5 w-1.5 rounded-full bg-white/30"
          style={{ animation: "water-shimmer 3.2s ease-in-out 1s infinite" }}
        />
      </div>

      {/* ═══ LEVEE BODY — bold ═══ */}
      {/* Glow/shadow layer */}
      <svg
        viewBox="0 0 1440 400"
        fill="none"
        className="absolute bottom-0 left-0 w-full h-full opacity-[0.22]"
        preserveAspectRatio="none"
      >
        <path
          d="M0,400 L0,300 C50,300 150,300 250,280 C350,260 400,180 500,140 C600,100 650,90 720,90 C790,90 840,100 900,140 C960,180 1000,240 1100,280 L1440,320 L1440,400 Z"
          fill="white"
        />
      </svg>

      {/* Main levee structure */}
      <svg
        viewBox="0 0 1440 400"
        fill="none"
        className="absolute bottom-0 left-0 w-full h-full opacity-[0.32]"
        preserveAspectRatio="none"
      >
        <path
          d="M0,400 L0,320 C80,318 200,310 300,290 C380,274 430,210 520,165 C610,120 660,105 720,105 C780,105 830,120 900,160 C970,200 1020,260 1120,290 L1440,340 L1440,400 Z"
          fill="white"
        />
      </svg>

      {/* ═══ CREST LINE + ENGINEERING DETAILS ═══ */}
      <svg
        viewBox="0 0 1440 400"
        fill="none"
        className="absolute bottom-0 left-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Main crest line — bold red */}
        <path
          d="M0,320 C80,318 200,310 300,290 C380,274 430,210 520,165 C610,120 660,105 720,105 C780,105 830,120 900,160 C970,200 1020,260 1120,290 L1440,340"
          stroke="rgba(225,13,13,0.5)"
          strokeWidth="3"
          fill="none"
        />
        {/* Inner structure lines on slopes */}
        <path
          d="M380,250 L520,165 L650,115"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        <path
          d="M790,115 L900,160 L1040,240"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        {/* Mid-slope elevation markers */}
        <path d="M450,210 L450,190" stroke="rgba(225,13,13,0.3)" strokeWidth="1.5" />
        <path d="M580,145 L580,125" stroke="rgba(225,13,13,0.3)" strokeWidth="1.5" />
        <path d="M860,125 L860,145" stroke="rgba(225,13,13,0.3)" strokeWidth="1.5" />
        <path d="M980,200 L980,180" stroke="rgba(225,13,13,0.3)" strokeWidth="1.5" />
        {/* Crest markers — taller ticks */}
        <line x1="660" y1="90" x2="660" y2="118" stroke="rgba(225,13,13,0.4)" strokeWidth="2" />
        <line x1="690" y1="94" x2="690" y2="118" stroke="rgba(225,13,13,0.3)" strokeWidth="1.5" />
        <line x1="720" y1="90" x2="720" y2="118" stroke="rgba(225,13,13,0.4)" strokeWidth="2" />
        <line x1="750" y1="94" x2="750" y2="118" stroke="rgba(225,13,13,0.3)" strokeWidth="1.5" />
        <line x1="780" y1="90" x2="780" y2="118" stroke="rgba(225,13,13,0.4)" strokeWidth="2" />
      </svg>

      {/* Ground + water level indicators */}
      <svg
        viewBox="0 0 1440 400"
        fill="none"
        className="absolute bottom-0 left-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Protected side ground */}
        <line
          x1="0" y1="320" x2="350" y2="290"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          strokeDasharray="8 6"
        />
        {/* Flood side water level */}
        <line
          x1="1050" y1="280" x2="1440" y2="330"
          stroke="rgba(42,80,128,0.4)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        {/* Cross-section annotation line */}
        <line
          x1="300" y1="380" x2="1140" y2="380"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />
        <line x1="300" y1="375" x2="300" y2="385" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="720" y1="375" x2="720" y2="385" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="1140" y1="375" x2="1140" y2="385" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ─── Topographic contour lines ─── */
function TopoLines() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.12]" aria-hidden="true">
      <svg viewBox="0 0 1440 900" fill="none" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {/* Primary contour cluster — lower right */}
        <ellipse cx="950" cy="620" rx="520" ry="260" stroke="white" strokeWidth="1" fill="none" />
        <ellipse cx="950" cy="620" rx="420" ry="210" stroke="white" strokeWidth="0.8" fill="none" />
        <ellipse cx="950" cy="620" rx="320" ry="160" stroke="white" strokeWidth="0.8" fill="none" />
        <ellipse cx="950" cy="620" rx="220" ry="110" stroke="white" strokeWidth="0.6" fill="none" />
        <ellipse cx="950" cy="620" rx="120" ry="60" stroke="white" strokeWidth="0.6" fill="none" />

        {/* Secondary cluster — upper left */}
        <ellipse cx="180" cy="220" rx="280" ry="200" stroke="white" strokeWidth="0.8" fill="none" />
        <ellipse cx="180" cy="220" rx="200" ry="145" stroke="white" strokeWidth="0.6" fill="none" />
        <ellipse cx="180" cy="220" rx="120" ry="90" stroke="white" strokeWidth="0.6" fill="none" />

        {/* Tertiary cluster — mid */}
        <ellipse cx="600" cy="400" rx="150" ry="100" stroke="white" strokeWidth="0.5" fill="none" />
        <ellipse cx="600" cy="400" rx="90" ry="60" stroke="white" strokeWidth="0.5" fill="none" />
      </svg>
    </div>
  );
}

/* ─── Floating Gulf-native structures ─── */
function FloatingStructures() {
  const structures = [
    // Pump station — top-right area
    {
      top: "10%", left: "72%", size: 80, opacity: 0.3, duration: 10, delay: 0, anim: "structure-float",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="18" width="28" height="20" rx="2" />
          <path d="M14 18V12h20v6" />
          <path d="M24 12V6" />
          <circle cx="20" cy="28" r="4" />
          <circle cx="34" cy="28" r="3" />
          <path d="M10 38h28" />
          <path d="M16 38v4M32 38v4" />
        </svg>
      ),
    },
    // Floodgate / sluice gate — mid-left
    {
      top: "30%", left: "3%", size: 72, opacity: 0.28, duration: 12, delay: 1, anim: "structure-float-reverse",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="14" width="32" height="24" rx="1" />
          <path d="M8 26h32" />
          <path d="M18 14v24M30 14v24" />
          <path d="M4 38h40" />
          <path d="M24 8v6" />
          <path d="M20 8h8" />
          <path d="M14 26v-4h6v4M28 26v-4h6v4" />
        </svg>
      ),
    },
    // Buoy / channel marker — near water area
    {
      top: "50%", left: "84%", size: 56, opacity: 0.35, duration: 7, delay: 0.5, anim: "structure-float",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="rgba(225,13,13,0.9)" strokeWidth="1.8" strokeLinecap="round">
          <path d="M16 4v8" />
          <circle cx="16" cy="16" r="5" fill="rgba(225,13,13,0.25)" />
          <path d="M16 21v4" />
          <path d="M12 28c2-2 6-2 8 0" />
          <path d="M10 30c3-3 9-3 12 0" />
        </svg>
      ),
    },
    // Marsh grass cluster — bottom-left
    {
      top: "58%", left: "8%", size: 76, opacity: 0.3, duration: 9, delay: 0.8, anim: "structure-float-reverse",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 40c0-12 4-20 8-24" />
          <path d="M16 40c0-10 3-18 6-22" />
          <path d="M20 40c0-14 5-22 10-26" />
          <path d="M26 40c0-12 4-18 7-22" />
          <path d="M32 40c0-10 3-16 5-18" />
          <path d="M36 40c0-8 2-14 4-16" />
          <path d="M8 40h32" strokeWidth="1.8" />
        </svg>
      ),
    },
    // Pelican silhouette — upper area
    {
      top: "5%", left: "48%", size: 68, opacity: 0.25, duration: 11, delay: 1.5, anim: "structure-float",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22c4-2 8-6 14-6s8 2 12 0" />
          <path d="M22 16c0-4-2-7-4-8" />
          <path d="M18 8c2-1 5-1 6 1" />
          <path d="M24 9c0 2-1 4-2 7" />
          <path d="M8 22c-2 2-2 4 0 5s6 0 8-2" />
          <path d="M34 22c2 1 4 4 4 8" />
          <path d="M36 30c-2 4-8 8-14 8" />
          <path d="M22 38v4" />
          <path d="M20 42h4" />
        </svg>
      ),
    },
    // Shrimp boat — mid-right near water
    {
      top: "40%", left: "58%", size: 74, opacity: 0.28, duration: 11, delay: 0.3, anim: "structure-float-reverse",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 30h32l-4 8H12l-4-8z" />
          <path d="M20 30V18" />
          <path d="M20 18l12 6" />
          <path d="M20 18l-10 8" />
          <path d="M20 22l10 4" />
          <path d="M28 30V26" />
          <path d="M6 40c3-2 6-2 9 0s6 2 9 0 6-2 9 0 6 2 9 0" />
        </svg>
      ),
    },
    // Water pipe / culvert — left of center
    {
      top: "24%", left: "18%", size: 62, opacity: 0.25, duration: 9, delay: 2, anim: "structure-float",
      icon: (
        <svg viewBox="0 0 40 40" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="8" cy="20" rx="5" ry="8" />
          <path d="M8 12h24" />
          <path d="M8 28h24" />
          <ellipse cx="32" cy="20" rx="5" ry="8" />
          <path d="M13 16h14M13 20h14M13 24h14" strokeWidth="1.2" strokeDasharray="3 2" />
        </svg>
      ),
    },
    // Second buoy — left side near water
    {
      top: "48%", left: "28%", size: 48, opacity: 0.32, duration: 8, delay: 1.2, anim: "structure-float",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" stroke="rgba(225,13,13,0.85)" strokeWidth="1.8" strokeLinecap="round">
          <path d="M16 6v6" />
          <circle cx="16" cy="16" r="4" fill="rgba(225,13,13,0.2)" />
          <path d="M16 20v4" />
          <path d="M12 26c2-1.5 6-1.5 8 0" />
        </svg>
      ),
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {structures.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `${s.anim} ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          {s.icon}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col bg-secondary overflow-hidden">
      {/* ── Background layers ── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Gradient orbs — punched up */}
        <div
          className="absolute -top-1/4 -right-1/4 h-[350px] w-[350px] rounded-full opacity-[0.15] sm:h-[500px] sm:w-[500px] lg:h-[700px] lg:w-[700px]"
          style={{
            background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
            animation: "float-slow 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-1/3 -left-1/4 h-[300px] w-[300px] rounded-full opacity-[0.12] sm:h-[450px] sm:w-[450px] lg:h-[600px] lg:w-[600px]"
          style={{
            background: "radial-gradient(circle, var(--secondary-light) 0%, transparent 70%)",
            animation: "float-slow-reverse 25s ease-in-out infinite",
          }}
        />
        {/* Extra accent orb */}
        <div
          className="absolute top-[20%] left-[40%] h-[350px] w-[350px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, var(--primary-light) 0%, transparent 70%)",
            animation: "float-slow 15s ease-in-out 3s infinite",
          }}
        />

        {/* Particles — bigger, brighter */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/50"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              animation: `${i % 2 === 0 ? "particle-drift" : "particle-drift-2"} ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Topo contour lines */}
      <TopoLines />

      {/* Floating Gulf structures */}
      <FloatingStructures />

      {/* Levee silhouette + water */}
      <LeveeSilhouette />

      {/* ── Content ── */}
      <Container className="relative flex flex-1 flex-col justify-center py-32 lg:py-40">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.1] px-4 py-1.5 text-sm text-white mb-8 backdrop-blur-sm"
            style={{ animation: "fade-in 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both" }}
          >
            <span
              className="mr-2.5 inline-block h-1.5 w-1.5 rounded-full bg-primary-light"
              style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
            />
            Leaders in Quality
          </div>

          {/* Company name */}
          <p
            className="text-sm font-semibold uppercase tracking-[0.25em] text-primary-light md:text-base mb-4"
            style={{ animation: "hero-text-reveal 700ms cubic-bezier(0.16, 1, 0.3, 1) 350ms both" }}
          >
            MSMM Engineering
          </p>

          {/* Heading — word-by-word clip reveal */}
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl leading-[1.08]">
            <span className="block">
              <HeroWord word="From" delay={500} />{" "}
              <HeroWord word="Conception" delay={600} />
            </span>
            <span className="block mt-1 md:mt-2">
              <HeroWord word="to" delay={700} />{" "}
              <HeroWord word="Completion" delay={800} accent />
            </span>
          </h1>

          {/* Service keywords */}
          <div
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/80 md:text-base"
            style={{ animation: "fade-in 600ms cubic-bezier(0.16, 1, 0.3, 1) 1100ms both" }}
          >
            {SERVICES.map((service, i) => (
              <span key={service} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="h-1 w-1 rounded-full bg-white/60" />
                )}
                <span>{service}</span>
              </span>
            ))}
          </div>

          {/* Description */}
          <p
            className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
            style={{ animation: "hero-text-reveal 700ms cubic-bezier(0.16, 1, 0.3, 1) 1200ms both" }}
          >
            New Orleans based engineering firm with 150+ years of combined experience
            designing resilient infrastructure across the Gulf South.
          </p>

          {/* CTA */}
          <div
            className="mt-10"
            style={{ animation: "hero-text-reveal 700ms cubic-bezier(0.16, 1, 0.3, 1) 1400ms both" }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-md bg-primary px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-primary-dark hover:gap-4 hover:shadow-lg hover:shadow-primary/20 btn-shine sm:px-8 sm:py-4 sm:text-lg"
            >
              Explore Our Work
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>

      {/* ── Scroll indicator ── */}
      <div
        className="relative pb-8 flex justify-center z-10"
        style={{ animation: "fade-in 800ms cubic-bezier(0.16, 1, 0.3, 1) 1900ms both" }}
      >
        <div
          className="flex flex-col items-center gap-2 text-white/70"
          style={{ animation: "bounce-scroll 2s ease-in-out infinite 2.5s" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </div>

      {/* ── Bottom accent line ── */}
      <div
        className="relative z-10 h-1 bg-gradient-to-r from-primary via-primary-light to-primary origin-left"
        style={{ animation: "draw-line 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1600ms both" }}
      />
    </section>
  );
}
