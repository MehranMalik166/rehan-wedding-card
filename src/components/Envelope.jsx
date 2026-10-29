import { useRef, useState } from "react";
import { motion } from "framer-motion";
import weddingData from "../data/weddingData";

// Video pehle frame par ruka rehta hai. TAP TO OPEN -> envelope khulta hai -> invitation andar se nikalta hai.
// Badi screen par video phone-size column me dikhta hai (stretch nahi hota).
export default function Envelope({ onTap, onEmerge, onDone }) {
  const v = useRef(null);
  const em = useRef(false);
  const [st, setSt] = useState("idle");
  const [bad, setBad] = useState(false);
  const finish = () => {
    setSt("done");
    setTimeout(onDone, 900);
  };
  const emerge = () => {
    if (em.current) return;
    em.current = true;
    onEmerge?.();
    setTimeout(finish, 1500);
  };
  const tap = () => {
    if (st !== "idle") return;
    setSt("play");
    onTap?.();
    if (bad || !v.current) return void setTimeout(emerge, 1500);
    v.current.play().catch(() => {
      setBad(true);
      setTimeout(emerge, 1500);
    });
  };
  const open = st !== "idle";
  const e = weddingData.envelope;
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-[#f1ead9]"
      animate={{ opacity: st === "done" ? 0 : 1 }}
      transition={{ duration: 0.9 }}
    >
      <div className="relative mx-auto h-full w-full max-w-[480px] overflow-hidden md:shadow-[0_0_90px_rgba(120,90,40,.28)]">
        {!bad ? (
          <video
            ref={v}
            src={e.video}
            poster={e.poster}
            muted
            playsInline
            preload="auto"
            onEnded={emerge}
            onTimeUpdate={(ev) => {
              const t = ev.currentTarget;
              if (t.duration && t.currentTime >= t.duration - 1) emerge();
            }}
            onError={() => setBad(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0 grid place-items-center"
            style={{
              perspective: 1000,
              background: "radial-gradient(circle at 50% 40%,#fbf7ee,#eadfc6)",
            }}
          >
            <div className="relative h-[300px] w-[min(82vw,340px)]">
              <div className="absolute inset-0 rounded-md border border-[#c4a46a]/70 bg-[#f6efdc]" />
              <motion.div
                className="absolute inset-x-0 top-0 h-[55%] origin-top bg-[#eadfc2]"
                style={{ clipPath: "polygon(0 0,100% 0,50% 100%)" }}
                animate={open ? { rotateX: 180 } : {}}
                transition={{ duration: 0.9 }}
              />
            </div>
          </div>
        )}
        {/* Naya Tap-to-Open: ghoomta text ring + sunehri seal */}
        <motion.button
          onClick={tap}
          aria-label="Tap to open"
          className="absolute inset-0 m-auto grid h-32 w-32 cursor-pointer place-items-center rounded-full"
          animate={open ? { opacity: 0, scale: 0.6 } : {}}
          transition={{ duration: 0.5 }}
        >
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-3 rounded-full border border-[#c4a46a]"
              animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2 }}
            />
          ))}
          <span className="absolute inset-0 rounded-full border border-[#c4a46a]/70 bg-white/55 shadow-lg backdrop-blur-md" />
          <motion.svg
            viewBox="0 0 120 120"
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <path
                id="ring"
                d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1 -90 0"
              />
            </defs>
            <text
              fontSize="10.5"
              fontWeight="600"
              fill="#8a6d34"
              fontFamily="Cormorant Garamond, serif"
              textLength="278"
              lengthAdjust="spacing"
            >
              <textPath href="#ring">TAP TO OPEN ✦ TAP TO OPEN ✦ </textPath>
            </text>
          </motion.svg>
          <span
            className="relative grid h-14 w-14 place-items-center rounded-full text-2xl text-[#5a4420]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%,#f8ebc0,#c9ad6e 60%,#9c7e3f)",
              boxShadow:
                "inset 0 2px 4px rgba(255,255,255,.7),0 6px 14px rgba(120,90,30,.4)",
            }}
          >
            ☾
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
