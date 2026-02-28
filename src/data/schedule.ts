export interface Topic {
  id: string;
  name: string;
  subject: string;
  grade: string;
  day: string;
}

export interface DayPlan {
  date: string;
  label: string;
  subject: string;
  grade: string;
  topics: Topic[];
}

const formatDate = (year: number, month: number, day: number): string => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// 7-sinf O'zbekiston tarixi — 56 mavzu
const TOPICS_7_OZ: string[] = [
  "O'rta Osiyo ibtidoiy jamoa davri",
  "Ilk davlatchilik tarixi",
  "Qadimgi Xorazm davlati",
  "Qang' davlati va madaniyati",
  "Baqtriya — Toxariston",
  "Kushon davlati va madaniyati",
  "Eftaliylar davlati",
  "Turk hoqonligi va O'rta Osiyo",
  "Arab bosqini va unga qarshi kurash",
  "Movarounnahrda islom madaniyati",
  "Somoniylar davlati",
  "Qoraxoniylar davlati",
  "G'aznaviylar davlati",
  "Saljuqiylar va Xorazm",
  "Xorazmshohlar davlati",
  "Mo'g'ullar bosqini",
  "Chig'atoy ulusi",
  "Temur va uning davlati",
  "Temur davlatining tashkil topishi",
  "Temurning harbiy yurishlari",
  "Temuriylar davri madaniyati",
  "Ulug'bek davri",
  "Ulug'bek rasadxonasi",
  "Navoiy va Husayn Boyqaro davri",
  "Shayboniylar davlati",
  "Buxoro xonligi",
  "Xiva xonligi",
  "Qo'qon xonligi",
  "XVI-XVII asr madaniyati",
  "XVIII asr siyosiy ahvoli",
  "Buxoro amirligida islohotlar",
  "Xiva xonligida ichki hayot",
  "Qo'qon xonligida ichki hayot",
  "Rossiya imperiyasining bosqini",
  "Toshkentning olinishi",
  "Turkiston general-gubernatorligi",
  "Mustamlakachilikka qarshi kurash",
  "Jadidchilik harakati",
  "1916-yil qo'zg'oloni",
  "1917-yil Fevral inqilobi",
  "Turkiston Muxtoriyati",
  "Sovet hokimiyatining o'rnatilishi",
  "Bosmachilar harakati",
  "O'zbekiston SSRning tuzilishi",
  "20-30-yillar islohotlari",
  "Qatag'on siyosati",
  "Ikkinchi jahon urushi yillari",
  "Urushdan keyingi tiklanish",
  "60-80-yillar taraqqiyoti",
  "Qayta qurish davri",
  "Mustaqillik e'lon qilinishi",
  "Davlat ramzlari",
  "Konstitutsiya qabul qilinishi",
  "Milliy valyuta — so'm",
  "Mustaqillik yillaridagi islohotlar",
  "O'zbekiston xalqaro hamjamiyatda",
];

// 7-sinf Jahon tarixi — 23 mavzu
const TOPICS_7_JT: string[] = [
  "Ibtidoiy jamoa tuzumi",
  "Qadimgi Misr tsivilizatsiyasi",
  "Mesopotamiya tsivilizatsiyasi",
  "Qadimgi Hindiston",
  "Qadimgi Xitoy",
  "Qadimgi Yunoniston",
  "Rim imperiyasi",
  "Xristianlik dinining paydo bo'lishi",
  "Yevropa feodal tuzumi",
  "Xoch yurishlari",
  "Arab xalifaligi",
  "Islom madaniyati va fani",
  "Vizantiya imperiyasi",
  "Uyg'onish davri — Renessans",
  "Buyuk geografik kashfiyotlar",
  "Reformatsiya harakati",
  "Absolutizm davri",
  "Angliya inqilobi",
  "Fransiya inqilobi",
  "Sanoat inqilobi",
  "Amerika mustaqillik urushi",
  "XIX asr Yevropa siyosati",
  "Milliy ozodlik harakatlari",
];

// 8-sinf O'zbekiston tarixi — 26 mavzu
const TOPICS_8_OZ: string[] = [
  "O'zbekiston mustaqilligi va uning ahamiyati",
  "Demokratik jamiyat qurish",
  "Huquqiy davlat asoslari",
  "Fuqarolik jamiyati",
  "Konstitutsiyaviy islohotlar",
  "Iqtisodiy islohotlar strategiyasi",
  "Bozor iqtisodiyotiga o'tish",
  "Agrar islohotlar",
  "Xususiylashtirish jarayonlari",
  "Ijtimoiy siyosat",
  "Ta'lim tizimidagi islohotlar",
  "Kadrlar tayyorlash milliy dasturi",
  "Sog'liqni saqlash tizimi",
  "Fan va texnologiyalar rivoji",
  "Madaniy hayot va ma'naviyat",
  "Milliy qadriyatlar tiklash",
  "Diniy bag'rikenglik",
  "Xalqaro munosabatlar",
  "BMT bilan hamkorlik",
  "MDH doirasidagi munosabatlar",
  "Markaziy Osiyo hamkorligi",
  "Xavfsizlik va tinchlik siyosati",
  "Harbiy islohotlar",
  "Ekologik muammolar — Orol dengizi",
  "Yangi O'zbekiston — islohotlar davri",
  "Raqamli O'zbekiston strategiyasi",
];

// 8-sinf Jahon tarixi — 25 mavzu
const TOPICS_8_JT: string[] = [
  "Birinchi jahon urushi sabablari",
  "Birinchi jahon urushi borishi",
  "Versalь tinchlik shartnomasi",
  "Millatlar Ligasi",
  "1920-30 yillar iqtisodiy inqiroz",
  "Fashizmning yuksalishi",
  "Italiyada fashizm",
  "Germaniyada natsizm",
  "Yaponiya militarizmi",
  "Ikkinchi jahon urushi boshlanishi",
  "Ikkinchi jahon urushi Yevropada",
  "Tinch okeanidagi urush",
  "Antifashist koalitsiya",
  "Ikkinchi jahon urushi yakunlari",
  "BMT tashkil topishi",
  "Sovuq urush boshlanishi",
  "NATO va Varshava pakti",
  "Mustamlakachilik tizimining yemirilishi",
  "Hindiston mustaqilligi",
  "Afrika dekolonizatsiyasi",
  "Kubadagi inqilob",
  "Vetnam urushi",
  "Sovuq urushning tugashi",
  "Globallashuv jarayonlari",
  "XXI asr muammolari",
];

// 9-sinf O'zbekiston tarixi — 36 mavzu
const TOPICS_9_OZ: string[] = [
  "Yangi O'zbekiston strategiyasi",
  "2017-2021 yillar harakatlar strategiyasi",
  "Taraqqiyot strategiyasi 2022-2026",
  "Konstitutsiya islohoti 2023",
  "Parlament islohotlari",
  "Sudlov tizimi islohotlari",
  "Mahalliy boshqaruv islohotlari",
  "Inson huquqlari kafolatlari",
  "Korrupsiyaga qarshi kurash",
  "Iqtisodiy erkinlashtirish",
  "Soliq islohotlari",
  "Bank tizimi modernizatsiyasi",
  "Investitsiya muhiti yaxshilash",
  "Sanoat klasterlari",
  "Qishloq xo'jaligini modernizatsiya",
  "Suv resurslarini boshqarish",
  "Energetika sohasidagi islohotlar",
  "Transport infratuzilmasi",
  "Raqamli transformatsiya",
  "Elektron hukumat",
  "Ta'lim sifatini oshirish",
  "Oliy ta'lim islohotlari",
  "Ilmiy-tadqiqot sohasidagi yangilanishlar",
  "Yoshlar siyosati",
  "Xotin-qizlar huquqlari",
  "Ijtimoiy himoya tizimi",
  "Sog'liqni saqlash modernizatsiyasi",
  "Sport va sog'lom turmush tarzi",
  "Madaniy meros saqlash",
  "Turizm sohasini rivojlantirish",
  "Ekologik barqarorlik",
  "Iqlim o'zgarishi bilan kurash",
  "Tashqi siyosat ustuvorliklari",
  "Qo'shnichilik siyosati",
  "Xalqaro tashkilotlardagi faoliyat",
  "O'zbekiston kelajagi",
];

// 9-sinf Jahon tarixi — 31 mavzu
const TOPICS_9_JT: string[] = [
  "XXI asr boshidagi jahon siyosati",
  "AQSh tashqi siyosati",
  "Yevropa Ittifoqi integratsiyasi",
  "Yevropa Ittifoqining kengayishi",
  "Rossiya zamonaviy davri",
  "Xitoyning yuksalishi",
  "Hindistonning rivojlanishi",
  "Yaponiya zamonaviy davri",
  "Janubiy-Sharqiy Osiyo",
  "Koreya yarim oroli muammolari",
  "Yaqin Sharq muammolari",
  "Arab bahori",
  "Afg'oniston muammosi",
  "Afrika taraqqiyoti",
  "Lotin Amerikasi",
  "Terrorizm muammosi",
  "Yadroviy qurolsizlanish",
  "Xalqaro huquq va diplomatiya",
  "BMT islohotlari",
  "Jahon iqtisodiyoti tendensiyalari",
  "Jahon moliyaviy inqirozlari",
  "Raqamli iqtisodiyot",
  "Sun'iy intellekt va jamiyat",
  "Iqlim o'zgarishi — global muammo",
  "Energetik o'tish jarayoni",
  "Pandemiyalar va global salomatlik",
  "Migratsiya muammolari",
  "Axborot urushi va media",
  "Kosmik tadqiqotlar",
  "Barqaror rivojlanish maqsadlari",
  "Insoniyat oldidagi global muammolar",
];

// Revision topics
const REVISION_7 = [
  "7-sinf O'zbekiston tarixi — umumiy takror",
  "7-sinf Jahon tarixi — umumiy takror",
  "Asosiy sanalar va voqealar",
  "Tarixiy shaxslar",
  "Xaritalar bilan ishlash",
  "Test topshiriqlari tahlili",
  "Xatolar ustida ishlash",
];

const REVISION_8 = [
  "8-sinf O'zbekiston tarixi — umumiy takror",
  "8-sinf Jahon tarixi — umumiy takror",
  "Mustaqillik davri asosiy sanalar",
  "Jahon urushi sanalar va voqealar",
  "Xalqaro tashkilotlar",
  "Geosiyosiy xaritalar tahlili",
  "Tarixiy hujjatlar tahlili",
  "Test topshiriqlari mashqi",
];

const REVISION_9 = [
  "9-sinf O'zbekiston tarixi — umumiy takror",
  "9-sinf Jahon tarixi — umumiy takror",
  "Zamonaviy siyosiy jarayonlar",
  "Iqtisodiy islohotlar tahlili",
  "Xalqaro munosabatlar tizimi",
  "Global muammolar tahlili",
  "Mantiqiy savollarga javob tayyorlash",
  "Test strategiyasi va vaqt boshqaruvi",
  "Murakkab savollar tahlili",
];

const REVISION_FINAL = [
  "Barcha sinflar bo'yicha umumiy takror",
  "Eng ko'p xato qilinadigan mavzular",
  "Imtihon formati va strategiya",
  "So'nggi mashq testi",
  "Psixologik tayyorgarlik",
];

function createTopics(
  names: string[],
  subject: string,
  grade: string,
  date: string,
  startIdx: number
): Topic[] {
  return names.map((name, i) => ({
    id: `${grade}-${subject}-${startIdx + i}`.replace(/\s+/g, '-').replace(/['']/g, ''),
    name,
    subject,
    grade,
    day: date,
  }));
}

function sliceTopics(
  allNames: string[],
  offset: number,
  count: number
): string[] {
  return allNames.slice(offset, offset + count);
}

export const TOTAL_TOPICS = 197;

export const buildSchedule = (): DayPlan[] => {
  const plans: DayPlan[] = [];
  let offset: Record<string, number> = {};

  const getSlice = (key: string, names: string[], count: number) => {
    if (!offset[key]) offset[key] = 0;
    const start = offset[key];
    offset[key] += count;
    return { slice: sliceTopics(names, start, count), startIdx: start };
  };

  // Feb 28 - Mar 6: 7-sinf O'zbekiston tarixi (8/day) = 56
  const dates7oz = [
    formatDate(2026, 2, 28),
    ...Array.from({ length: 6 }, (_, i) => formatDate(2026, 3, i + 1)),
  ];
  dates7oz.forEach((date) => {
    const { slice, startIdx } = getSlice("7oz", TOPICS_7_OZ, 8);
    plans.push({
      date,
      label: "7-sinf O'zbekiston tarixi",
      subject: "O'zbekiston tarixi",
      grade: "7-sinf",
      topics: createTopics(slice, "O'zbekiston tarixi", "7-sinf", date, startIdx),
    });
  });

  // Mar 7-9: 7-sinf Jahon tarixi (8, 8, 7)
  [8, 8, 7].forEach((count, i) => {
    const date = formatDate(2026, 3, 7 + i);
    const { slice, startIdx } = getSlice("7jt", TOPICS_7_JT, count);
    plans.push({
      date,
      label: "7-sinf Jahon tarixi",
      subject: "Jahon tarixi",
      grade: "7-sinf",
      topics: createTopics(slice, "Jahon tarixi", "7-sinf", date, startIdx),
    });
  });

  // Mar 10-12: 8-sinf O'zbekiston tarixi (9, 9, 8)
  [9, 9, 8].forEach((count, i) => {
    const date = formatDate(2026, 3, 10 + i);
    const { slice, startIdx } = getSlice("8oz", TOPICS_8_OZ, count);
    plans.push({
      date,
      label: "8-sinf O'zbekiston tarixi",
      subject: "O'zbekiston tarixi",
      grade: "8-sinf",
      topics: createTopics(slice, "O'zbekiston tarixi", "8-sinf", date, startIdx),
    });
  });

  // Mar 13-15: 8-sinf Jahon tarixi (8, 8, 9)
  [8, 8, 9].forEach((count, i) => {
    const date = formatDate(2026, 3, 13 + i);
    const { slice, startIdx } = getSlice("8jt", TOPICS_8_JT, count);
    plans.push({
      date,
      label: "8-sinf Jahon tarixi",
      subject: "Jahon tarixi",
      grade: "8-sinf",
      topics: createTopics(slice, "Jahon tarixi", "8-sinf", date, startIdx),
    });
  });

  // Mar 16-19: 9-sinf O'zbekiston tarixi (9/day)
  for (let d = 16; d <= 19; d++) {
    const date = formatDate(2026, 3, d);
    const { slice, startIdx } = getSlice("9oz", TOPICS_9_OZ, 9);
    plans.push({
      date,
      label: "9-sinf O'zbekiston tarixi",
      subject: "O'zbekiston tarixi",
      grade: "9-sinf",
      topics: createTopics(slice, "O'zbekiston tarixi", "9-sinf", date, startIdx),
    });
  }

  // Mar 20-23: 9-sinf Jahon tarixi (8, 8, 8, 7)
  [8, 8, 8, 7].forEach((count, i) => {
    const date = formatDate(2026, 3, 20 + i);
    const { slice, startIdx } = getSlice("9jt", TOPICS_9_JT, count);
    plans.push({
      date,
      label: "9-sinf Jahon tarixi",
      subject: "Jahon tarixi",
      grade: "9-sinf",
      topics: createTopics(slice, "Jahon tarixi", "9-sinf", date, startIdx),
    });
  });

  // Mar 24-27: Intensive Revision
  const revisionData: [string[], string][] = [
    [REVISION_7, "7-sinf Takrorlash"],
    [REVISION_8, "8-sinf Takrorlash"],
    [REVISION_9, "9-sinf Takrorlash"],
    [REVISION_FINAL, "Yakuniy Takrorlash"],
  ];
  revisionData.forEach(([topics, label], i) => {
    const date = formatDate(2026, 3, 24 + i);
    plans.push({
      date,
      label,
      subject: "Takrorlash",
      grade: label,
      topics: createTopics(topics, "Takrorlash", label, date, 0),
    });
  });

  // Mar 28: Exam Day
  plans.push({
    date: formatDate(2026, 3, 28),
    label: "Imtihon kuni! 🎉",
    subject: "Imtihon",
    grade: "",
    topics: [],
  });

  return plans;
};

export const schedule = buildSchedule();

export const getAllTopics = (): Topic[] => {
  return schedule.flatMap((day) => day.topics);
};

export const getTodayPlan = (): DayPlan | undefined => {
  const today = new Date().toISOString().split("T")[0];
  return schedule.find((day) => day.date === today);
};

export const getDaysRemaining = (): number => {
  const examDate = new Date(2026, 2, 28);
  const today = new Date();
  const diff = examDate.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};
