import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Globe, Award, ArrowRight } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Medlemsföretag", value: "200+" },
    { label: "År av erfarenhet", value: "40+" },
    { label: "Medlemsgrupper", value: "15+" },
    { label: "Årliga evenemang", value: "50+" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Säkerhet",
      description: "Vi arbetar för att stärka Sveriges nationella säkerhet genom en stark försvarsindustri.",
    },
    {
      icon: Users,
      title: "Samverkan",
      description: "Vi skapar forum för dialog och samarbete mellan industri, myndigheter och politik.",
    },
    {
      icon: Globe,
      title: "Internationellt",
      description: "Vi stödjer medlemmarnas internationella affärer och exportmöjligheter.",
    },
    {
      icon: Award,
      title: "Kompetens",
      description: "Vi främjar kunskapsutbyte och kompetensutveckling inom branschen.",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-navy-light to-primary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Om SOFF
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Säkerhets- och försvarsföretagen är branschorganisationen för företag
              verksamma inom säkerhets- och försvarsområdet i Sverige.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center">
              Vår mission
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-8">
              SOFF:s uppgift är att skapa bästa möjliga förutsättningar för företag
              som bidrar till Sveriges och allierades säkerhet. Vi representerar
              branschens intressen gentemot beslutsfattare och arbetar för en
              konkurrenskraftig och innovativ säkerhets- och försvarsindustri.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
            Våra värderingar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Vill du veta mer?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Utforska vår utbildningsplattform för att lära dig mer om försvarsmarknaden,
            eller kontakta oss för information om medlemskap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gold text-accent-foreground hover:bg-gold-dark"
            >
              <Link to="/utbildning">
                Utforska utbildningen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="mailto:info@soff.se">Kontakta oss</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
