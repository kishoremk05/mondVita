export function ToothMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Outer Tooth Shape - Deep Navy / Primary */}
      <path
        d="M16 3c-3.2 0-4.6 1.6-7.4 1.6C5.7 4.6 4 7 4 10.6c0 3 .9 5.6 1.9 9.3.8 3 1.5 6.5 2.7 8.3.7 1 1.8 1.4 2.6.5.8-.9 1.2-3.2 1.7-5.5.5-2 1.2-3.6 3.1-3.6s2.6 1.6 3.1 3.6c.5 2.3 1 4.6 1.7 5.5.9.9 2 .5 2.6-.5 1.2-1.8 1.9-5.3 2.7-8.3 1-3.7 1.9-6.3 1.9-9.3 0-3.6-1.7-6-4.6-6C20.6 4.6 19.2 3 16 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner Sparkle Accent - Warm Metallic Champagne Gold */}
      <path
        d="M16 7c0 .8.2 1.3.8 1.9.6.6 1.1.8 1.9.8-.8 0-1.3.2-1.9.8-.6.6-.8 1.1-.8 1.9 0-.8-.2-1.3-.8-1.9-.6-.6-1.1-.8-1.9-.8.8 0 1.3-.2 1.9-.8.6-.6.8-1.1.8-1.9Z"
        fill="var(--color-brand-accent)"
      />
    </svg>
  );
}

export function Logo({ className = "text-primary" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ToothMark className="h-8 w-8 transition-transform duration-300 hover:rotate-6" />
      <span className="font-display font-extrabold text-lg lg:text-xl tracking-[0.24em] uppercase">
        Mond<span className="text-brand-accent">Vita</span>
      </span>
    </div>
  );
}


