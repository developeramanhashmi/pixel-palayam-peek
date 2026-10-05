import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "te";

const en = {
  nav: { home: "Home", about: "About", rooms: "Rooms", gallery: "Gallery", contact: "Contact", book: "Book Now", menu: "Menu", close: "Close menu", language: "Language" },
  common: {
    nearTemple: "Near Bhavani Amman Temple",
    address: "Near Bhavani Amman Temple, Periyapalayam",
    whatsapp: "WhatsApp Us",
    call: "Call Us",
    directions: "Get Directions",
    enquireNow: "Book / Enquire Now",
    makeEnquiry: "Make an Enquiry",
    learnMore: "Learn More",
    backHome: "Back to Home",
    viewRooms: "View Rooms",
    waGreeting: "Hello, I would like to enquire about a stay at Periyapalayam Veerapandiyar Guest House.",
  },
  rooms: {
    ac: "AC Room",
    nonac: "Non-AC Room",
    acDesc: "A comfortable, air-conditioned room for a restful stay — ideal for warm days after your temple visit.",
    nonacDesc: "A comfortable and practical room for a simple, restful stay in Periyapalayam.",
    acCta: "Enquire About AC Room",
    nonacCta: "Enquire About Non-AC Room",
    acFeatures: ["Air conditioning", "Comfortable accommodation", "Near Bhavani Amman Temple"],
    nonacFeatures: ["Comfortable accommodation", "Practical option", "Near Bhavani Amman Temple"],
    pricing: "Please contact us for current rates.",
  },
  home: {
    heroTitle: "A Comfortable Stay in Periyapalayam",
    heroText: "Comfortable accommodation near Bhavani Amman Temple, Periyapalayam.",
    heroCta: "Book Your Stay",
    welcomeEyebrow: "Welcome",
    welcomeTitle: "Welcome to Periyapalayam Veerapandiyar Guest House",
    welcomeText1: "We offer comfortable accommodation for families and visitors coming to Periyapalayam, close to Bhavani Amman Temple.",
    welcomeText2: "Choose between AC and Non-AC rooms, and reach us easily by call, WhatsApp or our simple enquiry form.",
    roomsEyebrow: "Our Rooms",
    roomsTitle: "Choose Your Stay",
    whyEyebrow: "Why Stay With Us",
    whyTitle: "Simple Comfort, Convenient Location",
    galleryEyebrow: "Gallery",
    galleryTitle: "Experience Our Guest House",
    galleryCta: "View Full Gallery",
    locEyebrow: "Location",
    locTitle: "Stay Close to Bhavani Amman Temple",
    locText: "Our guest house is located near Bhavani Amman Temple in Periyapalayam — a convenient base for your visit.",
    ctaTitle: "Planning Your Visit to Periyapalayam?",
    ctaText: "Make an enquiry and let us help you plan a comfortable stay.",
  },
  features: [
    { t: "Comfortable Stay", d: "Clean, restful rooms for a relaxed visit." },
    { t: "AC & Non-AC Rooms", d: "Choose the room option that suits you." },
    { t: "Convenient Location", d: "An easy base for your time in Periyapalayam." },
    { t: "Near Bhavani Amman Temple", d: "Stay close to the temple." },
    { t: "Family-Friendly", d: "Accommodation suited for families." },
    { t: "Easy Enquiry", d: "Reach us by call, WhatsApp or form." },
  ],
  about: {
    title: "About Periyapalayam Veerapandiyar Guest House",
    sub: "A comfortable and convenient place to stay in Periyapalayam, near Bhavani Amman Temple.",
    introTitle: "A Welcoming Place to Stay",
    intro1: "Periyapalayam Veerapandiyar Guest House provides comfortable accommodation for visitors and families coming to Periyapalayam.",
    intro2: "Our focus is simple: a clean, comfortable room, a convenient location and an easy way to get in touch.",
    locTitle: "Close to Bhavani Amman Temple",
    locText: "Being near Bhavani Amman Temple makes our guest house a practical choice for devotees and visitors to the area.",
    comfortTitle: "Comfort First",
    comfortText: "Whether you choose an AC or Non-AC room, our aim is to give you a restful and comfortable stay.",
  },
  roomsPage: { title: "Comfortable Rooms for Your Stay", sub: "Choose the room option that suits your needs.", features: "Highlights" },
  galleryPage: {
    title: "Explore Our Guest House",
    sub: "Take a look at our rooms and surroundings.",
    all: "All", exterior: "Exterior", acRooms: "AC Rooms", nonacRooms: "Non-AC Rooms", common: "Common Areas", surroundings: "Surroundings",
    prev: "Previous image", next: "Next image", close: "Close",
  },
  images: {
    exterior: "Guest house exterior in the evening",
    ac: "AC room with bed and air conditioner",
    nonac: "Non-AC room with ceiling fan and window",
    common: "Guest house seating and reception area",
    corridor: "Corridor with room doors",
    temple: "Temple gopuram at sunset",
    surroundings: "Village road with coconut palms",
  },
  booking: {
    title: "Make an Enquiry",
    sub: "Tell us about your accommodation requirements and our team will get in touch with you.",
    guestInfo: "Guest Information",
    roomReq: "Room Requirements",
    additional: "Additional Requirements",
    name: "Full Name", address: "Address", contact: "Contact Number",
    roomType: "Room Type", selectRoom: "Select room type",
    numRooms: "Number of Rooms", numGuests: "Total Number of Guests",
    notes: "Additional Requirements", optional: "Optional",
    notesPh: "Any special requests or details",
    submit: "Send Enquiry", sending: "Sending…",
    errName: "Please enter your name.",
    errAddress: "Please enter your address.",
    errContact: "Please enter a valid contact number.",
    errRoom: "Please select a room type.",
    errRooms: "Please enter the number of rooms.",
    errGuests: "Please enter the number of guests.",
    errorSubmit: "Unable to submit your enquiry right now. Please try again or contact us directly on WhatsApp.",
    thanks: "Thank You!",
    success: "Your enquiry has been received successfully. We will contact you shortly.",
    sendWa: "Also send these details on WhatsApp",
  },
  contact: {
    title: "Contact Us",
    sub: "We're here to help you with your stay in Periyapalayam.",
    callText: "Speak with us directly.",
    waText: "Message us anytime on WhatsApp.",
    location: "Location",
    mapTitle: "Find Us",
  },
  footer: {
    about: "Comfortable accommodation near Bhavani Amman Temple, Periyapalayam.",
    links: "Quick Links", contact: "Contact", language: "Language", phone: "Phone",
    rights: "All rights reserved.",
  },
};

export type Dict = typeof en;

const te: Dict = {
  nav: { home: "హోమ్", about: "మా గురించి", rooms: "గదులు", gallery: "గ్యాలరీ", contact: "సంప్రదించండి", book: "ఇప్పుడే బుక్ చేయండి", menu: "మెనూ", close: "మెనూ మూసివేయండి", language: "భాష" },
  common: {
    nearTemple: "భవానీ అమ్మన్ ఆలయం సమీపంలో",
    address: "భవానీ అమ్మన్ ఆలయం సమీపంలో, పెరియపాళయం",
    whatsapp: "వాట్సాప్ చేయండి",
    call: "కాల్ చేయండి",
    directions: "దారి చూడండి",
    enquireNow: "బుక్ / విచారించండి",
    makeEnquiry: "విచారణ పంపండి",
    learnMore: "మరింత తెలుసుకోండి",
    backHome: "హోమ్‌కు వెళ్ళండి",
    viewRooms: "గదులు చూడండి",
    waGreeting: "నమస్తే, పెరియపాళయం వీరపాండియార్ గెస్ట్ హౌస్‌లో బస గురించి తెలుసుకోవాలనుకుంటున్నాను.",
  },
  rooms: {
    ac: "ఏసీ గది",
    nonac: "నాన్-ఏసీ గది",
    acDesc: "విశ్రాంతిగా ఉండేందుకు సౌకర్యవంతమైన ఏసీ గది — ఆలయ దర్శనం తర్వాత వేడి రోజుల్లో చక్కని ఎంపిక.",
    nonacDesc: "పెరియపాళయంలో సాదాసీదా, ప్రశాంతమైన బస కోసం సౌకర్యవంతమైన, అనుకూలమైన గది.",
    acCta: "ఏసీ గది గురించి విచారించండి",
    nonacCta: "నాన్-ఏసీ గది గురించి విచారించండి",
    acFeatures: ["ఎయిర్ కండిషనింగ్", "సౌకర్యవంతమైన వసతి", "భవానీ అమ్మన్ ఆలయం సమీపంలో"],
    nonacFeatures: ["సౌకర్యవంతమైన వసతి", "అనుకూలమైన ఎంపిక", "భవానీ అమ్మన్ ఆలయం సమీపంలో"],
    pricing: "ప్రస్తుత ధరల కోసం దయచేసి మమ్మల్ని సంప్రదించండి.",
  },
  home: {
    heroTitle: "పెరియపాళయంలో సౌకర్యవంతమైన బస",
    heroText: "భవానీ అమ్మన్ ఆలయం సమీపంలో, పెరియపాళయంలో సౌకర్యవంతమైన వసతి.",
    heroCta: "మీ బస బుక్ చేయండి",
    welcomeEyebrow: "స్వాగతం",
    welcomeTitle: "పెరియపాళయం వీరపాండియార్ గెస్ట్ హౌస్‌కు స్వాగతం",
    welcomeText1: "భవానీ అమ్మన్ ఆలయానికి దగ్గరగా, పెరియపాళయానికి వచ్చే కుటుంబాలకు మరియు సందర్శకులకు సౌకర్యవంతమైన వసతి అందిస్తున్నాము.",
    welcomeText2: "ఏసీ లేదా నాన్-ఏసీ గదిని ఎంచుకోండి. కాల్, వాట్సాప్ లేదా సులభమైన విచారణ ఫారం ద్వారా మమ్మల్ని సంప్రదించండి.",
    roomsEyebrow: "మా గదులు",
    roomsTitle: "మీ బసను ఎంచుకోండి",
    whyEyebrow: "మా వద్దే ఎందుకు",
    whyTitle: "సాదా సౌకర్యం, అనుకూలమైన ప్రదేశం",
    galleryEyebrow: "గ్యాలరీ",
    galleryTitle: "మా గెస్ట్ హౌస్‌ను చూడండి",
    galleryCta: "పూర్తి గ్యాలరీ చూడండి",
    locEyebrow: "ప్రదేశం",
    locTitle: "భవానీ అమ్మన్ ఆలయానికి దగ్గరగా బస చేయండి",
    locText: "మా గెస్ట్ హౌస్ పెరియపాళయంలోని భవానీ అమ్మన్ ఆలయం సమీపంలో ఉంది — మీ సందర్శనకు అనుకూలమైన స్థావరం.",
    ctaTitle: "పెరియపాళయం సందర్శనకు ప్లాన్ చేస్తున్నారా?",
    ctaText: "విచారణ పంపండి, సౌకర్యవంతమైన బసను ప్లాన్ చేయడంలో మేము సహాయం చేస్తాము.",
  },
  features: [
    { t: "సౌకర్యవంతమైన బస", d: "ప్రశాంతమైన సందర్శన కోసం శుభ్రమైన గదులు." },
    { t: "ఏసీ & నాన్-ఏసీ గదులు", d: "మీకు సరిపోయే గదిని ఎంచుకోండి." },
    { t: "అనుకూలమైన ప్రదేశం", d: "పెరియపాళయంలో మీ సమయానికి సులభమైన స్థావరం." },
    { t: "భవానీ అమ్మన్ ఆలయం సమీపంలో", d: "ఆలయానికి దగ్గరగా ఉండండి." },
    { t: "కుటుంబాలకు అనుకూలం", d: "కుటుంబాలకు తగిన వసతి." },
    { t: "సులభమైన విచారణ", d: "కాల్, వాట్సాప్ లేదా ఫారం ద్వారా సంప్రదించండి." },
  ],
  about: {
    title: "పెరియపాళయం వీరపాండియార్ గెస్ట్ హౌస్ గురించి",
    sub: "భవానీ అమ్మన్ ఆలయం సమీపంలో, పెరియపాళయంలో సౌకర్యవంతమైన మరియు అనుకూలమైన బస.",
    introTitle: "ఆత్మీయంగా ఆహ్వానించే బస",
    intro1: "పెరియపాళయానికి వచ్చే సందర్శకులకు మరియు కుటుంబాలకు పెరియపాళయం వీరపాండియార్ గెస్ట్ హౌస్ సౌకర్యవంతమైన వసతి అందిస్తుంది.",
    intro2: "మా లక్ష్యం సులభం: శుభ్రమైన, సౌకర్యవంతమైన గది, అనుకూలమైన ప్రదేశం మరియు సులభంగా సంప్రదించే అవకాశం.",
    locTitle: "భవానీ అమ్మన్ ఆలయానికి దగ్గరగా",
    locText: "భవానీ అమ్మన్ ఆలయం సమీపంలో ఉండటం వల్ల భక్తులకు మరియు సందర్శకులకు మా గెస్ట్ హౌస్ అనుకూలమైన ఎంపిక.",
    comfortTitle: "సౌకర్యమే ముఖ్యం",
    comfortText: "మీరు ఏసీ లేదా నాన్-ఏసీ గది ఎంచుకున్నా, మీకు ప్రశాంతమైన బస అందించడమే మా లక్ష్యం.",
  },
  roomsPage: { title: "మీ బస కోసం సౌకర్యవంతమైన గదులు", sub: "మీ అవసరాలకు సరిపోయే గదిని ఎంచుకోండి.", features: "ముఖ్యాంశాలు" },
  galleryPage: {
    title: "మా గెస్ట్ హౌస్‌ను చూడండి",
    sub: "మా గదులు మరియు పరిసరాలను చూడండి.",
    all: "అన్నీ", exterior: "బయటి దృశ్యం", acRooms: "ఏసీ గదులు", nonacRooms: "నాన్-ఏసీ గదులు", common: "సాధారణ ప్రదేశాలు", surroundings: "పరిసరాలు",
    prev: "మునుపటి చిత్రం", next: "తదుపరి చిత్రం", close: "మూసివేయండి",
  },
  images: {
    exterior: "సాయంత్రం వేళ గెస్ట్ హౌస్ బయటి దృశ్యం",
    ac: "మంచం మరియు ఏసీ ఉన్న గది",
    nonac: "ఫ్యాన్ మరియు కిటికీ ఉన్న నాన్-ఏసీ గది",
    common: "గెస్ట్ హౌస్ కూర్చునే ప్రదేశం మరియు రిసెప్షన్",
    corridor: "గదుల తలుపులతో వరండా",
    temple: "సూర్యాస్తమయంలో ఆలయ గోపురం",
    surroundings: "కొబ్బరి చెట్లతో గ్రామ రహదారి",
  },
  booking: {
    title: "విచారణ పంపండి",
    sub: "మీ వసతి అవసరాలను తెలియజేయండి, మా బృందం మిమ్మల్ని సంప్రదిస్తుంది.",
    guestInfo: "అతిథి వివరాలు",
    roomReq: "గది అవసరాలు",
    additional: "అదనపు అవసరాలు",
    name: "పూర్తి పేరు", address: "చిరునామా", contact: "ఫోన్ నంబర్",
    roomType: "గది రకం", selectRoom: "గది రకం ఎంచుకోండి",
    numRooms: "గదుల సంఖ్య", numGuests: "మొత్తం అతిథుల సంఖ్య",
    notes: "అదనపు అవసరాలు", optional: "ఐచ్ఛికం",
    notesPh: "ఏవైనా ప్రత్యేక అభ్యర్థనలు లేదా వివరాలు",
    submit: "విచారణ పంపండి", sending: "పంపుతోంది…",
    errName: "దయచేసి మీ పేరు నమోదు చేయండి.",
    errAddress: "దయచేసి మీ చిరునామా నమోదు చేయండి.",
    errContact: "దయచేసి సరైన ఫోన్ నంబర్ నమోదు చేయండి.",
    errRoom: "దయచేసి గది రకం ఎంచుకోండి.",
    errRooms: "దయచేసి గదుల సంఖ్య నమోదు చేయండి.",
    errGuests: "దయచేసి అతిథుల సంఖ్య నమోదు చేయండి.",
    errorSubmit: "ప్రస్తుతం మీ విచారణను పంపలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి లేదా వాట్సాప్‌లో నేరుగా మమ్మల్ని సంప్రదించండి.",
    thanks: "ధన్యవాదాలు!",
    success: "మీ విచారణ విజయవంతంగా అందింది. త్వరలోనే మిమ్మల్ని సంప్రదిస్తాము.",
    sendWa: "ఈ వివరాలను వాట్సాప్‌లో కూడా పంపండి",
  },
  contact: {
    title: "మమ్మల్ని సంప్రదించండి",
    sub: "పెరియపాళయంలో మీ బస కోసం మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము.",
    callText: "నేరుగా మాతో మాట్లాడండి.",
    waText: "వాట్సాప్‌లో ఎప్పుడైనా సందేశం పంపండి.",
    location: "ప్రదేశం",
    mapTitle: "మమ్మల్ని కనుగొనండి",
  },
  footer: {
    about: "భవానీ అమ్మన్ ఆలయం సమీపంలో, పెరియపాళయంలో సౌకర్యవంతమైన వసతి.",
    links: "త్వరిత లింకులు", contact: "సంప్రదింపు", language: "భాష", phone: "ఫోన్",
    rights: "అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.",
  },
};

const dicts: Record<Lang, Dict> = { en, te };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({ lang: "en", setLang: () => {}, t: en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "te" || saved === "en") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
