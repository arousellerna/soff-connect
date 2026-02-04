import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { Shield, Loader2, ArrowLeft } from "lucide-react";
import { InfoAlert } from "@/components/ui/InfoAlert";

// Valideringsschema för login
const loginSchema = z.object({
  email: z.string().email("Ogiltig e-postadress"),
  password: z.string().min(1, "Lösenord krävs"),
});

// Valideringsschema för registrering
const registerSchema = z.object({
  companyName: z.string().min(2, "Företagsnamn måste vara minst 2 tecken"),
  email: z.string().email("Ogiltig e-postadress"),
  password: z.string().min(6, "Lösenordet måste vara minst 6 tecken"),
});

export default function Login() {
  const { user, loading, signIn, signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Forms setup
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { companyName: "", email: "", password: "" },
  });

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

  // Login handler
  async function onLogin(values: z.infer<typeof loginSchema>) {
    setError(null);
    const { error } = await signIn(values.email, values.password);
    if (error) {
      setError("Felaktig e-postadress eller lösenord. Försök igen.");
    }
  }

  // Register handler
  async function onRegister(values: z.infer<typeof registerSchema>) {
    setError(null);
    setSuccess(null);

    const { error } = await signUp(values.email, values.password, values.companyName);
    
    if (error) {
      setError("Kunde inte skapa konto. E-postadressen kanske redan används.");
    } else {
      setSuccess("Konto skapat! Kontrollera din e-post för att verifiera ditt konto.");
      registerForm.reset();
    }
  }

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
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-postadress</FormLabel>
                            <FormControl>
                              <Input placeholder="namn@foretag.se" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Lösenord</FormLabel>
                              <Link 
                                to="/forgot-password" 
                                className="text-sm font-medium text-primary hover:underline"
                              >
                                Glömt lösenord?
                              </Link>
                            </div>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                        {loginForm.formState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loggar in...
                          </>
                        ) : (
                          "Logga in"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Företagsnamn</FormLabel>
                            <FormControl>
                              <Input placeholder="Ditt företag AB" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-postadress</FormLabel>
                            <FormControl>
                              <Input placeholder="namn@foretag.se" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lösenord</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Minst 6 tecken" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
                        {registerForm.formState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Skapar konto...
                          </>
                        ) : (
                          "Skapa konto"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
