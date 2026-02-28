import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Circle } from "lucide-react";
import { schedule } from "@/data/schedule";
import { useTopicProgress } from "@/hooks/useTopicProgress";
import TopicChecklist from "@/components/TopicChecklist";
import Navbar from "@/components/Navbar";

const CalendarView = () => {
  const { completedTopics, toggleTopic, loading } = useTopicProgress();
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];

  // Group by subject
  const groups: { label: string; days: typeof schedule }[] = [];
  let current = { label: "", days: [] as typeof schedule };
  schedule.forEach((day) => {
    if (day.label !== current.label) {
      if (current.days.length > 0) groups.push({ ...current });
      current = { label: day.label, days: [day] };
    } else {
      current.days.push(day);
    }
  });
  if (current.days.length > 0) groups.push({ ...current });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">To'liq Kalendar</h1>
          <p className="text-sm text-muted-foreground">28 kunlik o'quv rejasi</p>
        </motion.div>

        <div className="space-y-6">
          {groups.map((group, gi) => {
            const groupCompleted = group.days.flatMap(d => d.topics).filter(t => completedTopics.has(t.id)).length;
            const groupTotal = group.days.flatMap(d => d.topics).length;

            return (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2 px-1">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {group.label}
                  </h3>
                  {groupTotal > 0 && (
                    <span className="text-xs text-muted-foreground">{groupCompleted}/{groupTotal}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  {group.days.map((day) => {
                    const dayCompleted = day.topics.filter((t) => completedTopics.has(t.id)).length;
                    const isToday = day.date === today;
                    const isExpanded = expandedDate === day.date;
                    const isExam = day.subject === "Imtihon";
                    const allDone = day.topics.length > 0 && dayCompleted === day.topics.length;

                    const dateObj = new Date(day.date);
                    const dayNum = dateObj.getDate();
                    const monthNames = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
                    const monthStr = monthNames[dateObj.getMonth()];

                    return (
                      <div key={day.date}>
                        <button
                          onClick={() => setExpandedDate(isExpanded ? null : day.date)}
                          className={`w-full text-left glass-card rounded-xl p-3.5 transition-all ${
                            isToday ? "border-primary/40 ring-1 ring-primary/20" : ""
                          } ${isExpanded ? "ring-1 ring-border" : ""}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center text-xs ${
                              isToday ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}>
                              <span className="font-bold text-sm leading-none">{dayNum}</span>
                              <span className="text-[9px] leading-none mt-0.5 opacity-70">{monthStr}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium truncate">
                                  {isExam ? "🎉 Imtihon kuni!" : `${day.topics.length} mavzu`}
                                </p>
                                {isToday && (
                                  <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md">
                                    BUGUN
                                  </span>
                                )}
                              </div>
                              {!isExam && (
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex-1 bg-muted rounded-full h-1.5">
                                    <div
                                      className="bg-primary h-1.5 rounded-full transition-all"
                                      style={{ width: `${day.topics.length > 0 ? (dayCompleted / day.topics.length) * 100 : 0}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] text-muted-foreground w-8 text-right">
                                    {dayCompleted}/{day.topics.length}
                                  </span>
                                </div>
                              )}
                            </div>
                            {!isExam && (
                              <div className="flex items-center gap-1">
                                {allDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-primary" />
                                ) : (
                                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                )}
                              </div>
                            )}
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && day.topics.length > 0 && !loading && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-2 pb-1 px-1">
                                <TopicChecklist
                                  topics={day.topics}
                                  completedTopics={completedTopics}
                                  onToggle={toggleTopic}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default CalendarView;
