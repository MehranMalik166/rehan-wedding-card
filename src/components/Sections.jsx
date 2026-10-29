import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import weddingData from "../data/weddingData";
import { buildWhatsAppMessageLink } from "./inviteLink";
import { Flowers, Pic, archPath } from "./Decor";

const w = weddingData;
const E = [0.22, 1, 0.36, 1];
const R = ({ children, className = "", d = 0, x = 0 }) => (
  <motion.div initial={{ opacity: 0, y: x ? 0 : 38, x }} whileInView={{ opacity: 1, y: 0, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1, delay: d, ease: E }} className={className}>{children}</motion.div>
);
const Orn = () => (
  <motion.svg viewBox="0 0 200 12" className="mx-auto mt-3 w-44">
    <motion.path d="M0 6H82M118 6H200" stroke="#b8975a" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} /><circle cx="100" cy="6" r="3" fill="#b8975a" />
  </motion.svg>
);
const Title = ({ children, sub }) => (
  <R className="mb-12 text-center"><h2 className="font-script text-6xl text-[#8a6d34] md:text-7xl">{children}</h2>{sub && <p className="mt-1 font-serif text-lg italic text-[#8a6d34]/90">{sub}</p>}<Orn /></R>
);
const Sec = ({ children, tint, wide }) => (
  <section className={`relative overflow-hidden px-6 py-24 md:py-32 text-[#4a3b28] ${tint ? "bg-[#efe7d3]" : "bg-[#f8f3e8]"}`}><div className={`relative mx-auto ${wide ? "max-w-5xl" : "max-w-2xl"}`}>{children}</div></section>
);
const Dust = () => Array.from({ length: 10 }, (_, i) => (
  <motion.span key={i} className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#d9bf84]" style={{ left: `${(i * 41) % 100}%`, bottom: 0 }} animate={{ y: [0, -500], opacity: [0, 0.8, 0] }} transition={{ duration: 9 + (i % 4), delay: i * 0.8, repeat: Infinity }} />
));

const S = 128;
function Sc({ label, value, onDone }) {
  const cv = useRef(null);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const c = cv.current, dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = c.height = S * dpr;
    const x = c.getContext("2d"); x.scale(dpr, dpr);
    const g = x.createLinearGradient(0, 0, S, S); g.addColorStop(0, "#efe3c4"); g.addColorStop(0.5, "#c9ad6e"); g.addColorStop(1, "#a88a4a");
    x.fillStyle = g; x.fillRect(0, 0, S, S);
    for (let i = 0; i < 110; i++) { x.fillStyle = `rgba(255,255,255,${Math.random() * 0.5})`; x.fillRect(Math.random() * S, Math.random() * S, 1.5, 1.5); }
    let d = false, l = null, done = false;
    const pos = (e) => { const r = c.getBoundingClientRect(), p = e.touches ? e.touches[0] : e; return [p.clientX - r.left, p.clientY - r.top]; };
    const dig = (e) => { const [px, py] = pos(e); x.globalCompositeOperation = "destination-out"; x.fillStyle = x.strokeStyle = "#000"; x.lineCap = "round"; x.lineWidth = 32; x.beginPath(); if (l) { x.moveTo(l[0], l[1]); x.lineTo(px, py); x.stroke(); } x.arc(px, py, 16, 0, 7); x.fill(); l = [px, py]; };
    const chk = () => { if (done) return; const a = x.getImageData(0, 0, c.width, c.height).data; let n = 0, m = 0; for (let i = 3; i < a.length; i += 16) { m++; if (a[i] < 40) n++; } if (n / m > 0.4) { done = true; setOk(true); onDone(); } };
    const st = (e) => { d = true; l = null; document.documentElement.style.overflow = "hidden"; dig(e); };
    const mv = (e) => { if (!d) return; e.cancelable && e.preventDefault(); dig(e); chk(); };
    const en = () => { d = false; l = null; document.documentElement.style.overflow = ""; chk(); };
    c.addEventListener("mousedown", st); c.addEventListener("mousemove", mv); window.addEventListener("mouseup", en);
    c.addEventListener("touchstart", st, { passive: false }); c.addEventListener("touchmove", mv, { passive: false }); c.addEventListener("touchend", en);
    return () => { window.removeEventListener("mouseup", en); document.documentElement.style.overflow = ""; };
  }, []);
  return (
    <div className="text-center">
      <motion.div animate={ok ? { scale: [1, 1.12, 1] } : {}} className="relative select-none" style={{ width: S, height: S, touchAction: "none" }}>
      <div className={`absolute inset-0 flex items-center justify-center rounded-2xl border border-[#c4a46a]/60 bg-white/85 font-script text-[#4a3b28] shadow-lg text-center leading-tight ${String(value).length > 3 ? 'text-3xl px-1' : 'text-5xl'}`}>
  {value}
</div>
        <canvas ref={cv} className="absolute inset-0 cursor-pointer rounded-2xl transition-opacity duration-700" style={{ width: S, height: S, opacity: ok ? 0 : 1, pointerEvents: ok ? "none" : "auto" }} />
      </motion.div>
      <p className="mt-3 text-sm tracking-[.3em] text-[#8a6d34]">{label}</p>
    </div>
  );
}

const Ring = ({ v, max, l }) => {
  const r = 44, c = 2 * Math.PI * r;
  return (
    <div className="relative grid h-28 w-28 place-items-center md:h-36 md:w-36">
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <circle cx="50" cy="50" r={r} fill="rgba(255,255,255,.6)" stroke="rgba(184,151,90,.35)" strokeWidth="2" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="#b8975a" strokeWidth="3" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(v / max, 1))} style={{ transition: "stroke-dashoffset .9s" }} />
      </svg>
      <div className="text-center leading-none"><b className="font-script text-5xl font-normal text-[#8a6d34] md:text-6xl">{String(v).padStart(2, "0")}</b><i className="mt-1 block text-xs not-italic tracking-[.2em] text-[#8a6d34]">{l}</i></div>
    </div>
  );
};
// const calc = () => { const d = Math.max(new Date(w.weddingDateISO) - Date.now(), 0); return [Math.floor(d / 864e5), Math.floor(d / 36e5) % 24, Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60]; };

// Date scratch + neeche Countdown
const calc = () => {
  const d = Math.max(new Date(w.weddingDateISO) - Date.now(), 0);
  return [
    Math.floor(d / 864e5),
    Math.floor(d / 36e5) % 24,
    Math.floor(d / 6e4) % 60,
    Math.floor(d / 1e3) % 60,
  ];
};

export function DateReveal() {
  const [n, setN] = useState(0);
  const [v, setV] = useState(calc);
  
  useEffect(() => { 
    const i = setInterval(() => setV(calc()), 1000); 
    return () => clearInterval(i); 
  }, []);

  return (
    <Sec wide>
      <Dust />
      <Flowers className="pointer-events-none absolute -left-24 -top-24 w-56 opacity-80 md:w-72" />
      <Flowers className="pointer-events-none absolute -right-24 -top-24 w-56 -scale-x-100 opacity-80 md:w-72" />
      
      <Title sub="✦ Scratch to reveal the date ✦">The Date</Title>
      
      <R className="flex flex-wrap justify-center gap-4 md:gap-8">
        <Sc label="DAY" value={w.date.day} onDone={() => setN((a) => a + 1)} />
        <Sc className='text-[1px]' label="MONTH" value={w.date.month} onDone={() => setN((a) => a + 1)} />
        <Sc label="YEAR" value={w.date.year} onDone={() => setN((a) => a + 1)} />
      </R>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: n === 3 ? 1 : 0, y: n === 3 ? 0 : 10 }} 
        transition={{ duration: 1 }} 
        className="mt-8 text-center font-script text-4xl text-[#b8975a]"
      >
        Save the date ♡
      </motion.p>
      
      <div className="mt-24">
        <Title>The Celebration Begins</Title>
        <R className="grid grid-cols-2 place-items-center gap-5 sm:grid-cols-4">
          {v.map((n2, i) => (
            <Ring key={i} v={n2} max={[365, 24, 60, 60][i]} l={["DAYS", "HOURS", "MINUTES", "SECONDS"][i]} />
          ))}
        </R>
      </div>
    </Sec>
  );
}

const box = { hidden: {}, show: { transition: { staggerChildren: 0.2 } } };
const it = { hidden: { opacity: 0, y: 22, filter: "blur(6px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: E } } };

export function InviteCard() {
  return (
    <Sec tint>
      <Dust />

      <div className="relative left-1/2 flex w-screen -translate-x-1/2 justify-center overflow-hidden px-2 sm:px-4">

        <div className="relative w-full max-w-[560px]">

          <Flowers className="pointer-events-none absolute -left-1 -top-10 z-10 w-28 sm:w-36 md:w-44" />
          <Flowers className="pointer-events-none absolute -right-1 -top-10 z-10 w-28 sm:w-36 md:w-44 -scale-x-100" />

          <svg viewBox="0 0 300 540" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <path d={archPath} fill="rgba(255,255,255,.7)" stroke="#b8975a" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
            <path d={archPath} fill="none" stroke="#b8975a" strokeOpacity=".5" vectorEffect="non-scaling-stroke" transform="translate(150 270) scale(.95) translate(-150 -270)" />
          </svg>

          <motion.div
            variants={box}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative flex flex-col items-center px-4 pb-14 pt-[40%] text-center sm:px-8 sm:pt-[34%]"
          >
            <div className="flex w-full max-w-[92%] flex-col items-center">

              {/* Arabic: chhota + ek line me, arch se door */}
              <motion.p variants={it} dir="rtl" className="whitespace-nowrap font-arabic text-[1.55rem] leading-[1.8] text-[#a8894a] sm:text-3xl">
                بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </motion.p>

              <motion.p variants={it} className="mt-4 text-[10px] leading-relaxed tracking-[.2em] text-[#4a3b28] sm:mt-6 sm:text-xs sm:tracking-[.25em]">
                YOU ARE INVITED TO THE<br />NIKKAH CEREMONY OF
              </motion.p>

              <motion.p variants={it} className="mt-3 font-script text-[2.8rem] leading-none text-[#3b2e1d] sm:mt-4 sm:text-6xl">
                {w.groomShort}
              </motion.p>

              <motion.p variants={it} className="mt-1 text-[9px] leading-relaxed tracking-[.2em] text-[#4a3b28]/80 sm:mt-2 sm:text-[10px] sm:tracking-[.25em]">
                SON OF<br />{w.groomParents}
              </motion.p>

              <motion.p variants={it} className="my-2 font-script text-3xl text-[#b8975a] sm:my-3 sm:text-4xl">
                With
              </motion.p>

              <motion.p variants={it} className="font-script text-[2.8rem] leading-none text-[#3b2e1d] sm:text-6xl">
                {w.brideShort}
              </motion.p>

              <motion.p variants={it} className="mt-1 text-[9px] leading-relaxed tracking-[.2em] text-[#4a3b28]/80 sm:mt-2 sm:text-[10px] sm:tracking-[.25em]">
                DAUGHTER OF<br />{w.brideParents}
              </motion.p>

              <motion.div variants={it} className="mt-4 w-full sm:mt-6">
                <Orn />
              </motion.div>

              <motion.p variants={it} className="mt-4 font-script text-2xl text-[#8a6d34] sm:mt-6 sm:text-3xl">
                Dear Friends and Family,
              </motion.p>

              <motion.p variants={it} className="mt-2 text-[13px] italic leading-snug text-[#4a3b28]/90 sm:text-base">
                {w.invitationText}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </Sec>
  );
}

export function Location() {
  const v2 = w.venue;
  return (
    <Sec wide>
      <Title>Location</Title>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <R x={-50} className="text-center">
          <p className="text-lg tracking-[.35em]">{v2.city}</p><p className="mt-2 font-serif text-3xl italic">{v2.name}</p><p className="mt-2 text-lg opacity-85">{v2.address}</p>
          <a href={v2.mapsUrl} target="_blank" rel="noopener noreferrer" className="relative mt-7 inline-block overflow-hidden rounded-full border border-[#b8975a] px-10 py-3.5 text-sm tracking-[.25em] transition active:scale-95 hover:bg-[#b8975a] hover:text-white">GET DIRECTIONS</a>
        </R>
        <R x={50} className="mx-auto h-80 w-full max-w-sm overflow-hidden rounded-t-[999px] border border-[#b8975a]/60"><Pic src={v2.photo} className="h-full w-full"><div className="h-full w-full bg-gradient-to-b from-[#f3efe6] to-[#d9cdb2]" /></Pic></R>
      </div>
    </Sec>
  );
}

const IC = ["✦", "☾", "❀", "✧", "♡"];
export function Timeline() {
  return (
    <Sec tint><Title>Wedding Timeline</Title>
      <div className="relative mx-auto max-w-xl md:max-w-2xl">
        <motion.div className="absolute left-1/2 top-0 h-full w-px origin-top bg-[#b8975a]/60" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 2 }} />
        {w.timeline.map((e, i) => {
          const text = <div className={i % 2 ? "text-left" : "text-right"}><p className="font-script text-5xl text-[#8a6d34]">{e.time}</p><p className="font-serif text-2xl leading-snug">{e.title}</p></div>;
          const icon = <div className={`flex ${i % 2 ? "justify-end" : "justify-start"}`}><span className="grid h-20 w-20 place-items-center rounded-full border border-[#b8975a]/60 bg-white/80 text-3xl text-[#b8975a] shadow">{IC[i % 5]}</span></div>;
          return (
            <R key={e.time} x={i % 2 ? 50 : -50} className="relative grid grid-cols-2 items-center gap-8 py-8">
              <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b8975a] bg-[#efe7d3]" />
              {i % 2 ? <>{icon}{text}</> : <>{text}{icon}</>}
            </R>);
        })}
      </div>
    </Sec>
  );
}

export function Rsvp() {
  const [f, setF] = useState({ name: "", message: "", att: "Yes" });
  const [sent, setSent] = useState(false);
  const inp = "w-full rounded-xl border border-[#b8975a]/50 bg-white/75 px-5 py-4 font-serif text-xl outline-none placeholder:text-[#4a3b28]/40 focus:border-[#b8975a]";
  return (
    <Sec><Title sub="We would be honoured by your presence">RSVP</Title>
      <div className="mx-auto max-w-md">
        {sent ? <R className="py-8 text-center"><p className="font-script text-6xl text-[#8a6d34]">Thank you!</p><p className="mt-2 text-lg opacity-90">Your blessings have been sent.</p></R> : (
          <form onSubmit={(e) => { e.preventDefault(); window.open(buildWhatsAppMessageLink({ name: f.name, message: f.message, attendance: f.att }), "_blank", "noopener,noreferrer"); setSent(true); }} className="flex flex-col gap-4">
            <input required className={inp} placeholder="Your name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            <textarea required rows={3} className={inp + " resize-none"} placeholder="Your message for the couple..." value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
            <div className="flex gap-3">{[["Yes", "Joyfully accept"], ["No", "Regretfully decline"]].map(([k, l]) => <button type="button" key={k} onClick={() => setF({ ...f, att: k })} className={`flex-1 rounded-xl border px-2 py-3 text-lg ${f.att === k ? "border-[#b8975a] bg-[#b8975a] text-white" : "border-[#b8975a]/50"}`}>{l}</button>)}</div>
            <button className="rounded-full bg-[#b8975a] py-4 text-sm tracking-[.25em] text-white shadow-lg active:scale-95">SEND BLESSINGS</button>
          </form>)}
      </div>
    </Sec>
  );
}

export function Foot() {
  const c = w.credit;
  return (
    <footer className="bg-[#e7e0cf] px-6 py-16 text-center text-[#4a3b28]">
      <p className="text-sm tracking-[.4em] text-[#a8894a]">WITH LOVE &amp; DUAS</p><p className="mt-1 font-serif text-lg italic">{w.families}</p>
      <p className="mt-3 font-script text-7xl text-[#8a6d34]">{w.groomShort} &amp; {w.brideShort}</p><p className="mt-1 text-lg tracking-[.25em]">{w.weddingDateDisplay}</p>
      {/* {c?.enabled && <div className="mt-9 flex flex-col items-center gap-3">
        <a href={c.portfolioUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-[#b8975a]/60 px-7 py-3"><span className="block text-xs tracking-[.3em] opacity-80">DESIGNED &amp; DEVELOPED BY</span><span className="font-script text-4xl text-[#8a6d34]">{c.name} ↗</span></a>
        <a href={c.whatsappUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#b8975a] px-5 py-2 text-sm tracking-[.18em] text-white">CHAT ON WHATSAPP</a></div>} */}
    </footer>
  );
}