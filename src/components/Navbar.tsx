import { useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Menu,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import CtaLink from "./CtaLink";
import { CLIENTES_URL, CONTADORES_LOGIN_URL, CONTADORES_URL } from "../lib/urls";

const NAV_LINKS = [
  { href: "#producto", label: "Producto" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#ia", label: "IA" },
  { href: "#seguridad", label: "Seguridad" },
  { href: "#precios", label: "Precios" },
  { href: "#faq", label: "FAQ" },
];

const SECTION_IDS = [
  "producto",
  "funcionalidades",
  "ia",
  "seguridad",
  "precios",
  "faq",
];

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

  const navInnerScrolled = scrolled
    ? "bg-white/80 dark:bg-brand-950/70 backdrop-blur-xl shadow-lg shadow-brand-950/5 mt-3"
    : "";

  return (
    <header
      id="navbar"
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          className={`flex items-center justify-between h-16 md:h-20 rounded-b-2xl px-3 sm:px-5 transition-all duration-300 ${navInnerScrolled}`}
        >
          <a href="#top" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/kontari-logo.svg"
              alt="Kontari — software de gestión para estudios contables"
              className="h-6 md:h-7 w-auto dark:hidden"
            />
            <img
              src="/assets/kontari-logo-white.svg"
              alt="Kontari — software de gestión para estudios contables"
              className="h-6 md:h-7 w-auto hidden dark:block"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition ${
                    isActive
                      ? "text-brand-600 dark:text-brand-300 opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggle}
              aria-label="Cambiar tema"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-brand-950/10 dark:border-white/10 hover:bg-brand-950/5 dark:hover:bg-white/10 transition"
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 dark:hidden" />
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={CONTADORES_URL}
                title="Acceso contadores"
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-full border border-brand-950/15 dark:border-white/20 hover:bg-brand-950/5 dark:hover:bg-white/10 transition"
              >
                <Briefcase className="w-4 h-4" />
                <span className="hidden xl:inline">Contadores</span>
              </a>
              <a
                href={CLIENTES_URL}
                title="Acceso clientes"
                className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-full border border-brand-950/15 dark:border-white/20 hover:bg-brand-950/5 dark:hover:bg-white/10 transition"
              >
                <User className="w-4 h-4" />
                <span className="hidden xl:inline">Clientes</span>
              </a>
            </div>
            <CtaLink
              href={CONTADORES_LOGIN_URL}
              className="inline-flex items-center gap-1.5 text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-full shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 hover:-translate-y-0.5 transition-all"
            >
              Empezar gratis <ArrowRight className="w-4 h-4" />
            </CtaLink>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center border border-brand-950/10 dark:border-white/10"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-white dark:bg-brand-950 z-40 transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-brand-950/10 dark:border-white/10">
          <img
            src="/assets/kontari-logo.svg"
            alt="Kontari"
            className="h-6 w-auto dark:hidden"
          />
          <img
            src="/assets/kontari-logo-white.svg"
            alt="Kontari"
            className="h-6 w-auto hidden dark:block"
          />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-brand-950/10 dark:border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-5 text-lg font-semibold">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-brand-950/5 dark:border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTADORES_URL}
            className="py-3 opacity-70 flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" /> Acceso contadores
          </a>
          <a
            href={CLIENTES_URL}
            className="py-3 opacity-70 flex items-center gap-2"
          >
            <User className="w-4 h-4" /> Acceso clientes
          </a>
          <a
            href={CONTADORES_LOGIN_URL}
            className="mt-3 text-center bg-brand-600 text-white rounded-full py-3"
          >
            Empezar gratis
          </a>
        </div>
      </div>
    </header>
  );
}
