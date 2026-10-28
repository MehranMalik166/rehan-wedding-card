// ========= SAB KUCH YAHIN SE BADLO =========
const weddingData = {
  groomName: "Rehan Khan",
  brideName: "Inaya Siddiqui",
  groomShort: "Rehan",
  brideShort: "Inaya",
  groomParents: "MR & MRS KHAN",
  brideParents: "MR & MRS SIDDIQUI",
  families: "The Khan & Siddiqui Families",
  invitationText: "Join us for an evening of laughter, duas and unforgettable memories as we begin our forever.",
  date: { day: "20", month: "January", year: "2027" },
  weddingDateISO: "2027-01-20T18:00:00",
  weddingDateDisplay: "20 JANUARY 2027",
  music: { src: "/wedding-song.mp3", volume: 0.5 },
  // Optional images (public/ me): hero-scene.jpg (couple + masjid wala portrait scene), venue.jpg
  scene: "/hero-scene.jpg",
  envelope: { video: "/envelope-open.mp4", poster: "/envelope-poserr.jpg" },
  timeline: [
    { time: "6:00 pm", title: "Guest Arrival & Welcome Drinks" },
    { time: "6:30 pm", title: "Bride Entrance" },
    { time: "7:00 pm", title: "Nikkah Ceremony" },
    { time: "8:00 pm", title: "Dinner & Celebrations" },
    { time: "9:30 pm", title: "Rukhsati" },
  ],
venue: { 
  city: "Agra", 
  name: "Grand Mercure Convention Centre", 
  address: "Fatehabad Road, Tajganj, Agra, Uttar Pradesh 282001", 
  mapsUrl: "https://maps.google.com/?q=Grand+Mercure+Convention+Centre+Agra", 
  photo: "/venue.jpg" 
},
  defaultContact: { name: "Wedding Coordinator", whatsapp: "919000000000" }, // bina link wale guests ka message yahan jayega
  contact: { email: "family@example.com" },
  // credit: { enabled: true, name: "Your Name", portfolioUrl: "https://your-portfolio.com", whatsappUrl: "https://wa.me/919000000000?text=Hi" },
};
export default weddingData;
