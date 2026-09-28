import { ArrowRight, Check, ListTodo, Sparkles } from "lucide-react";
import CtaLink from "./CtaLink";
import Eyebrow from "./Eyebrow";
import { CONTADORES_LOGIN_URL } from "../lib/urls";

const CAPABILITIES = [
  {
    title: "Asistente que conoce tu cartera",
    desc: "Preguntale por tus vencimientos de la semana, el estado de un cliente o qué tareas están atrasadas. Responde con tus datos reales, no con generalidades.",
  },
  {
    title: "Lee tus documentos por vos",
    desc: "Subís una factura, un F931 o una constancia y la IA extrae período, importes y CUIT, sugiere el tipo y arma las tareas de seguimiento.",
  },
  {
    title: "Redacta tus comunicaciones",
    desc: "Recordatorios de vencimiento, pedidos de documentación o respuestas en el chat, escritos en el tono de tu estudio y listos para revisar.",
  },
  {
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

function UserBubble({ children }: { children: string }) {
  return (
    <div className="flex justify-end">
      <span className="inline-block rounded-lg rounded-br-sm bg-accent text-on-accent px-3.5 py-2 max-w-[85%]">
        {children}
      </span>
    </div>
  );
}

export default function AiSection() {
  return (
    <section id="ia" className="relative py-24 md:py-36 border-t border-line overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/3 -left-40 w-[40rem] h-[40rem] rounded-full bg-accent/10 blur-[140px]"
      />
      <div className="relative wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow n="03">Inteligencia artificial</Eyebrow>
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
          <ol className="lg:col-span-6 border-t border-line">
            {CAPABILITIES.map(({ title, desc }, i) => (
              <li
                key={title}
                className="reveal-up grid grid-cols-[3rem_1fr] gap-2 py-7 border-b border-line"
              >
                <span className="font-serif italic text-3xl leading-none text-accent">
                  {i + 1}.
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-tight">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{desc}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Mock del panel del asistente */}
          <div className="reveal-up lg:col-span-6 lg:sticky lg:top-28">
            <div className="rounded-xl border border-line-strong bg-panel overflow-hidden shadow-[0_40px_120px_-40px_rgb(0_0_0/0.45)]">
              <div className="flex items-center gap-2 px-4 h-11 border-b border-line">
                <Sparkles aria-hidden className="w-4 h-4 text-accent" />
                <span className="font-medium text-sm">Asistente</span>
                <span className="ml-auto label-mono text-muted">Kontari · IA</span>
              </div>

              <div className="p-5 space-y-4 text-sm">
                <UserBubble>¿Qué vencimientos tengo esta semana?</UserBubble>

                <div>
                  <p>Tenés 3 vencimientos de IVA antes del viernes:</p>
                  <ul className="mt-3 space-y-1.5 font-mono text-[13px]">
                    {[
                      ["Panadería La Espiga", "vie 12"],
                      ["J. Pérez", "vie 12"],
                      ["Estudio Norte SRL", "jue 11"],
                    ].map(([who, when]) => (
                      <li key={who} className="flex items-baseline gap-2">
                        <span>{who}</span>
                        <span
                          aria-hidden
                          className="flex-1 border-b border-dotted border-line-strong translate-y-[-3px]"
                        />
                        <span className="text-accent">{when}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <UserBubble>Creá una tarea para presentar el de La Espiga</UserBubble>

                <div className="rounded-lg border border-accent/40 bg-accent/5 p-4">
                  <div className="flex flex-wrap items-center gap-2 font-medium">
                    <ListTodo aria-hidden className="w-4 h-4 text-accent" />
                    Nueva tarea
                    <span className="label-mono text-[10px] text-accent">
                      · requiere tu confirmación
                    </span>
                  </div>
                  <dl className="mt-3 grid grid-cols-[4rem_1fr] gap-y-1 text-[13px]">
                    <dt className="text-muted">Título</dt>
                    <dd>Presentar IVA — Panadería La Espiga</dd>
                    <dt className="text-muted">Vence</dt>
                    <dd>viernes</dd>
                  </dl>
                  <div className="mt-4 flex gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-accent text-on-accent px-3 py-1.5 text-xs font-medium">
                      <Check aria-hidden className="w-3.5 h-3.5" />
                      Confirmar
                    </span>
                    <span className="inline-flex items-center rounded-md border border-line-strong px-3 py-1.5 text-xs font-medium text-muted">
                      Descartar
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-line px-4 py-3">
                <span className="flex-1 rounded-md border border-line px-3 py-2 text-xs text-muted">
                  Escribí tu consulta…
                </span>
                <span className="w-8 h-8 rounded-md bg-accent text-on-accent flex items-center justify-center">
                  <ArrowRight aria-hidden className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacidad */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 border-t border-l border-line">
          {GUARANTEES.map(({ title, desc }) => (
            <div key={title} className="reveal-up border-r border-b border-line p-6 md:p-8">
              <p className="label-mono text-pos flex items-center gap-2">
                <Check aria-hidden className="w-3.5 h-3.5" /> Garantía
              </p>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 reveal-up">
          <CtaLink href={CONTADORES_LOGIN_URL} className="btn btn-accent">
            Probá el asistente gratis 14 días
            <ArrowRight className="w-4 h-4" />
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
