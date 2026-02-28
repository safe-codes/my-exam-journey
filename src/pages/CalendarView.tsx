import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { schedule } from "@/data/schedule";
import { useTopicProgress } from "@/hooks/useTopicProgress";
import TopicChecklist from "@/components/TopicChecklist";
import Navbar from "@/components/Navbar";

const CalendarView = () => {
  const { completedTopics, toggleTopic, loading } = useTopicProgress();
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">To'liq Kalendar</h1>
          <p className="text-sm text-muted-foreground">28 kunlik o'quv rejasi</p>
        </motion.div>

        <div className="space-y-2">
          {schedule.map((day) => {
            const dayCompleted = day.topics.filter((t) => completedTopics.has(t.id)).length;
            const isToday = day.date === today;
            const isExpanded = expandedDate === day.date;
            const isExam = day.subject === "Imtihon";
            const allDone = day.topics.length > 0 && dayCompleted === day.topics.length;

            return (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={() => setExpandedDate(isExpanded ? null : day.date)}
                  className={`w-full text-left glass-card rounded-xl p-4 transition-all ${
                    isToday ? "border-primary/40 ring-1 ring-primary/20" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${allDone ? "bg-primary" : isToday ? "bg-warning" : "bg-muted-foreground/30"}`} />
                      <div>
                        <p className="text-sm font-medium">
                          {day.date.split("-").reverse().join(".")}
                          {isToday && <span className="ml-2 text-xs text-primary font-semibold">Bugun</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{day.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isExam && (
                        <span className="text-xs text-muted-foreground">
                          {dayCompleted}/{day.topics.length}
                        </span>
                      )}
                      <ChevronRight
                        className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && day.topics.length > 0 && !loading && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
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
