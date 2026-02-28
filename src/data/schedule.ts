export interface Topic {
  id: string;
  name: string;
  subject: string;
  grade: string;
  day: string; // YYYY-MM-DD
}

export interface DayPlan {
  date: string;
  label: string;
  subject: string;
  grade: string;
  topics: Topic[];
}

const generateTopics = (
  subject: string,
  grade: string,
  startIndex: number,
  count: number,
  date: string
): Topic[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${grade}-${subject}-${startIndex + i}`,
    name: `${startIndex + i}-mavzu`,
    subject,
    grade,
    day: date,
  }));
};

const formatDate = (year: number, month: number, day: number): string => {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const TOTAL_TOPICS = 197;

export const buildSchedule = (): DayPlan[] => {
  const plans: DayPlan[] = [];
  let topicCounter: Record<string, number> = {};

  const getNext = (key: string, count: number) => {
    if (!topicCounter[key]) topicCounter[key] = 1;
    const start = topicCounter[key];
    topicCounter[key] += count;
    return start;
  };

  // Feb 28 - Mar 6: 7-sinf O'zbekiston tarixi (8 topics/day) = 7 days × 8 = 56
  const key7oz = "ozbekiston-tarixi";
  for (let d = 28; d <= 28; d++) {
    const date = formatDate(2026, 2, d);
    const start = getNext(`7-${key7oz}`, 8);
    plans.push({
      date, label: `7-sinf O'zbekiston tarixi`, subject: "O'zbekiston tarixi", grade: "7-sinf",
      topics: generateTopics("O'zbekiston tarixi", "7-sinf", start, 8, date),
    });
  }
  for (let d = 1; d <= 6; d++) {
    const date = formatDate(2026, 3, d);
    const start = getNext(`7-${key7oz}`, 8);
    plans.push({
      date, label: `7-sinf O'zbekiston tarixi`, subject: "O'zbekiston tarixi", grade: "7-sinf",
      topics: generateTopics("O'zbekiston tarixi", "7-sinf", start, 8, date),
    });
  }

  // Mar 7-9: 7-sinf Jahon tarixi (8, 8, 7)
  const key7jt = "jahon-tarixi";
  [8, 8, 7].forEach((count, i) => {
    const date = formatDate(2026, 3, 7 + i);
    const start = getNext(`7-${key7jt}`, count);
    plans.push({
      date, label: `7-sinf Jahon tarixi`, subject: "Jahon tarixi", grade: "7-sinf",
      topics: generateTopics("Jahon tarixi", "7-sinf", start, count, date),
    });
  });

  // Mar 10-12: 8-sinf O'zbekiston tarixi (9, 9, 8)
  [9, 9, 8].forEach((count, i) => {
    const date = formatDate(2026, 3, 10 + i);
    const start = getNext(`8-${key7oz}`, count);
    plans.push({
      date, label: `8-sinf O'zbekiston tarixi`, subject: "O'zbekiston tarixi", grade: "8-sinf",
      topics: generateTopics("O'zbekiston tarixi", "8-sinf", start, count, date),
    });
  });

  // Mar 13-15: 8-sinf Jahon tarixi (8, 8, 9)
  [8, 8, 9].forEach((count, i) => {
    const date = formatDate(2026, 3, 13 + i);
    const start = getNext(`8-${key7jt}`, count);
    plans.push({
      date, label: `8-sinf Jahon tarixi`, subject: "Jahon tarixi", grade: "8-sinf",
      topics: generateTopics("Jahon tarixi", "8-sinf", start, count, date),
    });
  });

  // Mar 16-19: 9-sinf O'zbekiston tarixi (9/day)
  for (let d = 16; d <= 19; d++) {
    const date = formatDate(2026, 3, d);
    const start = getNext(`9-${key7oz}`, 9);
    plans.push({
      date, label: `9-sinf O'zbekiston tarixi`, subject: "O'zbekiston tarixi", grade: "9-sinf",
      topics: generateTopics("O'zbekiston tarixi", "9-sinf", start, 9, date),
    });
  }

  // Mar 20-23: 9-sinf Jahon tarixi (8, 8, 8, 7)
  [8, 8, 8, 7].forEach((count, i) => {
    const date = formatDate(2026, 3, 20 + i);
    const start = getNext(`9-${key7jt}`, count);
    plans.push({
      date, label: `9-sinf Jahon tarixi`, subject: "Jahon tarixi", grade: "9-sinf",
      topics: generateTopics("Jahon tarixi", "9-sinf", start, count, date),
    });
  });

  // Mar 24-27: Intensive Revision
  const revisionLabels = [
    "7-sinf Takrorlash", "8-sinf Takrorlash", "9-sinf Takrorlash", "Yakuniy Takrorlash"
  ];
  [7, 8, 9, 5].forEach((count, i) => {
    const date = formatDate(2026, 3, 24 + i);
    plans.push({
      date, label: revisionLabels[i], subject: "Takrorlash", grade: revisionLabels[i],
      topics: generateTopics("Takrorlash", revisionLabels[i], 1, count, date),
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
  return schedule.flatMap(day => day.topics);
};

export const getTodayPlan = (): DayPlan | undefined => {
  const today = new Date().toISOString().split('T')[0];
  return schedule.find(day => day.date === today);
};

export const getDaysRemaining = (): number => {
  const examDate = new Date(2026, 2, 28); // Mar 28
  const today = new Date();
  const diff = examDate.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};
