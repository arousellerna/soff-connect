import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { InfoAlert } from "@/components/ui/InfoAlert";
import soffLogoFull from "@/assets/soff-logo-full.png";

export default function UpdatePassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (password.length < 6) {
      setError("Lösenordet måste vara minst 6 tecken.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await updatePassword(password);

    if (error) {
      setError("Kunde inte uppdatera lösenordet. Försök igen.");
    } else {
      // Skicka användaren till inloggning eller dashboard
      navigate("/medlem"); 
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src={soffLogoFull} 
            alt="SOFF - Säkerhets- och försvarsföretagen" 
            className="h-14 w-auto mx-auto mb-4"
          />
          <h1 className="font-display text-2xl font-bold text-foreground">Välj nytt lösenord</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Säkerhet</CardTitle>
            <CardDescription>Välj ett nytt starkt lösenord för ditt konto.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <InfoAlert variant="error">{error}</InfoAlert>}
              
              <div className="space-y-2">
                <Label htmlFor="password">Nytt lösenord</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minst 6 tecken"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sparar...
                  </>
                ) : (
                  "Spara nytt lösenord"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
