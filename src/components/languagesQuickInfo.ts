// TEXT THAT IS SHOWN IN HOVER-ACTIVATED POP-UP -- QUICK LANG INFO

const languagesQuickInfo = (langCode: string): any => {
    const langs: any = {
        en: {
            speakers: "Approximately 1.5 billion.",
            countries: "United States, United Kingdom, Canada, Australia.",
            family: "Indo-European, Germanic.",
            note: "Emerged as a global lingua franca during the British Empire's expansion and was further solidified by the United States' cultural and economic influence in the 20th century. Evolved from Old English, heavily influenced by Norman French and Latin, resulting in a unique vocabulary and grammar that set it apart from other Germanic languages.",
        },

        zh: {
            speakers: "Around 1.1 billion.",
            countries: "China, Taiwan, Singapore.",
            family: "Sino-Tibetan.",
            note: "Standardised as the official language of China in the early 20th century, facilitating communication across diverse dialects. Mandarin is the official language of China and has numerous regional dialects. Characterised by its use of Hanzi characters and a tonal system with four distinct tones, where the meaning of a word can change based on its tone.",
        },

        hi: {
            speakers: "Approximately 609.5 million.",
            countries: "India, Nepal, Fiji.",
            family: "Indo-European, Indo-Aryan.",
            note: "Evolved from Sanskrit and Prakrit languages. Standardised in the 19th century and adopted as one of India's official languages after independence in the 20th century. Written in the Devanagari script, it is the most widely spoken language in India. It has numerous dialects and has been influenced by Persian, Arabic, and English.",
        },

        es: {
            speakers: "About 559.1 million.",
            countries: "Mexico, Colombia, Argentina, Chile, Venezuela, Spain.",
            family: "Indo-European, Romance.",
            note: "Having evolved from Latin, it spread worldwide during the Spanish Empire, particularly between the 15th and 17th centuries, as a result of Spanish colonisation, ultimately becoming the predominant language across much of Latin America. It holds official status in more than 20 countries today.",
        },

        fr: {
            speakers: "Approximately 274 million.",
            countries: "France, Belgium, Switzerland, Canada, Democratic Republic of the Congo.",
            family: "Indo-European, Romance.",
            note: "Originated from Latin. Served as the diplomatic and cultural lingua franca in Europe during the 17th to 19th centuries, influencing international relations and arts. Considered relatively conservative among Romance languages. Known for its reluctance to borrow from English, many silent letters, and frequent nasal sounds.",
        },

        ar: {
            speakers: "Around 274 million.",
            countries: "Egypt, Palestine, Syria, Morocco, Saudi Arabia, Iraq.",
            family: "Afro-Asiatic, Semitic.",
            note: "Unified as a literary language through the Quran in the 7th century, facilitating its spread across the Middle East and North Africa. Classical Arabic (Fus'ha), the language of the Quran, evolved into Modern Standard Arabic, which is used in media and formal settings. Written in its own script. Known for its emphatic consonants and rare guttural sounds.",
        },

        be: {
            speakers: "Approximately 273 million.",
            countries: "Bangladesh, India.",
            family: "Indo-European, Indo-Aryan.",
            note: "Evolved from Magadhi Prakrit; gained prominence during the Bengal Renaissance in the 19th century, enriching literature and arts. Known for its rich literary heritage, including works by famous Rabindranath Tagore.",
        },

        pt: {
            speakers: "About 258 million.",
            countries: "Brazil, Portugal, Mozambique.",
            family: "Indo-European, Romance.",
            note: "Expanded globally during the Age of Discoveries in the 15th and 16th centuries, establishing its presence in South America, Africa, and Asia. It became one of the most widely spoken languages due to the Portuguese Empire's extensive maritime exploration and colonial expansion.",
        },

        ru: {
            speakers: "Approximately 258 million.",
            countries: "Russia, Belarus, Ukraine, Kazakhstan.",
            family: "Indo-European, Slavic.",
            note: "Standardised in the 18th century under Peter the Great, served as a lingua franca of both the Russian Empire and the Soviet Union. Uses the Cyrillic script. Evolved from Old Church Slavonic. Stands apart from other Slavic languages due to its extensive borrowing and influence from Greek, Latin, French, and German.",
        },

        ur: {
            speakers: "Around 230 million.",
            countries: "Pakistan, India.",
            family: "Indo-European, Indo-Aryan.",
            note: "Shares linguistic roots with Hindi but incorporates Persian and Arabic vocabulary. Written in a modified Perso-Arabic script. Mutually intelligible with Hindi in speech but differs significantly in its formal register and writing system.",
        },

        de: {
            speakers: "Approximately 135 million.",
            countries: "Germany, Austria, Switzerland.",
            family: "Indo-European, Germanic.",
            note: "Standardised in the 16th century with Martin Luther's Bible translation; became influential in philosophy, science, and literature during the 18th and 19th centuries. Known for its compound words and flexible word order. Often regarded for its clear and consistent pronunciation, where each letter is typically pronounced as it is written.",
        },

        cz: {
            speakers: "About 10.7 million.",
            countries: "Czech Republic.",
            family: "Indo-European, Slavic.",
            note: "Revitalised in the 19th century during the Czech National Revival. Has a rich tradition of literature and music. Known for its complex system of declensions, typical of Slavic languages, and its use of hard and soft consonants that distinguish word meanings. Has a relatively free word order.",
        },

        is: {
            speakers: "Approximately 372,000.",
            countries: "Iceland.",
            family: "Indo-European, Germanic.",
            note: "The closest modern language to Old Norse, the tongue of the original Vikings/Norsemen. It has changed little since medieval times, preserving many archaic features and linguistic purity. Considered the most conservative modern Germanic language.",
        },

        la: {
            speakers: "Considered a dead language with no native speakers.",
            countries: "Historically spoken in Ancient Rome, now in Vatican City (official status).",
            family: "Indo-European, Romance.",
            note: "The language of the Roman Empire. It later evolved into the modern Romance languages. Highly influential, used as the lingua franca of science, law, and theology for centuries throughout Europe.",
        },

        jp: {
            speakers: "Approximately 125 million.",
            countries: "Predominantly Japan.",
            family: "Japonic.",
            note: "Japanese has incorporated numerous loanwords from Chinese and, more recently, Western languages. Its writing system combines logographic kanji with syllabic kana scripts, allowing for nuanced expression.",
        },

        sw: {
            speakers: "Around 16 million native speakers; over 80 million including second-language speakers.",
            countries: "Tanzania, Kenya, Democratic Republic of the Congo.",
            family: "Niger-Congo, Bantu.",
            note: "Swahili emerged as a lingua franca along the East African coast, influenced by Arabic due to historical trade connections. It features a straightforward phonetic system and is known for its use of noun classes, which impact verb conjugation and sentence structure.",
        },

        tr: {
            speakers: "Approximately 75 million.",
            countries: "Turkey, Cyprus.",
            family: "Turkic.",
            note: "Modern Turkish evolved from Ottoman Turkish, undergoing significant reforms in the 20th century under Mustafa Kemal Atatürk, including the abandonment of Arabic script and the adoption of the Latin alphabet. Features vowel harmony and agglutination, where affixes are added to roots to express grammatical relationships. Significantly influenced by Arabic and French.",
        },

        it: {
            speakers: "About 67 million.",
            countries: "Italy, Switzerland, San Marino, Vatican City.",
            family: "Indo-European, Romance.",
            note: "Italian descends from Latin and was standardised based on the Tuscan dialect, largely due to the influence of Dante Alighieri's literary works. Known for its melodic intonation and rich vowel system. Preserves much of the Latin grammatical structure, including gendered nouns and a system of verb conjugations based on tense and subject.",
        },

        pe: {
            speakers: "Approximately 80 million.",
            countries: "Iran, Afghanistan (as Dari), Tajikistan (as Tajik).",
            family: "Indo-European, Indo-Iranian.",
            note: "Uses the Persian or Farsi script, a variant of the Arabic alphabet, and has a subject-object-verb word order. Has a relatively simple grammar, with no grammatical gender or verb conjugation for person, and has borrowed extensively from Arabic and French. Has a rich literary tradition, with classical poets like Rumi and Hafez contributing to its cultural heritage.",
        },

        ko: {
            speakers: "Around 77 million.",
            countries: "South Korea, North Korea.",
            family: "Koreanic.",
            note: "Uses an alphabet called Hangul, created in the 15th century under King Sejong the Great to promote literacy, which allows for efficient phonetic representation. It has a subject-object-verb sentence structure and incorporates a system of honorifics that reflect social hierarchy.",
        },

        ta: {
            speakers: "Approximately 75 million.",
            countries: "India (Tamil Nadu), Sri Lanka, Singapore.",
            family: "Dravidian.",
            note: "Tamil boasts one of the world's oldest continuous literary traditions, with texts dating back over two millennia.",
        },

        vi: {
            speakers: "About 86 million.",
            countries: "Vietnam.",
            family: "Austroasiatic.",
            note: "Vietnamese has been heavily influenced by Chinese, both lexically and through the historical use of Chinese characters before adopting the Latin-based Quốc Ngữ script. Has six distinct tones that affect meaning.",
        },

        po: {
            speakers: "Approximately 45 million.",
            countries: "Poland.",
            family: "Indo-European, Slavic.",
            note: "Known for its complex system of grammatical cases and its use of consonant clusters. Retains many features of Proto-Slavic, including a rich system of verb conjugation and aspect. Has a rich literary history and has been a significant cultural language in Central Europe.",
        },

        du: {
            speakers: "Around 23 million.",
            countries: "Netherlands, Belgium (as Flemish).",
            family: "Indo-European, Germanic.",
            note: "Dutch played a crucial role during the Dutch Golden Age in the 17th century, influencing global trade and culture.",
        },

        th: {
            speakers: "Approximately 69 million.",
            countries: "Thailand.",
            family: "Kra-Dai.",
            note: "Uses its own script and is tonal, with a rich tradition of literature and poetry. Has five distinct tones that influence word meaning. Uses its own script, which is derived from the Khmer alphabet, and has a subject-verb-object sentence structure with little inflection.",
        },

        gr: {
            speakers: "About 13 million.",
            countries: "Greece, Cyprus.",
            family: "Indo-European, Hellenic.",
            note: "One of the world's oldest recorded languages, with a documented history spanning over 3,000 years, profoundly influencing other European languages, philosophy, theology and science. Uses its unique alphabet. Features a highly inflected grammar system, with different cases for nouns and a rich vocabulary influenced by ancient and modern roots.",
        },

        he: {
            speakers: "Approximately 9 million.",
            countries: "Israel.",
            family: "Afro-Asiatic, Semitic.",
            note: "Typical of Semitic languages, it is written from right to left and follows a root-based structure, where words are formed from three-letter roots. Uses the Hebrew script. Revived as a spoken language in the 19th and 20th centuries after being primarily used in religious and literary contexts for centuries.",
        },
        ka: {
            speakers: "Approximately 4 million.",
            countries: "Primarily Georgia; secondarily Russia, Turkey, and Iran.",
            family: "Kartvelian.",
            note: "Georgian belongs to the Kartvelian language family, unrelated to any major world language groups. It uses its own unique script, the Mkhedruli alphabet with no capital letters, and is notable for its complex verb system and agglutinative structure. Has a rich literary tradition dating back to the 5th century.",
        },
    };

    if (!Object.keys(langs).includes(langCode)) return null;
    else return langs[langCode];
};

export default languagesQuickInfo;
