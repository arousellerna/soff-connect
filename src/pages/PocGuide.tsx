import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoAlert } from "@/components/ui/InfoAlert";
import { ArrowLeft, Compass, CheckCircle, BookOpen, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function PocGuide() {
  const responsibilities = [
    {
      icon: FileText,
      title: "Informationshantering",
      description: "Ta emot, läsa och sprida relevant information från SOFF till rätt personer inom företaget.",
    },
    {
      icon: Users,
      title: "Koordinering",
      description: "Koordinera företagets deltagande i medlemsgrupper och säkerställa representation på möten.",
    },
    {
      icon: BookOpen,
      title: "Kunskapsdelning",
      description: "Hålla sig uppdaterad om SOFF:s aktiviteter och dela denna kunskap inom organisationen.",
    },
  ];

  const bestPractices = [
    "Sätt upp rutiner för att regelbundet kontrollera PoC-Portalen",
    "Skapa en intern e-postlista för att sprida SOFF-information",
    "Boka in tid i kalendern för att delta på medlemsmöten",
    "Håll kontaktuppgifterna i SOFF:s register uppdaterade",
    "Nätverka med andra PoC:s på SOFF:s evenemang",
    "Ge feedback till SOFF om vad som fungerar och kan förbättras",
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
            <div className="p-3 rounded-lg bg-gold/10">
              <Compass className="h-8 w-8 text-gold" />
            </div>
            <div>
              <CardTitle className="font-display text-2xl">PoC-Guiden</CardTitle>
              <p className="text-muted-foreground">
                Guide för dig som är Point of Contact för ditt företag
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Vad innebär det att vara PoC?</CardTitle>
        </CardHeader>
        <CardContent className="prose-soff">
          <p className="text-muted-foreground">
            Som Point of Contact (PoC) är du den primära kontaktpersonen mellan ditt företag
            och SOFF. Du spelar en viktig roll i att säkerställa att ditt företag får ut
            maximalt värde av medlemskapet.
          </p>
          <p className="text-muted-foreground">
            PoC-rollen är strategiskt viktig och bör innehas av någon med mandat att
            representera företaget och möjlighet att sprida information internt.
          </p>
        </CardContent>
      </Card>

      {/* Responsibilities */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Dina huvudsakliga ansvarsområden</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {responsibilities.map((resp, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="p-2 rounded-lg bg-primary/10">
                  <resp.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{resp.title}</h4>
                  <p className="text-sm text-muted-foreground">{resp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PoC Portal Access */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">PoC-Portalen</CardTitle>
        </CardHeader>
        <CardContent className="prose-soff">
          <p className="text-muted-foreground">
            Som PoC har du tillgång till PoC-Portalen, en utökad version av SOFF-Portalen
            med extra resurser och funktioner:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li>Arbetsgruppsdokumentation och mötesprotokoll</li>
            <li>Remissunderlag och möjlighet att lämna synpunkter</li>
            <li>Kontaktlistor till andra PoC:s och gruppmedlemmar</li>
            <li>Förhandsinformation om kommande aktiviteter</li>
            <li>Mallar och verktyg för internt arbete</li>
          </ul>
          <InfoAlert variant="info" className="mt-4">
            Inloggningsuppgifterna till PoC-Portalen är desamma som till denna medlemsplattform.
          </InfoAlert>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Tips för att lyckas som PoC</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {bestPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{practice}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Behöver du hjälp?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            SOFF:s kansli finns här för att stödja dig i din roll som PoC. Tveka inte
            att höra av dig om du har frågor eller behöver vägledning.
          </p>
          <InfoAlert variant="info">
            Kontakta SOFF:s kansli på <strong>info@soff.se</strong> eller via telefon.
          </InfoAlert>
        </CardContent>
      </Card>
    </div>
  );
}
