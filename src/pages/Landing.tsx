import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, BookOpen, Users, Globe, ArrowRight, CheckCircle } from "lucide-react";

export default function Landing() {
  const features = [
    {
      icon: BookOpen,
      title: "Försvarsmarknaden",
      description: "Förstå ekosystemet med OEMs, underleverantörer och slutkunder.",
    },
    {
      icon: Shield,
      title: "Regelverk",
      description: "Lär dig om exportkontroll, säkerhetsskydd och internationella krav.",
    },
    {
      icon: Globe,
      title: "Affärsmöjligheter",
      description: "Hitta evenemang, upphandlingar och nätverksmöjligheter.",
    },
    {
      icon: Users,
      title: "Medlemsportal",
      description: "Exklusiva resurser och onboarding för SOFF-medlemmar.",
    },
  ];

  const benefits = [
    "Gratis tillgång till grundläggande utbildningsmaterial",
    "Strukturerad kunskap om den svenska försvarsmarknaden",
    "Vägledning genom regelverk och krav",
    "Information om affärsmöjligheter och nätverk",
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-navy-light to-primary py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2MmgxMnptLTEyLTZoMTJ2MkgyNHYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Säkerhets- och försvarsföretagen
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Välkommen till försvarsmarknaden
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              En utbildningsplattform för att förstå ekosystemet, aktörer och regelverk inom den svenska säkerhets- och försvarssektorn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gold text-accent-foreground hover:bg-gold-dark text-base px-8"
              >
                <Link to="/utbildning">
                  Starta Utbildningen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base"
              >
                <Link to="/login">Logga in som medlem</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Vad du kommer lära dig
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vår utbildningsplattform ger dig den kunskap du behöver för att navigera försvarsmarknaden.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                Sänk trösklarna till försvarsmarknaden
              </h2>
              <p className="text-muted-foreground mb-8">
                SOFF:s utbildningsplattform är öppen för alla som vill lära sig mer om 
                den svenska säkerhets- och försvarssektorn. Oavsett om du är nyfiken 
                på branschen eller vill ta ditt företag in på marknaden.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-gold/10 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <Shield className="h-24 w-24 text-primary mx-auto mb-6" />
                  <p className="font-display text-2xl font-bold text-primary mb-2">SOFF</p>
                  <p className="text-muted-foreground">
                    Säkerhets- och försvarsföretagen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Redo att börja?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Starta din resa mot försvarsmarknaden idag. Vår kostnadsfria utbildning 
            ger dig grunderna du behöver.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gold text-accent-foreground hover:bg-gold-dark"
          >
            <Link to="/utbildning">
              Börja lära dig nu
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
