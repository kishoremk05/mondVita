import { createFileRoute, redirect, Outlet, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { Sparkle, LogOut, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/login" });
  },
  component: AuthLayout,
});

function AuthLayout() {
  const { t } = useTranslation();
  const { user, isAdmin, signOut, loading } = useAuth();

  if (loading) return <div className="min-h-screen grid place-items-center">Loading…</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center">
        <div className="max-w-md">
          <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 font-serif text-2xl">Access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user?.email}) is signed in but isn't an admin yet. Ask the developer to grant the admin role to your user.
          </p>
          <button onClick={signOut} className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkle className="h-3.5 w-3.5" /></span>
            <span className="font-serif text-lg font-semibold">Mond<span className="gold-text">Vita</span></span>
            <span className="ms-2 text-xs text-muted-foreground">{t("admin.title")}</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
            <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs transition hover:border-primary">
              <LogOut className="h-3.5 w-3.5" /> {t("nav.logout")}
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
