import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Services } from "@/components/site/Services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MondVita — Persoonlijke mondzorg in Amsterdam" },
      { name: "description", content: "MondVita biedt persoonlijke en professionele tandheelkundige zorg voor het hele gezin. Maak vandaag nog een afspraak." },
      { property: "og:title", content: "MondVita — Persoonlijke mondzorg in Amsterdam" },
      { property: "og:description", content: "Persoonlijke en professionele mondzorg voor een gezonde en stralende lach." },
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
    </SiteShell>
  );
}
