import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LessonCard } from "@/components/ui/LessonCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Loader2, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  title: string;
  description: string | null;
  order_index: number;
}

interface Lesson {
  id: string;
  module_id: string;
  title: string;
  content_text: string | null;
  video_url: string | null;
  order_index: number;
}

export default function Education() {
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      // Fetch external modules
      const { data: modulesData } = await supabase
        .from("modules")
        .select("*")
        .eq("category", "external_market")
        .order("order_index");

      if (modulesData) {
        setModules(modulesData);
        // Expand first module by default
        if (modulesData.length > 0) {
          setExpandedModules(new Set([modulesData[0].id]));
        }
      }

      // Fetch lessons for external modules
      const { data: lessonsData } = await supabase
        .from("lessons")
        .select("*")
        .order("order_index");

      if (lessonsData) {
        setLessons(lessonsData);
        // Set first lesson as active
        if (lessonsData.length > 0) {
          setActiveLesson(lessonsData[0]);
        }
      }

      setLoading(false);
    };

    fetchContent();
  }, []);

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getLessonsByModule = (moduleId: string) => {
    return lessons.filter((lesson) => lesson.module_id === moduleId);
  };

  const renderContent = (content: string | null) => {
    if (!content) return null;

    // Simple markdown-like parsing
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let listType: "ul" | "ol" | null = null;

    const flushList = () => {
      if (currentList.length > 0) {
        const ListTag = listType === "ol" ? "ol" : "ul";
        elements.push(
          <ListTag key={elements.length} className="mb-4 ml-6 space-y-2 list-disc">
            {currentList.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                <span dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
              </li>
            ))}
          </ListTag>
        );
        currentList = [];
        listType = null;
      }
    };

    const parseInline = (text: string) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-foreground'>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-display font-semibold text-primary mt-8 mb-4 first:mt-0">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-display font-medium text-foreground mt-6 mb-3">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith("- ")) {
        listType = "ul";
        currentList.push(trimmed.slice(2));
      } else if (/^\d+\.\s/.test(trimmed)) {
        listType = "ol";
        currentList.push(trimmed.replace(/^\d+\.\s/, ""));
      } else if (trimmed === "") {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={index} className="mb-4 text-muted-foreground" dangerouslySetInnerHTML={{ __html: parseInline(trimmed) }} />
        );
      }
    });

    flushList();
    return elements;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalLessons = lessons.length;
  const completedLessons = 0; // Would track with user_progress

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-card border-r border-border transition-all duration-300 flex-shrink-0",
          sidebarOpen ? "w-80" : "w-0 overflow-hidden"
        )}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="font-display text-lg font-semibold">Utbildning</h2>
          </div>
          <ProgressBar
            value={completedLessons}
            max={totalLessons}
            label="Din progress"
          />
        </div>

        <nav className="p-4 space-y-2">
          {modules.map((module) => (
            <div key={module.id} className="space-y-1">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-left"
              >
                {expandedModules.has(module.id) ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
                <span className="font-medium text-sm">{module.title}</span>
              </button>

              {expandedModules.has(module.id) && (
                <div className="pl-4 space-y-1">
                  {getLessonsByModule(module.id).map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      title={lesson.title}
                      isActive={activeLesson?.id === lesson.id}
                      hasVideo={!!lesson.video_url}
                      onClick={() => setActiveLesson(lesson)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-10 bg-card border border-border rounded-r-lg p-2 shadow-md hover:bg-muted transition-colors md:hidden"
      >
        {sidebarOpen ? (
          <ChevronDown className="h-4 w-4 rotate-90" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeLesson ? (
          <article className="max-w-3xl mx-auto p-8">
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                {modules.find((m) => m.id === activeLesson.module_id)?.title}
              </p>
              <h1 className="font-display text-3xl font-bold text-foreground">
                {activeLesson.title}
              </h1>
            </div>

            <div className="prose-soff">
              {renderContent(activeLesson.content_text)}
            </div>

            {activeLesson.video_url && (
              <div className="mt-8 aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Video kommer snart</p>
              </div>
            )}
          </article>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Välj en lektion från menyn
          </div>
        )}
      </main>
    </div>
  );
}
