import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LessonCard } from "@/components/ui/LessonCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Loader2, BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth"; // 1. Importera useAuth
import { useQuery } from "@tanstack/react-query";

// ... befintliga interface ...
interface Module {
  id: string;
  category: string;
  order_index: number;
}
interface Lesson {
  id: string;
  title: string;
  order_index: number;
  video_url: string;
  module_id: string;
}

export default function Education() {
  const { user } = useAuth(); // 2. Hämta inloggad användare
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: modulesData, isLoading: modulesLoading } = useQuery({
    queryKey: ['modules', 'external_market'],
    queryFn: async () => {
      console.time('fetchModules');
      const { data } = await supabase.from("modules").select("*").eq("category", "external_market").order("order_index");
      console.timeEnd('fetchModules');
      return data || [];
    }
  });

  const { data: lessonsData, isLoading: lessonsLoading } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      console.time('fetchLessons');
      const { data } = await supabase.from("lessons").select("*").order("order_index");
      console.timeEnd('fetchLessons');
      return data || [];
    }
  });

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ['user_progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      console.time('fetchProgress');
      const { data } = await supabase
        .from("user_progress")
        .select("lesson_id")
        .eq("user_id", user.id);
      console.timeEnd('fetchProgress');
      return data || [];
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (modulesData && modulesData.length > 0 && expandedModules.size === 0) {
      setExpandedModules(new Set([modulesData[0].id]));
    }
  }, [modulesData, expandedModules.size]);

  useEffect(() => {
    if (lessonsData && lessonsData.length > 0 && !activeLesson) {
      setActiveLesson(lessonsData[0] as unknown as Lesson);
    }
  }, [lessonsData, activeLesson]);

  const completedLessonIds = useMemo(() => {
    return new Set(progressData?.map(p => p.lesson_id) || []);
  }, [progressData]);

  const loading = modulesLoading || lessonsLoading || (!!user && progressLoading);

  const getLessonsByModule = (moduleId: string) => {
    return lessonsData?.filter(lesson => (lesson as { module_id: string }).module_id === moduleId) || [];
  };

  // ... (funktionerna toggleModule, getLessonsByModule och renderContent förblir oförändrade) ...

  if (loading) { /* ... */ }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ... Sidofält och ProgressBar ... */}
      {modulesData?.map((module: Module) => (
        <div key={module.id}>
              {expandedModules.has(module.id) && (
                <div className="pl-4 space-y-1">
                  {getLessonsByModule(module.id).map((lesson) => {
                    const typedLesson = lesson as unknown as Lesson;
                    return (
                      <LessonCard
                        key={typedLesson.id}
                        title={typedLesson.title}
                        isActive={activeLesson?.id === typedLesson.id}
                        isCompleted={completedLessonIds.has(typedLesson.id)} // 6. Markera som klar om ID:t hittades i databasen
                        hasVideo={!!typedLesson.video_url}
                        onClick={() => setActiveLesson(typedLesson)}
                      />
                    );
                  })}
                </div>
              )}
        </div>
      ))}
      {/* ... Resten av koden ... */}
    </div>
  );
}
