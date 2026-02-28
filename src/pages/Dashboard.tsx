import { motion } from "framer-motion";
import { CalendarDays, BookOpen, Target, Trophy, Flame } from "lucide-react";
import { getTodayPlan, getDaysRemaining, TOTAL_TOPICS, schedule } from "@/data/schedule";
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

  // Calculate streak
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < schedule.length; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dayPlan = schedule.find((p) => p.date === dateStr);
    if (dayPlan && dayPlan.topics.length > 0) {
      const dayDone = dayPlan.topics.some((t) => completedTopics.has(t.id));
      if (dayDone) streak++;
      else break;
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm text-muted-foreground mb-1">Assalomu alaykum 👋</p>
          <h1 className="text-2xl font-bold tracking-tight">Exam Prep Tracker</h1>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard icon={CalendarDays} label="Qolgan kunlar" value={daysRemaining} accent />
          <StatCard icon={BookOpen} label="O'qilgan" value={completedCount} />
          <StatCard icon={Flame} label="Streak" value={`${streak} kun`} />
        </div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 mb-6 flex items-center gap-6"
        >
          <CircularProgress value={completedCount} max={TOTAL_TOPICS} />
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Umumiy progress</h3>
            <p className="text-xs text-muted-foreground">
              {TOTAL_TOPICS - completedCount} ta mavzu qoldi
            </p>
            <div className="mt-3 w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.round((completedCount / TOTAL_TOPICS) * 100)}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
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
            <h2 className="font-semibold text-base">Bugungi Reja</h2>
            {todayPlan && !isExamDay && (
              <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {todayCompleted}/{todayPlan.topics.length}
              </span>
            )}
          </div>

          {isExamDay ? (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="glass-card rounded-2xl p-10 text-center border-primary/30"
            >
              <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Imtihon kuni! 🎉</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Siz tayyor! Omad tilaymiz!
              </p>
            </motion.div>
          ) : todayPlan ? (
            <div className="glass-card rounded-2xl p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-primary/10 text-primary">
                  {todayPlan.label}
                </span>
                {todayCompleted === todayPlan.topics.length && todayPlan.topics.length > 0 && (
                  <span className="text-xs font-medium text-primary">✅ Bajarildi!</span>
                )}
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
            <div className="glass-card rounded-2xl p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Bugun uchun reja mavjud emas
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Kalendar sahifasidan boshqa kunlarni ko'ring
              </p>
            </div>
          )}
        </motion.div>
      </div>
      <Navbar />
    </div>
  );
};

export default Dashboard;
