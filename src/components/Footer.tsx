const COLUMNS = [
  {
    title: "Producto",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Seguridad", href: "#seguridad" },
      { label: "Precios", href: "#precios" },
      { label: "Preguntas frecuentes", href: "#faq" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nosotros", href: "#" },
      { label: "Contacto", href: "mailto:contacto@klientfy.com" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", href: "#" },
      { label: "Privacidad", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-950/10 dark:border-white/10 py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <img
              src="/assets/klientfy-logo.svg"
              alt="Klientfy"
              className="h-6 w-auto dark:hidden"
            />
            <img
              src="/assets/klientfy-logo-white.svg"
              alt="Klientfy"
              className="h-6 w-auto hidden dark:block"
            />
            <p className="mt-4 text-sm opacity-60 max-w-xs">
              El sistema de gestión para estudios contables modernos. Clientes,
              AFIP/ARCA y seguridad, en un solo lugar.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-sm">{col.title}</p>
              <ul className="mt-4 space-y-2 text-sm opacity-60">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:opacity-100 transition">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-brand-950/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-50">
          <p>© 2026 Klientfy. Todos los derechos reservados.</p>
          <p>Hecho con ♥ en Argentina 🇦🇷</p>
        </div>
      </div>
    </footer>
  );
}
