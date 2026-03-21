export default function PrivacyPolicy() {
  return (
    <div className="animate-fade-in bg-background">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-navy-light to-primary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Integritetspolicy (GDPR)
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Information om hur vi hanterar dina personuppgifter.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>1. Inledning</h2>
            <p>
              Vi värnar om din personliga integritet och strävar efter att alltid skydda dina personuppgifter på bästa sätt. Denna integritetspolicy förklarar hur vi samlar in och använder din personliga information.
            </p>

            <h2>2. Vilka personuppgifter vi behandlar</h2>
            <p>
              Vi kan komma att samla in och behandla följande personuppgifter om dig:
            </p>
            <ul>
              <li>Namn och kontaktuppgifter (e-post, telefonnummer)</li>
              <li>Information relaterad till ditt medlemskap eller användning av våra tjänster</li>
              <li>Teknisk data (t.ex. IP-adress, webbläsarinformation)</li>
            </ul>

            <h2>3. Varför vi behandlar dina personuppgifter</h2>
            <p>
              Dina personuppgifter behandlas huvudsakligen för följande ändamål:
            </p>
            <ul>
              <li>För att tillhandahålla våra tjänster och fullgöra våra åtaganden gentemot dig</li>
              <li>För att kommunicera med dig (t.ex. nyhetsbrev, kundtjänst)</li>
              <li>För att förbättra och utveckla våra tjänster</li>
            </ul>

            <h2>4. Vilka vi delar dina uppgifter med</h2>
            <p>
              Vi säljer aldrig dina personuppgifter till tredje part. Vi kan dock komma att dela dina uppgifter med våra betrodda partners och tjänsteleverantörer i syfte att kunna tillhandahålla våra tjänster. Alla sådana parter är bundna av sekretessavtal och får endast behandla dina uppgifter i enlighet med våra instruktioner.
            </p>

            <h2>5. Dina rättigheter</h2>
            <p>
              Enligt GDPR har du rätt att:
            </p>
            <ul>
              <li>Få tillgång till dina personuppgifter (registerutdrag)</li>
              <li>Begära rättelse av felaktiga uppgifter</li>
              <li>Begära radering av dina uppgifter ("rätten att bli glömd")</li>
              <li>Invända mot eller begränsa vår behandling av dina uppgifter</li>
              <li>Begära dataportabilitet</li>
            </ul>

            <h2>6. Ändringar i denna policy</h2>
            <p>
              Vi kan komma att uppdatera denna integritetspolicy från tid till annan. Eventuella ändringar kommer att publiceras på denna sida.
            </p>

            <h2>7. Kontakt</h2>
            <p>
              Om du har frågor om vår hantering av dina personuppgifter, eller om du vill utöva dina rättigheter, är du välkommen att kontakta oss via e-post på info@soff.se.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
