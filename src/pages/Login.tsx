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
import { Loader2, ArrowLeft } from "lucide-react";
import { InfoAlert } from "@/components/ui/InfoAlert";
import soffLogoFull from "@/assets/soff-logo-full.png";

const loginSchema = z.object({
  email: z.string().email("Ogiltig e-postadress"),
  password: z.string().min(1, "Lösenord krävs"),
});

const registerSchema = z.object({
  companyName: z.string().min(2, "Företagsnamn måste vara minst 2 tecken"),
  email: z.string().email("Ogiltig e-postadress"),
  password: z.string().min(6, "Lösenordet måste vara minst 6 tecken"),
});

export default function Login() {
  const { user, loading, signIn, signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { companyName: "", email: "", password: "" },
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (user) return <Navigate to="/medlem" replace />;

  async function onLogin(values: z.infer<typeof loginSchema>) {
    setError(null);
    const { error } = await signIn(values.email, values.password);
    if (error) setError("Felaktig e-post eller lösenord.");
  }

  async function onRegister(values: z.infer<typeof registerSchema>) {
    setError(null);
    setSuccess(null);

    const { error } = await signUp(values.email, values.password, values.companyName);
    
    if (error) {
      console.error("Supabase Error:", error);
      // Show the actual error message from Supabase for debugging
      if (error.message?.includes("already registered")) {
        setError("E-postadressen är redan registrerad.");
      } else if (error.message?.includes("Password")) {
        setError("Lösenordet uppfyller inte kraven: " + error.message);
      } else {
        setError(error.message || "Ett oväntat fel uppstod. Försök igen.");
      }
    } else {
      setSuccess("Konto skapat! Kontrollera din e-post för att verifiera kontot.");
      registerForm.reset();
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30 p-4 items-center justify-center relative">
      {/* Back to Start Button */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Tillbaka till startsidan
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src={soffLogoFull} 
            alt="SOFF - Säkerhets- och försvarsföretagen" 
            className="h-16 w-auto"
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Medlemsportalen</CardTitle>
            <CardDescription>Logga in eller registrera konto.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Logga in</TabsTrigger>
                <TabsTrigger value="register">Nytt konto</TabsTrigger>
              </TabsList>

              {/* Felmeddelande */}
              {error && <InfoAlert variant="error" className="mb-4">{error}</InfoAlert>}

              {success && <InfoAlert variant="success" className="mb-4">{success}</InfoAlert>}

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <FormField control={loginForm.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>E-post</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={loginForm.control} name="password" render={({ field }) => (
                      <FormItem><FormLabel>Lösenord</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="flex items-center justify-between">
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        Glömt lösenord?
                      </Link>
                    </div>
                    <Button type="submit" className="w-full">Logga in</Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <FormField control={registerForm.control} name="companyName" render={({ field }) => (
                      <FormItem><FormLabel>Företag</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={registerForm.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>E-post</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={registerForm.control} name="password" render={({ field }) => (
                      <FormItem><FormLabel>Lösenord</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" className="w-full">Skapa konto</Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
