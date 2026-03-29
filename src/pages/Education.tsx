import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LessonCard } from "@/components/ui/LessonCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Loader2, BookOpen } from "lucide-react";
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

const isLesson = (lesson: unknown): lesson is Lesson => {
  return (
    typeof lesson === "object" &&
    lesson !== null &&
    "id" in lesson && typeof (lesson as Record<string, unknown>).id === "string" &&
    "title" in lesson && typeof (lesson as Record<string, unknown>).title === "string" &&
    "order_index" in lesson && typeof (lesson as Record<string, unknown>).order_index === "number" &&
    "video_url" in lesson && (typeof (lesson as Record<string, unknown>).video_url === "string" || (lesson as Record<string, unknown>).video_url === null) &&
    "module_id" in lesson && typeof (lesson as Record<string, unknown>).module_id === "string"
  );
};

export default function Education() {
  const { user } = useAuth(); // 2. Hämta inloggad användare
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: modulesData, isLoading: modulesLoading } = useQuery({
    queryKey: ['modules', 'external_market'],
    queryFn: async () => {
      const { data } = await supabase.from("modules").select("*").eq("category", "external_market").order("order_index");
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const { data: lessonsData, isLoading: lessonsLoading } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      const { data } = await supabase.from("lessons").select("*").order("order_index");
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ['user_progress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data } = await supabase
        .from("user_progress")
        .select("lesson_id")
        .eq("user_id", user.id);
      return data || [];
    },
    enabled: !!user,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (modulesData && modulesData.length > 0 && expandedModules.size === 0) {
      setExpandedModules(new Set([modulesData[0].id]));
    }
  }, [modulesData, expandedModules.size]);

  useEffect(() => {
    if (lessonsData && lessonsData.length > 0 && !activeLesson && isLesson(lessonsData[0])) {
      setActiveLesson(lessonsData[0]);
    }
  }, [lessonsData, activeLesson]);

  const completedLessonIds = useMemo(() => {
    return new Set(progressData?.map(p => p.lesson_id) || []);
  }, [progressData]);

  const lessonsByModule = useMemo(() => {
    if (!lessonsData) return {};
    return lessonsData.reduce((acc, lesson) => {
      const moduleId = (lesson as unknown as Lesson).module_id;
      if (!acc[moduleId]) {
        acc[moduleId] = [];
      }
      acc[moduleId].push(lesson as unknown as Lesson);
      return acc;
    }, {} as Record<string, Lesson[]>);
  }, [lessonsData]);

  const getLessonsByModule = (moduleId: string): Lesson[] => {
    return lessonsData?.filter(isLesson).filter((lesson) => lesson.module_id === moduleId) || [];
  };

  // ... (funktionerna toggleModule och renderContent förblir oförändrade) ...

  if (loading) { /* ... */ }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ... Sidofält och ProgressBar ... */}
      {modulesData?.map((module: Module) => (
        <div key={module.id}>
              {expandedModules.has(module.id) && (
                <div className="pl-4 space-y-1">
                  {getLessonsByModule(module.id).map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      title={lesson.title}
                      isActive={activeLesson?.id === lesson.id}
                      isCompleted={completedLessonIds.has(lesson.id)} // 6. Markera som klar om ID:t hittades i databasen
                      hasVideo={!!lesson.video_url}
                      onClick={() => setActiveLesson(lesson)}
                    />
                  ))}
                </div>
              )}
        </div>
      ))}
      {/* ... Resten av koden ... */}
    </div>
  );
}
