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

  const add = (date: string, label: string, subject: string, grade: string, count: number) => {
    const key = `${grade}-${subject}`;
    const start = getNext(key, count);
    plans.push({
      date, label, subject, grade,
      topics: generateTopics(subject, grade, start, count, date),
    });
  };

  // Mar 1-8: 7-sinf O'zbekiston tarixi (7/day × 8 = 56)
  for (let d = 1; d <= 8; d++) {
    add(formatDate(2026, 3, d), "7-sinf O'zbekiston tarixi", "O'zbekiston tarixi", "7-sinf", 7);
  }

  // Mar 9-11: 7-sinf Jahon tarixi (8, 8, 7 = 23)
  [8, 8, 7].forEach((count, i) => {
    add(formatDate(2026, 3, 9 + i), "7-sinf Jahon tarixi", "Jahon tarixi", "7-sinf", count);
  });

  // Mar 12-15: 8-sinf O'zbekiston tarixi (7, 7, 6, 6 = 26)
  [7, 7, 6, 6].forEach((count, i) => {
    add(formatDate(2026, 3, 12 + i), "8-sinf O'zbekiston tarixi", "O'zbekiston tarixi", "8-sinf", count);
  });

  // Mar 16-18: 8-sinf Jahon tarixi (9, 8, 8 = 25)
  [9, 8, 8].forEach((count, i) => {
    add(formatDate(2026, 3, 16 + i), "8-sinf Jahon tarixi", "Jahon tarixi", "8-sinf", count);
  });

  // Mar 19-23: 9-sinf O'zbekiston tarixi (8, 7, 7, 7, 7 = 36)
  [8, 7, 7, 7, 7].forEach((count, i) => {
    add(formatDate(2026, 3, 19 + i), "9-sinf O'zbekiston tarixi", "O'zbekiston tarixi", "9-sinf", count);
  });

  // Mar 24-27: 9-sinf Jahon tarixi (8, 8, 8, 7 = 31)
  [8, 8, 8, 7].forEach((count, i) => {
    add(formatDate(2026, 3, 24 + i), "9-sinf Jahon tarixi", "Jahon tarixi", "9-sinf", count);
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
