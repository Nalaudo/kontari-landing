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
import TiltCard from "./TiltCard";

type Feature = {
  icon: LucideIcon;
  tone: "brand" | "emerald";
  title: string;
  desc: string;
  extraClass?: string;
  badge?: string;
};

const FEATURES: Feature[] = [
  {
    icon: Users,
    tone: "brand",
    title: "Cartera de clientes centralizada",
    desc: "Todo el portafolio de tu estudio en un solo lugar: ficha, estado, historial y actividad de cada cliente. Activá o desactivá sin perder la información cargada.",
    extraClass: "lg:col-span-2",
  },
  {
    icon: SearchCheck,
    tone: "emerald",
    title: "Autocompletado AFIP/ARCA",
    desc: "Ingresá un CUIT y Kontari trae razón social, actividad, domicilio fiscal y estado del contribuyente.",
  },
  {
    icon: Sparkles,
    tone: "brand",
    title: "Asistente de IA integrado",
    desc: "Un chat en toda la app que responde sobre tu cartera y tus vencimientos, lee los documentos que subís y redacta comunicaciones. Cada acción la confirmás vos.",
    extraClass: "lg:col-span-2 relative overflow-hidden",
    badge: "Nuevo",
  },
  {
    icon: LockKeyhole,
    tone: "brand",
    title: "Bóveda de claves fiscales",
    desc: "Las claves se cifran en el navegador con AES-256-GCM antes de guardarse. Ni nuestro equipo puede leerlas.",
  },
  {
    icon: Landmark,
    tone: "emerald",
    title: "Impuestos y vencimientos",
    desc: "Calendario de obligaciones por cliente y por terminación de CUIT, con alertas automáticas para no perderte ninguna presentación.",
  },
  {
    icon: Receipt,
    tone: "brand",
    title: "IVA y liquidación",
    desc: "Importás los comprobantes desde Mis Comprobantes y Kontari arma el Libro IVA Digital, calcula la liquidación mensual (renglones F2051) y registra retenciones y percepciones (SICORE). Tablero de Monotributo con recategorización.",
  },
  {
    icon: BookOpenCheck,
    tone: "emerald",
    title: "Contabilidad completa",
    desc: "Plan de cuentas, libro diario con asientos automáticos desde el IVA, mayor, sumas y saldos, bienes de uso con amortización, conciliación bancaria y estados contables con cierre de ejercicio.",
    extraClass: "lg:col-span-2 relative overflow-hidden",
    badge: "Nuevo",
  },
  {
    icon: FileCheck2,
    tone: "brand",
    title: "Facturación electrónica ARCA",
    desc: "Emití comprobantes A, B, C y E con CAE real contra los web services de ARCA (WSFEv1 / WSCT), con puntos de venta y numeración por entidad.",
  },
  {
    icon: Wallet,
    tone: "emerald",
    title: "Honorarios y cobranza",
    desc: "Facturá los honorarios de tu estudio, llevá la cuenta corriente de cada cliente y cobrá online con un link a tu propia cuenta de Mercado Pago.",
  },
  {
    icon: FolderTree,
    tone: "brand",
    title: "Documentos por cliente",
    desc: "Repositorio de la documentación de cada cliente —balances, constancias, facturas, recibos— organizada en carpetas y vinculada a sus tareas e impuestos.",
  },
  {
    icon: PenLine,
    tone: "emerald",
    title: "Firma electrónica de documentos",
    desc: "Enviá documentos a la firma del cliente y recibí el PDF con constancia de firma (fecha, IP y hash SHA-256). Sumá pedidos de documentación recurrentes.",
  },
  {
    icon: LayoutGrid,
    tone: "emerald",
    title: "Tareas, plantillas y tablero",
    desc: "Operá con un tablero tipo kanban, generá tareas recurrentes desde plantillas y seguí el avance de todo el estudio, período por período.",
    extraClass: "lg:col-span-2",
  },
  {
    icon: UserCog,
    tone: "brand",
    title: "Equipo con roles y permisos",
    desc: "Sumá colaboradores con permisos por módulo: administradores, contadores y asistentes. Organigrama con áreas, seniority y supervisores.",
  },
  {
    icon: Clock,
    tone: "emerald",
    title: "Tiempos y capacidad",
    desc: "Registrá horas por cliente y tarea, y visualizá la carga real de cada integrante para repartir mejor el trabajo.",
  },
  {
    icon: CalendarClock,
    tone: "brand",
    title: "Reuniones y calendario",
    desc: "Agendá videollamadas con link de Jitsi automático, invitaciones por email y archivo .ics. Feed iCal del estudio —vencimientos, tareas y reuniones— suscribible desde cualquier app de calendario.",
    badge: "Plan Portal",
  },
  {
    icon: MessagesSquare,
    tone: "brand",
    title: "Portal y chat con tus clientes",
    desc: "Con el plan Portal, cada cliente tiene su propia app para ver sus vencimientos, subir documentación y chatear directo con el estudio.",
    extraClass: "lg:col-span-2 relative overflow-hidden",
    badge: "Plan Portal",
  },
  {
    icon: Megaphone,
    tone: "emerald",
    title: "Comunicaciones y campañas",
    desc: "Segmentá tu cartera y enviá campañas por email y WhatsApp con plantillas reutilizables. Notificaciones in-app, push y resumen por correo.",
  },
  {
    icon: LayoutDashboard,
    tone: "brand",
    title: "Dashboard y reportes",
    desc: "Clientes activos, pendientes, vencimientos e ingresos del mes. Seis reportes (productividad, rentabilidad, riesgo de cartera y más) con vistas guardadas y búsqueda global.",
  },
];

const TONE_CLASS = {
  brand:
    "w-11 h-11 rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-300 flex items-center justify-center",
  emerald:
    "w-11 h-11 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center",
} as const;

export default function Features() {
  return (
    <section id="funcionalidades" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto reveal-up">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            Funcionalidades
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Todo lo que tu estudio necesita, en un solo lugar
          </h2>
          <p className="mt-4 text-brand-950/60 dark:text-slate-400">
            Una plataforma pensada por y para contadores argentinos: de la
            gestión interna del equipo al vínculo con cada cliente.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, tone, title, desc, extraClass, badge }) => (
            <TiltCard
              key={title}
              className={`feature-card reveal-up rounded-2xl border border-brand-950/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 hover:shadow-2xl hover:shadow-brand-600/10 ${extraClass ?? ""}`}
            >
              {badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-brand-600/15 text-brand-600 dark:text-brand-300">
                  {badge}
                </span>
              )}
              <div className={TONE_CLASS[tone]}>
                <Icon />
              </div>
              <h3 className="mt-4 font-bold text-lg">{title}</h3>
              <p className="mt-2 text-sm opacity-60">{desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
