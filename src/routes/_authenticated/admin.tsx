import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchSiteContent, fetchServices, fetchGallery, fetchContact, publicUrl, type ServiceRow, fetchCustomPages, fetchCustomSections, type CustomPageRow, type CustomSectionRow } from "@/lib/site-data";
import type { Locale } from "@/i18n/locales";
import { LOCALES } from "@/i18n/locales";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Save, Upload, Trash2, Plus, Loader2, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

const PAGE_GROUPS = [
  {
    id: "homepage",
    name: "Homepage (Hero & Kenmerken)",
    keys: [
      "hero.title_1",
      "hero.title_2",
      "hero.subtitle",
      "hero.cta_more",
      "features.f1_t",
      "features.f1_d",
      "features.f2_t",
      "features.f2_d",
      "features.f3_t",
      "features.f3_d",
      "features.f4_t",
      "features.f4_d",
      "help.title",
      "help.more"
    ]
  },
  {
    id: "behandelingen",
    name: "Behandelingen Pagina",
    keys: [
      "behandelingen.title",
      "behandelingen.intro"
    ]
  },
  {
    id: "behandelingen_svc",
    name: "Behandelingen (Dienstbeschrijvingen)",
    keys: [
      "svc.mondzorg",
      "svc.mondzorg_d",
      "svc.mondzorg_n",
      "svc.mondzorg_det",
      "svc.implant",
      "svc.implant_d",
      "svc.implant_n",
      "svc.implant_det",
      "svc.prothese",
      "svc.prothese_d",
      "svc.prothese_n",
      "svc.prothese_det",
      "svc.esth",
      "svc.esth_d",
      "svc.esth_n",
      "svc.esth_det",
      "svc.wortel",
      "svc.wortel_d",
      "svc.wortel_n",
      "svc.wortel_det",
      "svc.kinder",
      "svc.kinder_d",
      "svc.kinder_n",
      "svc.kinder_det"
    ]
  },
  {
    id: "general_care",
    name: "Algemene Mondzorg Pagina",
    keys: [
      "generalCare.title",
      "generalCare.intro",
      "generalCare.body1",
      "generalCare.body2",
      "generalCare.hours_title",
      "generalCare.hours_day",
      "generalCare.hours_morning",
      "generalCare.hours_break",
      "generalCare.hours_afternoon",
      "generalCare.cta_declaraties",
      "generalCare.partner_title",
      "generalCare.map_title",
      "generalCare.item1_t",
      "generalCare.item1_d",
      "generalCare.item2_t",
      "generalCare.item2_d",
      "generalCare.item3_t",
      "generalCare.item3_d"
    ]
  },
  {
    id: "declaraties",
    name: "Declaraties Pagina",
    keys: [
      "declaraties.title",
      "declaraties.intro",
      "declaraties.body1",
      "declaraties.body2",
      "declaraties.knmt_label",
      "declaraties.knmt_cta",
      "declaraties.knmt_url"
    ]
  },
  {
    id: "protheses",
    name: "Protheses Pagina",
    keys: [
      "protheses.title",
      "protheses.intro",
      "protheses.side_title",
      "protheses.side_text",
      "protheses.p1_t",
      "protheses.p1_d",
      "protheses.p2_t",
      "protheses.p2_d",
      "protheses.p3_t",
      "protheses.p3_d",
      "protheses.p4_t",
      "protheses.p4_d",
      "protheses.b1_t",
      "protheses.b1_d",
      "protheses.b2_t",
      "protheses.b2_d",
      "protheses.b3_t",
      "protheses.b3_d",
      "protheses.repair_title",
      "protheses.repair_text",
      "protheses.repair_link"
    ]
  },
  {
    id: "implantologie",
    name: "Implantologie Pagina",
    keys: [
      "implantCare.title",
      "implantCare.intro",
      "implantCare.body1",
      "implantCare.body2",
      "implantCare.side_title",
      "implantCare.side_text",
      "implantCare.p1_t",
      "implantCare.p1_d",
      "implantCare.p2_t",
      "implantCare.p2_d",
      "implantCare.p3_t",
      "implantCare.p3_d",
      "implantCare.p4_t",
      "implantCare.p4_d",
      "implantCare.b1_t",
      "implantCare.b1_d",
      "implantCare.b2_t",
      "implantCare.b2_d",
      "implantCare.b3_t",
      "implantCare.b3_d"
    ]
  },
  {
    id: "esthetische",
    name: "Esthetische Tandheelkunde Pagina",
    keys: [
      "esthCare.title",
      "esthCare.intro",
      "esthCare.body1",
      "esthCare.body2",
      "esthCare.side_title",
      "esthCare.side_text",
      "esthCare.p1_t",
      "esthCare.p1_d",
      "esthCare.p2_t",
      "esthCare.p2_d",
      "esthCare.p3_t",
      "esthCare.p3_d",
      "esthCare.p4_t",
      "esthCare.p4_d",
      "esthCare.b1_t",
      "esthCare.b1_d",
      "esthCare.b2_t",
      "esthCare.b2_d",
      "esthCare.b3_t",
      "esthCare.b3_d"
    ]
  },
  {
    id: "wortelkanaal",
    name: "Wortelkanaalbehandeling Pagina",
    keys: [
      "wortelCare.title",
      "wortelCare.intro",
      "wortelCare.body1",
      "wortelCare.body2",
      "wortelCare.side_title",
      "wortelCare.side_text",
      "wortelCare.p1_t",
      "wortelCare.p1_d",
      "wortelCare.p2_t",
      "wortelCare.p2_d",
      "wortelCare.p3_t",
      "wortelCare.p3_d",
      "wortelCare.p4_t",
      "wortelCare.p4_d",
      "wortelCare.b1_t",
      "wortelCare.b1_d",
      "wortelCare.b2_t",
      "wortelCare.b2_d",
      "wortelCare.b3_t",
      "wortelCare.b3_d"
    ]
  },
  {
    id: "kindertandheelkunde",
    name: "Kindertandheelkunde Pagina",
    keys: [
      "kinderCare.title",
      "kinderCare.intro",
      "kinderCare.body1",
      "kinderCare.body2",
      "kinderCare.side_title",
      "kinderCare.side_text",
      "kinderCare.p1_t",
      "kinderCare.p1_d",
      "kinderCare.p2_t",
      "kinderCare.p2_d",
      "kinderCare.p3_t",
      "kinderCare.p3_d",
      "kinderCare.p4_t",
      "kinderCare.p4_d",
      "kinderCare.b1_t",
      "kinderCare.b1_d",
      "kinderCare.b2_t",
      "kinderCare.b2_d",
      "kinderCare.b3_t",
      "kinderCare.b3_d"
    ]
  },
  {
    id: "spoed",
    name: "Spoed Pagina",
    keys: [
      "spoed.title",
      "spoed.intro",
      "spoed.p1",
      "spoed.p2",
      "spoed.p3",
      "spoed.card_title",
      "spoed.card_sub",
      "spoed.card_btn",
      "spoed.hours_title",
      "spoed.hours_desc",
      "spoed.hours_wd",
      "spoed.hours_we",
      "spoed.hours_h",
      "spoed.hours_24",
      "spoed.call_now"
    ]
  },
  {
    id: "reviews",
    name: "Reviews Pagina",
    keys: [
      "reviews.title",
      "reviews.intro",
      "reviews.r1_q",
      "reviews.r1_n",
      "reviews.r2_q",
      "reviews.r2_n",
      "reviews.r3_q",
      "reviews.r3_n"
    ]
  },
  {
    id: "over_ons",
    name: "Over Ons Pagina",
    keys: [
      "over.title",
      "over.intro",
      "over.p1",
      "over.p2",
      "over.cta"
    ]
  },
  {
    id: "afspraak",
    name: "Afspraak Pagina",
    keys: [
      "afspraak.title",
      "afspraak.intro",
      "afspraak.desc",
      "afspraak.b1",
      "afspraak.b2",
      "afspraak.b3",
      "afspraak.opt1_t",
      "afspraak.opt1_d",
      "afspraak.opt1_btn",
      "afspraak.opt2_t",
      "afspraak.opt2_d",
      "afspraak.opt2_btn"
    ]
  },
  {
    id: "contact_footer",
    name: "Contact, Afspraak & Footer",
    keys: [
      "contact.title",
      "contact.intro",
      "footer.tagline",
      "footer.rights"
    ]
  },
  {
    id: "partner",
    name: "Partnernetwerk Teksten",
    keys: [
      "partner.badge",
      "generalCare.partner_title",
      "partner.desc",
      "partner.zorgpartners",
      "partner.verzekeraars"
    ]
  }
];

const IMAGE_CONFIGS = [
  { key: "images.hero_bg", label: "Homepage Hero Achtergrond", defaultAsset: "/src/assets/clinic-interior.jpg", description: "De grote full-bleed achtergrondafbeelding bovenaan de startpagina." },
  { key: "images.about_bg", label: "Over Ons Banner", defaultAsset: "/src/assets/new client images/dental setup place.png", description: "De banner achtergrond bovenaan de 'Over ons' pagina." },
  { key: "images.about_floating", label: "Over Ons Collage Foto", defaultAsset: "/src/assets/new client images/doctor desktop table with some components.png", description: "De zwevende ingelijste foto aan de rechterkant van de 'Over ons' pagina." },
  { key: "images.contact_bg", label: "Contact Banner", defaultAsset: "/src/assets/contact-desk.png", description: "De banner achtergrond bovenaan de contactpagina." },
  { key: "images.map_bg", label: "Contact Kaart Afbeelding", defaultAsset: "/src/assets/new client images/address.png", description: "De kaartafbeelding die wordt weergegeven in de locatiesectie op de contactpagina." },
  { key: "images.treatments_bg", label: "Behandelingen Banner", defaultAsset: "/src/assets/svc-mondzorg.jpg", description: "De banner achtergrond bovenaan de behandelingenpagina." },
  { key: "images.protheses_bg", label: "Protheses Banner", defaultAsset: "/src/assets/svc-prothese.jpg", description: "De banner achtergrond bovenaan de prothesespagina." },
  { key: "images.services_mondzorg", label: "Diensten Card: Algemene Mondzorg", defaultAsset: "/src/assets/svc-mondzorg.jpg", description: "De vierkante foto op de homepage dienstkaart voor algemene mondzorg." },
  { key: "images.services_implant", label: "Diensten Card: Implantologie", defaultAsset: "/src/assets/svc-implant.jpg", description: "De vierkante foto op de homepage dienstkaart voor implantologie." },
  { key: "images.services_prothese", label: "Diensten Card: Protheses", defaultAsset: "/src/assets/svc-prothese.jpg", description: "De vierkante foto op de homepage dienstkaart voor protheses." },
  { key: "images.services_spoed", label: "Diensten Card: Spoed", defaultAsset: "/src/assets/svc-spoed.jpg", description: "De vierkante foto op de homepage dienstkaart voor spoedgevallen." },
  { key: "images.spoed_bg", label: "Spoed Banner", defaultAsset: "/src/assets/new client images/spoe 1.png", description: "De banner achtergrond bovenaan de spoedpagina." },
  { key: "images.reviews_bg", label: "Reviews Banner", defaultAsset: "/src/assets/new client images/dental setup place.png", description: "De banner achtergrond bovenaan de reviewspagina." },
  { key: "images.appointment_bg", label: "Afspraak Banner", defaultAsset: "/src/assets/new client images/dental setup place.png", description: "De banner achtergrond bovenaan de afspraakpagina." },
  { key: "images.implant_bg", label: "Implantologie Banner", defaultAsset: "/src/assets/new client images/teeth.png", description: "De banner achtergrond bovenaan de implantologiepagina." },
  { key: "images.esth_bg", label: "Esthetische Tandheelkunde Banner", defaultAsset: "/src/assets/new client images/doctor fixing the teeth using uv light.png", description: "De banner achtergrond bovenaan de esthetische tandheelkundepagina." },
  { key: "images.root_canal_bg", label: "Wortelkanaalbehandeling Banner", defaultAsset: "/src/assets/new client images/doctor fixing the teeth using tools.png", description: "De banner achtergrond bovenaan de wortelkanaalbehandelingpagina." },
  { key: "images.kinder_bg", label: "Kindertandheelkunde Banner", defaultAsset: "/src/assets/new client images/child in dental office.png", description: "De banner achtergrond bovenaan de kindertandheelkundepagina." },
  { key: "images.general_care_bg", label: "Algemene Mondzorg Banner", defaultAsset: "/src/assets/new client images/doctor explaining teeth to patient.png", description: "De banner achtergrond bovenaan de algemene mondzorgpagina." },
  { key: "images.footer_location", label: "Footer Locatie Afbeelding", defaultAsset: "/src/assets/new client images/address.png", description: "De locatiekaart die in de footer wordt weergegeven." },
  { key: "images.behandelingen_doctor_explaining", label: "Behandelingen: Dokter legt gebit uit", defaultAsset: "/src/assets/new client images/doctor explaining teeth to patient.png", description: "Foto op de behandelingen overzichtspagina (mondzorg kaart)." },
  { key: "images.behandelingen_teeth_cap", label: "Behandelingen: Kroon model", defaultAsset: "/src/assets/new client images/teeth cap.png", description: "Foto op de behandelingen overzichtspagina (prothese kaart)." },
  { key: "images.behandelingen_tools", label: "Behandelingen: Gereedschap", defaultAsset: "/src/assets/new client images/doctor fixing the teeth using tools.png", description: "Foto op de behandelingen overzichtspagina (wortelkanaal kaart)." },
  { key: "images.protheses_adult_match", label: "Protheses: Tandkleur matching", defaultAsset: "/src/assets/new client images/adult with teeth  match checking.png", description: "Foto op de prothesespagina (tandkleur matching sectie)." },
  { key: "images.protheses_teeth_cap", label: "Protheses: Kroon model", defaultAsset: "/src/assets/new client images/teeth cap.png", description: "Foto op de prothesespagina (kroon model sectie)." },
  { key: "images.protheses_men_visual", label: "Protheses: Man bekijkt 3D model", defaultAsset: "/src/assets/new client images/men with teeth fixing seeing visual.png", description: "Foto op de prothesespagina (3D model sectie)." },
  { key: "images.protheses_client_xray", label: "Protheses: Röntgenfoto", defaultAsset: "/src/assets/new client images/client with teeth xray.png", description: "Foto op de prothesespagina (röntgenfoto sectie)." },
  { key: "images.implantologie_adult_match", label: "Implantologie: Tandkleur matching", defaultAsset: "/src/assets/new client images/adult with teeth  match checking.png", description: "Foto op de implantologiepagina (tandkleur matching sectie)." },
  { key: "images.implantologie_setup_place", label: "Implantologie: Tandartsstoel", defaultAsset: "/src/assets/new client images/dental setup place.png", description: "Foto op de implantologiepagina (tandartsstoel sectie)." },
  { key: "images.implantologie_doctor_explaining", label: "Implantologie: Dokter legt uit", defaultAsset: "/src/assets/new client images/doctor explaining teeth to patient.png", description: "Foto op de implantologiepagina (dokter sectie)." },
  { key: "images.implantologie_client_xray", label: "Implantologie: Röntgenfoto", defaultAsset: "/src/assets/new client images/client with teeth xray.png", description: "Foto op de implantologiepagina (röntgenfoto sectie)." },
  { key: "images.esthetische_teeth_cap", label: "Esthetische: Kroon model", defaultAsset: "/src/assets/new client images/teeth cap.png", description: "Foto op de esthetische tandheelkundepagina (kroon model sectie)." },
  { key: "images.esthetische_teeth_cap1", label: "Esthetische: Kroon zijaanzicht", defaultAsset: "/src/assets/new client images/teeth cap 1.png", description: "Foto op de esthetische tandheelkundepagina (kroon zijaanzicht sectie)." },
  { key: "images.esthetische_men_visual", label: "Esthetische: Man bekijkt 3D model", defaultAsset: "/src/assets/new client images/men with teeth fixing seeing visual.png", description: "Foto op de esthetische tandheelkundepagina (3D model sectie)." },
  { key: "images.wortel_doctor_explaining", label: "Wortelkanaal: Dokter legt uit", defaultAsset: "/src/assets/new client images/doctor explaining teeth to patient.png", description: "Foto op de wortelkanaalbehandelingpagina (dokter sectie)." },
  { key: "images.wortel_setup_place", label: "Wortelkanaal: Tandartsstoel", defaultAsset: "/src/assets/new client images/dental setup place.png", description: "Foto op de wortelkanaalbehandelingpagina (tandartsstoel sectie)." },
  { key: "images.wortel_adult_match", label: "Wortelkanaal: Tandkleur matching", defaultAsset: "/src/assets/new client images/adult with teeth  match checking.png", description: "Foto op de wortelkanaalbehandelingpagina (tandkleur matching sectie)." },
  { key: "images.wortel_tools", label: "Wortelkanaal: Gereedschap", defaultAsset: "/src/assets/new client images/doctor fixing the teeth using tools.png", description: "Foto op de wortelkanaalbehandelingpagina (gereedschap sectie)." },
  { key: "images.kinder_doctor_explaining", label: "Kinder: Dokter legt uit", defaultAsset: "/src/assets/new client images/doctor explaining teeth to patient.png", description: "Foto op de kindertandheelkundepagina (dokter sectie)." },
  { key: "images.kinder_setup_place", label: "Kinder: Tandartsstoel", defaultAsset: "/src/assets/new client images/dental setup place.png", description: "Foto op de kindertandheelkundepagina (tandartsstoel sectie)." },
  { key: "images.kinder_adult_match", label: "Kinder: Tandkleur matching", defaultAsset: "/src/assets/new client images/adult with teeth  match checking.png", description: "Foto op de kindertandheelkundepagina (tandkleur matching sectie)." },
  { key: "images.shared_desktop_table", label: "Stock: Tandarts bureau instrumenten", defaultAsset: "/src/assets/new client images/doctor desktop table with some components.png", description: "Gebruikt voor over-ons pagina." }
];

function AdminPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"content" | "images" | "services" | "gallery" | "contact" | "appointments" | "custom_pages">("content");

  // Deep-link: read ?tab=... from URL search params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTab = params.get("tab");
    if (urlTab && ["content", "images", "services", "gallery", "contact", "appointments", "custom_pages"].includes(urlTab)) {
      setTab(urlTab as typeof tab);
    }
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-primary uppercase">
          {t("admin.title")}
        </h1>
        <div className="flex flex-wrap gap-1 rounded-full bg-white p-1 border border-border">
          {(["content", "images", "services", "gallery", "contact", "appointments", "custom_pages"] as const).map(k => (
            <button key={k} onClick={() => setTab(k)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${tab === k ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}>
              {k === "images" ? "Afbeeldingen" : k === "appointments" ? "Boekingen" : k === "custom_pages" ? "Aangepaste Pagina's" : t(`admin.${k === "content" ? "content" : k + "_tab"}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {tab === "content" && <ContentEditor />}
        {tab === "images" && <ImagesEditor />}
        {tab === "services" && <ServicesEditor />}
        {tab === "gallery" && <GalleryEditor />}
        {tab === "contact" && <ContactEditor />}
        {tab === "appointments" && <AppointmentsEditor />}
        {tab === "custom_pages" && <CustomPagesEditor />}
      </div>
    </main>
  );
}

function ContentEditor() {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const [activeGroup, setActiveGroup] = useState(PAGE_GROUPS[0].id);
  const [draft, setDraft] = useState<Record<string, Record<Locale, string>>>({});

  useEffect(() => {
    if (data) {
      const merged: Record<string, Record<Locale, string>> = {};
      const getFallback = (key: string, loc: Locale) => {
        const val = t(key, { lng: loc, returnObjects: true });
        if (Array.isArray(val)) {
          return val.join("\n");
        }
        return typeof val === "string" && val !== key ? val : "";
      };

      for (const group of PAGE_GROUPS) {
        for (const key of group.keys) {
          merged[key] = {
            nl: data[key]?.nl || getFallback(key, "nl"),
            en: data[key]?.en || getFallback(key, "en"),
            ar: data[key]?.ar || getFallback(key, "ar"),
          };
        }
      }
      setDraft(merged);
    }
  }, [data, t]);

  const save = useMutation({
    mutationFn: async () => {
      const groupKeys = PAGE_GROUPS.find(g => g.id === activeGroup)?.keys ?? [];
      const rows = groupKeys.flatMap(k => LOCALES.map(loc => ({ key: k, locale: loc, value: draft[k]?.[loc] ?? "" })));
      const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key,locale" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content"] });
      qc.invalidateQueries({ queryKey: ["site_content_images"] });
      toast.success("Wijzigingen succesvol opgeslagen!");
    },
    onError: e => toast.error("Fout bij opslaan: " + String(e)),
  });

  const selectedGroupObj = PAGE_GROUPS.find(g => g.id === activeGroup);

  return (
    <div className="grid gap-6 md:grid-cols-[260px,1fr]">
      {/* Sidebar for choosing sections */}
      <div className="space-y-1.5 rounded-2xl border border-border bg-white p-4 h-fit">
        <h3 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pagina's</h3>
        {PAGE_GROUPS.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={`w-full text-start rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition ${activeGroup === g.id ? "bg-primary text-primary-foreground font-semibold" : "text-foreground/75 hover:bg-secondary/40 hover:text-foreground"}`}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* Main editor form */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold text-primary">{selectedGroupObj?.name}</h2>
          <button onClick={() => save.mutate()} disabled={save.isPending}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-xs sm:text-sm font-semibold text-primary-foreground transition hover:bg-primary/95 disabled:opacity-60">
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Opslaan
          </button>
        </div>

        <div className="space-y-5">
          {selectedGroupObj?.keys.map(key => (
            <div key={key} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent mb-4">
                {key}
                {key.endsWith("_det") && (
                  <span className="ml-2 text-[10px] text-muted-foreground font-sans normal-case italic">
                    (Vul elke bullet point in op een nieuwe regel)
                  </span>
                )}
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                {LOCALES.map(loc => (
                  <div key={loc} className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-foreground/80 flex items-center justify-between">
                      <span>{loc === "nl" ? "Nederlands (NL)" : loc === "en" ? "Engels (EN)" : "Arabisch (AR)"}</span>
                      <span className="text-[10px] bg-secondary text-primary px-1.5 py-0.5 rounded font-mono font-bold uppercase">{loc}</span>
                    </label>
                    <textarea
                      rows={3}
                      value={draft[key]?.[loc] ?? ""}
                      onChange={e => setDraft(d => ({ ...d, [key]: { ...(d[key] ?? { nl: "", en: "", ar: "" }), [loc]: e.target.value } }))}
                      dir={loc === "ar" ? "rtl" : "ltr"}
                      className="w-full rounded-lg border border-input bg-white p-2.5 text-xs sm:text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={() => save.mutate()} disabled={save.isPending}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground transition hover:bg-primary/95 disabled:opacity-60">
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Wijzigingen Opslaan
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ IMAGES EDITOR (A-to-Z Media) ============
function ImagesEditor() {
  const qc = useQueryClient();
  const { data: siteContent = {} } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const uploadImage = async (key: string, file: File) => {
    setUploadingKey(key);
    try {
      const extension = file.name.split(".").pop();
      const uniquePath = `images/${key.replace("images.", "")}-${Date.now()}.${extension}`;

      const { error: uErr } = await supabase.storage.from("clinic-media").upload(uniquePath, file, { cacheControl: "3600", upsert: true });
      if (uErr) throw uErr;

      const rows = LOCALES.map(loc => ({ key, locale: loc, value: uniquePath }));
      const { error: dbErr } = await supabase.from("site_content").upsert(rows, { onConflict: "key,locale" });
      if (dbErr) throw dbErr;

      qc.invalidateQueries({ queryKey: ["site_content"] });
      qc.invalidateQueries({ queryKey: ["site_content_images"] });
      toast.success("Afbeelding succesvol geüpload!");
    } catch (e) {
      toast.error("Fout bij uploaden: " + String(e));
    } finally {
      setUploadingKey(null);
    }
  };

  const resetImage = useMutation({
    mutationFn: async (key: string) => {
      const { error } = await supabase.from("site_content").delete().eq("key", key);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site_content"] });
      qc.invalidateQueries({ queryKey: ["site_content_images"] });
      toast.success("Afbeelding gereset naar standaard!");
    },
    onError: e => toast.error("Fout bij resetten: " + String(e)),
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-primary uppercase">Website Afbeeldingen (A tot Z)</h2>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
          Upload hier eigen afbeeldingen om de standaard foto's van de banners, achtergronden en dienstkaarten te vervangen. Grote foto's worden automatisch geschaald.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {IMAGE_CONFIGS.map(img => {
          const customPath = siteContent[img.key]?.nl;
          const hasCustomImage = !!customPath;
          const activeSrc = hasCustomImage ? publicUrl(customPath) : img.defaultAsset;
          const isUploading = uploadingKey === img.key;

          return (
            <div key={img.key} className="flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
              <div className="aspect-[16/9] w-full bg-secondary relative overflow-hidden group border-b border-border">
                <img src={activeSrc} alt={img.label} className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]" />
                {hasCustomImage && (
                  <span className="absolute top-3 left-3 bg-brand-accent/90 text-primary-foreground font-display text-[9px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                    Aangepast
                  </span>
                )}
              </div>

              <div className="flex-1 p-5 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold text-primary leading-snug">{img.label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground font-light leading-normal">{img.description}</p>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <input
                    type="file"
                    accept="image/*"
                    id={`file-input-${img.key}`}
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) uploadImage(img.key, file);
                    }}
                  />
                  <button
                    onClick={() => document.getElementById(`file-input-${img.key}`)?.click()}
                    disabled={isUploading}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/95 disabled:opacity-60"
                  >
                    {isUploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                    Uploaden
                  </button>
                  {hasCustomImage && (
                    <button
                      onClick={() => resetImage.mutate(img.key)}
                      disabled={resetImage.isPending}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-destructive/30 hover:border-destructive px-3 py-2 text-xs font-semibold text-destructive transition hover:bg-destructive/5"
                      title="Reset naar standaard"
                    >
                      {resetImage.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                      Standaard
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ SERVICES EDITOR ============
function ServicesEditor() {
  const qc = useQueryClient();
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });

  const updateRow = useMutation({
    mutationFn: async (row: ServiceRow) => {
      const { error } = await supabase.from("services").update({ icon: row.icon, image_url: row.image_url, link_path: row.link_path, sort_order: row.sort_order, translations: row.translations }).eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["services"] }); toast.success("Wijzigingen succesvol opgeslagen!"); },
    onError: e => toast.error("Fout bij opslaan: " + String(e)),
  });

  const delRow = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("services").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["services"] }); toast.success("Dienst succesvol verwijderd!"); },
    onError: e => toast.error("Fout bij verwijderen: " + String(e)),
  });

  const addRow = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("services").insert({ icon: "Sparkles", image_url: "", link_path: "/behandelingen", sort_order: services.length + 1, translations: { nl: { title: "Nieuwe dienst", desc: "" }, en: { title: "New service", desc: "" }, ar: { title: "خدمة جديدة", desc: "" } } });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      toast.success("Nieuwe dienst succesvol toegevoegd!");
    },
    onError: e => toast.error("Fout bij toevoegen: " + String(e)),
  });

  const addProtheses = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("services").insert({
        icon: "Smile",
        image_url: "images.services_prothese",
        link_path: "/protheses",
        sort_order: services.length + 1,
        translations: {
          nl: { title: "Protheses", desc: "Kunstgebitten op maat voor een comfortabel gevoel." },
          en: { title: "Prosthetics", desc: "Custom dentures for a comfortable fit." },
          ar: { title: "أطقم الأسنان", desc: "أطقم مصممة خصيصاً براحة تامة." }
        }
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      toast.success("Protheses succesvol toegevoegd aan de diensten!");
    },
    onError: e => toast.error("Fout bij toevoegen: " + String(e)),
  });

  const restoreAllDefaults = useMutation({
    mutationFn: async () => {
      // 1. Delete all existing services
      const { error: delErr } = await supabase.from("services").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      if (delErr) throw delErr;

      // 2. Insert the 6 default services
      const defaults = [
        {
          icon: "Sparkles",
          image_url: "",
          link_path: "/esthetische-tandheelkunde",
          sort_order: 1,
          translations: {
            nl: { title: "Esthetische Tandheelkunde", desc: "Witter, mooier en natuurlijk ogend gebit." },
            en: { title: "Cosmetic Dentistry", desc: "Whiter, brighter, naturally beautiful smiles." },
            ar: { title: "طب الأسنان التجميلي", desc: "ابتسامة أكثر إشراقاً وجمالاً طبيعياً." }
          }
        },
        {
          icon: "Stethoscope",
          image_url: "",
          link_path: "/general-dental-care",
          sort_order: 2,
          translations: {
            nl: { title: "Algemene Tandheelkunde", desc: "Periodieke controles en preventieve zorg." },
            en: { title: "General Dentistry", desc: "Regular check-ups and preventive care." },
            ar: { title: "طب الأسنان العام", desc: "فحوصات منتظمة ورعاية وقائية." }
          }
        },
        {
          icon: "Shield",
          image_url: "",
          link_path: "/implantologie",
          sort_order: 3,
          translations: {
            nl: { title: "Implantologie", desc: "Duurzame implantaten van topkwaliteit." },
            en: { title: "Implantology", desc: "Premium, long-lasting dental implants." },
            ar: { title: "زraعة الأسنان", desc: "زراعات متينة عالية الجودة." }
          }
        },
        {
          icon: "Smile",
          image_url: "",
          link_path: "/protheses",
          sort_order: 4,
          translations: {
            nl: { title: "Protheses", desc: "Kunstgebitten op maat voor een comfortabel gevoel." },
            en: { title: "Prosthetics", desc: "Custom dentures for a comfortable fit." },
            ar: { title: "أطقم الأسنان", desc: "أطقم مصممة خصيصاً براحة تامة." }
          }
        },
        {
          icon: "Heart",
          image_url: "",
          link_path: "/kindertandheelkunde",
          sort_order: 5,
          translations: {
            nl: { title: "Kindertandheelkunde", desc: "Vriendelijke zorg speciaal voor kinderen." },
            en: { title: "Children Dentistry", desc: "Friendly care designed for children." },
            ar: { title: "طب أسنان الأطفال", desc: "رعاية ودودة مصممة للأطفال." }
          }
        },
        {
          icon: "Zap",
          image_url: "",
          link_path: "/spoed",
          sort_order: 6,
          translations: {
            nl: { title: "Spoedhulp", desc: "Snelle hulp bij acute klachten." },
            en: { title: "Emergency Care", desc: "Fast help for urgent dental issues." },
            ar: { title: "حالات الطوارئ", desc: "مساعدة سريعة للحالات العاجلة." }
          }
        }
      ];

      const { error: insErr } = await supabase.from("services").insert(defaults);
      if (insErr) throw insErr;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
      toast.success("Standaard diensten succesvol hersteld!");
    },
    onError: e => toast.error("Fout bij herstellen: " + String(e)),
  });

  const hasProtheses = services.some(s => {
    const nlTitle = s.translations?.nl?.title?.toLowerCase();
    const enTitle = s.translations?.en?.title?.toLowerCase();
    return nlTitle === "protheses" || enTitle === "prosthetics";
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-xl">
          <h2 className="font-serif text-xl font-bold text-primary uppercase">Diensten Beheren</h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Beheer hier de dienstkaarten die op de homepage worden getoond. Voeg nieuwe kaarten toe, pas de volgorde aan, of upload direct een eigen afbeelding voor elke dienst.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {!hasProtheses && (
            <button
              onClick={() => addProtheses.mutate()}
              disabled={addProtheses.isPending}
              className="inline-flex items-center gap-2 rounded-full border border-brand-accent/50 bg-brand-accent/5 px-5 py-2.5 text-xs font-semibold text-primary transition hover:bg-brand-accent hover:text-white cursor-pointer"
            >
              {addProtheses.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Protheses toevoegen
            </button>
          )}
          <button
            onClick={() => {
              if (confirm("Weet u zeker dat u alle diensten wilt herstellen naar de 6 standaard diensten? Dit overschrijft uw huidige wijzigingen.")) {
                restoreAllDefaults.mutate();
              }
            }}
            disabled={restoreAllDefaults.isPending}
            className="inline-flex items-center gap-2 rounded-full border border-destructive/50 bg-destructive/5 px-5 py-2.5 text-xs font-semibold text-destructive transition hover:bg-destructive hover:text-white cursor-pointer"
          >
            {restoreAllDefaults.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Standaard herstellen
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {services.map(s => <ServiceRowEditor key={s.id} row={s} onSave={r => updateRow.mutate(r)} onDelete={() => delRow.mutate(s.id)} />)}
        <button onClick={() => addRow.mutate()} className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-border bg-white px-6 py-3 text-sm transition hover:border-primary hover:text-primary cursor-pointer">
          <Plus className="h-4 w-4" /> Dienst toevoegen
        </button>
      </div>
    </div>
  );
}

function ServiceRowEditor({ row, onSave, onDelete }: { row: ServiceRow; onSave: (r: ServiceRow) => void; onDelete: () => void }) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(row);
  const [uploading, setUploading] = useState(false);

  useEffect(() => setDraft(row), [row]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const extension = file.name.split(".").pop();
      const uniquePath = `services/${draft.id}-${Date.now()}.${extension}`;
      const { error } = await supabase.storage.from("clinic-media").upload(uniquePath, file, { cacheControl: "3600", upsert: true });
      if (error) throw error;
      setDraft(d => ({ ...d, image_url: uniquePath }));
      toast.success("Afbeelding succesvol geüpload!");
    } catch (e) {
      toast.error("Fout bij uploaden: " + String(e));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-[160px,120px,1fr]">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Icon (Lucide)</label>
          <input value={draft.icon} onChange={e => setDraft({ ...draft, icon: e.target.value })}
            className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" placeholder="Stethoscope" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Volgorde</label>
          <input type="number" value={draft.sort_order} onChange={e => setDraft({ ...draft, sort_order: Number(e.target.value) })}
            className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" />
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">{t("admin.image")}</label>
          <div className="flex gap-2 mt-1">
            <input value={draft.image_url ?? ""} onChange={e => setDraft({ ...draft, image_url: e.target.value })}
              className="flex-grow rounded-lg border border-input bg-white px-3 py-2 text-sm" placeholder="https://... or storage path" />
            <input
              type="file"
              accept="image/*"
              id={`service-file-${draft.id}`}
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => document.getElementById(`service-file-${draft.id}`)?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 disabled:opacity-60 shrink-0 cursor-pointer"
            >
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              {uploading ? "Laden..." : "Upload"}
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">{t("admin.link")}</label>
          <input value={draft.link_path ?? ""} onChange={e => setDraft({ ...draft, link_path: e.target.value })}
            className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" placeholder="/general-dental-care" />
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {LOCALES.map(loc => {
          const tr = draft.translations?.[loc] ?? { title: "", desc: "" };
          return (
            <div key={loc} className="rounded-lg bg-secondary p-3">
              <div className="text-xs font-semibold uppercase tracking-wider mb-2">{loc}</div>
              <input value={tr.title} onChange={e => setDraft({ ...draft, translations: { ...draft.translations, [loc]: { ...tr, title: e.target.value } } })}
                dir={loc === "ar" ? "rtl" : "ltr"} placeholder="Titel"
                className="w-full rounded border border-input bg-white px-2 py-1.5 text-sm" />
              <textarea value={tr.desc} onChange={e => setDraft({ ...draft, translations: { ...draft.translations, [loc]: { ...tr, desc: e.target.value } } })}
                dir={loc === "ar" ? "rtl" : "ltr"} placeholder="Beschrijving" rows={2}
                className="mt-2 w-full rounded border border-input bg-white px-2 py-1.5 text-sm" />
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onDelete} className="inline-flex items-center gap-1 rounded-full border border-destructive/40 px-3 py-1.5 text-xs text-destructive transition hover:bg-destructive/5 cursor-pointer">
          <Trash2 className="h-3.5 w-3.5" /> Verwijderen
        </button>
        <button onClick={() => onSave(draft)} className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground cursor-pointer">
          <Save className="h-3.5 w-3.5" /> Opslaan
        </button>
      </div>
    </div>
  );
}

// ============ GALLERY ============
function GalleryEditor() {
  const qc = useQueryClient();
  const { data: images = [] } = useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const { error: uErr } = await supabase.storage.from("clinic-media").upload(path, file, { contentType: file.type });
        if (uErr) throw uErr;
        const { error: iErr } = await supabase.from("gallery_images").insert({ storage_path: path, alt: file.name, sort_order: images.length });
        if (iErr) throw iErr;
      }
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Uploaded");
    } catch (e) {
      toast.error(String(e));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const del = useMutation({
    mutationFn: async (img: { id: string; storage_path: string }) => {
      await supabase.storage.from("clinic-media").remove([img.storage_path]);
      const { error } = await supabase.from("gallery_images").delete().eq("id", img.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });

  return (
    <div>
      <div className="rounded-2xl border-2 border-dashed border-border bg-white p-8 text-center">
        <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="mt-3 text-sm text-muted-foreground">Upload clinic photos for the gallery</p>
        <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => upload(e.target.files)} className="hidden" />
        <button onClick={() => fileRef.current?.click()} disabled={uploading}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground disabled:opacity-60">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Upload images
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map(img => (
          <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-secondary">
            <img src={publicUrl(img.storage_path)} alt={img.alt} className="h-full w-full object-cover" />
            <button onClick={() => del.mutate(img)}
              className="absolute top-2 end-2 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-destructive opacity-0 transition group-hover:opacity-100">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ CONTACT ============
function ContactEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["contact"], queryFn: fetchContact });
  const [draft, setDraft] = useState({
    address: "",
    phone: "",
    email: "",
    hours: {
      morning: "",
      lunch: "",
      afternoon: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
      sunday: "",
      special: ""
    },
    socials: { instagram: "", tiktok: "" },
    map_embed: ""
  });

  useEffect(() => {
    if (data) {
      setDraft({
        address: data.address,
        phone: data.phone,
        email: data.email,
        hours: {
          morning: data.hours?.morning ?? data.hours?.mon_fri ?? "09:00 - 12:00",
          lunch: data.hours?.lunch ?? data.hours?.sat ?? "12:00 - 13:00",
          afternoon: data.hours?.afternoon ?? data.hours?.sun ?? "13:00 - 17:00",
          monday: data.hours?.monday ?? "09:00 - 17:00",
          tuesday: data.hours?.tuesday ?? "09:00 - 17:00",
          wednesday: data.hours?.wednesday ?? "09:00 - 17:00",
          thursday: data.hours?.thursday ?? "09:00 - 17:00",
          friday: data.hours?.friday ?? "09:00 - 17:00",
          saturday: data.hours?.saturday ?? "09:00 - 12:00",
          sunday: data.hours?.sunday ?? "Gesloten",
          special: data.hours?.special ?? "",
        },
        socials: {
          instagram: data.socials?.instagram ?? "",
          tiktok: data.socials?.tiktok ?? "",
        },
        map_embed: data.map_embed,
      });
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("contact_info").update({ ...draft, hours: { ...draft.hours }, socials: { ...draft.socials } }).eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["contact"] }); toast.success("Saved"); },
    onError: e => toast.error(String(e)),
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 space-y-4">
        <Field label="Address" value={draft.address} onChange={v => setDraft({ ...draft, address: v })} />
        <Field label="Phone" value={draft.phone} onChange={v => setDraft({ ...draft, phone: v })} />
        <Field label="Email" value={draft.email} onChange={v => setDraft({ ...draft, email: v })} />
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 space-y-4">
        <h3 className="font-serif text-lg font-semibold text-primary">Opening hours (Per Day - Footer & Card)</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Monday" value={draft.hours.monday} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, monday: v } })} />
          <Field label="Tuesday" value={draft.hours.tuesday} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, tuesday: v } })} />
          <Field label="Wednesday" value={draft.hours.wednesday} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, wednesday: v } })} />
          <Field label="Thursday" value={draft.hours.thursday} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, thursday: v } })} />
          <Field label="Friday" value={draft.hours.friday} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, friday: v } })} />
          <Field label="Saturday" value={draft.hours.saturday} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, saturday: v } })} />
          <Field label="Sunday" value={draft.hours.sunday} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, sunday: v } })} />
          <Field label="Special note / Holidays (e.g. 'Hemelvaartsdag gesloten')" value={draft.hours.special} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, special: v } })} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 space-y-4">
        <h3 className="font-serif text-lg font-semibold text-primary">Opening hours (Legacy - backups)</h3>
        <Field label="Monday – Saturday morning" value={draft.hours.morning} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, morning: v } })} />
        <Field label="Lunch break" value={draft.hours.lunch} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, lunch: v } })} />
        <Field label="Afternoon" value={draft.hours.afternoon} onChange={v => setDraft({ ...draft, hours: { ...draft.hours, afternoon: v } })} />
      </div>
      <div className="rounded-2xl border border-border bg-white p-6 space-y-4">
        <h3 className="font-serif text-lg font-semibold text-primary">Social links</h3>
        <Field label="Instagram" value={draft.socials.instagram} onChange={v => setDraft({ ...draft, socials: { ...draft.socials, instagram: v } })} />
        <Field label="TikTok" value={draft.socials.tiktok} onChange={v => setDraft({ ...draft, socials: { ...draft.socials, tiktok: v } })} />
      </div>
      <div className="rounded-2xl border border-border bg-white p-6">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Google Maps embed HTML</label>
        <textarea rows={5} value={draft.map_embed} onChange={e => setDraft({ ...draft, map_embed: e.target.value })}
          placeholder='<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" ...></iframe>'
          className="mt-2 w-full rounded-lg border border-input bg-white p-3 text-sm font-mono" />
        <p className="mt-2 text-xs text-muted-foreground font-light">Paste the full iframe code from Google Maps → Share → Embed a map.</p>
      </div>
      <button onClick={() => save.mutate()} disabled={save.isPending}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60">
        {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save
      </button>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}

// ============ APPOINTMENTS ============
function AppointmentsEditor() {
  const qc = useQueryClient();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["appointment_requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointment_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("appointment_requests").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointment_requests"] });
      toast.success("Status updated");
    },
    onError: (e) => toast.error(String(e)),
  });

  if (isLoading) return <div className="text-center py-12"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></div>;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm mb-6">
        <h2 className="font-serif text-xl font-bold text-primary uppercase">Boekingsaanvragen</h2>
        <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
          Hier zie je alle ingezonden boekingsaanvragen. Klik op 'Stuur Link' om de patiënt een e-mail te sturen met een link naar je definitieve boekingstool.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-border">
          <p className="text-muted-foreground">Geen aanvragen gevonden.</p>
        </div>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="rounded-2xl border border-border bg-white p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-primary">{req.first_name} {req.last_name}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${req.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-brand-accent/20 text-brand-accent'}`}>
                  {req.status === 'done' ? 'Afgehandeld' : 'Nieuw'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                <p>Email: <a href={`mailto:${req.email}`} className="text-brand-accent hover:underline">{req.email}</a></p>
                <p>Tel: {req.phone}</p>
                <p>Voorkeur: Dag {req.preferred_date}, om {req.preferred_time}</p>
              </div>
              <div className="text-xs text-muted-foreground/60 mt-2">
                Aangevraagd op: {new Date(req.created_at).toLocaleString('nl-NL')}
              </div>
            </div>
            
            <div className="flex gap-2 flex-col sm:flex-row">
              <a 
                href={`mailto:${req.email}?subject=Uw afspraak bij MondVita&body=Beste ${req.first_name},%0D%0A%0D%0ABedankt voor uw afspraakaanvraag voor dag ${req.preferred_date} om ${req.preferred_time}.%0D%0A%0D%0AKlik op de onderstaande link om uw afspraak definitief in te plannen in onze agenda:%0D%0A[VOEG HIER JE BOEKINGSLINK TOE]%0D%0A%0D%0AMet vriendelijke groet,%0D%0ATeam MondVita`}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/95"
              >
                Stuur Link
              </a>
              {req.status !== 'done' && (
                <button 
                  onClick={() => updateStatus.mutate({ id: req.id, status: 'done' })}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary px-4 py-2 text-xs font-semibold text-foreground transition hover:bg-secondary/80"
                >
                  Markeer als afgehandeld
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ============ CUSTOM PAGES EDITOR ============
function CustomPagesEditor() {
  const qc = useQueryClient();
  const { data: pages = [], isLoading } = useQuery({ queryKey: ["custom_pages"], queryFn: fetchCustomPages });
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  const addPage = useMutation({
    mutationFn: async () => {
      const slug = `nieuwe-pagina-${Date.now().toString().slice(-4)}`;
      const { error } = await supabase.from("custom_pages").insert({
        slug,
        translations: {
          nl: { title: "Nieuwe Pagina", intro: "Introductie tekst van de nieuwe pagina." },
          en: { title: "New Page", intro: "Introduction text of the new page." },
          ar: { title: "صفحة جديدة", intro: "مقدمة الصفحة الجديدة." },
        },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["custom_pages"] });
      toast.success("Pagina succesvol aangemaakt!");
    },
    onError: e => toast.error("Fout bij aanmaken: " + String(e)),
  });

  const deletePage = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("custom_pages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["custom_pages"] });
      if (selectedPageId) setSelectedPageId(null);
      toast.success("Pagina succesvol verwijderd!");
    },
    onError: e => toast.error("Fout bij verwijderen: " + String(e)),
  });

  if (isLoading) return <div className="text-center py-12"><Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" /></div>;

  const selectedPage = pages.find(p => p.id === selectedPageId);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-primary uppercase">Aangepaste Pagina's & Secties</h2>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            Maak hier eigen informatiepagina's en diensten aan. Deze pagina's worden automatisch in het menu en in de footer getoond.
          </p>
        </div>
        <button
          onClick={() => addPage.mutate()}
          disabled={addPage.isPending}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/95 disabled:opacity-60 whitespace-nowrap shrink-0 self-start sm:self-center"
        >
          <Plus className="h-4 w-4" />
          Nieuwe Pagina
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[300px,1fr]">
        {/* Left Column: Pages List */}
        <div className="space-y-3 rounded-2xl border border-border bg-white p-4 h-fit">
          <h3 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">Mijn Pagina's</h3>
          {pages.length === 0 ? (
            <p className="text-xs text-muted-foreground p-3 text-center">Nog geen eigen pagina's aangemaakt.</p>
          ) : (
            <div className="space-y-1.5 pt-2">
              {pages.map(p => {
                const title = p.translations?.nl?.title || p.slug;
                const isSelected = selectedPageId === p.id;
                return (
                  <div key={p.id} className={`flex items-center justify-between rounded-lg px-3 py-1.5 transition ${isSelected ? "bg-primary/5 border border-primary/20" : "hover:bg-secondary/40"}`}>
                    <button
                      onClick={() => setSelectedPageId(p.id)}
                      className={`flex-1 text-start text-xs sm:text-sm font-medium truncate ${isSelected ? "text-primary font-semibold" : "text-foreground/75 hover:text-foreground"}`}
                    >
                      {title}
                      <span className="block text-[10px] text-muted-foreground font-mono">/p/{p.slug}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Weet u zeker dat u pagina "${title}" wilt verwijderen?`)) {
                          deletePage.mutate(p.id);
                        }
                      }}
                      className="p-1 rounded text-destructive hover:bg-destructive/5 transition"
                      title="Verwijder pagina"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Active Page Editor */}
        <div className="space-y-6">
          {selectedPage ? (
            <CustomPageRowEditor row={selectedPage} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-white p-12 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 text-sm font-medium text-foreground">Geen pagina geselecteerd</h3>
              <p className="mt-1 text-xs text-muted-foreground font-light">Selecteer een pagina in het linker menu of maak een nieuwe aan om te bewerken.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============ CUSTOM PAGE METADATA & SECTIONS EDITOR ============
function CustomPageRowEditor({ row }: { row: CustomPageRow }) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState(row);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(row);
  }, [row]);

  // Load custom sections for this page
  const { data: sections = [], isLoading: sectionsLoading } = useQuery({
    queryKey: ["custom_sections", row.id],
    queryFn: () => fetchCustomSections(row.id),
  });

  const saveMetadata = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("custom_pages")
        .update({
          slug: draft.slug.toLowerCase().trim().replace(/[^\w-]/g, ""),
          banner_image: draft.banner_image,
          translations: draft.translations,
        })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["custom_pages"] });
      toast.success("Pagina-instellingen succesvol opgeslagen!");
    },
    onError: e => toast.error("Fout bij opslaan: " + String(e)),
  });

  const uploadBanner = async (file: File) => {
    setUploading(true);
    try {
      const extension = file.name.split(".").pop();
      const uniquePath = `custom-pages/banner-${row.id}-${Date.now()}.${extension}`;

      const { error: uErr } = await supabase.storage.from("clinic-media").upload(uniquePath, file, { cacheControl: "3600", upsert: true });
      if (uErr) throw uErr;

      setDraft(prev => ({ ...prev, banner_image: uniquePath }));
      toast.success("Banner succesvol geüpload!");
    } catch (e) {
      toast.error("Fout bij uploaden: " + String(e));
    } finally {
      setUploading(false);
    }
  };

  const addSection = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("custom_sections").insert({
        page_id: row.id,
        sort_order: sections.length + 1,
        layout: "text-left",
        translations: {
          nl: { title: "Nieuwe Sectie", content: "Schrijf hier de inhoud voor de sectie..." },
          en: { title: "New Section", content: "Write section content here..." },
          ar: { title: "قسم جديد", content: "اكتب محتوى القسم هنا..." },
        },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["custom_sections", row.id] });
      toast.success("Sectie succesvol toegevoegd!");
    },
    onError: e => toast.error("Fout bij toevoegen sectie: " + String(e)),
  });

  const activeSrc = draft.banner_image ? publicUrl(draft.banner_image) : "/src/assets/svc-mondzorg.jpg";

  return (
    <div className="space-y-6">
      {/* 1. Page Metadata Card */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-serif text-lg font-bold text-primary">Pagina Instellingen</h3>
          <button
            onClick={() => saveMetadata.mutate()}
            disabled={saveMetadata.isPending}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 disabled:opacity-60"
          >
            {saveMetadata.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Pagina Opslaan
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.5fr,1fr] items-start">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL Slug</label>
              <div className="mt-1 flex rounded-lg border border-input overflow-hidden">
                <span className="bg-secondary/60 text-muted-foreground px-3 py-2 text-xs font-medium flex items-center border-r border-input">/p/</span>
                <input
                  value={draft.slug}
                  onChange={e => setDraft({ ...draft, slug: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white outline-none focus:ring-1 focus:ring-primary/20"
                  placeholder="informatie-pagina"
                />
              </div>
            </div>

            <div className="grid gap-3 pt-2">
              {LOCALES.map(loc => {
                const tr = draft.translations?.[loc] ?? { title: "", intro: "" };
                return (
                  <div key={loc} className="rounded-xl bg-secondary/35 p-4 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider flex justify-between">
                      <span>{loc === "nl" ? "Nederlands (NL)" : loc === "en" ? "Engels (EN)" : "Arabisch (AR)"}</span>
                      <span className="text-[10px] bg-secondary text-primary px-1.5 py-0.5 rounded font-mono font-bold uppercase">{loc}</span>
                    </div>
                    <div className="space-y-2">
                      <input
                        value={tr.title}
                        onChange={e => setDraft({ ...draft, translations: { ...draft.translations, [loc]: { ...tr, title: e.target.value } } })}
                        dir={loc === "ar" ? "rtl" : "ltr"}
                        placeholder="Pagina Titel"
                        className="w-full rounded-lg border border-input bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-primary"
                      />
                      <textarea
                        value={tr.intro}
                        onChange={e => setDraft({ ...draft, translations: { ...draft.translations, [loc]: { ...tr, intro: e.target.value } } })}
                        dir={loc === "ar" ? "rtl" : "ltr"}
                        placeholder="Pagina Introductie"
                        rows={2}
                        className="w-full rounded-lg border border-input bg-white p-2.5 text-xs sm:text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Banner Photo Section */}
          <div className="rounded-xl border border-border p-4 bg-secondary/10 space-y-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Pagina Banner</label>
            <div className="aspect-[16/9] w-full bg-secondary rounded-lg overflow-hidden relative border border-border">
              <img src={activeSrc} alt="Banner Preview" className="h-full w-full object-cover" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) uploadBanner(file);
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 disabled:opacity-60"
            >
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              Upload Banner Afbeelding
            </button>
          </div>
        </div>
      </div>

      {/* 2. Custom Sections Card */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-primary">Inhoudssecties ({sections.length})</h3>
          <button
            onClick={() => addSection.mutate()}
            disabled={addSection.isPending}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/15 disabled:opacity-60"
          >
            {addSection.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
            Sectie Toevoegen
          </button>
        </div>

        {sectionsLoading ? (
          <div className="text-center py-6"><Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" /></div>
        ) : sections.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-white p-8 text-center">
            <p className="text-xs text-muted-foreground font-light">Deze pagina heeft nog geen inhoudssecties. Voeg een sectie toe om teksten en afbeeldingen te plaatsen.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {sections.map(s => (
              <CustomSectionRowEditor key={s.id} row={s} pageId={row.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============ CUSTOM SECTION ROW EDITOR ============
function CustomSectionRowEditor({ row, pageId }: { row: CustomSectionRow; pageId: string }) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState(row);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(row);
  }, [row]);

  const saveSection = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("custom_sections")
        .update({
          layout: draft.layout,
          sort_order: draft.sort_order,
          image_url: draft.image_url,
          translations: draft.translations,
        })
        .eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["custom_sections", pageId] });
      toast.success("Sectie succesvol opgeslagen!");
    },
    onError: e => toast.error("Fout bij opslaan: " + String(e)),
  });

  const deleteSection = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("custom_sections").delete().eq("id", row.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["custom_sections", pageId] });
      toast.success("Sectie verwijderd!");
    },
    onError: e => toast.error("Fout bij verwijderen: " + String(e)),
  });

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const extension = file.name.split(".").pop();
      const uniquePath = `custom-pages/section-${row.id}-${Date.now()}.${extension}`;

      const { error: uErr } = await supabase.storage.from("clinic-media").upload(uniquePath, file, { cacheControl: "3600", upsert: true });
      if (uErr) throw uErr;

      setDraft(prev => ({ ...prev, image_url: uniquePath }));
      toast.success("Foto succesvol geüpload!");
    } catch (e) {
      toast.error("Fout bij uploaden: " + String(e));
    } finally {
      setUploading(false);
    }
  };

  const imageSrc = draft.image_url ? publicUrl(draft.image_url) : "/src/assets/svc-mondzorg.jpg";

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-3">
        <div className="flex items-center gap-3">
          <span className="h-6 w-6 rounded-full bg-secondary/80 text-primary flex items-center justify-center font-mono text-xs font-bold">{draft.sort_order}</span>
          <h4 className="font-display text-sm font-bold text-primary uppercase">Sectie bewerken</h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm("Weet u zeker dat u deze sectie wilt verwijderen?")) deleteSection.mutate();
            }}
            disabled={deleteSection.isPending}
            className="inline-flex items-center gap-1 rounded-full border border-destructive/30 hover:border-destructive px-3 py-1.5 text-xs text-destructive transition hover:bg-destructive/5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Sectie Verwijderen
          </button>
          <button
            onClick={() => saveSection.mutate()}
            disabled={saveSection.isPending}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/95 disabled:opacity-60"
          >
            {saveSection.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Sectie Opslaan
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid gap-6 md:grid-cols-[1fr,260px] items-start">
        {/* Texts */}
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Weergave Layout</label>
              <select
                value={draft.layout}
                onChange={e => setDraft({ ...draft, layout: e.target.value as any })}
                className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary/20"
              >
                <option value="text-left">Foto Rechts (Standaard)</option>
                <option value="text-right">Foto Links</option>
                <option value="full-width">Volledige Breedte (Geen Foto)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Volgorde</label>
              <input
                type="number"
                value={draft.sort_order}
                onChange={e => setDraft({ ...draft, sort_order: Number(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:ring-1 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid gap-3 pt-2">
            {LOCALES.map(loc => {
              const tr = draft.translations?.[loc] ?? { title: "", content: "" };
              return (
                <div key={loc} className="rounded-xl bg-secondary/30 p-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider flex justify-between">
                    <span>{loc === "nl" ? "Nederlands (NL)" : loc === "en" ? "Engels (EN)" : "Arabisch (AR)"}</span>
                    <span className="text-[10px] bg-secondary text-primary px-1.5 py-0.5 rounded font-mono font-bold uppercase">{loc}</span>
                  </div>
                  <input
                    value={tr.title}
                    onChange={e => setDraft({ ...draft, translations: { ...draft.translations, [loc]: { ...tr, title: e.target.value } } })}
                    dir={loc === "ar" ? "rtl" : "ltr"}
                    placeholder="Sectie Titel"
                    className="w-full rounded-lg border border-input bg-white px-3 py-2 text-xs sm:text-sm outline-none focus:border-primary"
                  />
                  <textarea
                    value={tr.content}
                    onChange={e => setDraft({ ...draft, translations: { ...draft.translations, [loc]: { ...tr, content: e.target.value } } })}
                    dir={loc === "ar" ? "rtl" : "ltr"}
                    placeholder="Sectie Inhoud (Tekst)"
                    rows={4}
                    className="w-full rounded-lg border border-input bg-white p-2.5 text-xs sm:text-sm outline-none focus:border-primary"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Image */}
        {draft.layout !== "full-width" && (
          <div className="rounded-xl border border-border p-4 bg-secondary/10 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Sectie Foto</label>
            <div className="aspect-[4/3] w-full bg-secondary rounded-lg overflow-hidden relative border border-border">
              <img src={imageSrc} alt="Section Preview" className="h-full w-full object-cover" />
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file);
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 disabled:opacity-60"
            >
              {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              Upload Sectie Foto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

