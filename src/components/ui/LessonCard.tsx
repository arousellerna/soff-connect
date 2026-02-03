import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Play } from "lucide-react";

interface LessonCardProps {
  title: string;
  isCompleted?: boolean;
  isActive?: boolean;
  hasVideo?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LessonCard({
  title,
  isCompleted = false,
  isActive = false,
  hasVideo = false,
  onClick,
  className,
}: LessonCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all duration-200",
        "hover:shadow-md hover:border-primary/30",
        isActive
          ? "bg-primary/5 border-primary/30 shadow-sm"
          : "bg-card border-border hover:bg-muted/50",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-gold" />
          ) : (
            <Circle
              className={cn(
                "h-5 w-5",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            />
          )}
        </div>
        <span
          className={cn(
            "flex-1 font-medium text-sm",
            isCompleted && "text-muted-foreground",
            isActive && "text-primary"
          )}
        >
          {title}
        </span>
        {hasVideo && (
          <Play className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
      </div>
    </button>
  );
}
