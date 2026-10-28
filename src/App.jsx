import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import weddingData from "./data/weddingData";
import MusicButton from "./components/MusicButton";
import InviteLinkGenerator from "./components/InviteLinkGenerator";
import Envelope from "./components/Envelope";
import Splash from "./components/Splash";
import { DateReveal, InviteCard, Location, Timeline, Rsvp, Foot } from "./components/Sections";

export default function App() {
  const [gate, setGate] = useState(true);
  const [emerge, setEmerge] = useState(false);
  const [music, setMusic] = useState(false);
  const audio = useRef(null);
  const family = new URLSearchParams(window.location.search).get("family") === "true";

  useEffect(() => {
    const b = document.body.style;
    if (gate) { b.position = "fixed"; b.width = "100%"; b.top = "0"; } else { b.position = ""; b.width = ""; b.top = ""; }
  }, [gate]);

  const play = () => { const a = audio.current; if (!a) return; a.volume = weddingData.music.volume; a.play().then(() => setMusic(true)).catch(() => {}); };
  const toggle = () => { const a = audio.current; if (!a) return; if (a.paused) play(); else { a.pause(); setMusic(false); } };

  return (
    <div className="min-h-screen bg-[#f8f3e8]">
      {!gate && <MusicButton playing={music} onToggle={toggle} />}
      <audio ref={audio} src={weddingData.music.src} loop preload="none" />
      <motion.div className={gate ? "pointer-events-none fixed inset-0 z-[55] overflow-hidden" : "relative"}
        initial={{ opacity: 0, scale: 0.45, y: 180, filter: "blur(8px)" }} animate={emerge ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}>
        <Splash revealed={emerge} />
      </motion.div>
      {gate && <Envelope onTap={play} onEmerge={() => setEmerge(true)} onDone={() => setGate(false)} />}
      <DateReveal /><InviteCard /><Location /><Timeline /><Rsvp />
      {family && <InviteLinkGenerator />}
      <Foot />
    </div>
  );
}