import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import CtaLink from "./CtaLink";
import { CLIENTES_URL, CONTADORES_LOGIN_URL, CONTADORES_URL } from "../lib/urls";

// Each link carries its section's tone, so the nav doubles as a colour key.
const NAV_LINKS = [
  { href: "#producto", label: "Producto", tone: "tone-indigo" },
  { href: "#funcionalidades", label: "Funcionalidades", tone: "tone-amber" },
  { href: "#ia", label: "IA", tone: "tone-violet" },
  { href: "#seguridad", label: "Seguridad", tone: "tone-emerald" },
  { href: "#precios", label: "Precios", tone: "tone-sky" },
  { href: "#faq", label: "FAQ", tone: "tone-coral" },
];

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export default function Navbar() {
  const { toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      id="navbar"
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-xl border-line"
          : "border-transparent"
      }`}
    >
      <nav className="wrap flex items-center justify-between h-16">
        <a href="#top" className="flex items-center shrink-0">
          <img
            src="/assets/kontari-logo.svg"
            alt="Kontari — software de gestión para estudios contables"
            className="h-[22px] w-auto dark:hidden"
          />
          <img
            src="/assets/kontari-logo-white.svg"
            alt="Kontari — software de gestión para estudios contables"
            className="h-[22px] w-auto hidden dark:block"
          />
        </a>

        <div className="hidden lg:flex items-center gap-5 2xl:gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`${link.tone} group label-mono flex items-center gap-2 transition-colors ${
                  isActive ? "text-sec" : "text-muted hover:text-fg"
                }`}
              >
                <span
                  aria-hidden
                  className={`rounded-full bg-sec transition-all duration-300 ${
                    isActive
                      ? "w-2 h-2 shadow-[0_0_10px_var(--k-sec)]"
                      : "w-1.5 h-1.5 opacity-70 group-hover:opacity-100"
                  }`}
                />
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span aria-hidden className="hidden xl:block w-px h-5 bg-line-strong mr-1" />
          <a
            href={CONTADORES_URL}
            title="Acceso contadores"
            className="hidden xl:inline-flex label-mono items-center gap-1 px-2 py-2 text-muted hover:text-fg transition-colors"
          >
            Contadores <ArrowUpRight aria-hidden className="w-3 h-3" />
          </a>
          <a
            href={CLIENTES_URL}
            title="Acceso clientes"
            className="hidden xl:inline-flex label-mono items-center gap-1 px-2 py-2 mr-2 text-muted hover:text-fg transition-colors"
          >
            Clientes <ArrowUpRight aria-hidden className="w-3 h-3" />
          </a>
          <button
            type="button"
            onClick={toggle}
            aria-label="Cambiar tema"
            className="w-9 h-9 rounded-md flex items-center justify-center border border-line hover:border-line-strong transition-colors"
          >
            <Sun className="w-4 h-4 hidden dark:block" />
            <Moon className="w-4 h-4 dark:hidden" />
          </button>
          <CtaLink href={CONTADORES_LOGIN_URL} className="btn btn-accent btn-sm">
            <span>
              Empezar<span className="hidden sm:inline"> gratis</span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </CtaLink>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="lg:hidden w-9 h-9 rounded-md flex items-center justify-center border border-line"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 h-dvh bg-bg z-40 flex flex-col transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="wrap flex items-center justify-between h-16 border-b border-line">
          <img
            src="/assets/kontari-logo.svg"
            alt="Kontari"
            className="h-[22px] w-auto dark:hidden"
          />
          <img
            src="/assets/kontari-logo-white.svg"
            alt="Kontari"
            className="h-[22px] w-auto hidden dark:block"
          />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="w-9 h-9 rounded-md flex items-center justify-center border border-line"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="wrap flex-1 flex flex-col py-4 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`${link.tone} flex items-center gap-4 py-3.5 border-b border-line text-3xl font-medium tracking-tight`}
            >
              <span aria-hidden className="w-2.5 h-2.5 rounded-full bg-sec" />
              {link.label}
            </a>
          ))}
          <div className="mt-6 grid grid-cols-2 gap-2">
            <a href={CONTADORES_URL} className="btn btn-ghost btn-sm">
              Acceso contadores
            </a>
            <a href={CLIENTES_URL} className="btn btn-ghost btn-sm">
              Acceso clientes
            </a>
          </div>
          <a href={CONTADORES_LOGIN_URL} className="btn btn-accent mt-3">
            Empezar gratis <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
