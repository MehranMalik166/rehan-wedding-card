import weddingData from "../data/weddingData";

// Link ke andar chhupa number hi owner hota hai, chahe link kitni baar forward ho.
export function generateInviteLink(name, whatsapp) {
  const params = new URLSearchParams({ ref: name.trim(), to: whatsapp.replace(/\D/g, "") });
  return `${window.location.origin}${window.location.pathname}?${params}`;
}
export function getReferrerFromURL() {
  const p = new URLSearchParams(window.location.search);
  const name = p.get("ref"), to = p.get("to");
  if (name && to && /^\d{10,15}$/.test(to)) return { name, whatsapp: to, isPersonalLink: true };
  return { ...weddingData.defaultContact, isPersonalLink: false };
}
export function buildWhatsAppMessageLink({ name, message, attendance }) {
  const { whatsapp } = getReferrerFromURL();
  const yes = attendance?.toLowerCase().includes("yes");
  const text = [
    `Congratulations ${weddingData.brideName} & ${weddingData.groomName}!`, "",
    `${name} sent you this blessing:`, `"${message}"`, "",
    yes ? `${name} will be attending the wedding! See you there.` : `${name} can't make it, but sent their love and prayers.`,
  ].join("\n");
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}
export function buildEmailLink({ name, message, attendance }) {
  const s = encodeURIComponent(`Wedding blessing from ${name || "a guest"}`);
  const b = encodeURIComponent(["Congratulations!", "", `${name} sent this message:`, `"${message}"`, attendance ? `Attendance: ${attendance}` : ""].join("\n"));
  return `mailto:${weddingData.contact.email}?subject=${s}&body=${b}`;
}
