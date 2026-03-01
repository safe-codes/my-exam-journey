import { Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useTopicProgress } from "@/hooks/useTopicProgress";
import { schedule } from "@/data/schedule";

const StreakCard = () => {
  const { completedTopics } = useTopicProgress();

  // Calculate streak: count consecutive days (backwards from today) where at least 1 topic was completed
  const getStreak = (): number => {
    const today = new Date();
    let streak = 0;

    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split("T")[0];

      const dayPlan = schedule.find((d) => d.date === dateStr);
      if (!dayPlan || dayPlan.topics.length === 0) continue;

      const hasCompleted = dayPlan.topics.some((t) => completedTopics.has(t.id));
      if (hasCompleted) {
        streak++;
      } else if (i > 0) {
        // Don't break on today if nothing done yet
        break;
      }
    }

    return streak;
  };

  const streak = getStreak();
  const isActive = streak > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15 }}
      className="glass-card rounded-2xl p-4 flex items-center gap-4"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isActive
            ? "bg-warning/15 text-warning"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <Flame className="w-6 h-6" />
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight">
          {streak} <span className="text-sm font-medium text-muted-foreground">kun</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {isActive ? "Ketma-ket o'qish 🔥" : "Bugun boshlang!"}
        </p>
      </div>
    </motion.div>
  );
};

export default StreakCard;
