import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export const useTopicProgress = () => {
  const { user } = useAuth();
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("topic_progress")
      .select("topic_id")
      .eq("user_id", user.id)
      .eq("is_completed", true);

    if (data) {
      setCompletedTopics(new Set(data.map((r) => r.topic_id)));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const toggleTopic = async (topicId: string) => {
    if (!user) return;
    const isCurrentlyCompleted = completedTopics.has(topicId);

    // Optimistic update
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (isCurrentlyCompleted) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });

    if (isCurrentlyCompleted) {
      await supabase
        .from("topic_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("topic_id", topicId);
    } else {
      await supabase.from("topic_progress").upsert({
        user_id: user.id,
        topic_id: topicId,
        is_completed: true,
        completed_at: new Date().toISOString(),
      });
    }
  };

  return { completedTopics, toggleTopic, loading };
};
