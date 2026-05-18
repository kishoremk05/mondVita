import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { Check } from "lucide-react";
import waitingRoom from "@/assets/waiting-room.jpg";
import { useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/afspraak")({
  head: () => ({
    meta: [
      { title: "Afspraak maken — MondVita" },
      { name: "description", content: "Plan eenvoudig uw afspraak online bij MondVita. Kies een datum en tijdstip dat u uitkomt." },
      { property: "og:title", content: "Afspraak maken — MondVita" },
    ],
    links: [{ rel: "canonical", href: "/afspraak" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const [selectedDate, setDate] = useState<number | null>(15);
  const [selectedTime, setTime] = useState<string | null>("10:30");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const times = ["09:00", "10:30", "13:00", "14:30", "16:00"];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error(t("afspraak.error_date_time", "Please select a date and time."));
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("appointment_requests").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        preferred_date: selectedDate,
        preferred_time: selectedTime,
      });

      if (error) throw error;

      toast.success(t("afspraak.success", "Your appointment request has been received. We will contact you shortly."));
      
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteShell>
      <PageHeader
        title={t("afspraak.title")}
        intro={t("afspraak.intro")}
        bgImage={waitingRoom}
      />

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:gap-16">
          {/* Left Column - Benefits & Information */}
          <div className="space-y-6 md:sticky md:top-28 animate-fade-up">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-accent">
              /// Patiëntgerichte Zorg
            </div>
            <h2 className="font-display text-3xl font-extrabold text-primary uppercase tracking-tight">
              Eenvoudig online uw bezoek plannen
            </h2>
            <p className="text-muted-foreground leading-relaxed font-light text-base max-w-lg">
              Met onze online planner plant u binnen een minuut uw periodieke controle of eerste consult. Wij reserveren direct een plekje voor u in onze moderne praktijk in Amsterdam-West.
            </p>
            <ul className="space-y-4 pt-2">
              {[t("afspraak.b1"), t("afspraak.b2"), t("afspraak.b3")].map((b) => (
                <li key={b} className="flex items-start gap-3.5 text-foreground">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent">
                    <Check className="h-3.5 w-3.5 text-brand-accent" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-foreground/80 font-light leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column — luxury booking card */}
          <div className="rounded-2xl rounded-tr-none border border-border/80 bg-white p-8 shadow-[0_16px_40px_-16px_rgba(12,35,64,0.06)] animate-fade-up">
            {/* Step 1 */}
            <label className="font-display text-xs font-bold uppercase tracking-wider text-primary mb-3 block">
              1. {t("afspraak.pick_date")}
            </label>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs border-b border-border/50 pb-5">
              {["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((d) => (
                <div key={d} className="py-1.5 font-bold text-muted-foreground uppercase tracking-wide">
                  {d}
                </div>
              ))}
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setDate(day)}
                  className={`aspect-square rounded-lg text-sm transition-all duration-200 border border-transparent ${
                    selectedDate === day
                      ? "bg-brand-accent text-white font-bold shadow-md shadow-brand-accent/25 scale-[1.03]"
                      : "text-foreground/85 hover:bg-secondary hover:border-border/50"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Step 2 */}
            <label className="font-display text-xs font-bold uppercase tracking-wider text-primary mt-6 mb-3 block">
              2. {t("afspraak.pick_time")}
            </label>
            <div className="mt-3 flex flex-wrap gap-2 border-b border-border/50 pb-6">
              {times.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setTime(time)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    selectedTime === time
                      ? "border-brand-accent bg-brand-accent text-white shadow-md shadow-brand-accent/20"
                      : "border-border/80 text-foreground/80 hover:border-primary hover:bg-secondary/20"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Step 3 */}
            <label className="font-display text-xs font-bold uppercase tracking-wider text-primary mt-6 mb-3 block">
              3. {t("afspraak.your_info")}
            </label>
            <form className="mt-3 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <input
                placeholder={t("afspraak.first")}
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-border/80 bg-white px-4 py-3 text-sm font-light transition-all duration-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 focus:outline-none placeholder:text-muted-foreground/60"
              />
              <input
                placeholder={t("afspraak.last")}
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-border/80 bg-white px-4 py-3 text-sm font-light transition-all duration-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 focus:outline-none placeholder:text-muted-foreground/60"
              />
              <input
                placeholder={t("afspraak.email")}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border/80 bg-white px-4 py-3 text-sm font-light transition-all duration-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 focus:outline-none placeholder:text-muted-foreground/60 sm:col-span-2"
              />
              <input
                placeholder={t("afspraak.phone")}
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-border/80 bg-white px-4 py-3 text-sm font-light transition-all duration-200 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/30 focus:outline-none placeholder:text-muted-foreground/60 sm:col-span-2"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="sm:col-span-2 mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-md transition-all duration-250 hover:bg-primary/95 active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {t("afspraak.submit")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

