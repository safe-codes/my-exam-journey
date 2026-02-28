import { motion } from "framer-motion";
import { LogOut, Mail, Shield, BookOpen, CalendarDays, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTopicProgress } from "@/hooks/useTopicProgress";
import { TOTAL_TOPICS, getDaysRemaining, schedule } from "@/data/schedule";
import CircularProgress from "@/components/CircularProgress";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { completedTopics } = useTopicProgress();
  const completedCount = completedTopics.size;
  const percentage = Math.round((completedCount / TOTAL_TOPICS) * 100);

  // Count completed days
  const completedDays = schedule.filter(
    (day) => day.topics.length > 0 && day.topics.every((t) => completedTopics.has(t.id))
  ).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Profil</h1>
        </motion.div>

        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-4"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">
                {user?.email?.[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{user?.email}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <Shield className="w-3 h-3" />
                <span>Tasdiqlangan hisob</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center py-2">
            <CircularProgress value={completedCount} max={TOTAL_TOPICS} size={150} />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-4"
        >
          <div className="glass-card rounded-xl p-4 text-center">
            <BookOpen className="w-4 h-4 mx-auto mb-2 text-primary" />
            <p className="text-lg font-bold">{completedCount}</p>
            <p className="text-[10px] text-muted-foreground">Mavzular</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <CalendarDays className="w-4 h-4 mx-auto mb-2 text-primary" />
            <p className="text-lg font-bold">{completedDays}</p>
            <p className="text-[10px] text-muted-foreground">Kunlar</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Trophy className="w-4 h-4 mx-auto mb-2 text-primary" />
            <p className="text-lg font-bold">{percentage}%</p>
            <p className="text-[10px] text-muted-foreground">Tayyor</p>
          </div>
        </motion.div>

        {/* Email Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center gap-3 py-1">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email manzil</p>
              <p className="text-sm font-medium truncate">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        <Button
          onClick={signOut}
          variant="outline"
          className="w-full rounded-xl h-11 text-destructive hover:text-destructive hover:bg-destructive/5"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Hisobdan chiqish
        </Button>
      </div>
      <Navbar />
    </div>
  );
};

export default Profile;
