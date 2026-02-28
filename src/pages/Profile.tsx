import { motion } from "framer-motion";
import { LogOut, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useTopicProgress } from "@/hooks/useTopicProgress";
import { TOTAL_TOPICS } from "@/data/schedule";
import CircularProgress from "@/components/CircularProgress";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const { user, signOut } = useAuth();
  const { completedTopics } = useTopicProgress();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 pt-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Profil</h1>
        </motion.div>

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
            <div>
              <p className="font-semibold">{user?.email}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <Shield className="w-3 h-3" />
                <span>Tasdiqlangan</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center py-4">
            <CircularProgress value={completedTopics.size} max={TOTAL_TOPICS} size={140} />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            {completedTopics.size} / {TOTAL_TOPICS} mavzu o'qildi
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-4 mb-4"
        >
          <div className="flex items-center gap-3 py-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        <Button
          onClick={signOut}
          variant="outline"
          className="w-full rounded-xl h-11 text-destructive hover:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Chiqish
        </Button>
      </div>
      <Navbar />
    </div>
  );
};

export default Profile;
