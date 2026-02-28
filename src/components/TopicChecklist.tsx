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
    <div className="space-y-2">
      {topics.map((topic, index) => {
        const isCompleted = completedTopics.has(topic.id);
        return (
          <motion.button
            key={topic.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => onToggle(topic.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
              isCompleted
                ? "bg-primary/10 border border-primary/20"
                : "bg-muted/50 border border-transparent hover:border-border"
            }`}
          >
            <div
              className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                isCompleted
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/30"
              }`}
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
            </div>
            <span className={`text-sm font-medium ${isCompleted ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {topic.name}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default TopicChecklist;
