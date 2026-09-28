import { KeyRound, LayoutDashboard, SearchCheck, UserPlus } from "lucide-react";
import Eyebrow from "./Eyebrow";

const STEPS = [
  {
    n: 1,
    icon: UserPlus,
    tone: "tone-indigo",
    title: "Creá tu cuenta",
    desc: "Registrate como estudio o contador independiente en menos de 2 minutos.",
  },
  {
    n: 2,
    icon: SearchCheck,
    tone: "tone-amber",
    title: "Cargá tus clientes",
    desc: "Ingresá el CUIT y Kontari completa los datos fiscales automáticamente.",
  },
  {
    n: 3,
    icon: KeyRound,
    tone: "tone-emerald",
    title: "Asegurá las claves",
    desc: "Guardá las claves fiscales cifradas de extremo a extremo.",
  },
  {
    n: 4,
    icon: LayoutDashboard,
    tone: "tone-violet",
    title: "Gestioná todo",
    desc: "IVA, contabilidad, honorarios, vencimientos, documentos y equipo en un dashboard, con un asistente de IA que responde y redacta por vos.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="tone-sky py-24 md:py-36 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow>Cómo funciona</Eyebrow>
          </div>
          <h2 className="lg:col-span-8 reveal-up display text-[clamp(2.2rem,4.6vw,4.25rem)]">
            Empezá <em>en minutos</em>
          </h2>
        </div>

        <div className="relative mt-16 md:mt-24">
          <div className="hidden md:block absolute top-6 left-6 right-6 h-px bg-line">
            <div
              id="steps-line"
              className="h-full w-0 bg-[linear-gradient(90deg,var(--k-indigo),var(--k-amber),var(--k-emerald),var(--k-violet))]"
            />
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10">
            {STEPS.map(({ n, icon: Icon, tone, title, desc }) => (
              <li key={n} className={`${tone} reveal-up group relative`}>
                <span className="relative w-12 h-12 rounded-full bg-bg border-2 border-sec text-sec flex items-center justify-center transition-all duration-300 group-hover:bg-sec group-hover:text-bg group-hover:scale-110 shadow-[0_0_24px_-6px_var(--k-sec)]">
                  <Icon aria-hidden className="w-5 h-5" />
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
