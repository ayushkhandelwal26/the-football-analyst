import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, BellRing, Cpu, PlayCircle, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";

const LOGO_URL = "https://i.postimg.cc/dVgVdhQ4/the-football-analyst.png";

const COLORS = {
  bg: "#0D0D0D",
  panel: "#1A1A1A",
  neon: "#00FF87",
  orange: "#FF4D00",
  text: "#EAEAEA",
};

const TELEGRAM_LINK = "https://t.me/+your_channel_invite";
const WHATSAPP_LINK = "https://wa.me/your_phone_or_group";

const HEADLINES = [
  "Data-Driven Wins.",
  "Community-Powered Profits.",
  "Your Edge, Delivered.",
];

const WIN_CARDS = [
  { match: "MAN CITY vs LIVERPOOL", pick: "Over 2.5 Goals", stats: { xG: "3.8", Form: "85%", "Key Player Fit": "100%" } },
  { match: "REAL MADRID vs ATLETICO", pick: "BTTS: Yes", stats: { xG: "3.1", Form: "78%", "Derby Intensity": "High" } },
  { match: "DORTMUND vs BAYERN", pick: "Bayern -0.5 AH", stats: { xThreat: "2.4", PPDA: "9.2", Momentum: "Strong" } },
  { match: "INTER vs NAPOLI", pick: "Inter ML", stats: { xGDelta: "+0.9", Form: "82%", "Home Edge": "Yes" } },
];

const TICKER_MESSAGES = [
  "John D. is on a 5-win streak!",
  "🔥 INSIDER TIP just dropped for the Madrid derby!",
  "Sarah K.: ‘That BTTS tip was gold!’",
  "New member Rahul joined the Insiders.",
  "Live odds shift detected for EPL late game.",
  "Vipul: ‘Cashout hit at 78th min, wow.’",
];

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
}

function openDeepLink(primary, fallback) {
  const a = document.createElement("a");
  a.style.display = "none";
  if (isMobile()) {
    a.href = primary;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { window.location.href = fallback; }, 400);
  } else {
    window.open(fallback, "_blank");
  }
}

function fireConfettiFrom(el) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  confetti({
    particleCount: 70,
    spread: 55,
    origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
    ticks: 180,
    scalar: 0.9,
  });
}

const CLICK_SOUND = "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCA";

function useSound(enabled) {
  const audioRef = useRef(null);
  useEffect(() => {
    if (enabled && !audioRef.current) {
      const a = new Audio(CLICK_SOUND);
      a.volume = 0.2;
      audioRef.current = a;
    }
  }, [enabled]);
  return {
    play: () => {
      if (enabled && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    },
  };
}

function useRotatingText(texts, interval = 3000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % texts.length), interval);
    return () => clearInterval(id);
  }, [texts, interval]);
  return texts[index];
}

function GlowButton({ label, icon, color = COLORS.neon, onClick, className = "" }) {
  const ref = useRef(null);
  return (
    <motion.button
      ref={ref}
      onClick={(e) => { onClick?.(e); fireConfettiFrom(ref.current); }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold tracking-wide shadow-lg focus:outline-none transition-all ${className}`}
      style={{
        background: `radial-gradient(120% 120% at 50% 120%, ${color}22 0%, ${COLORS.panel} 60%)`,
        color: COLORS.text,
        boxShadow: `0 0 20px ${color}44, inset 0 0 12px ${color}22`,
        border: `1px solid ${color}66`,
      }}
    >
      <span className="absolute -inset-0.5 rounded-full animate-pulse" style={{ boxShadow: `0 0 30px ${color}33` }} />
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {label}
      </span>
    </motion.button>
  );
}

function Hero({ onTelegram, onWhatsApp, soundEnabled, setSoundEnabled }) {
  const headline = useRotatingText(HEADLINES, 3000);
  const { play } = useSound(soundEnabled);

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden" style={{ background: COLORS.bg }}>
      <div className="absolute inset-0 opacity-40">
        <video className="h-full w-full object-cover" src="https://cdn.coverr.co/videos/coverr-soccer-players-kicking-ball-5991/1080p.mp4" autoPlay loop muted playsInline />
      </div>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pt-28 text-center text-white md:pt-36">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-6 text-sm text-gray-300">
          THE FOOTBALL ANALYST • INSIDER HUB
        </motion.div>

        <img src={LOGO_URL} alt="THE FOOTBALL ANALYST" className="w-32 h-32 mb-4 drop-shadow-lg" />

        <AnimatePresence mode="wait">
          <motion.h1 key={headline} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="text-4xl font-extrabold md:text-6xl" style={{ letterSpacing: "0.5px" }}>
            {headline}
          </motion.h1>
        </AnimatePresence>

        <p className="mt-4 max-w-2xl text-base text-gray-300 md:text-lg">
          The dark-mode nerve center for strategic bettors. Join the community, get actionable insights, and win together.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <GlowButton label="JOIN THE TELEGRAM INSIDERS" icon={<PlayCircle size={18} />} color={COLORS.neon} onClick={() => { play(); openDeepLink("tg://resolve?domain=thefootballanalyst", TELEGRAM_LINK); }} />
          <GlowButton label="GET WHATSAPP ALERTS" icon={<BellRing size={18} />} color={COLORS.orange} onClick={() => { play(); openDeepLink("whatsapp://send?phone=0000000000", WHATSAPP_LINK); }} />
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-gray-400">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 accent-[#00FF87]" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} />
            Subtle hover/click sound
          </label>
        </div>

        <div className="mt-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300">
          <Users size={14} />
          <span>12,678 members and growing</span>
        </div>
      </div>
    </section>
  );
}

function Card({ data }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="group h-56 w-80 cursor-pointer [perspective:1000px]" onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)} onClick={() => setFlipped((f) => !f)}>
      <div className={`relative h-full w-full rounded-2xl border border-white/10 bg-[${COLORS.panel}] shadow-lg transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        <div className="absolute inset-0 flex h-full w-full flex-col justify-between rounded-2xl bg-gradient-to-br from-white/5 to-white/0 p-5 [backface-visibility:hidden]">
          <div className="text-xs text-gray-400">Last Week’s Winning Play</div>
          <div>
            <div className="text-lg font-bold text-white">{data.match}</div>
            <div className="mt-2 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">Pick: {data.pick}</div>
          </div>
          <div className="flex items-center gap-2 text-emerald-400"><span className="text-xs">WIN</span></div>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black/60 to-black/30 p-5 text-sm text-gray-200 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="mb-2 font-semibold text-white">Why we picked it</div>
          <ul className="space-y-1">
            {Object.entries(data.stats).map(([k, v]) => (
              <li key={k} className="flex items-center justify-between border-b border-white/5 py-1">
                <span className="text-gray-400">{k}</span>
                <span className="font-medium text-white">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-xs text-gray-400">Hover / tap to flip back</div>
        </div>
      </div>
    </div>
  );
}

function Carousel() {
  const [index, setIndex] = useState(0);
  const count = WIN_CARDS.length;
  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);
  useEffect(() => { const id = setInterval(next, 4000); return () => clearInterval(id); }, []);
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-6 text-center text-2xl font-extrabold text-white md:text-3xl">Last Week’s Winning Plays</h2>
      <div className="relative flex items-center justify-center">
        <button onClick={prev} className="absolute left-2 z-10 rounded-full border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"><ChevronLeft /></button>
        <div className="flex w-full items-center justify-center gap-6 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div key={index} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 place-items-center gap-6 md:grid-cols-2">
              <Card data={WIN_CARDS[index]} />
              <Card data={WIN_CARDS[(index + 1) % count]} />
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={next} className="absolute right-2 z-10 rounded-full border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"><ChevronRight /></button>
      </div>
    </section>
  );
}

function LiveTicker() {
  const row = useMemo(() => [...TICKER_MESSAGES, ...TICKER_MESSAGES, ...TICKER_MESSAGES], []);
  return (
    <section className="relative w-full border-y border-white/10 bg-black/60 py-3">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 text-emerald-300">
        <span className="text-xs font-semibold tracking-wider">THE COMMUNITY IS BUZZING…</span>
      </div>
      <div className="mt-2 overflow-hidden">
        <motion.div className="flex min-w-full items-center gap-8 whitespace-nowrap px-4 text-sm text-gray-200" animate={{ x: [0, -800] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          {row.map((m, i) => (<span key={i} className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {m}</span>))}
        </motion.div>
      </div>
    </section>
  );
}

function ConsoleTile({ icon, title, text }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(26,26,26,0.9)] p-6 shadow-xl" style={{ boxShadow: `inset 0 0 0 1px #ffffff0d, 0 10px 30px #00000080` }}>
      <div className="mb-4 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-3 text-emerald-300">{icon}</div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{text}</p>
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full" style={{ boxShadow: `0 0 80px ${COLORS.neon}22` }} />
    </motion.div>
  );
}

function ValueConsole() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-10 text-center text-2xl font-extrabold text-white md:text-3xl">How We Generate Your Edge</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ConsoleTile icon={<Cpu />} title="Deep Data Analysis" text="We go beyond the table. xG, xA, PPDA—we translate the numbers into actionable insights." />
        <ConsoleTile icon={<Users />} title="Expert Consensus" text="No single opinion rules. Our picks are vetted by a council of seasoned analysts." />
        <ConsoleTile icon={<BellRing />} title="Instant Alerts" text="Get bets delivered the moment the line is sharp. Speed is profit." />
      </div>
    </section>
  );
}

function FinalGateway({ onTelegram, onWhatsApp }) {
  return (
    <section className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
      <h2 className="text-3xl font-extrabold text-white md:text-4xl">The Final Whistle is Approaching. Are You In or Out?</h2>
      <p className="mt-3 max-w-2xl text-gray-300">Join <span className="text-emerald-400">12,678</span> savvy bettors who are already winning. Your next big play is one click away.</p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <GlowButton label="JOIN THE TELEGRAM INSIDERS" icon={<PlayCircle size={18} />} color={COLORS.neon} onClick={onTelegram} />
        <GlowButton label="GET WHATSAPP ALERTS" icon={<BellRing size={18} />} color={COLORS.orange} onClick={onWhatsApp} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-10 max-w-6xl px-4 pb-10 text-xs text-gray-400">
      <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row">
        <div className="flex items-center gap-2"><ShieldAlert size={14} /><span>Please gamble responsibly. Must be 18+.</span></div>
        <div className="text-[11px] text-gray-500">© {new Date().getFullYear()} THE FOOTBALL ANALYST. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { play } = useSound(soundEnabled);

  const onTelegram = () => { play(); openDeepLink("tg://resolve?domain=thefootballanalyst", TELEGRAM_LINK); };
  const onWhatsApp = () => { play(); openDeepLink("whatsapp://send?phone=0000000000", WHATSAPP_LINK); };

  useEffect(() => { document.documentElement.style.backgroundColor = COLORS.bg; }, []);

  return (
    <div className="min-h-screen w-full" style={{ background: COLORS.bg }}>
      <Hero onTelegram={onTelegram} onWhatsApp={onWhatsApp} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
      <Carousel />
      <LiveTicker />
      <ValueConsole />
      <FinalGateway onTelegram={onTelegram} onWhatsApp={onWhatsApp} />
      <Footer />
    </div>
  );
}