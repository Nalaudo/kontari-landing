const COLUMNS = [
  {
    title: "Producto",
    dot: "bg-indigo",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Seguridad", href: "#seguridad" },
      { label: "Precios", href: "#precios" },
      { label: "Preguntas frecuentes", href: "#faq" },
    ],
  },
  {
    title: "Empresa",
    dot: "bg-amber",
    links: [
      { label: "Sobre nosotros", href: "#" },
      { label: "Contacto", href: "mailto:contacto@kontari.com" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    dot: "bg-emerald",
    links: [
      { label: "Términos y condiciones", href: "/legal/terminos.html" },
      { label: "Política de privacidad", href: "/legal/privacidad.html" },
      { label: "Política de cookies", href: "/legal/cookies.html" },
      {
        label: "Tratamiento de datos",
        href: "/legal/tratamiento-de-datos.html",
      },
      {
        label: "Botón de arrepentimiento",
        href: "mailto:bajas@kontari.com?subject=Bot%C3%B3n%20de%20arrepentimiento",
      },
      {
        label: "Baja de suscripción",
        href: "mailto:bajas@kontari.com?subject=Baja%20de%20suscripci%C3%B3n",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line pt-16 md:pt-20 overflow-hidden">
      <div className="wrap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
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
            <p className="mt-5 text-[15px] leading-relaxed text-muted max-w-sm">
              El software de gestión para estudios contables y contadores
              independientes en Argentina. Clientes, AFIP/ARCA, IVA, contabilidad
              y seguridad, en un solo lugar.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-2 last:md:col-span-3">
              <p className="label-mono text-muted flex items-center gap-2">
                <span aria-hidden className={`w-1.5 h-1.5 rounded-full ${col.dot}`} />
                {col.title}
              </p>
              <ul className="mt-5 space-y-2.5 text-[15px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-indigo transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark, tinted with the theme's line colour. */}
        <div
          aria-hidden
          className="mt-20 md:mt-28 w-full aspect-[306/75] opacity-25 bg-[linear-gradient(100deg,var(--k-indigo),var(--k-violet)_35%,var(--k-coral)_70%,var(--k-amber))]"
          style={{
            maskImage: "url(/assets/kontari-logo-white.svg)",
            WebkitMaskImage: "url(/assets/kontari-logo-white.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />

        <div className="py-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 label-mono text-muted">
          <p>© 2026 Kontari. Todos los derechos reservados.</p>
          <p>Hecho en Argentina</p>
        </div>
      </div>
    </footer>
  );
}
