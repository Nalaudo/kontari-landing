import {
  Sparkles,
  FileSearch,
  ShieldCheck,
  MousePointerClick,
  CheckCircle2,
  Wand2,
  ListTodo,
  Lock,
  type LucideIcon,
} from "lucide-react";
import CtaLink from "./CtaLink";

type Capability = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: Sparkles,
    title: "Asistente que conoce tu cartera",
    desc: "Preguntale por tus vencimientos de la semana, el estado de un cliente o qué tareas están atrasadas. Responde con tus datos reales, no con generalidades.",
  },
  {
    icon: FileSearch,
    title: "Lee tus documentos por vos",
    desc: "Subís una factura, un F931 o una constancia y la IA extrae período, importes y CUIT, sugiere el tipo y arma las tareas de seguimiento.",
  },
  {
    icon: Wand2,
    title: "Redacta tus comunicaciones",
    desc: "Recordatorios de vencimiento, pedidos de documentación o respuestas en el chat, escritos en el tono de tu estudio y listos para revisar.",
  },
  {
    icon: MousePointerClick,
    title: "Acciones con tu confirmación",
    desc: "Crear una tarea, agendar una reunión o mandar un mensaje: la IA lo propone y vos lo aprobás. Nunca hace nada por su cuenta.",
  },
];

export default function AiSection() {
  return (
    <section
      id="ia"
      className="relative overflow-hidden py-20 md:py-28 bg-white dark:bg-brand-900/30"
    >
      <div className="absolute -top-24 right-0 w-[28rem] h-[28rem] bg-brand-400/20 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 -left-24 w-[26rem] h-[26rem] bg-emerald-400/15 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto reveal-up">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            Inteligencia artificial
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Una IA que trabaja con los datos de tu estudio
          </h2>
          <p className="mt-4 text-brand-950/60 dark:text-slate-400">
            Kontari incorpora un asistente de IA integrado a toda la app: responde
            sobre tu cartera, lee la documentación que subís y redacta por vos.
            Siempre con tu confirmación y solo si lo activás.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Capacidades */}
          <div className="space-y-5">
            {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="reveal-up flex gap-4 rounded-2xl border border-brand-950/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-5"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-300 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-sm opacity-60">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mock del panel del asistente */}
          <div className="reveal-up relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-brand-500/20 to-emerald-400/20 blur-2xl rounded-[2rem]" />
            <div className="relative rounded-2xl border border-brand-950/10 dark:border-white/10 bg-white/95 dark:bg-brand-900/70 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-brand-950/10 dark:border-white/10">
                <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-300" />
                <span className="font-semibold text-sm">Asistente</span>
                <span className="ml-auto text-xs opacity-40">Kontari</span>
              </div>

              <div className="p-4 space-y-3 text-sm">
                <div className="flex justify-end">
                  <span className="inline-block rounded-2xl bg-brand-600 text-white px-3 py-2 max-w-[80%]">
                    ¿Qué vencimientos tengo esta semana?
                  </span>
                </div>

                <div className="text-brand-950/80 dark:text-slate-200">
                  Tenés 3 vencimientos de IVA antes del viernes:
                  <ul className="mt-2 space-y-1 opacity-80">
                    <li>• Panadería La Espiga — vie 12</li>
                    <li>• J. Pérez — vie 12</li>
                    <li>• Estudio Norte SRL — jue 11</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <span className="inline-block rounded-2xl bg-brand-600 text-white px-3 py-2 max-w-[80%]">
                    Creá una tarea para presentar el de La Espiga
                  </span>
                </div>

                <div className="rounded-xl border border-brand-600/30 bg-brand-600/5 p-3">
                  <div className="flex items-center gap-2 font-medium">
                    <ListTodo className="w-4 h-4 text-brand-600 dark:text-brand-300" />
                    Nueva tarea
                    <span className="rounded-full bg-brand-600/15 text-brand-600 dark:text-brand-300 px-2 py-0.5 text-[11px] font-normal">
                      requiere tu confirmación
                    </span>
                  </div>
                  <div className="mt-2 space-y-1 text-xs opacity-70">
                    <p>
                      <span className="font-medium opacity-80">Título:</span>{" "}
                      Presentar IVA — Panadería La Espiga
                    </p>
                    <p>
                      <span className="font-medium opacity-80">Vence:</span> viernes
                    </p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 text-white px-3 py-1.5 text-xs font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Confirmar
                    </span>
                    <span className="inline-flex items-center rounded-lg border border-brand-950/15 dark:border-white/15 px-3 py-1.5 text-xs font-medium opacity-70">
                      Descartar
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-brand-950/10 dark:border-white/10 px-4 py-3">
                <span className="flex-1 rounded-xl border border-brand-950/10 dark:border-white/10 px-3 py-2 text-xs opacity-40">
                  Escribí tu consulta…
                </span>
                <span className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacidad */}
        <div className="mt-14 reveal-up grid sm:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 dark:bg-emerald-500/5 p-6">
            <Lock className="w-5 h-5 text-emerald-600" />
            <h3 className="mt-3 font-bold text-sm">Opt-in explícito</h3>
            <p className="mt-1 text-sm opacity-70">
              La IA viene desactivada. La habilita un administrador del estudio
              desde Configuración cuando quiere.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 dark:bg-emerald-500/5 p-6">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="mt-3 font-bold text-sm">Tus datos no entrenan modelos</h3>
            <p className="mt-1 text-sm opacity-70">
              Lo que se envía al proveedor se usa solo para responder tu consulta.
              El proveedor está declarado en la política de privacidad.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/60 dark:bg-emerald-500/5 p-6">
            <MousePointerClick className="w-5 h-5 text-emerald-600" />
            <h3 className="mt-3 font-bold text-sm">Vos tenés el control</h3>
            <p className="mt-1 text-sm opacity-70">
              Ninguna acción se ejecuta ni ningún mensaje se envía sin que lo
              apruebes primero.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center reveal-up">
          <CtaLink
            href="/auth/login"
            className="group inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-full shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 hover:-translate-y-0.5 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Probá el asistente gratis 14 días
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
