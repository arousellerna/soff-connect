import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoAlert } from "@/components/ui/InfoAlert";
import {
  UserPlus,
  Users,
  Compass,
  BookOpen,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function MemberDashboard() {
  const { profile, updateOnboardingStatus } = useAuth();

  const getOnboardingProgress = () => {
    switch (profile?.onboarding_status) {
      case "completed":
        return 100;
      case "in_progress":
        return 50;
      default:
        return 0;
    }
  };

  const dashboardCards = [
    {
      title: "Ny Medlem",
      description: "Starta din onboarding och lär dig om SOFF",
      icon: UserPlus,
      to: "/medlem/onboarding",
      color: "text-gold",
      bgColor: "bg-gold/10",
    },
    {
      title: "Medlemsgrupper",
      description: "Information om arbetsgrupper och deltagande",
      icon: Users,
      to: "/medlem/grupper",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "PoC-Guiden",
      description: "Guide för Points of Contact",
      icon: Compass,
      to: "/medlem/poc-guide",
      color: "text-steel",
      bgColor: "bg-steel/10",
    },
    {
      title: "Utbildning",
      description: "Fördjupa dig i försvarsmarknaden",
      icon: BookOpen,
      to: "/utbildning",
      color: "text-navy-light",
      bgColor: "bg-navy-light/10",
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-navy-light rounded-xl p-8 text-primary-foreground">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
          Välkommen till SOFF, {profile?.company_name || "Medlem"}
        </h1>
        <p className="text-primary-foreground/80">
          Din plattform för att vara en del av Sveriges säkerhets- och försvarsbransch.
        </p>
      </div>

      {/* Onboarding Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-display">Onboarding Status</CardTitle>
              <CardDescription>Din progress som ny medlem</CardDescription>
            </div>
            {profile?.onboarding_status === "completed" && (
              <div className="flex items-center gap-2 text-gold">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Slutförd</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <ProgressBar value={getOnboardingProgress()} className="mb-4" />
          {profile?.onboarding_status === "new" && (
            <InfoAlert variant="info">
              Du har inte påbörjat din onboarding ännu.{" "}
              <Link to="/medlem/onboarding" className="font-medium underline">
                Börja nu →
              </Link>
            </InfoAlert>
          )}
          {profile?.onboarding_status === "in_progress" && (
            <InfoAlert variant="warning">
              Du har påbörjat din onboarding.{" "}
              <Link to="/medlem/onboarding" className="font-medium underline">
                Fortsätt →
              </Link>
            </InfoAlert>
          )}
        </CardContent>
      </Card>

      {/* Navigation Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {dashboardCards.map((card) => (
          <Link key={card.to} to={card.to}>
            <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
              <CardContent className="p-6 flex items-start gap-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Kommande evenemang</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Inga kommande evenemang just nu. Håll utkik i SOFF-Portalen för uppdateringar.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Senaste nytt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Välkommen till den nya medlemsportalen! Här hittar du all information du behöver som SOFF-medlem.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
