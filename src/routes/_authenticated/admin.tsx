import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchSiteContent, fetchServices, fetchGallery, fetchContact, publicUrl, type ServiceRow } from "@/lib/site-data";
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
      "generalCare.map_title"
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
      "protheses.b3_d"
    ]
  },
  {
    id: "over_ons",
    name: "Over Ons Pagina",
    keys: [
      "over.title",
      "over.p1",
      "over.p2",
      "over.cta"
    ]
  },
  {
    id: "contact_booking_footer",
    name: "Contact, Afspraak & Footer",
    keys: [
      "contact.title",
      "contact.intro",
      "afspraak.title",
      "afspraak.intro",
      "footer.tagline",
      "footer.rights"
    ]
  }
];

const IMAGE_CONFIGS = [
  { key: "images.hero_bg", label: "Homepage Hero Achtergrond", defaultAsset: "/src/assets/clinic-interior.jpg", description: "De grote full-bleed achtergrondafbeelding bovenaan de startpagina." },
  { key: "images.about_bg", label: "Over Ons Banner", defaultAsset: "/src/assets/about-clinic.png", description: "De banner achtergrond bovenaan de 'Over ons' pagina." },
  { key: "images.about_floating", label: "Over Ons Collage Foto", defaultAsset: "/src/assets/about-clinic.png", description: "De zwevende ingelijste foto aan de rechterkant van de 'Over ons' pagina." },
  { key: "images.contact_bg", label: "Contact Banner", defaultAsset: "/src/assets/contact-desk.png", description: "De banner achtergrond bovenaan de contactpagina." },
  { key: "images.treatments_bg", label: "Behandelingen Banner", defaultAsset: "/src/assets/svc-mondzorg.jpg", description: "De banner achtergrond bovenaan de behandelingenpagina." },
  { key: "images.protheses_bg", label: "Protheses Banner", defaultAsset: "/src/assets/svc-prothese.jpg", description: "De banner achtergrond bovenaan de prothesespagina." },
  { key: "images.services_mondzorg", label: "Diensten Card: Algemene Mondzorg", defaultAsset: "/src/assets/svc-mondzorg.jpg", description: "De vierkante foto op de homepage dienstkaart voor algemene mondzorg." },
  { key: "images.services_implant", label: "Diensten Card: Implantologie", defaultAsset: "/src/assets/svc-implant.jpg", description: "De vierkante foto op de homepage dienstkaart voor implantologie." },
  { key: "images.services_prothese", label: "Diensten Card: Protheses", defaultAsset: "/src/assets/svc-prothese.jpg", description: "De vierkante foto op de homepage dienstkaart voor protheses." },
  { key: "images.services_spoed", label: "Diensten Card: Spoed", defaultAsset: "/src/assets/svc-spoed.jpg", description: "De vierkante foto op de homepage dienstkaart voor spoedgevallen." }
];

function AdminPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"content" | "images" | "services" | "gallery" | "contact" | "appointments">("content");

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-primary uppercase">
          {t("admin.title")}
        </h1>
        <div className="flex flex-wrap gap-1 rounded-full bg-white p-1 border border-border">
          {(["content", "images", "services", "gallery", "contact", "appointments"] as const).map(k => (
            <button key={k} onClick={() => setTab(k)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${tab === k ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}>
              {k === "images" ? "Afbeeldingen" : k === "appointments" ? "Boekingen" : t(`admin.${k === "content" ? "content" : k + "_tab"}`)}
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
      </div>
    </main>
  );
}

// ============ TEXT CONTENT (A-to-Z) ============
function ContentEditor() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["site_content"], queryFn: fetchSiteContent });
  const [activeGroup, setActiveGroup] = useState(PAGE_GROUPS[0].id);
  const [draft, setDraft] = useState<Record<string, Record<Locale, string>>>({});

  useEffect(() => { if (data) setDraft(data); }, [data]);

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
              <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-accent mb-4">{key}</h3>
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
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["services"] }); toast.success("Saved"); },
    onError: e => toast.error(String(e)),
  });

  const delRow = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from("services").delete().eq("id", id); if (error) throw error; },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });

  const addRow = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("services").insert({ icon: "Sparkles", image_url: "", link_path: "/behandelingen", sort_order: services.length + 1, translations: { nl: { title: "Nieuwe dienst", desc: "" }, en: { title: "New service", desc: "" }, ar: { title: "خدمة جديدة", desc: "" } } });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });

  return (
    <div className="space-y-4">
      {services.map(s => <ServiceRowEditor key={s.id} row={s} onSave={r => updateRow.mutate(r)} onDelete={() => delRow.mutate(s.id)} />)}
      <button onClick={() => addRow.mutate()} className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-border bg-white px-6 py-3 text-sm transition hover:border-primary hover:text-primary">
        <Plus className="h-4 w-4" /> Add service
      </button>
    </div>
  );
}

function ServiceRowEditor({ row, onSave, onDelete }: { row: ServiceRow; onSave: (r: ServiceRow) => void; onDelete: () => void }) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(row);
  useEffect(() => setDraft(row), [row]);

  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="grid gap-4 md:grid-cols-[160px,120px,1fr]">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Icon (Lucide)</label>
          <input value={draft.icon} onChange={e => setDraft({ ...draft, icon: e.target.value })}
            className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" placeholder="Stethoscope" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Order</label>
          <input type="number" value={draft.sort_order} onChange={e => setDraft({ ...draft, sort_order: Number(e.target.value) })}
            className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" />
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">{t("admin.image")}</label>
          <input value={draft.image_url ?? ""} onChange={e => setDraft({ ...draft, image_url: e.target.value })}
            className="mt-1 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm" placeholder="https://... or storage path" />
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
                dir={loc === "ar" ? "rtl" : "ltr"} placeholder="Title"
                className="w-full rounded border border-input bg-white px-2 py-1.5 text-sm" />
              <textarea value={tr.desc} onChange={e => setDraft({ ...draft, translations: { ...draft.translations, [loc]: { ...tr, desc: e.target.value } } })}
                dir={loc === "ar" ? "rtl" : "ltr"} placeholder="Description" rows={2}
                className="mt-2 w-full rounded border border-input bg-white px-2 py-1.5 text-sm" />
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button onClick={onDelete} className="inline-flex items-center gap-1 rounded-full border border-destructive/40 px-3 py-1.5 text-xs text-destructive transition hover:bg-destructive/5">
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </button>
        <button onClick={() => onSave(draft)} className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs text-primary-foreground">
          <Save className="h-3.5 w-3.5" /> Save
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
  const [draft, setDraft] = useState({ address: "", phone: "", email: "", hours: { morning: "", lunch: "", afternoon: "" }, socials: { instagram: "", tiktok: "" }, map_embed: "" });
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
        <h3 className="font-serif text-lg font-semibold text-primary">Opening hours</h3>
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
