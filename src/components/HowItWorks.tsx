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
    <section id="como-funciona" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto reveal-up">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            Cómo funciona
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Empezá en minutos
          </h2>
        </div>

        <div className="relative mt-16 grid md:grid-cols-4 gap-10">
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-brand-950/10 dark:bg-white/10">
            <div
              id="steps-line"
              className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 w-0"
            />
          </div>
          {STEPS.map((step) => (
            <div key={step.n} className="reveal-up relative text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-brand-600/30">
                {step.n}
              </div>
              <h3 className="mt-5 font-bold">{step.title}</h3>
              <p className="mt-2 text-sm opacity-60">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
