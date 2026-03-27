import { RASI_NAMES } from './panchang';
import { KundliData } from './kundli';

export interface AstrologyInsights {
  personality: { en: string; hi: string };
  career: { en: string; hi: string };
  love: { en: string; hi: string };
  health: { en: string; hi: string };
  finance: { en: string; hi: string };
}

const lagnaInsights: Record<number, Partial<AstrologyInsights>> = {
  0: { // Mesha (Aries)
    personality: { en: "Dynamic, energetic, and a natural leader. You possess strong initiative.", hi: "आप गतिशील, ऊर्जावान और स्वभाव से नेतृत्व करने वाले हैं। आपमें प्रबल पहल शक्ति है।" },
    career: { en: "Success in leadership roles, engineering, or defense.", hi: "नेतृत्व भूमिकाओं, इंजीनियरिंग या रक्षा में सफलता।" }
  },
  1: { // Vrishabha (Taurus)
    personality: { en: "Patient, reliable, and determined. You value stability.", hi: "आप धैर्यवान, भरोसेमंद और दृढ़ निश्चयी हैं। आप स्थिरता को महत्व देते हैं।" },
    career: { en: "Strong growth in finance, luxury goods, or arts.", hi: "वित्त, विलासिता की वस्तुओं या कला में मजबूत विकास।" }
  },
  2: { // Mithuna (Gemini)
    personality: { en: "Versatile, expressive, and intellectually curious.", hi: "आप बहुमुखी, अभिव्यंजक और बौद्धिक रूप से जिज्ञासु हैं।" },
    career: { en: "Excel in communication, media, or information technology.", hi: "संचार, मीडिया या सूचना प्रौद्योगिकी में उत्कृष्टता।" }
  },
  3: { // Karka (Cancer)
    personality: { en: "Intuitive, nurturing, and emotionally intelligent.", hi: "आप सहज ज्ञान युक्त, पोषण करने वाले और भावनात्मक रूप से बुद्धिमान हैं।" },
    career: { en: "Success in hospitality, healthcare, or real estate.", hi: "आतिथ्य, स्वास्थ्य सेवा या रियल एस्टेट में सफलता।" }
  },
  4: { // Simha (Leo)
    personality: { en: "Charismatic, confident, and magnanimous.", hi: "आप करिश्माई, आत्मविश्वासी और उदार हैं।" },
    career: { en: "Natural fit for entertainment, politics, or management.", hi: "मनोरंजन, राजनीति या प्रबंधन के लिए प्राकृतिक रूप से उपयुक्त।" }
  },
  5: { // Kanya (Virgo)
    personality: { en: "Analytical, meticulous, and service-oriented.", hi: "आप विश्लेषणात्मक, सूक्ष्म और सेवा-उन्मुख हैं।" },
    career: { en: "Excel in research, accounting, or quality control.", hi: "अनुसंधान, लेखांकन या गुणवत्ता नियंत्रण में उत्कृष्ट।" }
  },
  6: { // Tula (Libra)
    personality: { en: "Diplomatic, fair-minded, and social.", hi: "आप राजनयिक, निष्पक्ष और सामाजिक हैं।" },
    career: { en: "Success in law, public relations, or design.", hi: "कानून, जनसंपर्क या डिजाइन में सफलता।" }
  },
  7: { // Vrishchika (Scorpio)
    personality: { en: "Resourceful, brave, and passionate.", hi: "आप साधन संपन्न, साहसी और भावुक हैं।" },
    career: { en: "Excel in investigation, psychology, or deep research.", hi: "जांच, मनोविज्ञान या गहन शोध में उत्कृष्टता।" }
  },
  8: { // Dhanu (Sagittarius)
    personality: { en: "Optimistic, lover of freedom, and philosophical.", hi: "आप आशावादी, स्वतंत्रता प्रेमी और दार्शनिक हैं।" },
    career: { en: "Success in teaching, travel, or law.", hi: "शिक्षण, यात्रा या कानून में सफलता।" }
  },
  9: { // Makara (Capricorn)
    personality: { en: "Disciplined, responsible, and ambitious.", hi: "आप अनुशासित, जिम्मेदार और महत्वाकांक्षी हैं।" },
    career: { en: "Strong path in government, administration, or structural engineering.", hi: "सरकार, प्रशासन या स्ट्रक्चरल इंजीनियरिंग में मजबूत मार्ग।" }
  },
  10: { // Kumbha (Aquarius)
    personality: { en: "Progressive, original, and humanitarian.", hi: "आप प्रगतिशील, मौलिक और मानवीय हैं।" },
    career: { en: "Excel in science, technology, or social activism.", hi: "विज्ञान, प्रौद्योगिकी या सामाजिक सक्रियता में उत्कृष्टता।" }
  },
  11: { // Meena (Pisces)
    personality: { en: "Compassionate, artistic, and intuitive.", hi: "आप दयालु, कलात्मक और सहज ज्ञान युक्त हैं।" },
    career: { en: "Success in creative arts, counseling, or spiritual healing.", hi: "रचनात्मक कला, परामर्श या आध्यात्मिक उपचार में सफलता।" }
  }
};

const moonInsights: Record<number, string> = {
  0: "Bold emotions",
  7: "Balanced mind",
  // ...
};

export function generateAstrologyInsights(data: KundliData): AstrologyInsights {
  const lagna = data.lagna.sign;
  const moon = data.planets.find(p => p.name === 'Chandra')?.sign || 0;
  
  // Base insights from Lagna
  const base = lagnaInsights[lagna] || {
    personality: { en: "Versatile and curious personality.", hi: "बहुमुखी और जिज्ञासु व्यक्तित्व।" },
    career: { en: "Diverse career paths will be available.", hi: "विविध करियर पथ उपलब्ध होंगे।" }
  };

  // Add more dynamic traits based on planets (simplified for MVP)
  return {
    personality: base.personality!,
    career: base.career!,
    love: {
      en: "Stable and meaningful relationships are predicted. Emotional bonding is key.",
      hi: "स्थिर और अर्थपूर्ण संबंधों की भविष्यवाणी की गई है। भावनात्मक जुड़ाव महत्वपूर्ण है।"
    },
    health: {
      en: "Maintain a balanced diet and regular exercise routine. Watch out for seasonal changes.",
      hi: "संतुलित आहार और नियमित व्यायाम दिनचर्या बनाए रखें। मौसमी बदलावों का ध्यान रखें।"
    },
    finance: {
      en: "Consistent growth in wealth after mid-30s. Smart investments will pay off.",
      hi: "30 के दशक के मध्य के बाद धन में लगातार वृद्धि। स्मार्ट निवेश फल देगा।"
    }
  };
}
