import { useState } from "react";
import { useTranslation } from "react-i18next";

const partners = [
  { name: "infomedics", domain: "infomedics.nl" },
  { name: "knmt", domain: "knmt.nl" },
  { name: "sentix", domain: "sentix.nl" },
  { name: "all2md", domain: "all2md.com" },
  { name: "tandarts.nl", domain: "tandarts.nl" },
  { name: "SBB", domain: "s-bb.nl" },
] as const;

function PartnerTile({ name, domain }: { name: string; domain: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border/70 bg-white/95 p-4 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-accent/30 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent opacity-70" />
      <div className="flex min-h-28 flex-col items-center justify-center gap-3 text-center">
        <div className="flex h-14 w-full items-center justify-center rounded-2xl bg-secondary/40 px-3 ring-1 ring-inset ring-border/60 transition duration-300 group-hover:bg-white group-hover:ring-brand-accent/25">
          {failed ? (
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/75">{name}</span>
          ) : (
            <img
              src={`https://logo.clearbit.com/${domain}`}
              alt={name}
              className="max-h-9 max-w-full object-contain grayscale opacity-85 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              loading="lazy"
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold capitalize text-foreground">{name}</p>
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">{domain}</p>
        </div>
      </div>
    </div>
  );
}

export function PartnerBand({ title }: { title?: string }) {
  const { t } = useTranslation();
  const displayTitle = title || t("generalCare.partner_title");

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-secondary/40 via-white to-secondary/20 py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_65%)]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-accent">{t("partner.badge")}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{displayTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {t("partner.desc")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <div key={partner.name} className="animate-fade-in" style={{ animationDelay: `${index * 70}ms` }}>
              <PartnerTile name={partner.name} domain={partner.domain} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
