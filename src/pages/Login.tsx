import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Loader2, ArrowLeft } from "lucide-react";
import { InfoAlert } from "@/components/ui/InfoAlert";

export default function Login() {
  const { user, loading, signIn, signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/medlem" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { error } = await signIn(loginEmail, loginPassword);
    
    if (error) {
      setError("Felaktig e-postadress eller lösenord. Försök igen.");
    }
    
    setIsSubmitting(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    if (registerPassword.length < 6) {
      setError("Lösenordet måste vara minst 6 tecken.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await signUp(registerEmail, registerPassword, companyName);
    
    if (error) {
      setError("Kunde inte skapa konto. E-postadressen kanske redan används.");
    } else {
      setSuccess("Konto skapat! Kontrollera din e-post för att verifiera ditt konto.");
      setRegisterEmail("");
      setRegisterPassword("");
      setCompanyName("");
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-muted/30 to-muted/50">
      {/* Header */}
      <header className="p-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Tillbaka till startsidan
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="h-10 w-10 text-primary" />
              <span className="font-display text-2xl font-bold text-primary">SOFF</span>
            </div>
            <p className="text-muted-foreground">Medlemsportalen</p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="font-display text-xl">Välkommen</CardTitle>
              <CardDescription>
                Logga in eller registrera ditt företag för att få tillgång till medlemsportalen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Logga in</TabsTrigger>
                  <TabsTrigger value="register">Registrera</TabsTrigger>
                </TabsList>

                {error && (
                  <InfoAlert variant="error" className="mb-4">
                    {error}
                  </InfoAlert>
                )}

                {success && (
                  <InfoAlert variant="success" className="mb-4">
                    {success}
                  </InfoAlert>
                )}

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">E-postadress</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="namn@foretag.se"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Lösenord</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loggar in...
                        </>
                      ) : (
                        "Logga in"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Företagsnamn</Label>
                      <Input
                        id="company-name"
                        type="text"
                        placeholder="Ditt företag AB"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">E-postadress</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="namn@foretag.se"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Lösenord</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Minst 6 tecken"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Skapar konto...
                        </>
                      ) : (
                        "Skapa konto"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
