import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Services } from "@/components/site/Services";
import { PartnerBand } from "@/components/site/PartnerBand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tandarts Rotterdam | MondVita — Persoonlijke Mondzorg" },
      { name: "description", content: "Welkom bij tandartspraktijk MondVita Rotterdam (Prins Alexander). Uw tandarts voor algemene mondzorg, implantaten, klikgebitten en protheses." },
      { property: "og:title", content: "Tandarts Rotterdam | MondVita — Persoonlijke Mondzorg" },
      { property: "og:description", content: "Uw tandarts in Rotterdam Prins Alexander voor complete mondzorg, implantaten, klikgebitten en protheses." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Features />
      <Services />
      <PartnerBand />
    </SiteShell>
  );
}
