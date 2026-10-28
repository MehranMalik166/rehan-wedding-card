export default function MusicButton({ playing, onToggle }) {
  return (
    <button type="button" onClick={onToggle} aria-label={playing ? "Pause music" : "Play music"} className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-[#c9ad6e]/90 text-white shadow-lg backdrop-blur-sm active:scale-90">
      {playing ? <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M7 5h3v14H7zM14 5h3v14h-3z" /></svg> : <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M8 5v14l11-7z" /></svg>}
    </button>
  );
}
