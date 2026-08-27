import Counter from "./Counter";

const STATS = [
  { target: 500, suffix: "+", label: "Clientes gestionados" },
  { target: 40, suffix: "+", label: "Horas ahorradas / mes por estudio" },
  { target: 600, suffix: "k", label: "Iteraciones de cifrado PBKDF2" },
  {
    target: 99.9,
    decimals: 1,
    suffix: "%",
    label: "Disponibilidad de la plataforma",
  },
];

export default function Stats() {
  return (
    <section id="stats-section" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((stat) => (
          <div key={stat.label} className="reveal-up">
            <p className="text-4xl md:text-5xl font-extrabold gradient-text">
              <Counter target={stat.target} decimals={stat.decimals} />
              {stat.suffix}
            </p>
            <p className="mt-2 text-sm opacity-60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
