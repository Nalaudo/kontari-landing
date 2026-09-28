import Eyebrow from "./Eyebrow";

const STEPS = [
  {
    n: 1,
    title: "Creá tu cuenta",
    desc: "Registrate como estudio o contador independiente en menos de 2 minutos.",
  },
  {
    n: 2,
    title: "Cargá tus clientes",
    desc: "Ingresá el CUIT y Kontari completa los datos fiscales automáticamente.",
  },
  {
    n: 3,
    title: "Asegurá las claves",
    desc: "Guardá las claves fiscales cifradas de extremo a extremo.",
  },
  {
    n: 4,
    title: "Gestioná todo",
    desc: "IVA, contabilidad, honorarios, vencimientos, documentos y equipo en un dashboard, con un asistente de IA que responde y redacta por vos.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 md:py-36 border-t border-line">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 reveal-up">
            <Eyebrow n="05">Cómo funciona</Eyebrow>
          </div>
          <h2 className="lg:col-span-8 reveal-up display text-[clamp(2.2rem,4.6vw,4.25rem)]">
            Empezá <em>en minutos</em>
          </h2>
        </div>

        <div className="relative mt-16 md:mt-24">
          <div className="hidden md:block absolute top-0 inset-x-0 h-px bg-line">
            <div id="steps-line" className="h-full bg-accent w-0" />
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-x-8">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="reveal-up relative pt-8 pb-10 md:pb-0 border-t border-line md:border-t-0"
              >
                <span
                  aria-hidden
                  className="hidden md:block absolute -top-[5px] left-0 w-[9px] h-[9px] rounded-full bg-bg border border-accent"
                />
                <span className="font-serif italic text-7xl md:text-8xl leading-none text-accent">
                  {String(step.n).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
