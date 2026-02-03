import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InfoAlert } from "@/components/ui/InfoAlert";
import { supabase } from "@/integrations/supabase/client";
import { User, Building2, Mail, Calendar, Loader2, CheckCircle } from "lucide-react";

export default function MemberProfile() {
  const { user, profile } = useAuth();
  const [companyName, setCompanyName] = useState(profile?.company_name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    if (!user) return;

    setIsSaving(true);
    setSaveSuccess(false);

    const { error } = await supabase
      .from("profiles")
      .update({ company_name: companyName })
      .eq("user_id", user.id);

    setIsSaving(false);

    if (!error) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Okänt";
    return new Date(dateString).toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusLabel = (status: string | undefined) => {
    switch (status) {
      case "completed":
        return "Slutförd";
      case "in_progress":
        return "Pågående";
      default:
        return "Ej påbörjad";
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="font-display text-2xl">Min Profil</CardTitle>
              <p className="text-muted-foreground">
                Hantera ditt konto och företagsinformation
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Företagsinformation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Företagsnamn</Label>
            <Input
              id="company-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ange företagsnamn"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sparar...
                </>
              ) : (
                "Spara ändringar"
              )}
            </Button>
            {saveSuccess && (
              <span className="flex items-center gap-2 text-gold text-sm">
                <CheckCircle className="h-4 w-4" />
                Sparat!
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Kontoinformation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">E-postadress</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Medlem sedan</span>
              <span className="font-medium">{formatDate(profile?.created_at)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Onboarding-status</span>
              <span className="font-medium">{getStatusLabel(profile?.onboarding_status)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <InfoAlert variant="info">
        För att ändra din e-postadress eller ta bort ditt konto, vänligen kontakta SOFF:s kansli.
      </InfoAlert>
    </div>
  );
}
