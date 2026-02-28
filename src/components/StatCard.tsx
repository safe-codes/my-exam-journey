import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: boolean;
}

const StatCard = ({ icon: Icon, label, value, accent }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card rounded-2xl p-5 ${accent ? "border-primary/30" : ""}`}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent ? "bg-primary/10" : "bg-muted"}`}>
          <Icon className={`w-4.5 h-4.5 ${accent ? "text-primary" : "text-muted-foreground"}`} />
        </div>
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </motion.div>
  );
};

export default StatCard;
