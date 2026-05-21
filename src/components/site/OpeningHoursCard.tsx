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
    <div className="rounded-2xl border border-border/80 bg-white p-6 shadow-sm">
      <h3 className="font-display text-2xl font-bold text-primary tracking-tight">{title}</h3>
      <div className="mt-4 space-y-3 text-sm text-foreground/80">
        <p className="font-semibold text-primary">{dayLabel}</p>
        <p>{morning}</p>
        <p>{breakLabel}</p>
        <p>{afternoon}</p>
      </div>
    </div>
  );
}
