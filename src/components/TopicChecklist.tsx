import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Topic } from "@/data/schedule";

interface TopicChecklistProps {
  topics: Topic[];
  completedTopics: Set<string>;
  onToggle: (topicId: string) => void;
}

const TopicChecklist = ({ topics, completedTopics, onToggle }: TopicChecklistProps) => {
  return (
    <div className="space-y-1.5">
      {topics.map((topic, index) => {
        const isCompleted = completedTopics.has(topic.id);
        return (
          <motion.button
            key={topic.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.025 }}
            onClick={() => onToggle(topic.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all active:scale-[0.98] ${
              isCompleted
                ? "bg-primary/8 border border-primary/15"
                : "bg-muted/40 border border-transparent hover:border-border hover:bg-muted/70"
            }`}
          >
            <motion.div
              className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                isCompleted
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/25"
              }`}
              whileTap={{ scale: 0.85 }}
            >
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>
              )}
            </motion.div>
            <span
              className={`text-sm leading-snug ${
                isCompleted
                  ? "text-muted-foreground line-through decoration-muted-foreground/40"
                  : "text-foreground font-medium"
              }`}
            >
              {topic.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default TopicChecklist;
