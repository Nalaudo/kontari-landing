import { ArrowRight, Check, FileSearch, MousePointerClick, PenLine, Sparkles } from "lucide-react";
import AiChatDemo from "./AiChatDemo";
import CtaLink from "./CtaLink";
import Eyebrow from "./Eyebrow";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

const CAPABILITIES = [
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
    icon: PenLine,
    title: "Redacta tus comunicaciones",
    desc: "Recordatorios de vencimiento, pedidos de documentación o respuestas en el chat, escritos en el tono de tu estudio y listos para revisar.",
  },
  {
    icon: MousePointerClick,
    title: "Acciones con tu confirmación",
    desc: "Crear una tarea, agendar una reunión o mandar un mensaje: la IA lo propone y vos lo aprobás. Nunca hace nada por su cuenta.",
  },
];

const GUARANTEES = [
  {
    title: "Opt-in explícito",
    desc: "La IA viene desactivada. La habilita un administrador del estudio desde Configuración cuando quiere.",
  },
  {
    title: "Tus datos no entrenan modelos",
    desc: "Lo que se envía al proveedor se usa solo para responder tu consulta. El proveedor está declarado en la política de privacidad.",
  },
  {
    title: "Vos tenés el control",
    desc: "Ninguna acción se ejecuta ni ningún mensaje se envía sin que lo apruebes primero.",
  },
];

export default function AiSection() {
  return (
    <section id="ia" className="tone-violet relative py-24 md:py-36 border-t border-line overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/3 -left-40 w-[40rem] h-[40rem] rounded-full bg-violet/15 blur-[140px]"
      />
      <div className="relative wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow>Inteligencia artificial</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 className="reveal-up display text-[clamp(2.2rem,4.6vw,4.25rem)]">
              Una IA que trabaja con <em>los datos de tu estudio</em>
            </h2>
            <p className="reveal-up mt-6 text-lg text-muted max-w-2xl">
              Kontari incorpora un asistente de IA integrado a toda la app:
              responde sobre tu cartera, lee la documentación que subís y
              redacta por vos. Siempre con tu confirmación y solo si lo activás.
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Capacidades */}
          <ul className="lg:col-span-5 border-t border-line">
            {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
              <li
                key={title}
                className="reveal-up group grid grid-cols-[3rem_1fr] gap-2 py-7 border-b border-line"
              >
                <span className="w-9 h-9 rounded-lg bg-violet/12 text-violet flex items-center justify-center transition-transform group-hover:scale-110">
                  <Icon aria-hidden className="w-[18px] h-[18px]" />
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Asistente interactivo */}
          <div className="reveal-up lg:col-span-7 lg:sticky lg:top-24">
            <p className="mb-3 label-mono text-muted flex items-center gap-2">
              <MousePointerClick aria-hidden className="w-3.5 h-3.5 text-violet" />
              Probalo: tocá una sugerencia o escribí
            </p>
            <AiChatDemo />
          </div>
        </div>

        {/* Privacidad */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 border-t border-l border-line">
          {GUARANTEES.map(({ title, desc }) => (
            <div key={title} className="reveal-up border-r border-b border-line p-6 md:p-8">
              <span className="w-9 h-9 rounded-full bg-emerald/12 text-emerald flex items-center justify-center">
                <Check aria-hidden className="w-4 h-4" />
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 reveal-up">
          <CtaLink href={CONTADORES_LOGIN_URL} className="btn btn-tone">
            Probá el asistente gratis 14 días
            <ArrowRight className="w-4 h-4" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
