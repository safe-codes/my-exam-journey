import { motion } from "framer-motion";
import { CalendarDays, BookOpen, Target, Trophy } from "lucide-react";
import { getTodayPlan, getDaysRemaining, TOTAL_TOPICS, getAllTopics } from "@/data/schedule";
import { useTopicProgress } from "@/hooks/useTopicProgress";
import CircularProgress from "@/components/CircularProgress";
import TopicChecklist from "@/components/TopicChecklist";
import StatCard from "@/components/StatCard";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const todayPlan = getTodayPlan();
  const daysRemaining = getDaysRemaining();
  const { completedTopics, toggleTopic, loading } = useTopicProgress();
  const completedCount = completedTopics.size;

  const todayCompleted = todayPlan
    ? todayPlan.topics.filter((t) => completedTopics.has(t.id)).length
    : 0;

  const isExamDay = todayPlan?.subject === "Imtihon";

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-xl font-bold tracking-tight">Exam Prep Tracker</h1>
          <p className="text-sm text-muted-foreground">Tarix fanidan 28 kunlik reja</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard icon={CalendarDays} label="Qolgan kunlar" value={daysRemaining} accent />
          <StatCard icon={BookOpen} label="O'qilgan mavzular" value={`${completedCount}/${TOTAL_TOPICS}`} />
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-6 flex items-center gap-6"
        >
          <CircularProgress value={completedCount} max={TOTAL_TOPICS} />
          <div>
            <h3 className="font-semibold text-sm">Umumiy progress</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {TOTAL_TOPICS - completedCount} ta mavzu qoldi
            </p>
          </div>
        </motion.div>

        {/* Today's Plan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-sm">Bugungi Reja</h2>
            {todayPlan && !isExamDay && (
              <span className="ml-auto text-xs text-muted-foreground">
                {todayCompleted}/{todayPlan.topics.length}
              </span>
            )}
          </div>

          {isExamDay ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-bold">Imtihon kuni! 🎉</h3>
              <p className="text-sm text-muted-foreground mt-1">Omad tilaymiz!</p>
            </div>
          ) : todayPlan ? (
            <div className="glass-card rounded-2xl p-4">
              <div className="mb-3">
                <span className="text-xs font-medium px-2 py-1 rounded-lg bg-primary/10 text-primary">
                  {todayPlan.label}
                </span>
              </div>
              {!loading && (
                <TopicChecklist
                  topics={todayPlan.topics}
                  completedTopics={completedTopics}
                  onToggle={toggleTopic}
                />
              )}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-sm text-muted-foreground">Bugun uchun reja mavjud emas</p>
            </div>
          )}
        </motion.div>
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
