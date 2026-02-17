import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LessonCard } from "@/components/ui/LessonCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Loader2, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth"; // 1. Importera useAuth

// ... befintliga interface ...

export default function Education() {
  const { user } = useAuth(); // 2. Hämta inloggad användare
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set()); // 3. Skapa ett tillstånd för slutförda lektioner
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      // (Behåll den befintliga koden för att hämta "modules" och "lessons")
      const { data: modulesData } = await supabase.from("modules").select("*").eq("category", "external_market").order("order_index");
      if (modulesData) { setModules(modulesData); if (modulesData.length > 0) setExpandedModules(new Set([modulesData[0].id])); }

      const { data: lessonsData } = await supabase.from("lessons").select("*").order("order_index");
      if (lessonsData) { setLessons(lessonsData); if (lessonsData.length > 0) setActiveLesson(lessonsData[0]); }

      // 4. Hämta de slutförda lektionerna för den inloggade användaren
      if (user) {
        const { data: progressData } = await supabase
          .from("user_progress")
          .select("lesson_id")
          .eq("user_id", user.id);

        if (progressData) {
          setCompletedLessonIds(new Set(progressData.map(p => p.lesson_id)));
        }
      }

      setLoading(false);
    };

    fetchContent();
  }, [user]); // Lägg till user i dependency array

  // ... (funktionerna toggleModule, getLessonsByModule och renderContent förblir oförändrade) ...

  if (loading) { /* ... */ }

  // 5. Uppdatera framstegen med de faktiskt slutförda lektionerna
  const totalLessons = lessons.length;
  const completedLessons = completedLessonIds.size; 

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ... Sidofält och ProgressBar ... */}
      
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
      {/* ... Resten av koden ... */}
    </div>
  );
}
