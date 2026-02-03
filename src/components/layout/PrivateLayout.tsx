import { Navigate, Outlet } from "react-router-dom";
import { PrivateHeader } from "./PrivateHeader";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export function PrivateLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <PrivateHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
