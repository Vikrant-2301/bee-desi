// Translations for FAQs Page (/faqs)

export const FAQS_TRANSLATIONS = {
  en: {
    hero_tag: "Terroir & Purity Knowledge",
    hero_h1: "Frequently Asked Questions",
    hero_p: "Everything you need to know about raw unheated honey, German NMR spectroscopy, single-flora botanical terroirs, and ethical beekeeping.",
    search_placeholder: "Search questions: crystallization, NMR, diabetes, shelf life...",
    cat_all: "All Questions",
    cat_about: "About the Honey",
    cat_purity: "Purity & Science",
    cat_harvest: "Harvest & Terroirs",
    cat_orders: "Orders & Shipping",
    still_questions: "Still have questions?",
    still_p: "Speak directly with master beekeeper Suresh Yadav or our apiculture team.",
    phone_label: "Direct Lines: 7071101119 / 9307777500",
    btn_whatsapp: "WhatsApp Helpline",
    btn_shop: "Shop Raw Single-Origin Honeys",
  },
  hi: {
    hero_tag: "शुद्धता और प्रकृति का ज्ञान",
    hero_h1: "अक्सर पूछे जाने वाले सवाल",
    hero_p: "कच्चे शहद, जर्मन एनएमआर टेस्टिंग, एकल-पुष्प अमृत और पारंपरिक मधुमक्खी पालन से जुड़ी सभी जानकारियां।",
    search_placeholder: "सवाल खोजें: जमना, एनएमआर, डायबिटीज़, एक्सपायरी...",
    cat_all: "सभी सवाल",
    cat_about: "शहद के बारे में",
    cat_purity: "शुद्धता व विज्ञान",
    cat_harvest: "फसल व वन क्षेत्र",
    cat_orders: "ऑर्डर व डिलीवरी",
    still_questions: "क्या आपका कोई और सवाल है?",
    still_p: "सीधे मधुमक्खी पालक सुरेश यादव जी या हमारी टीम से संपर्क करें।",
    phone_label: "सीधे फोन नंबर: 7071101119 / 9307777500",
    btn_whatsapp: "व्हाट्सएप हेल्पलाइन",
    btn_shop: "शुद्ध कच्चा शहद खरीदें",
  },
  pa: {
    hero_tag: "ਸ਼ੁੱਧਤਾ ਦੀ ਜਾਣਕਾਰੀ",
    hero_h1: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
    hero_p: "ਕੱਚੇ ਸ਼ਹਿਦ, ਜਰਮਨ ਐਨਐਮਆਰ ਟੈਸਟਿੰਗ ਅਤੇ ਸ਼ਹਿਦ ਪਾਲਣ ਬਾਰੇ ਸਾਰੀ ਜਾਣਕਾਰੀ।",
    search_placeholder: "ਸਵਾਲ ਖੋਜੋ: ਜੰਮਣਾ, ਐਨਐਮਆਰ, ਸ਼ੂਗਰ...",
    cat_all: "ਸਾਰੇ ਸਵਾਲ",
    cat_about: "ਸ਼ਹਿਦ ਬਾਰੇ",
    cat_purity: "ਸ਼ੁੱਧਤਾ ਤੇ ਵਿਗਿਆਨ",
    cat_harvest: "ਫਸਲ ਤੇ ਜੰਗਲ",
    cat_orders: "ਆਰਡਰ ਤੇ ਡਿਲੀਵਰੀ",
    still_questions: "ਕੀ ਕੋਈ ਹੋਰ ਸਵਾਲ ਹੈ?",
    still_p: "ਸੁਰੇਸ਼ ਯਾਦਵ ਜਾਂ ਸਾਡੀ ਟੀਮ ਨਾਲ ਸਿੱਧਾ ਗੱਲਬਾਤ ਕਰੋ।",
    phone_label: "ਫ਼ੋਨ: 7071101119 / 9307777500",
    btn_whatsapp: "ਵ੍ਹਟਸਐਪ ਹੈਲਪਲਾਈਨ",
    btn_shop: "ਸ਼ੁੱਧ ਸ਼ਹਿਦ ਖਰੀਦੋ",
  },
  gu: {
    hero_tag: "શુદ્ધતાનું જ્ઞાન",
    hero_h1: "વારંવાર પૂછાતા પ્રશ્નો",
    hero_p: "કાચા મધ, જર્મન એનએમઆર ટેસ્ટિંગ અને મધમાખી પાલન વિશે બધી વિગતો.",
    search_placeholder: "પ્રશ્ન શોધો: જામી જવું, એનએમઆર, ડાયાબિટીસ...",
    cat_all: "બધા પ્રશ્નો",
    cat_about: "મધ વિશે",
    cat_purity: "શુદ્ધતા અને વિજ્ઞાન",
    cat_harvest: "પાક અને વન વિસ્તાર",
    cat_orders: "ઓર્ડર અને ડિલિવરી",
    still_questions: "શું તમારો કોઈ પ્રશ્ન બાકી છે?",
    still_p: "સીધા સુરેશ યાદવજી સાથે વાત કરો.",
    phone_label: "ફોન: 7071101119 / 9307777500",
    btn_whatsapp: "વોટ્સએપ હેલ્પલાઇન",
    btn_shop: "શુદ્ધ કાચું મધ ખરીદો",
  },
};

["mr", "bn", "ta", "te"].forEach((code) => {
  if (!FAQS_TRANSLATIONS[code]) {
    FAQS_TRANSLATIONS[code] = FAQS_TRANSLATIONS.hi;
  }
});
