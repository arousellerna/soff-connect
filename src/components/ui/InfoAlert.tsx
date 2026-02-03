import { cn } from "@/lib/utils";
import { Info, AlertCircle, CheckCircle, XCircle } from "lucide-react";

type AlertVariant = "info" | "warning" | "success" | "error";

interface InfoAlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const variantConfig = {
  info: {
    icon: Info,
    containerClass: "bg-primary/5 border-primary/20 text-primary",
    iconClass: "text-primary",
  },
  warning: {
    icon: AlertCircle,
    containerClass: "bg-gold/10 border-gold/30 text-gold-dark",
    iconClass: "text-gold-dark",
  },
  success: {
    icon: CheckCircle,
    containerClass: "bg-green-50 border-green-200 text-green-800",
    iconClass: "text-green-600",
  },
  error: {
    icon: XCircle,
    containerClass: "bg-destructive/10 border-destructive/30 text-destructive",
    iconClass: "text-destructive",
  },
};

export function InfoAlert({
  variant = "info",
  title,
  children,
  className,
}: InfoAlertProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg border",
        config.containerClass,
        className
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", config.iconClass)} />
      <div className="flex-1">
        {title && <p className="font-medium mb-1">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
}
