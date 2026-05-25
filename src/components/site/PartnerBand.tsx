import { useTranslation } from "react-i18next";

// Import local premium partner logos
import logoInfomedics from "@/assets/company brand images/Logo_Infomedics.png";
import logoKnmt from "@/assets/company brand images/KNMT_Logo_transparant.png";
import logoVecozo from "@/assets/company brand images/VECOZO-logo.png";
import logoSbb from "@/assets/company brand images/SBB-logo-2.png";
import logoExquise from "@/assets/company brand images/f8e76406-exquise.png";
import logoTandarts from "@/assets/company brand images/tandarts-in-zoetermeer-nl.png";

// Import local premium insurer logos
import logoZilverenKruis from "@/assets/company brand images/2024-zilveren-kruis-logo_transparant0.png";
import logoVgz from "@/assets/company brand images/Logo Cooperatie VGZ 850x850.png";
import logoUnive from "@/assets/company brand images/Univé_logo.svg.png";
import logoInterpolis from "@/assets/company brand images/Interpolis-logo.png";
import logoIza from "@/assets/company brand images/IZA.png";
import logoIzz from "@/assets/company brand images/izz.webp";
import logoFbto from "@/assets/company brand images/logo-fbto.jpg";
import logoDeFriesland from "@/assets/company brand images/de-friesland-zorgverzekeraar-logo.png";
import logoUmc from "@/assets/company brand images/Logo_umczorgverzekering.png";
import logoRma from "@/assets/company brand images/RMA-Verzekeringen.png";

interface PartnerLogo {
  name: string;
  imgSrc: string;
}

const healthcarePartners: PartnerLogo[] = [
  { name: "Infomedics", imgSrc: logoInfomedics },
  { name: "KNMT", imgSrc: logoKnmt },
  { name: "VECOZO", imgSrc: logoVecozo },
  { name: "Exquise", imgSrc: logoExquise },
  { name: "SBB", imgSrc: logoSbb },
  { name: "Tandarts.nl Register", imgSrc: logoTandarts },
];

const healthInsurers: PartnerLogo[] = [
  { name: "Zilveren Kruis", imgSrc: logoZilverenKruis },
  { name: "VGZ", imgSrc: logoVgz },
  { name: "Univé", imgSrc: logoUnive },
  { name: "Interpolis", imgSrc: logoInterpolis },
  { name: "FBTO", imgSrc: logoFbto },
  { name: "IZA", imgSrc: logoIza },
  { name: "IZZ", imgSrc: logoIzz },
  { name: "De Friesland", imgSrc: logoDeFriesland },
  { name: "UMC Zorgverzekering", imgSrc: logoUmc },
  { name: "RMA Verzekeringen", imgSrc: logoRma },
];

function PartnerTile({ name, imgSrc }: PartnerLogo) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/40 bg-white/70 backdrop-blur-md px-6 py-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-accent/25 hover:shadow-md flex items-center justify-center h-20 w-full select-none">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/15 to-transparent opacity-60" />
      <img
        src={imgSrc}
        alt={name}
        className="max-h-10 max-w-full object-contain filter grayscale opacity-75 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-102"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

export function PartnerBand({ title }: { title?: string }) {
  const { t } = useTranslation();
  const displayTitle = title || t("generalCare.partner_title");

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Ambient soft glow and fading boundaries to replace the harsh gradient edges */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.04),_transparent_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-3xl text-center px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-accent">{t("partner.badge")}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{displayTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base font-light">
            {t("partner.desc")}
          </p>
        </div>

        {/* Section 1: Zorgpartners & Registers (Moving Forward) */}
        <div className="mt-14 space-y-4">
          <div className="mx-auto max-w-7xl px-6 flex items-center gap-4 justify-center">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent to-border/60 max-w-[200px]" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-accent whitespace-nowrap text-center">
              {t("partner.zorgpartners")}
            </h3>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent to-border/60 max-w-[200px]" />
          </div>
          
          <div className="relative w-full overflow-hidden py-4">
            {/* Premium fading edges */}
            <div className="absolute left-0 inset-y-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />
            
            {/* Infinite Marquee loop */}
            <div className="flex w-max items-center gap-6 animate-marquee hover:[animation-play-state:paused]">
              {/* Main loop */}
              {healthcarePartners.map((partner) => (
                <div key={partner.name} className="flex-shrink-0 w-44 md:w-52">
                  <PartnerTile name={partner.name} imgSrc={partner.imgSrc} />
                </div>
              ))}
              {/* Duplicated loop for infinite scroll effect */}
              {healthcarePartners.map((partner) => (
                <div key={`${partner.name}-dup`} className="flex-shrink-0 w-44 md:w-52">
                  <PartnerTile name={partner.name} imgSrc={partner.imgSrc} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Zorgverzekeringen (Moving in Reverse) */}
        <div className="mt-12 space-y-4">
          <div className="mx-auto max-w-7xl px-6 flex items-center gap-4 justify-center">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent to-border/60 max-w-[200px]" />
            <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-accent whitespace-nowrap text-center">
              {t("partner.verzekeraars")}
            </h3>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent to-border/60 max-w-[200px]" />
          </div>
          
          <div className="relative w-full overflow-hidden py-4">
            {/* Premium fading edges */}
            <div className="absolute left-0 inset-y-0 w-16 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-16 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />
            
            {/* Infinite Marquee Loop (In Reverse direction) */}
            <div className="flex w-max items-center gap-6 animate-marquee-reverse hover:[animation-play-state:paused]">
              {/* Main loop */}
              {healthInsurers.map((insurer) => (
                <div key={insurer.name} className="flex-shrink-0 w-44 md:w-52">
                  <PartnerTile name={insurer.name} imgSrc={insurer.imgSrc} />
                </div>
              ))}
              {/* Duplicated loop for infinite scroll effect */}
              {healthInsurers.map((insurer) => (
                <div key={`${insurer.name}-dup`} className="flex-shrink-0 w-44 md:w-52">
                  <PartnerTile name={insurer.name} imgSrc={insurer.imgSrc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
