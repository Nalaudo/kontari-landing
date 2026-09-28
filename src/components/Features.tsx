import {
  BookOpenCheck,
  CalendarClock,
  Clock,
  FileCheck2,
  FolderTree,
  Landmark,
  LayoutDashboard,
  LayoutGrid,
  LockKeyhole,
  Megaphone,
  MessagesSquare,
  PenLine,
  Receipt,
  SearchCheck,
  Sparkles,
  UserCog,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import Eyebrow from "./Eyebrow";

type Category = "clientes" | "impuestos" | "equipo" | "ia";

const CATEGORIES: { key: Category | "todas"; label: string; tone: string }[] = [
  { key: "todas", label: "Todas", tone: "tone-amber" },
  { key: "clientes", label: "Clientes", tone: "tone-indigo" },
  { key: "impuestos", label: "Impuestos y contabilidad", tone: "tone-amber" },
  { key: "equipo", label: "Equipo y gestión", tone: "tone-sky" },
  { key: "ia", label: "IA y seguridad", tone: "tone-violet" },
];

const TONE: Record<Category, string> = {
  clientes: "tone-indigo",
  impuestos: "tone-amber",
  equipo: "tone-sky",
  ia: "tone-violet",
};

type Feature = {
  icon: LucideIcon;
  cat: Category;
  title: string;
  desc: string;
  badge?: string;
};

const FEATURES: Feature[] = [
  {
    icon: Users,
    cat: "clientes",
    title: "Cartera de clientes centralizada",
    desc: "Todo el portafolio de tu estudio en un solo lugar: ficha, estado, historial y actividad de cada cliente. Activá o desactivá sin perder la información cargada.",
  },
  {
    icon: SearchCheck,
    cat: "clientes",
    title: "Autocompletado AFIP/ARCA",
    desc: "Ingresá un CUIT y Kontari trae razón social, actividad, domicilio fiscal y estado del contribuyente.",
  },
  {
    icon: Sparkles,
    cat: "ia",
    title: "Asistente de IA integrado",
    desc: "Un chat en toda la app que responde sobre tu cartera y tus vencimientos, lee los documentos que subís y redacta comunicaciones. Cada acción la confirmás vos.",
    badge: "Nuevo",
  },
  {
    icon: LockKeyhole,
    cat: "ia",
    title: "Bóveda de claves fiscales",
    desc: "Las claves se cifran en el navegador con AES-256-GCM antes de guardarse. Ni nuestro equipo puede leerlas.",
  },
  {
    icon: Landmark,
    cat: "impuestos",
    title: "Impuestos y vencimientos",
    desc: "Calendario de obligaciones por cliente y por terminación de CUIT, con alertas automáticas para no perderte ninguna presentación.",
  },
  {
    icon: Receipt,
    cat: "impuestos",
    title: "IVA y liquidación",
    desc: "Importás los comprobantes desde Mis Comprobantes y Kontari arma el Libro IVA Digital, calcula la liquidación mensual (renglones F2051) y registra retenciones y percepciones (SICORE). Tablero de Monotributo con recategorización.",
  },
  {
    icon: BookOpenCheck,
    cat: "impuestos",
    title: "Contabilidad completa",
    desc: "Plan de cuentas, libro diario con asientos automáticos desde el IVA, mayor, sumas y saldos, bienes de uso con amortización, conciliación bancaria y estados contables con cierre de ejercicio.",
    badge: "Nuevo",
  },
  {
    icon: FileCheck2,
    cat: "impuestos",
    title: "Facturación electrónica ARCA",
    desc: "Emití comprobantes A, B, C y E con CAE real contra los web services de ARCA (WSFEv1 / WSCT), con puntos de venta y numeración por entidad.",
  },
  {
    icon: Wallet,
    cat: "impuestos",
    title: "Honorarios y cobranza",
    desc: "Facturá los honorarios de tu estudio, llevá la cuenta corriente de cada cliente y cobrá online con un link a tu propia cuenta de Mercado Pago.",
  },
  {
    icon: FolderTree,
    cat: "clientes",
    title: "Documentos por cliente",
    desc: "Repositorio de la documentación de cada cliente —balances, constancias, facturas, recibos— organizada en carpetas y vinculada a sus tareas e impuestos.",
  },
  {
    icon: PenLine,
    cat: "clientes",
    title: "Firma electrónica de documentos",
    desc: "Enviá documentos a la firma del cliente y recibí el PDF con constancia de firma (fecha, IP y hash SHA-256). Sumá pedidos de documentación recurrentes.",
  },
  {
    icon: LayoutGrid,
    cat: "equipo",
    title: "Tareas, plantillas y tablero",
    desc: "Operá con un tablero tipo kanban, generá tareas recurrentes desde plantillas y seguí el avance de todo el estudio, período por período.",
  },
  {
    icon: UserCog,
    cat: "equipo",
    title: "Equipo con roles y permisos",
    desc: "Sumá colaboradores con permisos por módulo: administradores, contadores y asistentes. Organigrama con áreas, seniority y supervisores.",
  },
  {
    icon: Clock,
    cat: "equipo",
    title: "Tiempos y capacidad",
    desc: "Registrá horas por cliente y tarea, y visualizá la carga real de cada integrante para repartir mejor el trabajo.",
  },
  {
    icon: CalendarClock,
    cat: "clientes",
    title: "Reuniones y calendario",
    desc: "Agendá videollamadas con link de Jitsi automático, invitaciones por email y archivo .ics. Feed iCal del estudio —vencimientos, tareas y reuniones— suscribible desde cualquier app de calendario.",
    badge: "Plan Portal",
  },
  {
    icon: MessagesSquare,
    cat: "clientes",
    title: "Portal y chat con tus clientes",
    desc: "Con el plan Portal, cada cliente tiene su propia app para ver sus vencimientos, subir documentación y chatear directo con el estudio.",
    badge: "Plan Portal",
  },
  {
    icon: Megaphone,
    cat: "clientes",
    title: "Comunicaciones y campañas",
    desc: "Segmentá tu cartera y enviá campañas por email y WhatsApp con plantillas reutilizables. Notificaciones in-app, push y resumen por correo.",
  },
  {
    icon: LayoutDashboard,
    cat: "equipo",
    title: "Dashboard y reportes",
    desc: "Clientes activos, pendientes, vencimientos e ingresos del mes. Seis reportes (productividad, rentabilidad, riesgo de cartera y más) con vistas guardadas y búsqueda global.",
  },
];

/** Moves the card's spotlight (see `.spotlight` in index.css) to the pointer. */
function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Features() {
  const [filter, setFilter] = useState<Category | "todas">("todas");
  const shown = FEATURES.filter((f) => filter === "todas" || f.cat === filter);

  return (
    <section id="funcionalidades" className="tone-amber py-24 md:py-36 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow>Funcionalidades</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 className="reveal-up display text-[clamp(2.2rem,4.6vw,4.25rem)]">
              Todo lo que tu estudio necesita, <em>en un solo lugar</em>
            </h2>
            <p className="reveal-up mt-6 text-lg text-muted max-w-2xl">
              Una plataforma pensada por y para contadores argentinos: de la
              gestión interna del equipo al vínculo con cada cliente.
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-label="Filtrar funcionalidades"
          className="reveal-up mt-14 md:mt-20 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((c) => {
            const on = filter === c.key;
            const count =
              c.key === "todas"
                ? FEATURES.length
                : FEATURES.filter((f) => f.cat === c.key).length;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setFilter(c.key)}
                aria-pressed={on}
                className={`${c.tone} inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                  on
                    ? "border-sec bg-sec text-bg"
                    : "border-line-strong text-muted hover:border-sec hover:text-fg"
                }`}
              >
                {c.key !== "todas" && (
                  <span
                    aria-hidden
                    className={`w-2 h-2 rounded-full ${on ? "bg-bg" : "bg-sec"}`}
                  />
                )}
                {c.label}
                <span className={`font-mono text-xs ${on ? "opacity-70" : "opacity-60"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {shown.map(({ icon: Icon, cat, title, desc, badge }) => (
            <article
              key={title}
              onPointerMove={trackPointer}
              className={`${TONE[cat]} feature-card spotlight group border-r border-b border-line p-6 md:p-8 animate-rise`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="w-11 h-11 rounded-lg bg-sec/12 text-sec flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon aria-hidden strokeWidth={1.75} className="w-5 h-5" />
                </span>
                {badge && (
                  <span className="label-mono text-[10px] text-sec border border-sec/40 rounded px-1.5">
                    {badge}
                  </span>
                )}
              </div>
              <h3 className="mt-8 text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{desc}</p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-sec transition-all duration-500 group-hover:w-full"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
