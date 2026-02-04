import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  user_id: string;
  company_name: string;
  onboarding_status: "new" | "in_progress" | "completed";
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, companyName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>; // Ny funktion
  updatePassword: (password: string) => Promise<{ error: any }>; // Ny funktion
  updateOnboardingStatus: (status: Profile["onboarding_status"]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (error) throw error;
      setProfile(data as Profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string, companyName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { company_name: companyName } },
    });
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // NY: Skickar återställningslänk
  const resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      // Skickar användaren till din nya sida för att byta lösenord
      redirectTo: `${window.location.origin}/update-password`,
    });
  };

  // NY: Uppdaterar lösenordet (används när man är inloggad)
  const updatePassword = async (password: string) => {
    return await supabase.auth.updateUser({ password });
  };

  const updateOnboardingStatus = async (status: Profile["onboarding_status"]) => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ onboarding_status: status })
      .eq("id", user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Kunde inte uppdatera status",
        description: error.message,
      });
    } else {
      setProfile((prev) => (prev ? { ...prev, onboarding_status: status } : null));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, user, profile, loading, 
      signIn, signUp, signOut, resetPassword, updatePassword, updateOnboardingStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
