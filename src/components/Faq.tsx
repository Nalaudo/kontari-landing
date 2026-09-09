import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "¿Qué es Kontari?",
    a: "Kontari es una plataforma de gestión pensada para estudios contables y contadores independientes en Argentina: centraliza clientes, datos fiscales, documentación y equipo en un solo lugar.",
  },
  {
    q: "¿Cómo obtienen los datos de mis clientes?",
    a: "Consultamos directamente a los servicios web de AFIP/ARCA usando el CUIT que vos ingresás, para traer razón social, actividad y estado del contribuyente en segundos.",
  },
  {
    q: "¿Qué tan segura es la clave fiscal de mis clientes?",
    a: "Se cifra en tu navegador con AES-256-GCM y una clave derivada mediante PBKDF2 con 600.000 iteraciones antes de enviarse. Ni el equipo de Kontari puede acceder a las claves en texto plano.",
  },
  {
    q: "¿Kontari usa inteligencia artificial?",
    a: "Sí. Incluye un asistente de IA integrado a toda la app: responde preguntas sobre tu cartera y tus vencimientos, analiza los documentos que subís (período, importes, CUIT) y redacta comunicaciones. Toda acción que escriba o envíe algo —crear una tarea, agendar una reunión, mandar un mensaje— la confirmás vos primero.",
  },
  {
    q: "¿Qué pasa con los datos de mis clientes al usar la IA?",
    a: "La IA viene desactivada: la habilita un administrador del estudio desde Configuración. Cuando está activa, los datos necesarios de cada consulta se envían al proveedor del modelo (a través de Vercel AI Gateway) únicamente para responder esa consulta; no se usan para entrenar modelos. El proveedor está declarado en la política de privacidad y podés desactivar la función cuando quieras.",
  },
  {
    q: "¿Kontari maneja el IVA y la contabilidad?",
    a: "Sí. Importás los comprobantes de compras y ventas desde Mis Comprobantes y Kontari arma el Libro IVA Digital, la liquidación mensual (renglones F2051) y las retenciones y percepciones (SICORE), más el tablero de Monotributo. Sobre esos mismos comprobantes genera la contabilidad: plan de cuentas, libro diario con asientos automáticos, mayor, sumas y saldos, bienes de uso, conciliación bancaria y estados contables con cierre de ejercicio.",
  },
  {
    q: "¿Kontari emite facturas electrónicas?",
    a: "Sí. Además de la facturación interna de honorarios del estudio (con cobro por link de Mercado Pago), podés emitir comprobantes electrónicos A, B, C y E con CAE real contra los web services de ARCA (WSFEv1 / WSCT). La emisión fiscal la habilita un administrador y requiere que el contribuyente delegue el servicio en ARCA.",
  },
  {
    q: "¿Puedo agendar reuniones con mis clientes desde Kontari?",
    a: "Con el plan Portal, sí: agendás videollamadas con link de Jitsi generado automáticamente, se envían invitaciones por email con archivo .ics y hay un feed iCal del estudio (vencimientos, tareas y reuniones) que podés suscribir desde Google Calendar, Outlook o cualquier app de calendario.",
  },
  {
    q: "¿Qué diferencia a cada plan?",
    a: "Solo es para un contador que gestiona su cartera puertas adentro. Estudio suma trabajo en equipo: hasta 3 profesionales con roles y permisos, organigrama, registro de tiempos y capacidad. Portal agrega la app para tus clientes, con chat y carga de documentación de su lado.",
  },
  {
    q: "¿Mis clientes pueden entrar a la plataforma?",
    a: "Con el plan Portal, sí: cada cliente tiene su propia app donde ve sus vencimientos, sube documentación y chatea con el estudio. En los planes Solo y Estudio la gestión es interna del estudio.",
  },
  {
    q: "¿Puedo cambiar de plan o cancelar cuando quiera?",
    a: "Sí, no hay permanencia mínima. Podés cancelar en cualquier momento desde tu configuración, y volver a suscribirte al plan que quieras.",
  },
  {
    q: "¿Cuántos clientes y usuarios puedo cargar?",
    a: "No hay un límite estricto de clientes (sujeto a uso justo). Los planes se diferencian por funciones y por profesionales del estudio: Solo incluye 1, Estudio y Portal hasta 3. Si son más, escribinos y armamos un plan a medida.",
  },
  {
    q: "¿Kontari reemplaza mi sistema de facturación?",
    a: "Kontari cubre el circuito impositivo y contable (IVA, liquidación, retenciones, contabilidad) y puede emitir facturas electrónicas con CAE, además de la facturación de honorarios del estudio. Si ya usás otro sistema, Kontari se integra con tu flujo cargando los comprobantes desde Mis Comprobantes.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white dark:bg-brand-900/30">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center reveal-up">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-300 uppercase tracking-widest">
            Preguntas frecuentes
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
            Todo lo que necesitás saber
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className={`faq-item reveal-up rounded-2xl border border-brand-950/10 dark:border-white/10 bg-white dark:bg-white/[0.03] px-6 ${
                openIndex === i ? "active" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                className="faq-btn w-full flex items-center justify-between py-5 text-left font-semibold"
              >
                {faq.q}
                <ChevronDown className="chev w-4 h-4 shrink-0" />
              </button>
              <div className="faq-content">
                <div>
                  <div className="pb-5 text-sm opacity-70">{faq.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
