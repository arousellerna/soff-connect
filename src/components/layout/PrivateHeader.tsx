import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, LayoutDashboard, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { cn } from "@/lib/utils";
import soffLogoIcon from "@/assets/soff-logo-icon.png";

export function PrivateHeader() {
  const { signOut, profile } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/medlem", label: "Dashboard", icon: LayoutDashboard },
    { to: "/medlem/profil", label: "Min Profil", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 bg-sidebar text-sidebar-foreground border-b border-sidebar-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/medlem" className="flex items-center gap-3 group">
            <img 
              src={soffLogoIcon} 
              alt="SOFF" 
              className="h-9 w-9"
            />
            <span className="font-display text-xl font-bold">SOFF</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  isActive(link.to)
                    ? "text-gold"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Company Name & Logout */}
          <div className="hidden md:flex items-center gap-4">
            {profile?.company_name && (
              <span className="text-sm text-primary-foreground/70">
                {profile.company_name}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-navy-light"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logga ut
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
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
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive(link.to)
                    ? "text-gold bg-navy-light"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-navy-light"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-4 border-t border-navy-light mt-2">
              {profile?.company_name && (
                <p className="text-sm text-primary-foreground/70 mb-2">
                  {profile.company_name}
                </p>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-navy-light w-full justify-start"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logga ut
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
