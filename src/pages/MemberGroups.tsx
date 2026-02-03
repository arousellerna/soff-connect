import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoAlert } from "@/components/ui/InfoAlert";
import { ArrowLeft, Users, CheckCircle, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function MemberGroups() {
  const requirements = [
    "Företaget måste vara medlem i SOFF",
    "Deltagaren bör ha relevant kompetens inom gruppens område",
    "Deltagaren förväntas delta aktivt i möten och arbete",
    "Gruppens arbete är konfidentiellt inom SOFF",
    "Varje företag utser en representant per grupp",
  ];

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
      {/* Back Link */}
      <Link
        to="/medlem"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Tillbaka till Dashboard
      </Link>

      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="font-display text-2xl">Medlemsgrupper</CardTitle>
              <p className="text-muted-foreground">
                Information om SOFF:s arbetsgrupper och hur du deltar
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* What is a Member Group */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Vad är en medlemsgrupp?</CardTitle>
        </CardHeader>
        <CardContent className="prose-soff">
          <p className="text-muted-foreground">
            SOFF:s medlemsgrupper är forum där representanter från medlemsföretagen träffas
            för att diskutera och arbeta med frågor inom specifika områden. Grupperna är
            en viktig del av SOFF:s verksamhet och ger medlemmarna möjlighet att påverka
            branschens utveckling.
          </p>
          <p className="text-muted-foreground">
            Genom att delta i en medlemsgrupp får du:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li>Tillgång till ett nätverk av kollegor inom ditt område</li>
            <li>Möjlighet att påverka SOFF:s ställningstaganden</li>
            <li>Tidiga insikter om branschutvecklingen</li>
            <li>Erfarenhetsutbyte med andra företag</li>
          </ul>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Krav för deltagande</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{req}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* PoC Role */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <CardTitle className="font-display text-lg">Point of Contact (PoC)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose-soff">
          <p className="text-muted-foreground">
            Varje medlemsföretag bör utse en Point of Contact (PoC) som fungerar som
            huvudsaklig kontaktperson gentemot SOFF.
          </p>
          <p className="text-muted-foreground font-semibold text-foreground">
            PoC:s ansvar inkluderar:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li>Ta emot och sprida information från SOFF inom företaget</li>
            <li>Koordinera företagets deltagande i medlemsgrupper</li>
            <li>Säkerställa att företaget är representerat på medlemsmöten</li>
            <li>Vara kontaktpunkt för SOFF:s kansli</li>
            <li>Ha tillgång till PoC-Portalen med utökade resurser</li>
          </ul>
          <InfoAlert variant="info" className="mt-4">
            Om ditt företag behöver utse eller ändra sin PoC, kontakta SOFF:s kansli.
          </InfoAlert>
        </CardContent>
      </Card>
    </div>
  );
}
