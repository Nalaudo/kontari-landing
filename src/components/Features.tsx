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
import Eyebrow from "./Eyebrow";

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  badge?: string;
};

const FEATURES: Feature[] = [
  {
    icon: Users,
    title: "Cartera de clientes centralizada",
    desc: "Todo el portafolio de tu estudio en un solo lugar: ficha, estado, historial y actividad de cada cliente. Activá o desactivá sin perder la información cargada.",
  },
  {
    icon: SearchCheck,
    title: "Autocompletado AFIP/ARCA",
    desc: "Ingresá un CUIT y Kontari trae razón social, actividad, domicilio fiscal y estado del contribuyente.",
  },
  {
    icon: Sparkles,
    title: "Asistente de IA integrado",
    desc: "Un chat en toda la app que responde sobre tu cartera y tus vencimientos, lee los documentos que subís y redacta comunicaciones. Cada acción la confirmás vos.",
    badge: "Nuevo",
  },
  {
    icon: LockKeyhole,
    title: "Bóveda de claves fiscales",
    desc: "Las claves se cifran en el navegador con AES-256-GCM antes de guardarse. Ni nuestro equipo puede leerlas.",
  },
  {
    icon: Landmark,
    title: "Impuestos y vencimientos",
    desc: "Calendario de obligaciones por cliente y por terminación de CUIT, con alertas automáticas para no perderte ninguna presentación.",
  },
  {
    icon: Receipt,
    title: "IVA y liquidación",
    desc: "Importás los comprobantes desde Mis Comprobantes y Kontari arma el Libro IVA Digital, calcula la liquidación mensual (renglones F2051) y registra retenciones y percepciones (SICORE). Tablero de Monotributo con recategorización.",
  },
  {
    icon: BookOpenCheck,
    title: "Contabilidad completa",
    desc: "Plan de cuentas, libro diario con asientos automáticos desde el IVA, mayor, sumas y saldos, bienes de uso con amortización, conciliación bancaria y estados contables con cierre de ejercicio.",
    badge: "Nuevo",
  },
  {
    icon: FileCheck2,
    title: "Facturación electrónica ARCA",
    desc: "Emití comprobantes A, B, C y E con CAE real contra los web services de ARCA (WSFEv1 / WSCT), con puntos de venta y numeración por entidad.",
  },
  {
    icon: Wallet,
    title: "Honorarios y cobranza",
    desc: "Facturá los honorarios de tu estudio, llevá la cuenta corriente de cada cliente y cobrá online con un link a tu propia cuenta de Mercado Pago.",
  },
  {
    icon: FolderTree,
    title: "Documentos por cliente",
    desc: "Repositorio de la documentación de cada cliente —balances, constancias, facturas, recibos— organizada en carpetas y vinculada a sus tareas e impuestos.",
  },
  {
    icon: PenLine,
    title: "Firma electrónica de documentos",
    desc: "Enviá documentos a la firma del cliente y recibí el PDF con constancia de firma (fecha, IP y hash SHA-256). Sumá pedidos de documentación recurrentes.",
  },
  {
    icon: LayoutGrid,
    title: "Tareas, plantillas y tablero",
    desc: "Operá con un tablero tipo kanban, generá tareas recurrentes desde plantillas y seguí el avance de todo el estudio, período por período.",
  },
  {
    icon: UserCog,
    title: "Equipo con roles y permisos",
    desc: "Sumá colaboradores con permisos por módulo: administradores, contadores y asistentes. Organigrama con áreas, seniority y supervisores.",
  },
  {
    icon: Clock,
    title: "Tiempos y capacidad",
    desc: "Registrá horas por cliente y tarea, y visualizá la carga real de cada integrante para repartir mejor el trabajo.",
  },
  {
    icon: CalendarClock,
    title: "Reuniones y calendario",
    desc: "Agendá videollamadas con link de Jitsi automático, invitaciones por email y archivo .ics. Feed iCal del estudio —vencimientos, tareas y reuniones— suscribible desde cualquier app de calendario.",
    badge: "Plan Portal",
  },
  {
    icon: MessagesSquare,
    title: "Portal y chat con tus clientes",
    desc: "Con el plan Portal, cada cliente tiene su propia app para ver sus vencimientos, subir documentación y chatear directo con el estudio.",
    badge: "Plan Portal",
  },
  {
    icon: Megaphone,
    title: "Comunicaciones y campañas",
    desc: "Segmentá tu cartera y enviá campañas por email y WhatsApp con plantillas reutilizables. Notificaciones in-app, push y resumen por correo.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard y reportes",
    desc: "Clientes activos, pendientes, vencimientos e ingresos del mes. Seis reportes (productividad, rentabilidad, riesgo de cartera y más) con vistas guardadas y búsqueda global.",
  },
];

export default function Features() {
  return (
    <section id="funcionalidades" className="py-24 md:py-36 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow n="02">Funcionalidades</Eyebrow>
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

        <div className="mt-16 md:mt-24 grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {FEATURES.map(({ icon: Icon, title, desc, badge }, i) => (
            <article
              key={title}
              className="feature-card reveal-up group relative border-r border-b border-line p-6 md:p-8 transition-colors hover:bg-panel"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted tabular-nums group-hover:text-accent transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {badge && (
                  <span className="label-mono text-[10px] text-accent border border-accent/40 rounded px-1.5">
                    {badge}
                  </span>
                )}
              </div>
              <Icon
                aria-hidden
                strokeWidth={1.5}
                className="mt-10 w-6 h-6 text-muted group-hover:text-accent transition-colors"
              />
              <h3 className="mt-5 text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
