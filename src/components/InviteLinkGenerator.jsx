import { useState } from "react";
import { generateInviteLink } from "./inviteLink";

// Sirf family ke liye: site.com/?family=true
export default function InviteLinkGenerator() {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [link, setLink] = useState("");
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const inp = "w-full rounded-lg border border-[#c4a46a]/40 bg-[#f1ece0]/60 px-4 py-2.5 text-[#5e5040] outline-none focus:border-[#c4a46a]";
  const make = (e) => {
    e.preventDefault();
    if (!name.trim() || !/^\d{10,15}$/.test(num.replace(/\D/g, ""))) return setErr("Enter your name and a valid WhatsApp number with country code.");
    setErr(""); setLink(generateInviteLink(name, num)); setCopied(false);
  };
  const copy = async () => { try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { setErr("Copy failed, select the link manually."); } };
  return (
    <section className="bg-[#f1ece0] px-6 py-16 text-center text-[#6b5a44]">
      <p className="text-[11px] tracking-[.4em] text-[#c4a46a]">FOR FAMILY &amp; HOSTS</p>
      <h2 className="mt-2 font-display text-3xl text-[#5e5040]">Create Your Invite Link</h2>
      <p className="mx-auto mt-3 max-w-sm font-serif opacity-70">Anyone who opens your link and sends blessings will message you directly on WhatsApp.</p>
      <form onSubmit={make} className="mx-auto mt-6 flex max-w-sm flex-col gap-3 text-left">
        <input className={inp} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={inp} type="tel" placeholder="WhatsApp number, e.g. 919876543210" value={num} onChange={(e) => setNum(e.target.value)} />
        {err && <p className="text-sm text-[#f3b0a0]">{err}</p>}
        <button className="rounded-full bg-[#c4a46a] py-3 text-xs font-semibold tracking-[.2em] text-[#f1ece0] active:scale-95">CREATE MY LINK</button>
      </form>
      {link && (
        <div className="mx-auto mt-5 max-w-sm rounded-xl border border-[#c4a46a]/40 p-4 text-left">
          <p className="break-all text-xs opacity-80">{link}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={copy} className="flex-1 rounded-full border border-[#c4a46a] py-2 text-[11px] font-semibold text-[#c4a46a]">{copied ? "COPIED ✓" : "COPY LINK"}</button>
            <a target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent("You're warmly invited: " + link)}`} className="flex-1 rounded-full bg-[#c4a46a] py-2 text-center text-[11px] font-semibold text-[#f1ece0]">SHARE</a>
          </div>
        </div>
      )}
    </section>
  );
}
