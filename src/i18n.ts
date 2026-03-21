import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
const resources = {
  sv: {
    translation: {
      "utbildning": "Utbildning",
      "omOss": "Om oss",
      "loggaIn": "Logga in till Medlemsportalen",
      "loggaInMedlem": "Logga in som medlem",
      "startaUtbildning": "Starta Utbildningen",
      "valkommen": "Välkommen till försvarsmarknaden",
      "valkommenDesc": "En utbildningsplattform för att förstå ekosystemet, aktörer och regelverk inom den svenska säkerhets- och försvarssektorn.",
      "vadDuKommerLaraDig": "Vad du kommer lära dig",
      "vadDuKommerLaraDigDesc": "Vår utbildningsplattform ger dig den kunskap du behöver för att navigera försvarsmarknaden.",
      "forsvarsmarknaden": "Försvarsmarknaden",
      "forsvarsmarknadenDesc": "Förstå ekosystemet med OEMs, underleverantörer och slutkunder.",
      "regelverk": "Regelverk",
      "regelverkDesc": "Lär dig om exportkontroll, säkerhetsskydd och internationella krav.",
      "affarsmojligheter": "Affärsmöjligheter",
      "affarsmojligheterDesc": "Hitta evenemang, upphandlingar och nätverksmöjligheter.",
      "medlemsportal": "Medlemsportal",
      "medlemsportalDesc": "Exklusiva resurser och onboarding för SOFF-medlemmar.",
      "sankTrosklarna": "Sänk trösklarna till försvarsmarknaden",
      "sankTrosklarnaDesc": "SOFF:s utbildningsplattform är öppen för alla som vill lära sig mer om den svenska säkerhets- och försvarssektorn. Oavsett om du är nyfiken på branschen eller vill ta ditt företag in på marknaden.",
      "benefit1": "Gratis tillgång till grundläggande utbildningsmaterial",
      "benefit2": "Strukturerad kunskap om den svenska försvarsmarknaden",
      "benefit3": "Vägledning genom regelverk och krav",
      "benefit4": "Information om affärsmöjligheter och nätverk",
      "redoAttBorja": "Redo att börja?",
      "redoAttBorjaDesc": "Starta din resa mot försvarsmarknaden idag. Vår kostnadsfria utbildning ger dig grunderna du behöver.",
      "borjaLaraDigNu": "Börja lära dig nu",
      "dashboard": "Dashboard",
      "minProfil": "Min Profil",
      "gaTillStartsidan": "Gå till startsidan",
      "loggaUt": "Logga ut",
    }
  },
  en: {
    translation: {
      "utbildning": "Education",
      "omOss": "About Us",
      "loggaIn": "Login to Member Portal",
      "loggaInMedlem": "Login as member",
      "startaUtbildning": "Start Education",
      "valkommen": "Welcome to the Defense Market",
      "valkommenDesc": "An educational platform to understand the ecosystem, actors, and regulations within the Swedish security and defense sector.",
      "vadDuKommerLaraDig": "What you will learn",
      "vadDuKommerLaraDigDesc": "Our educational platform provides you with the knowledge needed to navigate the defense market.",
      "forsvarsmarknaden": "Defense Market",
      "forsvarsmarknadenDesc": "Understand the ecosystem with OEMs, subcontractors, and end customers.",
      "regelverk": "Regulations",
      "regelverkDesc": "Learn about export control, security protection, and international requirements.",
      "affarsmojligheter": "Business Opportunities",
      "affarsmojligheterDesc": "Find events, procurements, and networking opportunities.",
      "medlemsportal": "Member Portal",
      "medlemsportalDesc": "Exclusive resources and onboarding for SOFF members.",
      "sankTrosklarna": "Lower the thresholds to the defense market",
      "sankTrosklarnaDesc": "SOFF's educational platform is open to anyone who wants to learn more about the Swedish security and defense sector. Whether you are curious about the industry or want to take your company into the market.",
      "benefit1": "Free access to basic educational material",
      "benefit2": "Structured knowledge about the Swedish defense market",
      "benefit3": "Guidance through regulations and requirements",
      "benefit4": "Information about business opportunities and networking",
      "redoAttBorja": "Ready to start?",
      "redoAttBorjaDesc": "Start your journey towards the defense market today. Our free education provides the basics you need.",
      "borjaLaraDigNu": "Start learning now",
      "dashboard": "Dashboard",
      "minProfil": "My Profile",
      "gaTillStartsidan": "Go to homepage",
      "loggaUt": "Logout",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'sv',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
