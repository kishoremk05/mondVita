import { useState } from "react";

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
    <div className="flex h-20 items-center justify-center rounded-2xl border border-border/70 bg-white px-4 shadow-sm">
      {failed ? (
        <span className="text-xs font-bold uppercase tracking-widest text-primary/75">{name}</span>
      ) : (
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          className="max-h-10 max-w-full object-contain grayscale opacity-90 transition duration-200 hover:grayscale-0 hover:opacity-100"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export function PartnerBand({ title = "Partner network" }: { title?: string }) {
  return (
    <section className="border-y border-border/60 bg-secondary/30 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">{title}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <PartnerTile key={partner.name} name={partner.name} domain={partner.domain} />
          ))}
        </div>
      </div>
    </section>
  );
}
