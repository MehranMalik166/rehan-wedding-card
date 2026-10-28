import { useState } from "react";
import { motion } from "framer-motion";

const Rose = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#cdbb94" strokeWidth=".8">
    {[0, 60, 120, 180, 240, 300].map((a) => <ellipse key={a} rx="9" ry="14" cy="-11" fill="#fdfcf8" transform={`rotate(${a})`} />)}
    <circle r="9" fill="#f6f1e4" /><path d="M-6 -1a6 6 0 0 1 12 0M-4 3a4 4 0 0 0 8 0" fill="none" /><circle r="2.5" fill="#d9bf84" stroke="none" />
  </g>
);
const Lf = ({ x, y, r }) => <path d="M0 0C4-8 4-18 0-26-4-18-4-8 0 0z" fill="#c9b27a" opacity=".85" transform={`translate(${x} ${y}) rotate(${r})`} />;

export const Flowers = ({ className = "" }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <path d="M10 10C60 40 100 90 150 190" stroke="#c9b27a" strokeWidth="1.4" fill="none" />
    {[[30,24,-40],[55,50,-20],[80,80,0],[110,120,10],[135,160,20],[40,70,-90],[90,40,60],[120,90,70],[70,120,-60]].map(([x,y,r],i)=><Lf key={i} x={x} y={y} r={r} />)}
    <Rose x="38" y="34" s="1.15" /><Rose x="90" y="70" s="1.4" /><Rose x="58" y="112" s=".95" /><Rose x="130" y="125" s="1.05" /><Rose x="150" y="175" s=".8" />
    {[[20,60],[70,20],[110,50],[140,95],[100,160]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.4" fill="#e3d3a6" />)}
  </svg>
);

export const archPath = "M16 520V250Q16 204 44 184Q36 152 66 136Q58 104 94 90Q100 52 150 20Q200 52 206 90Q242 104 234 136Q264 152 256 184Q284 204 284 250V520";

export const Lantern = ({ className = "", d = 0, style = {} }) => (
  <motion.svg viewBox="0 0 30 80" className={className} style={{ ...style, transformOrigin: "50% 0", filter: "drop-shadow(0 2px 6px rgba(160,120,50,.45))" }} animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: d }}>
    <line x1="15" y1="0" x2="15" y2="14" stroke="#b8975a" /><path d="M8 14h14l3 6H5z" fill="#c4a46a" /><path d="M6 20h18l-2 30a9 9 0 0 1-14 0z" fill="#f1dca0" stroke="#c4a46a" /><path d="M10 54h10l-5 8z" fill="#c4a46a" />
  </motion.svg>
);

export const Mosque = ({ className = "" }) => (
  <svg viewBox="0 0 300 150" className={className}>
    <defs><g id="m" fill="#fbfaf6" stroke="#d6c9a8" strokeWidth=".7">
      <path d="M105 100a45 45 0 0 1 90 0z" /><path d="M148 55l2-10 2 10z" /><rect x="96" y="100" width="108" height="26" />
      <path d="M62 100a18 18 0 0 1 36 0zM202 100a18 18 0 0 1 36 0z" /><rect x="58" y="100" width="44" height="26" /><rect x="198" y="100" width="44" height="26" />
      <path d="M26 126V58l5-14 5 14v68zM264 126V58l5-14 5 14v68z" /></g></defs>
    <use href="#m" /><use href="#m" transform="translate(0 252) scale(1 -1)" opacity=".28" />
  </svg>
);

export function Pic({ src, className = "", children }) {
  const [bad, setBad] = useState(false);
  return bad ? <div className={className}>{children}</div> : <img src={src} alt="" loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />;
}