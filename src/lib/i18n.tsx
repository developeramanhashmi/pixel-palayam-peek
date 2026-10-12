import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ta";

const en = {
  nav: {
    home: "Home",
    about: "About",
    rooms: "Rooms",
    gallery: "Gallery",
    contact: "Contact",
    book: "Book Now",
    menu: "Menu",
    close: "Close menu",
    language: "Language",
  },
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
  roomsPage: {
    title: "Comfortable Rooms for Your Stay",
    sub: "Choose the room option that suits your needs.",
    features: "Highlights",
  },
  galleryPage: {
    title: "Explore Our Guest House",
    sub: "Take a look at our rooms and surroundings.",
    all: "All",
    exterior: "Exterior",
    acRooms: "AC Rooms",
    nonacRooms: "Non-AC Rooms",
    common: "Common Areas",
    surroundings: "Surroundings",
    prev: "Previous image",
    next: "Next image",
    close: "Close",
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
    name: "Full Name",
    address: "Address",
    contact: "Contact Number",
    roomType: "Room Type",
    selectRoom: "Select room type",
    numRooms: "Number of Rooms",
    numGuests: "Total Number of Guests",
    notes: "Additional Requirements",
    optional: "Optional",
    notesPh: "Any special requests or details",
    submit: "Send Enquiry",
    sending: "Sending…",
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
    links: "Quick Links",
    contact: "Contact",
    language: "Language",
    phone: "Phone",
    rights: "All rights reserved.",
  },
};

export type Dict = typeof en;

const ta: Dict = {
  nav: {
    home: "முகப்பு",
    about: "எங்களை பற்றி",
    rooms: "அறைகள்",
    gallery: "புகைப்படங்கள்",
    contact: "தொடர்பு",
    book: "முன்பதிவு",
    menu: "பட்டியல்",
    close: "மூடு",
    language: "மொழி",
  },
  common: {
    nearTemple: "பவானி அம்மன் கோவில் அருகில்",
    address: "பவானி அம்மன் கோவில் அருகில், பெரியபாளையம்",
    whatsapp: "வாட்ஸ்அப்",
    call: "அழைக்கவும்",
    directions: "வழித்தடம்",
    enquireNow: "முன்பதிவு / விசாரணை",
    makeEnquiry: "விசாரணை செய்க",
    learnMore: "மேலும் அறிய",
    backHome: "முகப்புக்கு செல்க",
    viewRooms: "அறைகளை காண்க",
    waGreeting: "வணக்கம், பெரியபாளையம் வீரபாண்டியார் கெஸ்ட் ஹவுஸில் அறை முன்பதிவு பற்றி அறிய விரும்புகிறேன்.",
  },
  rooms: {
    ac: "ஏசி அறை",
    nonac: "நான்-ஏசி அறை",
    acDesc: "பவானி அம்மன் கோவில் தரிசனத்திற்கு பிறகு வெயில் நாட்களில் வசதியாக தங்குவதற்கு ஏற்ற குளிரூட்டப்பட்ட ஏசி அறை.",
    nonacDesc: "பெரியபாளையத்தில் எளிய மற்றும் அமைதியான தங்குமிடத்திற்கான வசதியான நான்-ஏசி அறை.",
    acCta: "ஏசி அறை பற்றி விசாரிக்க",
    nonacCta: "நான்-ஏசி அறை பற்றி விசாரிக்க",
    acFeatures: ["குளிரூட்டப்பட்ட அறை (AC)", "வசதியான தங்குமிடம்", "பவானி அம்மன் கோவில் அருகில்"],
    nonacFeatures: ["வசதியான தங்குமிடம்", "குறைந்த கட்டண வசதி", "பவானி அம்மன் கோவில் அருகில்"],
    pricing: "தற்போதைய கட்டண விவரங்களுக்கு எங்களை தொடர்பு கொள்ளவும்.",
  },
  home: {
    heroTitle: "பெரியபாளையத்தில் வசதியான தங்குமிடம்",
    heroText: "பெரியபாளையம் பவானி அம்மன் கோவில் அருகில் குடும்பங்கள் தங்குவதற்கு ஏற்ற சிறந்த வசதியான அறைகள்.",
    heroCta: "முன்பதிவு",
    welcomeEyebrow: "நல்வரவு",
    welcomeTitle: "பெரியபாளையம் வீரபாண்டியார் கெஸ்ட் ஹவுஸுக்கு நல்வரவு",
    welcomeText1: "பவானி அம்மன் கோவிலுக்கு வருகை தரும் பக்தர்கள் மற்றும் குடும்பங்களுக்கு அமைதியான, பாதுகாப்பான தங்குமிடத்தை நாங்கள் வழங்குகிறோம்.",
    welcomeText2: "ஏசி மற்றும் நான்-ஏசி அறைகளை தேர்வு செய்து, தொலைபேசி அழைப்பு, வாட்ஸ்அப் அல்லது எளிதான முன்பதிவு படிவம் மூலம் எங்களை தொடர்பு கொள்ளுங்கள்.",
    roomsEyebrow: "எங்கள் அறைகள்",
    roomsTitle: "உங்களுக்கு ஏற்ற அறையை தேர்வு செய்யுங்கள்",
    whyEyebrow: "ஏன் எங்களை தேர்வு செய்ய வேண்டும்",
    whyTitle: "எளிய வசதி, சிறந்த இருப்பிடம்",
    galleryEyebrow: "புகைப்படங்கள்",
    galleryTitle: "எங்கள் கெஸ்ட் ஹவுஸ் காட்சிகள்",
    galleryCta: "அனைத்து புகைப்படங்களையும் காண்க",
    locEyebrow: "இருப்பிடம்",
    locTitle: "பவானி அம்மன் கோவில் மிக அருகில்",
    locText: "எங்கள் கெஸ்ட் ஹவுஸ் பெரியபாளையம் பவானி அம்மன் கோவிலுக்கு மிக அருகில் அமைந்துள்ளது — உங்கள் ஆன்மீக பயணத்திற்கு வசதியான இடம்.",
    ctaTitle: "பெரியபாளையம் வர திட்டமிடுகிறீர்களா?",
    ctaText: "இப்போதே தொடர்பு கொண்டு உங்கள் வசதியான தங்குதலை உறுதி செய்யுங்கள்.",
  },
  features: [
    { t: "வசதியான தங்குமிடம்", d: "சுத்தமான மற்றும் அமைதியான அறைகள்." },
    { t: "ஏசி & நான்-ஏசி அறைகள்", d: "உங்கள் தேவைக்கேற்ப அறைகளை தேர்வு செய்யலாம்." },
    { t: "சிறந்த இருப்பிடம்", d: "பெரியபாளையத்தில் கோவில் அருகே எளிதாக சென்றடையும் இடம்." },
    { t: "பவானி அம்மன் கோவில் அருகில்", d: "கோவிலில் இருந்து சில நிமிட நடைபயணம்." },
    { t: "குடும்பங்களுக்கு ஏற்றது", d: "குடும்பத்துடன் தங்குவதற்கு பாதுகாப்பான சூழல்." },
    { t: "எளிதான முன்பதிவு", d: "தொலைபேசி அழைப்பு அல்லது வாட்ஸ்அப் மூலம் உடனடியாக தொடர்புகொள்ளலாம்." },
  ],
  about: {
    title: "பெரியபாளையம் வீரபாண்டியார் கெஸ்ட் ஹவுஸ் பற்றி",
    sub: "பவானி அம்மன் கோவில் அருகில் அமைதியான மற்றும் வசதியான தங்குமிடம்.",
    introTitle: "அன்பான மற்றும் பாதுகாப்பான வரவேற்பு",
    intro1: "பெரியபாளையத்திற்கு வருகை தரும் பக்தர்கள் மற்றும் குடும்பங்களுக்கு வீரபாண்டியார் கெஸ்ட் ஹவுஸ் தரமான தங்குமிடத்தை வழங்குகிறது.",
    intro2: "எங்கள் நோக்கம் மிக எளியது: சுத்தமான அறைகள், கோவிலுக்கு மிக அருகில் அமைந்த இடம் மற்றும் எளிதான வாடிக்கையாளர் சேவை.",
    locTitle: "பவானி அம்மன் கோவிலுக்கு மிக அருகில்",
    locText: "கோவிலுக்கு மிக அருகில் அமைந்திருப்பது பக்தர்களுக்கு மிகவும் சௌகரியமாக அமைகிறது.",
    comfortTitle: "முழுமையான வசதி",
    comfortText: "நீங்கள் ஏசி அல்லது நான்-ஏசி அறையை தேர்வு செய்தாலும், மனநிறைவான தங்குதலை நாங்கள் உறுதி செய்கிறோம்.",
  },
  roomsPage: {
    title: "உங்கள் தங்குதலுக்கு வசதியான அறைகள்",
    sub: "உங்கள் விருப்பத்திற்கேற்ப சிறந்த அறையை தேர்வு செய்யுங்கள்.",
    features: "முக்கிய அம்சங்கள்",
  },
  galleryPage: {
    title: "எங்கள் கெஸ்ட் ஹவுஸ் புகைப்படங்கள்",
    sub: "அறைகள் மற்றும் சுற்றுப்புற காட்சிகளை காண்க.",
    all: "அனைத்தும்",
    exterior: "வெளிப்புற தோற்றம்",
    acRooms: "ஏசி அறைகள்",
    nonacRooms: "நான்-ஏசி அறைகள்",
    common: "வரவேற்பறை & பொது இடம்",
    surroundings: "சுற்றுப்புறம்",
    prev: "முந்தைய படம்",
    next: "அடுத்த படம்",
    close: "மூடு",
  },
  images: {
    exterior: "மாலையில் கெஸ்ட் ஹவுஸ் வெளிப்புற தோற்றம்",
    ac: "ஏசி வசதியுடன் கூடிய படுக்கை அறை",
    nonac: "மின்விசிறி வசதியுடன் கூடிய நான்-ஏசி அறை",
    common: "வரவேற்பறை மற்றும் அமரும் இடம்",
    corridor: "அறை வாசல்களுடன் கூடிய நடைபாதை",
    temple: "கோவில் கோபுரம்",
    surroundings: "தென்னை மரங்கள் கொண்ட கிராமப்புற சாலை",
  },
  booking: {
    title: "முன்பதிவு / தகவல் பெற",
    sub: "உங்கள் தங்குதல் விவரங்களை பூர்த்தி செய்யுங்கள், எங்கள் குழுவினர் உங்களை தொடர்புகொள்வார்கள்.",
    guestInfo: "விருந்தினர் விவரங்கள்",
    roomReq: "அறை தேவைகள்",
    additional: "கூடுதல் விவரங்கள்",
    name: "முழு பெயர்",
    address: "முகவரி",
    contact: "தொலைபேசி எண்",
    roomType: "அறை வகை",
    selectRoom: "அறை வகையை தேர்வு செய்க",
    numRooms: "அறைகளின் எண்ணிக்கை",
    numGuests: "மொத்த விருந்தினர்கள் எண்ணிக்கை",
    notes: "கூடுதல் தேவைகள்",
    optional: "விருப்பத்தேர்வு",
    notesPh: "சிறப்பு கோரிக்கைகள் அல்லது விவரங்கள்",
    submit: "விவரங்களை அனுப்பவும்",
    sending: "அனுப்பப்படுகிறது…",
    errName: "தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.",
    errAddress: "தயவுசெய்து உங்கள் முகவரியை உள்ளிடவும்.",
    errContact: "சரியான தொலைபேசி எண்ணை உள்ளிடவும்.",
    errRoom: "அறை வகையை தேர்வு செய்யவும்.",
    errRooms: "அறைகளின் எண்ணிக்கையை குறிப்பிடவும்.",
    errGuests: "விருந்தினர்களின் எண்ணிக்கையை குறிப்பிடவும்.",
    errorSubmit: "தற்போது விவரங்களை அனுப்ப முடியவில்லை. தயவுசெய்து தொலைபேசி அல்லது வாட்ஸ்அப் மூலம் நேரடியாக தொடர்பு கொள்ளவும்.",
    thanks: "நன்றி!",
    success: "உங்கள் முன்பதிவு விவரங்கள் பெறப்பட்டன. விரைவில் உங்களை தொடர்புகொள்வோம்.",
    sendWa: "இந்த விவரங்களை வாட்ஸ்அப்பிலும் அனுப்பவும்",
  },
  contact: {
    title: "எங்களை தொடர்பு கொள்ள",
    sub: "பெரியபாளையத்தில் உங்கள் தங்குதலுக்கு உதவ நாங்கள் தயாராக உள்ளோம்.",
    callText: "எங்களுடன் நேரடியாக பேசலாம்.",
    waText: "எப்போது வேண்டுமானாலும் வாட்ஸ்அப்பில் செய்தி அனுப்பலாம்.",
    location: "இருப்பிடம்",
    mapTitle: "எங்களை கண்டறிய",
  },
  footer: {
    about: "பெரியபாளையம் பவானி அம்மன் கோவில் அருகில் வசதியான தங்குமிடம்.",
    links: "முக்கிய இணைப்புகள்",
    contact: "தொடர்பு",
    language: "மொழி",
    phone: "தொலைபேசி",
    rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
  },
};

const dicts: Record<Lang, Dict> = { en, ta };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "ta" || saved === "en") {
      setLangState(saved);
    } else if (saved === "te") {
      // Auto-migrate old Telugu browser cache to Tamil
      setLangState("ta");
      localStorage.setItem("lang", "ta");
    }
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
