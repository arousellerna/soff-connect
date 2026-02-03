import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Shield className="h-8 w-8 text-primary group-hover:text-navy-light transition-colors" />
            <span className="font-display text-xl font-bold text-primary">
              SOFF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/utbildning"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Utbildning
            </Link>
            <Link
              to="/om-oss"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Om oss
            </Link>
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <Button asChild variant="default">
              <Link to="/login">Logga in till Medlemsportalen</Link>
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
            <Link
              to="/utbildning"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Utbildning
            </Link>
            <Link
              to="/om-oss"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Om oss
            </Link>
            <div className="pt-2 px-4">
              <Button asChild className="w-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Logga in till Medlemsportalen
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
