import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const isSwedish = i18n.resolvedLanguage === "sv" || i18n.language?.startsWith("sv");

  const toggleLanguage = () => {
    const newLang = isSwedish ? "en" : "sv";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      title={isSwedish ? "Switch to English" : "Byt till svenska"}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {isSwedish ? "EN" : "SV"}
      </span>
    </Button>
  );
}
