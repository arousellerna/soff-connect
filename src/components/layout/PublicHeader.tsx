import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import soffLogoFull from "@/assets/soff-logo-full.png";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={soffLogoFull} 
              alt="SOFF - Säkerhets- och försvarsföretagen" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/utbildning"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("utbildning")}
            </Link>
            <Link
              to="/om-oss"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {t("omOss")}
            </Link>
          </nav>

          {/* Login Button - Fix: Explicit colors to ensure visibility */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/login">{t("loggaIn")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-64 pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-2 pt-4">
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
            <Link
              to="/utbildning"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("utbildning")}
            </Link>
            <Link
              to="/om-oss"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("omOss")}
            </Link>
            <div className="pt-2 px-4">
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  {t("loggaIn")}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
