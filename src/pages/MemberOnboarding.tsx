import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { InfoAlert } from "@/components/ui/InfoAlert";
import { Building2, Users, Globe, Scale, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function MemberOnboarding() {
  const { profile, updateOnboardingStatus } = useAuth();

  // Mark as in_progress when user visits this page
  useEffect(() => {
    if (profile?.onboarding_status === "new") {
      updateOnboardingStatus("in_progress");
    }
  }, [profile?.onboarding_status]);

  const handleComplete = () => {
    updateOnboardingStatus("completed");
  };

  const steps = [
    {
      id: "om-soff",
      icon: Building2,
      title: "Om SOFF",
      content: (
        <div className="prose-soff space-y-4">
          <p className="text-muted-foreground">
            SOFF – Säkerhets- och försvarsföretagen – är branschorganisationen för företag
            verksamma inom säkerhets- och försvarsområdet i Sverige.
          </p>
          <h4 className="font-semibold text-foreground">Vår vision</h4>
          <p className="text-muted-foreground">
            Att Sverige ska ha en stark, innovativ och konkurrenskraftig säkerhets- och
            försvarsindustri som bidrar till nationell säkerhet och ekonomisk tillväxt.
          </p>
          <h4 className="font-semibold text-foreground">Vad vi gör</h4>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Påverkansarbete</strong> – Vi representerar branschen gentemot myndigheter och politiker</li>
            <li><strong className="text-foreground">Nätverk</strong> – Vi skapar mötesplatser för medlemsföretag</li>
            <li><strong className="text-foreground">Kunskap</strong> – Vi tillhandahåller information och utbildning</li>
            <li><strong className="text-foreground">Export</strong> – Vi stödjer medlemmarnas internationella affärer</li>
          </ul>
        </div>
      ),
    },
    {
      id: "medlemskapet",
      icon: Users,
      title: "Medlemskapet",
      content: (
        <div className="prose-soff space-y-4">
          <p className="text-muted-foreground">
            Som medlem i SOFF får du tillgång till ett brett nätverk och många resurser
            för att utveckla din verksamhet inom säkerhets- och försvarssektorn.
          </p>
          <h4 className="font-semibold text-foreground">Så får du ut det mesta</h4>
          <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
            <li>Delta aktivt på medlemsmöten och evenemang</li>
            <li>Engagera dig i relevanta medlemsgrupper</li>
            <li>Svara på remisser och enkäter</li>
            <li>Utse en Point of Contact (PoC) för ditt företag</li>
          </ul>
          <InfoAlert variant="info" title="Tips">
            Ju mer aktiv du är, desto mer värde får du ut av ditt medlemskap!
          </InfoAlert>
        </div>
      ),
    },
    {
      id: "portaler",
      icon: Globe,
      title: "Portaler",
      content: (
        <div className="prose-soff space-y-4">
          <p className="text-muted-foreground">
            SOFF erbjuder två digitala plattformar för medlemmar:
          </p>
          <h4 className="font-semibold text-foreground">SOFF-Portalen</h4>
          <p className="text-muted-foreground">
            Den huvudsakliga informationskanalen för alla medlemmar. Här hittar du:
          </p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Nyheter och uppdateringar</li>
            <li>Dokumentbibliotek</li>
            <li>Kalender med evenemang</li>
            <li>Medlemsregister</li>
          </ul>
          <h4 className="font-semibold text-foreground">PoC-Portalen</h4>
          <p className="text-muted-foreground">
            Särskild portal för Points of Contact med utökad tillgång till:
          </p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Arbetsgruppsdokumentation</li>
            <li>Remisshantering</li>
            <li>Protokoll från möten</li>
          </ul>
        </div>
      ),
    },
    {
      id: "affärsetik",
      icon: Scale,
      title: "Affärsetik",
      content: (
        <div className="prose-soff space-y-4">
          <p className="text-muted-foreground">
            Som medlem i SOFF förbinder sig företaget att följa våra affärsetiska riktlinjer
            och uppförandekod.
          </p>
          <h4 className="font-semibold text-foreground">Grundprinciper</h4>
          <ol className="list-decimal ml-6 space-y-2 text-muted-foreground">
            <li>Bedriva verksamhet i enlighet med gällande lagar</li>
            <li>Motverka korruption i alla former</li>
            <li>Respektera mänskliga rättigheter</li>
            <li>Arbeta för hållbar utveckling</li>
          </ol>
          <h4 className="font-semibold text-foreground">Anti-korruption</h4>
          <p className="text-muted-foreground">
            SOFF har nolltolerans mot korruption. Detta innebär:
          </p>
          <ul className="list-disc ml-6 space-y-1 text-muted-foreground">
            <li>Inga mutor eller otillbörliga betalningar</li>
            <li>Transparens i alla affärsrelationer</li>
            <li>Dokumentation av mellanhänder och agenter</li>
          </ul>
          <InfoAlert variant="warning" title="Viktigt">
            Alla medlemsföretag förväntas ha en egen uppförandekod och rutiner för due diligence.
          </InfoAlert>
        </div>
      ),
    },
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
          <CardTitle className="font-display text-2xl">Onboarding för nya medlemmar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Välkommen till SOFF! Gå igenom stegen nedan för att lära dig allt du behöver
            veta som ny medlem.
          </p>
          <ProgressBar
            value={profile?.onboarding_status === "completed" ? 100 : profile?.onboarding_status === "in_progress" ? 50 : 0}
            label="Din progress"
          />
        </CardContent>
      </Card>

      {/* Onboarding Steps */}
      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {steps.map((step, index) => (
              <AccordionItem key={step.id} value={step.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-muted-foreground">Steg {index + 1}</span>
                      <p className="font-display font-semibold">{step.title}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-12 pr-4 pb-6">
                  {step.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Completion Button */}
      {profile?.onboarding_status !== "completed" ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                När du har gått igenom alla steg, markera din onboarding som slutförd.
              </p>
              <Button onClick={handleComplete} size="lg" className="bg-gold text-accent-foreground hover:bg-gold-dark">
                <CheckCircle className="mr-2 h-5 w-5" />
                Markera som slutförd
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <InfoAlert variant="success" title="Grattis!">
          Du har slutfört din onboarding. Utforska nu medlemsportalen och ta del av alla
          resurser som finns tillgängliga för dig.
        </InfoAlert>
      )}
    </div>
  );
}
