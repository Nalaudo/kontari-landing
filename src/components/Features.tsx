import {
  CalendarClock,
  FileSpreadsheet,
  FolderDown,
  LayoutDashboard,
  LockKeyhole,
  SearchCheck,
  ShieldCheck,
  Users,
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
    title: "Gestión de clientes multi-estudio",
    desc: "Administrá el portafolio completo de tus clientes desde un solo lugar. Activá o desactivá sin perder el historial ni la información cargada.",
    extraClass: "lg:col-span-2 lg:row-span-1",
  },
  {
    icon: SearchCheck,
    tone: "emerald",
    title: "Autocompletado AFIP/ARCA",
    desc: "Ingresá un CUIT y Klientfy trae automáticamente razón social, actividad, domicilio fiscal y estado del contribuyente.",
  },
  {
    icon: LockKeyhole,
    tone: "brand",
    title: "Bóveda de claves fiscales",
    desc: "Las claves se cifran en el navegador con AES-256-GCM antes de guardarse. Ni nuestro equipo puede leerlas.",
  },
  {
    icon: FolderDown,
    tone: "emerald",
    title: "Descargas masivas en ZIP",
    desc: "Bajá liquidaciones y comprobantes de todos tus clientes en un clic, sin entrar a AFIP uno por uno.",
  },
  {
    icon: FileSpreadsheet,
    tone: "brand",
    title: "Importación desde Excel",
    desc: "Cargá códigos COE y datos en lote directamente desde tus planillas existentes.",
  },
  {
    icon: ShieldCheck,
    tone: "emerald",
    title: "Roles y permisos de equipo",
    desc: "Definí qué puede ver y hacer cada integrante de tu estudio: administradores, contadores y asistentes, con permisos por módulo.",
    extraClass: "lg:col-span-2",
  },
  {
    icon: LayoutDashboard,
    tone: "brand",
    title: "Dashboard en tiempo real",
    desc: "Clientes activos, documentos pendientes, vencimientos e ingresos del mes, de un vistazo.",
  },
  {
    icon: CalendarClock,
    tone: "emerald",
    title: "Calendario de vencimientos",
    desc: "Alertas automáticas por cliente y obligación para no perderte ninguna presentación.",
    extraClass: "relative overflow-hidden",
    badge: "Próximamente",
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
            Una plataforma pensada por y para contadores argentinos, de principio
            a fin.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, tone, title, desc, extraClass, badge }) => (
            <TiltCard
              key={title}
              className={`feature-card reveal-up rounded-2xl border border-brand-950/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-6 hover:shadow-2xl hover:shadow-brand-600/10 ${extraClass ?? ""}`}
            >
              {badge && (
                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-amber-500/15 text-amber-600">
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
