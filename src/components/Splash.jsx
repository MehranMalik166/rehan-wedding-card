import { motion } from "framer-motion";
import weddingData from "../data/weddingData";
import { Flowers, Lantern, Mosque, Pic, archPath } from "./Decor";

const w = weddingData;
const lat = "repeating-linear-gradient(45deg,rgba(184,151,90,.55) 0 1px,transparent 1px 8px),repeating-linear-gradient(-45deg,rgba(184,151,90,.55) 0 1px,transparent 1px 8px)";

const sway = (d, o) => ({ 
  animate: { rotate: [0, 2.5, 0] }, 
  transition: { duration: d, repeat: Infinity, ease: "easeInOut" }, 
  style: { transformOrigin: o } 
});

const Jali = ({ side }) => (
  <div 
    className={`absolute bottom-[5%] z-[5] h-[32%] w-[8%] rounded-t-[999px] border border-[#b8975a]/70 bg-[#f4eddc] ${side === "l" ? "-left-[9%]" : "-right-[9%]"}`} 
    style={{ backgroundImage: lat }} 
  />
);

export default function Splash({ revealed }) {
  const up = (d) => ({ 
    initial: { opacity: 0, y: 26, filter: "blur(8px)" }, 
    animate: revealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}, 
    transition: { duration: 1.2, delay: d, ease: [0.22, 1, 0.36, 1] } 
  });
  
  // Naam ke liye extra strong shadow taake peeche ki image se alag dikhe
  const nameShadow = { textShadow: "0px 2px 10px rgba(255,255,255,1), 0px 4px 20px rgba(255,255,255,0.8)" };
  
  // Font ka size aur bada kar diya hai
  const nm = "font-script text-[clamp(3.5rem,16vw,5.5rem)] leading-[0.9] text-[#3b2e1d] drop-shadow-sm";

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden" style={{ background: "radial-gradient(90% 60% at 50% 30%,#fbf7ee,#efe6d0 70%,#e6dabd)" }}>
      
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="archClip" clipPathUnits="objectBoundingBox">
            <path d={archPath} transform="scale(0.0033333 0.0019231)" />
          </clipPath>
        </defs>
      </svg>

      {/* BACKGROUND GLOW */}
      <motion.div 
        className="absolute left-1/2 top-[25%] h-[80vmin] w-[80vmin] -translate-x-1/2 rounded-full bg-[#f3dca0]/40 blur-3xl" 
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.12, 1] }} 
        transition={{ duration: 7, repeat: Infinity }} 
      />

      {/* FLOWERS */}
      <motion.div className="absolute -left-4 -top-4 z-20 w-36 md:w-52" {...sway(7, "0 0")}><Flowers className="w-full" /></motion.div>
      <motion.div className="absolute -right-4 -top-4 z-20 w-36 md:w-52 -scale-x-100" {...sway(8, "100% 0")}><Flowers className="w-full" /></motion.div>
      
      <motion.div className="absolute -left-8 top-[40%] z-20 w-24 md:w-36 rotate-90" {...sway(9, "0 0")}><Flowers className="w-full" /></motion.div>
      <motion.div className="absolute -right-8 top-[40%] z-20 w-24 md:w-36 -rotate-90 -scale-x-100" {...sway(10, "100% 0")}><Flowers className="w-full" /></motion.div>
      
      <Flowers className="absolute -bottom-8 -left-8 z-20 w-32 -scale-y-100 opacity-90 md:w-48" />
      <Flowers className="absolute -bottom-8 -right-8 z-20 w-32 -scale-100 opacity-90 md:w-48" />

      {/* MAIN ARCH CONTAINER (Kamaan ko thoda bada aur lamba kiya hai) */}
      <div className="relative mx-auto mt-[5svh] h-[90svh] w-[min(96vw,490px)]">
        <Jali side="l" /><Jali side="r" />
        
        {/* ARCH INNER SHADOW & SCENE */}
        <div className="absolute inset-0" style={{ clipPath: "url(#archClip)", boxShadow: "inset 0 0 50px rgba(184,151,90,0.6)" }}>
          <motion.div className="h-full w-full" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}>
            <Pic src={w.scene} className="h-full w-full object-cover object-top">
              <div className="flex h-full w-full items-end bg-gradient-to-b from-[#cfc2e6]/30 via-transparent to-[#f8e7c6]/50">
                <Mosque className="w-full" />
              </div>
            </Pic>
          </motion.div>
          
          <motion.div 
            className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent" 
            animate={{ x: ["-120%", "420%"] }} 
            transition={{ duration: 6, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }} 
          />
        </div>

        {/* ARCH BORDERS */}
        <svg viewBox="0 0 300 520" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-[6] h-full w-full overflow-visible">
          <motion.path d={archPath} fill="none" stroke="#f1ead8" strokeWidth="16" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={revealed ? { pathLength: 1 } : {}} transition={{ duration: 2.2 }} />
          <motion.path d={archPath} fill="none" stroke="#b8975a" strokeWidth="1.5" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={revealed ? { pathLength: 1 } : {}} transition={{ duration: 2.6 }} />
          <motion.path d={archPath} fill="none" stroke="#b8975a" strokeOpacity=".55" vectorEffect="non-scaling-stroke" transform="translate(150 270) scale(1.04) translate(-150 -270)" initial={{ pathLength: 0 }} animate={revealed ? { pathLength: 1 } : {}} transition={{ duration: 3, delay: 0.4 }} />
        </svg>

        <div className="absolute left-1/2 top-[0.8%] z-[7] h-3 w-3 -translate-x-1/2 rounded-full bg-[#b8975a] shadow-[0_0_12px_#e3c98a]" />

        {/* LANTERNS */}
        <Lantern className="absolute left-[1%] top-[16%] z-[8] w-6 md:w-8" d={0} />
        <Lantern className="absolute right-[1%] top-[16%] z-[8] w-6 md:w-8" d={1} />
        <Lantern className="absolute left-[4%] top-[32%] z-[8] w-4 md:w-6" d={0.5} />
        <Lantern className="absolute right-[4%] top-[32%] z-[8] w-4 md:w-6" d={1.5} />

        {/* TEXT CONTENT (Naam ko bada kiya aur white shadow di hai taake clear dikhe) */}
     <div className="absolute inset-x-0 top-[19%] z-[10] flex flex-col items-center px-4 text-center" style={nameShadow}>
          <motion.p {...up(0.4)} className="font-serif text-xs md:text-sm uppercase tracking-[0.2em] text-[#8a6d34]">Welcome to the</motion.p>
          <motion.p {...up(0.7)} className="font-serif text-xl md:text-2xl italic mt-1 text-[#6b5a44]">Nikkah Ceremony</motion.p>
          <motion.p {...up(0.9)} className="font-serif text-xs italic my-2 text-[#8a6d34]">of</motion.p>
          
          {/* Groom Name */}
          <motion.p {...up(1.2)} className={`mt-1 ${nm}`}>{w.groomShort}</motion.p>
           <span className="text-2xl md:text-3xl text-[#b8975a]">& </span>
          {/* Ampersand & Bride Name */}
          <motion.p {...up(1.5)} className={`-mt-2 ${nm}`}>
           
            {w.brideShort}
          </motion.p>
          
          <motion.p {...up(1.9)} className="mt-4 text-[#b8975a] text-xs tracking-widest">✦ ✦ ✦</motion.p>
        </div>
      </div>

      {/* PARTICLES */}
      {Array.from({ length: 16 }, (_, i) => (
        <motion.span key={i} className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#e3c98a]" style={{ left: `${(i * 37) % 100}%`, bottom: "-2%" }}
          animate={{ y: [0, -800], opacity: [0, 0.9, 0] }} transition={{ duration: 8 + (i % 5), delay: (i % 7) * 0.9, repeat: Infinity, ease: "easeOut" }} />
      ))}

      {/* BOTTOM SCROLL */}
      <motion.p initial={{ opacity: 0 }} animate={revealed ? { opacity: 1 } : {}} transition={{ delay: 3 }} className="absolute bottom- left-1/2 z-10 -translate-x-1/2 text-center font-script text-xl md:text-2xl text-[#8a6d34]">
        Scroll down<span className="block animate-bounce text-lg leading-none">⌄</span>
      </motion.p>
    </section>
  );
}