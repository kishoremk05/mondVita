import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { Sparkle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
        if (error) setErr(error.message);
        else toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setErr(error.message);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
            <Sparkle className="h-4 w-4" />
          </span>
          <span className="font-serif text-2xl font-semibold">Mond<span className="gold-text">Vita</span></span>
        </Link>

        <div className="rounded-2xl border border-border bg-white p-8 shadow-xl shadow-primary/5">
          <h1 className="font-serif text-2xl font-medium text-foreground">{mode === "login" ? t("login.title") : t("login.signup_title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("login.subtitle")}</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("login.email")}</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("login.password")}</label>
              <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
            </div>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <button type="submit" disabled={busy} className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 inline-flex items-center justify-center gap-2">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? t("login.submit") : t("login.signup_btn")}
            </button>
          </form>

          <button onClick={() => { setMode(m => m === "login" ? "signup" : "login"); setErr(null); }} className="mt-4 block w-full text-center text-xs text-muted-foreground transition hover:text-primary">
            {mode === "login" ? t("login.signup_link") : t("login.login_link")}
          </button>
        </div>
      </div>
    </div>
  );
}
