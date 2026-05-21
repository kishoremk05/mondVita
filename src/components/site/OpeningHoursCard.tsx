export function OpeningHoursCard({
  title = "Opening hours",
  dayLabel = "Monday - Saturday",
  morning = "09:00 - 12:00",
  breakLabel = "Lunch break: 12:00 - 13:00",
  afternoon = "13:00 - 17:00",
}: {
  title?: string;
  dayLabel?: string;
  morning?: string;
  breakLabel?: string;
  afternoon?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-white shadow-[0_18px_40px_-24px_rgba(12,35,64,0.18)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-accent/40 via-primary to-brand-accent/40" />
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-accent/5 blur-2xl" />

      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accent">Schedule</p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-primary">{title}</h3>
          </div>
          <div className="rounded-full border border-brand-accent/15 bg-brand-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
            Open today
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          <div className="rounded-2xl border border-border/60 bg-secondary/30 px-4 py-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Day</p>
            <p className="mt-1 text-sm font-semibold text-primary">{dayLabel}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-white px-4 py-3 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Morning</p>
              <p className="mt-1 text-sm font-semibold text-primary">{morning}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white px-4 py-3 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Break</p>
              <p className="mt-1 text-sm font-semibold text-primary">{breakLabel}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-white px-4 py-3 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Afternoon</p>
              <p className="mt-1 text-sm font-semibold text-primary">{afternoon}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
