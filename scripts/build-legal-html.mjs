// Genera kontari-landing/public/legal/*.html a partir del texto de este archivo.
// Fuente legal canónica: /legal/*.md en la raíz del repo — si editás uno, actualizá
// el body correspondiente acá y corré:  node scripts/build-legal-html.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "legal");
mkdirSync(OUT, { recursive: true });

const LAST_UPDATED = "30 de agosto de 2026";
const VERSION = "1.0";

const NAV = [
  ["terminos.html", "Términos y Condiciones de Uso", "Términos y Condiciones"],
  ["privacidad.html", "Política de Privacidad", "Política de Privacidad"],
  ["cookies.html", "Política de Cookies", "Política de Cookies"],
  [
    "tratamiento-de-datos.html",
    "Anexo de Tratamiento de Datos Personales",
    "Tratamiento de Datos",
  ],
];

const STYLE = `
:root{--bg:#f5f6fb;--surface:#fff;--text:#141833;--muted:#5b6178;--border:#e3e6f0;--brand:#3142b8;--warn-bg:#fff7ed;--warn-bd:#fed7aa;--warn-tx:#7c2d12}
@media (prefers-color-scheme:dark){:root{--bg:#0f1230;--surface:#171a3a;--text:#e8eaf6;--muted:#a2a8c8;--border:#2a2e55;--brand:#93a3f0;--warn-bg:#2a1e12;--warn-bd:#5c3d1f;--warn-tx:#fbbf77}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;line-height:1.7;font-size:16px}
a{color:var(--brand);text-underline-offset:2px}
header.site{border-bottom:1px solid var(--border)}
header.site .wrap{max-width:760px;margin:0 auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between}
header.site img{height:26px;width:auto}
header.site a.back{color:var(--muted);font-size:14px;text-decoration:none}
header.site a.back:hover{color:var(--text)}
main{max-width:760px;margin:0 auto;padding:40px 24px 80px}
h1{font-size:30px;font-weight:800;letter-spacing:-.02em;margin:0 0 6px}
.meta{color:var(--muted);font-size:12px;margin:0 0 16px}
h2{font-size:20px;font-weight:700;letter-spacing:-.01em;margin:36px 0 10px}
h3{font-size:16px;font-weight:600;margin:22px 0 6px}
p{margin:12px 0;color:var(--muted)}
strong{color:var(--text);font-weight:600}
ul,ol{margin:12px 0;padding-left:24px}
li{margin:6px 0;color:var(--muted)}
code{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.85em;background:var(--surface);border:1px solid var(--border);border-radius:4px;padding:1px 5px}
blockquote{margin:16px 0;padding:8px 0 8px 16px;border-left:2px solid var(--border);font-style:italic;color:var(--muted)}
hr{border:0;border-top:1px solid var(--border);margin:32px 0}
.tablewrap{overflow-x:auto;margin:16px 0}
table{width:100%;border-collapse:collapse;font-size:14px}
th{text-align:left;font-weight:600;border-bottom:1px solid var(--border);padding:8px 10px 8px 0;color:var(--text)}
td{border-bottom:1px solid var(--border);padding:8px 10px 8px 0;vertical-align:top;color:var(--muted)}
.notice{margin:16px 0;border:1px solid var(--warn-bd);background:var(--warn-bg);color:var(--warn-tx);border-radius:10px;padding:12px 14px;font-size:13px;line-height:1.6}
nav.docs{margin-top:8px;display:flex;flex-wrap:wrap;gap:8px 18px;font-size:14px}
nav.docs a[aria-current=page]{color:var(--text);font-weight:700;text-decoration:none}
footer.site{border-top:1px solid var(--border);margin-top:40px}
footer.site .wrap{max-width:760px;margin:0 auto;padding:20px 24px;color:var(--muted);font-size:12px}
`;

const t = (html) => `<div class="tablewrap"><table>${html}</table></div>`;

const bodies = {
  terminos: `
<p>Estos Términos y Condiciones (los <strong>“Términos”</strong>) regulan el acceso y uso de la plataforma <strong>Kontari</strong> (el <strong>“Servicio”</strong>), un software como servicio (SaaS) de gestión para estudios contables y profesionales en ciencias económicas, compuesto por un <strong>panel de contadores</strong> y un <strong>portal de clientes</strong>, accesibles desde [SITIO WEB] y las aplicaciones asociadas.</p>
<p>El Servicio es prestado por <strong>[RAZÓN SOCIAL]</strong>, [TIPO DE PERSONA], CUIT <strong>[CUIT]</strong>, con domicilio en <strong>[DOMICILIO LEGAL]</strong> (<strong>“Kontari”</strong>, <strong>“nosotros”</strong>).</p>
<p>Al registrarte, contratar un plan o utilizar el Servicio de cualquier forma, declarás haber leído, entendido y aceptado estos Términos, la <a href="/legal/privacidad.html">Política de Privacidad</a>, la <a href="/legal/cookies.html">Política de Cookies</a> y, cuando corresponda, el <a href="/legal/tratamiento-de-datos.html">Anexo de Tratamiento de Datos Personales</a>. Si no estás de acuerdo, no utilices el Servicio.</p>

<h2>1. Definiciones</h2>
<ul>
<li><strong>Usuario / vos:</strong> la persona humana o jurídica que contrata o utiliza el Servicio. Incluye al <strong>Contador</strong> (titular de la cuenta del estudio y sus colaboradores) y al <strong>Cliente Final</strong> (la persona que el Contador invita al portal de clientes).</li>
<li><strong>Contenido del Usuario:</strong> todos los datos, archivos, documentos, claves, textos y demás información que el Usuario carga, transmite o genera a través del Servicio, incluidos los datos personales y fiscales de terceros.</li>
<li><strong>Plan:</strong> la modalidad de suscripción contratada (por ejemplo Solo, Estudio o Portal), con su precio y ciclo de facturación.</li>
<li><strong>Normativa de Datos:</strong> la Ley N.º 25.326 de Protección de los Datos Personales, su decreto reglamentario y las disposiciones de la Agencia de Acceso a la Información Pública (<strong>“AAIP”</strong>), y toda norma que la modifique o reemplace.</li>
</ul>

<h2>2. Objeto y aceptación</h2>
<p>2.1. Kontari otorga al Usuario una licencia limitada, no exclusiva, intransferible y revocable para acceder y usar el Servicio conforme a estos Términos y al Plan contratado.</p>
<p>2.2. La aceptación se perfecciona por medios electrónicos. El Usuario reconoce la validez de esa manifestación de voluntad (arts. 286, 288, 1105 y concordantes del Código Civil y Comercial y Ley N.º 25.506 de Firma Digital).</p>
<p>2.3. Para contratar en representación de una persona jurídica o de un estudio, el Usuario declara tener facultades suficientes para obligarla.</p>

<h2>3. Descripción del Servicio</h2>
<p>3.1. El Servicio permite, según el Plan: gestionar la cartera de clientes del estudio y sus datos fiscales; organizar impuestos, vencimientos y tareas; almacenar y compartir documentos; administrar el equipo y sus permisos; comunicarse con los Clientes Finales por chat y coordinar reuniones por videollamada; y funcionalidades análogas que se incorporen.</p>
<p>3.2. Kontari puede modificar, agregar o discontinuar funcionalidades. Si una modificación disminuye de forma sustancial y permanente una funcionalidad esencial del Plan contratado, el Usuario podrá darse de baja sin penalidad y solicitar el reintegro proporcional del período no usado.</p>
<p>3.3. <strong>El Servicio es una herramienta de gestión y organización. No presta asesoramiento contable, impositivo, legal ni financiero, no liquida impuestos por el Usuario y no reemplaza el juicio profesional ni las obligaciones del Usuario ante la AFIP-ARCA u otros organismos.</strong> La responsabilidad por las presentaciones, declaraciones y pagos es exclusiva del Usuario.</p>

<h2>4. Registro, cuenta y acceso</h2>
<p>4.1. El acceso se realiza mediante un enlace de un solo uso enviado al correo del Usuario (<em>magic link</em>), sin contraseña. El Usuario es responsable de mantener el control y la confidencialidad de su casilla de correo y de sus dispositivos.</p>
<p>4.2. El Usuario se obliga a brindar información veraz, exacta y actualizada (incluido el CUIT y los datos de facturación) y a mantenerla al día.</p>
<p>4.3. Toda actividad realizada desde la Cuenta se presume efectuada por el Usuario. Debés notificarnos de inmediato a [EMAIL DE CONTACTO] ante cualquier uso no autorizado.</p>
<p>4.4. El Contador es responsable de las altas, bajas y permisos de los colaboradores de su estudio y de los Clientes Finales que invita, y del uso que estos hagan del Servicio.</p>

<h2>5. Planes, precios y facturación</h2>
<p>5.1. <strong>Precios.</strong> Los precios vigentes de cada Plan y ciclo (mensual, trimestral o anual) se informan en [SITIO WEB] y/o dentro del Servicio, en pesos argentinos y con los impuestos incluidos salvo indicación en contrario.</p>
<p>5.2. <strong>Medio de pago.</strong> La suscripción se abona mediante <strong>Mercado Pago</strong>, a través de un débito recurrente (<em>preapproval</em>) que el Usuario autoriza al contratar. Kontari no almacena los datos completos de la tarjeta.</p>
<p>5.3. <strong>Renovación automática.</strong> La suscripción se renueva automáticamente al final de cada ciclo por un período igual, al precio vigente, hasta que el Usuario la cancele conforme a la cláusula 16.</p>
<p>5.4. <strong>Cambios de precio.</strong> Los aumentos se notificarán con una antelación mínima de <strong>quince (15) días corridos</strong> al correo del Usuario y se aplicarán a partir del ciclo siguiente. Si el Usuario no está de acuerdo, puede cancelar antes de la renovación.</p>
<p>5.5. <strong>Mora y suspensión por falta de pago.</strong> Si un pago es rechazado, Kontari podrá reintentarlo y notificar. Transcurridos <strong>diez (10) días corridos</strong> de mora, Kontari podrá suspender el acceso; transcurridos <strong>treinta (30) días</strong>, podrá dar de baja la Cuenta conforme a la cláusula 17.</p>
<p>5.6. <strong>Impuestos.</strong> Todo tributo, retención o percepción que grave la contratación y que legalmente esté a cargo del Usuario, será soportado por este.</p>
<p>5.7. <strong>Facturación.</strong> Kontari emitirá el comprobante fiscal correspondiente a nombre y CUIT informados por el Usuario.</p>

<h2>6. Prueba gratuita y bonificaciones</h2>
<p>Si Kontari ofrece un período de prueba, una bonificación o un descuento promocional, sus condiciones y duración se informarán al momento de la oferta. Al finalizar el período de prueba, la suscripción paga comienza automáticamente salvo cancelación previa. Kontari puede modificar o discontinuar las promociones para nuevas contrataciones.</p>

<h2>7. Contenido del Usuario y titularidad</h2>
<p>7.1. <strong>El Contenido del Usuario es y sigue siendo propiedad del Usuario.</strong> Kontari no adquiere ningún derecho sobre él, salvo la licencia limitada del punto 7.2.</p>
<p>7.2. El Usuario otorga a Kontari una licencia mundial, no exclusiva y libre de regalías para <strong>alojar, reproducir, procesar, transmitir y mostrar</strong> el Contenido del Usuario, únicamente con el fin de prestar, mantener y mejorar el Servicio, brindar soporte y cumplir obligaciones legales.</p>
<p>7.3. El Usuario es el único responsable del Contenido del Usuario, de su licitud y de contar con todos los derechos y consentimientos necesarios para cargarlo, incluidos los datos personales y fiscales de terceros.</p>
<p>7.4. <strong>Datos personales de terceros.</strong> Cuando el Usuario cargue datos personales de personas distintas de sí mismo, actuará como <strong>responsable del tratamiento</strong> y Kontari como <strong>encargado del tratamiento</strong>, en los términos del <a href="/legal/tratamiento-de-datos.html">Anexo de Tratamiento de Datos Personales</a>, que forma parte integrante de estos Términos.</p>
<p>7.5. <strong>Copias de seguridad.</strong> Kontari realiza copias de seguridad periódicas con fines de continuidad, pero <strong>el Usuario debe conservar sus propias copias</strong> del Contenido crítico. Kontari no es un servicio de resguardo ni de archivo.</p>

<h2>8. Botón de arrepentimiento (consumidores)</h2>
<p>Si el Usuario reviste el carácter de consumidor conforme a la Ley N.º 24.240, tiene derecho a <strong>revocar la contratación dentro de los diez (10) días corridos</strong> desde la contratación, sin expresión de causa ni penalidad (art. 34 Ley 24.240 y Resolución 424/2020 SCI). Para ejercerlo puede utilizar el <strong>“Botón de Arrepentimiento”</strong> disponible en [SITIO WEB] o escribir a [EMAIL DE BAJAS]. Ejercida la revocación en plazo, Kontari reintegrará las sumas abonadas.</p>

<h2>9. Uso aceptable</h2>
<p>El Usuario se obliga a no:</p>
<ul>
<li>usar el Servicio con fines ilícitos, fraudulentos o contrarios a la buena fe, la moral o el orden público;</li>
<li>cargar contenido que infrinja derechos de terceros, contenga malware o sea difamatorio, discriminatorio o ilegal;</li>
<li>acceder o intentar acceder a cuentas, sistemas o datos ajenos, vulnerar medidas de seguridad o realizar pruebas de intrusión sin autorización escrita;</li>
<li>sobrecargar la infraestructura, hacer <em>scraping</em> masivo, o usar el Servicio mediante bots o de forma automatizada no prevista por la API;</li>
<li>revender, sublicenciar o prestar el Servicio a terceros fuera del alcance del Plan, ni usarlo para desarrollar un producto competitivo;</li>
<li>remover o alterar avisos de propiedad intelectual;</li>
<li>utilizar el Servicio para enviar comunicaciones no solicitadas (spam).</li>
</ul>

<h2>10. Servicios de terceros</h2>
<p>El Servicio se integra o depende de proveedores de terceros, entre ellos <strong>Mercado Pago</strong> (pagos), <strong>Vercel</strong> (hosting), <strong>Resend</strong> (envío de correos), proveedores de <strong>videollamadas</strong> y los sistemas de <strong>AFIP-ARCA</strong> y demás organismos. Kontari no controla esos servicios y no responde por sus interrupciones, cambios, errores o políticas.</p>

<h2>11. Propiedad intelectual de Kontari</h2>
<p>El Servicio, su software, código, diseño, marcas, logotipos, textos y documentación son de titularidad de Kontari o de sus licenciantes y están protegidos por la normativa de propiedad intelectual (Ley N.º 11.723 y Ley N.º 22.362). Estos Términos no transfieren ningún derecho de propiedad intelectual al Usuario más allá de la licencia de uso de la cláusula 2.1. El Usuario puede enviar sugerencias; Kontari podrá usarlas libremente sin obligación de compensación.</p>

<h2>12. Disponibilidad, mantenimiento y soporte</h2>
<p>12.1. Kontari realiza esfuerzos razonables para mantener el Servicio disponible de forma continua, pero <strong>no garantiza una disponibilidad ininterrumpida ni libre de errores</strong>.</p>
<p>12.2. Kontari podrá realizar mantenimiento programado, procurando avisar con antelación, y mantenimiento de emergencia sin aviso previo.</p>
<p>12.3. El soporte se presta por los canales indicados en el Servicio, en días y horarios hábiles, con esfuerzos razonables de respuesta según el Plan.</p>

<h2>13. Garantías</h2>
<p>El Servicio se provee <strong>“tal cual”</strong> y <strong>“según disponibilidad”</strong>. En la máxima medida permitida por la ley, Kontari no otorga garantías implícitas de comerciabilidad, idoneidad para un fin determinado, exactitud, integridad o no infracción. Ninguna disposición de esta cláusula limita los derechos irrenunciables que la Ley N.º 24.240 reconoce a los consumidores.</p>

<h2>14. Limitación de responsabilidad</h2>
<p>14.1. En la máxima medida permitida por la ley, Kontari <strong>no responde</strong> por daños indirectos, lucro cesante, pérdida de chance, pérdida de datos, multas, intereses, sanciones o perjuicios derivados de: (i) el incumplimiento de obligaciones fiscales o legales del Usuario; (ii) errores u omisiones en el Contenido del Usuario; (iii) el uso o la imposibilidad de uso del Servicio; (iv) fallas de servicios de terceros; (v) fuerza mayor o caso fortuito.</p>
<p>14.2. La responsabilidad total y acumulada de Kontari por cualquier reclamo vinculado al Servicio se limita al <strong>monto efectivamente abonado por el Usuario en los doce (12) meses anteriores</strong> al hecho que originó el reclamo.</p>
<p>14.3. Las limitaciones de esta cláusula no aplican al dolo ni a la responsabilidad que no pueda limitarse o excluirse conforme a la ley, incluida la que corresponde frente a consumidores.</p>

<h2>15. Indemnidad</h2>
<p>El Usuario mantendrá indemne a Kontari, sus socios, administradores y dependientes frente a todo reclamo, demanda, multa o gasto (incluidos honorarios legales razonables) de terceros que derive de: (i) el Contenido del Usuario; (ii) el incumplimiento de estos Términos o de la Normativa de Datos por parte del Usuario; (iii) el uso indebido del Servicio.</p>

<h2>16. Cancelación por el Usuario (“baja fácil”)</h2>
<p>16.1. El Usuario puede <strong>cancelar la suscripción en cualquier momento</strong>, sin expresión de causa, desde la sección de configuración de la Cuenta, mediante el enlace de <strong>baja</strong> publicado en [SITIO WEB], o escribiendo a [EMAIL DE BAJAS]. La baja se hace efectiva de forma inmediata y sin condicionarla a llamados, retenciones ni trámites adicionales (Resolución 424/2020 SCI).</p>
<p>16.2. La cancelación surte efecto al finalizar el ciclo ya abonado; no corresponden reintegros por períodos iniciados, salvo el caso de la cláusula 3.2, el ejercicio del botón de arrepentimiento (cláusula 8) o disposición legal en contrario.</p>
<p>16.3. Tras la baja, el Usuario dispondrá de <strong>treinta (30) días corridos</strong> para exportar su Contenido. Vencido ese plazo, Kontari podrá eliminarlo conforme a la Política de Privacidad y al Anexo de Tratamiento de Datos.</p>

<h2>17. Suspensión y baja por Kontari</h2>
<p>Kontari podrá suspender o dar de baja la Cuenta, total o parcialmente, con aviso cuando sea posible, si: (i) el Usuario incumple estos Términos o la ley; (ii) existe mora en el pago conforme a la cláusula 5.5; (iii) hay riesgo de seguridad, fraude o uso que perjudique a terceros o a la infraestructura; (iv) lo exige una autoridad competente. Cuando la causa sea subsanable, Kontari otorgará un plazo razonable para corregirla antes de la baja definitiva.</p>

<h2>18. Modificaciones de los Términos</h2>
<p>Kontari podrá modificar estos Términos. Los cambios sustanciales se notificarán al correo del Usuario y/o dentro del Servicio con una antelación mínima de <strong>diez (10) días corridos</strong> a su entrada en vigencia. El uso del Servicio con posterioridad a esa fecha implica la aceptación de la nueva versión. Si el Usuario no la acepta, puede darse de baja antes de su entrada en vigencia.</p>

<h2>19. Notificaciones</h2>
<p>Las notificaciones a Kontari se cursan a [EMAIL DE CONTACTO]. Las notificaciones al Usuario se cursan al correo registrado en la Cuenta o mediante avisos dentro del Servicio, y se tendrán por recibidas al día hábil siguiente de su envío.</p>

<h2>20. Cesión</h2>
<p>El Usuario no puede ceder su posición contractual sin el consentimiento previo y escrito de Kontari. Kontari puede ceder el contrato en el marco de una reorganización societaria, fusión o venta de activos, dando aviso al Usuario.</p>

<h2>21. Ley aplicable y jurisdicción</h2>
<p>21.1. Estos Términos se rigen por las leyes de la <strong>República Argentina</strong>.</p>
<p>21.2. Para todo conflicto, las partes se someten a <strong>[JURISDICCIÓN]</strong>, con renuncia a cualquier otro fuero.</p>
<p>21.3. <strong>Consumidores.</strong> Si el Usuario es consumidor, prevalece la jurisdicción de su domicilio (art. 36 Ley 24.240) y puede acudir al Servicio de Conciliación Previa en las Relaciones de Consumo (COPREC) y a la Ventanilla Única Federal de Defensa del Consumidor.</p>

<h2>22. Disposiciones generales</h2>
<p>22.1. <strong>Autonomía de las cláusulas.</strong> La nulidad o inaplicabilidad de una cláusula no afecta la validez de las restantes.</p>
<p>22.2. <strong>Acuerdo íntegro.</strong> Estos Términos, junto con la Política de Privacidad, la Política de Cookies, el Anexo de Tratamiento de Datos y las condiciones del Plan, constituyen el acuerdo íntegro entre las partes.</p>
<p>22.3. <strong>Tolerancia.</strong> La falta de ejercicio de un derecho por Kontari no implica su renuncia.</p>
<p>22.4. <strong>Idioma.</strong> La versión en español es la única con valor legal.</p>

<h2>23. Contacto</h2>
<p><strong>[RAZÓN SOCIAL]</strong> — CUIT [CUIT]<br />Domicilio: [DOMICILIO LEGAL]<br />Correo: [EMAIL DE CONTACTO]<br />Sitio: [SITIO WEB]</p>
`,

  privacidad: `
<p>Esta Política explica cómo <strong>[RAZÓN SOCIAL]</strong>, CUIT <strong>[CUIT]</strong>, con domicilio en <strong>[DOMICILIO LEGAL]</strong> (<strong>“Kontari”</strong>), trata los datos personales en el marco de la plataforma <strong>Kontari</strong> (el <strong>“Servicio”</strong>), conforme a la <strong>Ley N.º 25.326</strong> de Protección de los Datos Personales, su Decreto N.º 1558/2001 y las disposiciones de la <strong>Agencia de Acceso a la Información Pública (“AAIP”)</strong>.</p>

<h2>1. Responsable de la base de datos</h2>
<p>El responsable es <strong>[RAZÓN SOCIAL]</strong>. Consultas y ejercicio de derechos: <strong>[EMAIL DE PRIVACIDAD]</strong>.</p>

<h2>2. A quién aplica</h2>
<p>Esta Política aplica a: (a) los <strong>Contadores</strong> y colaboradores de estudios que contratan y usan el panel; (b) los <strong>Clientes Finales</strong> que acceden al portal de clientes; (c) los <strong>visitantes</strong> del sitio [SITIO WEB].</p>
<p><strong>Datos de terceros cargados por el Contador.</strong> Cuando un Contador carga en el Servicio datos de sus propios clientes (nombres, CUIT, claves fiscales, documentación, etc.), <strong>el Contador es el responsable del tratamiento</strong> de esos datos y <strong>Kontari actúa como encargado</strong>, siguiendo sus instrucciones. El régimen de ese tratamiento está en el <a href="/legal/tratamiento-de-datos.html">Anexo de Tratamiento de Datos Personales</a>. Si sos cliente de un estudio y querés ejercer tus derechos sobre esos datos, dirigite a tu contador; Kontari lo asistirá.</p>

<h2>3. Qué datos recopilamos</h2>
<h3>3.1. Datos que nos proporcionás</h3>
<ul>
<li><strong>De registro y cuenta:</strong> nombre y apellido o razón social, correo electrónico, CUIT, teléfono (opcional), rol dentro del estudio.</li>
<li><strong>De facturación:</strong> condición frente al IVA, domicilio fiscal, datos necesarios para emitir el comprobante. Los pagos se procesan por <strong>Mercado Pago</strong>; Kontari no recibe ni almacena el número completo de tarjeta.</li>
<li><strong>De soporte y comunicaciones:</strong> el contenido de los mensajes que nos enviás y de los chats y reuniones dentro del Servicio.</li>
<li><strong>Contenido del Usuario:</strong> documentos, tareas, datos de clientes, impuestos y demás información que cargás (ver cláusula 2).</li>
</ul>
<h3>3.2. Datos que se recopilan automáticamente</h3>
<ul>
<li><strong>Datos técnicos y de uso:</strong> dirección IP, tipo de navegador y dispositivo, sistema operativo, fecha y hora, páginas y acciones dentro del Servicio, identificadores de sesión, registros de errores.</li>
<li><strong>Cookies y tecnologías similares:</strong> ver la <a href="/legal/cookies.html">Política de Cookies</a>. Kontari no utiliza cookies de analítica de terceros ni de publicidad.</li>
</ul>
<p>No solicitamos datos sensibles (art. 2 Ley 25.326) para la operación del Servicio. Si el Contenido del Usuario incluyera datos sensibles de terceros, su tratamiento queda bajo responsabilidad del Contador conforme al Anexo.</p>

<h2>4. Con qué finalidad y base de licitud</h2>
${t(`<thead><tr><th>Finalidad</th><th>Base de licitud (Ley 25.326)</th></tr></thead><tbody>
<tr><td>Crear y administrar tu cuenta; autenticarte por magic link</td><td>Ejecución de la relación contractual (art. 5 inc. 2.a)</td></tr>
<tr><td>Prestar, mantener y mejorar el Servicio</td><td>Ejecución contractual / interés legítimo</td></tr>
<tr><td>Procesar pagos y emitir comprobantes</td><td>Ejecución contractual y obligación legal (normativa AFIP-ARCA)</td></tr>
<tr><td>Brindar soporte y responder consultas</td><td>Ejecución contractual / consentimiento</td></tr>
<tr><td>Enviar avisos operativos (cambios de términos, seguridad, vencimientos, facturación)</td><td>Ejecución contractual / obligación legal</td></tr>
<tr><td>Enviar novedades y comunicaciones comerciales de Kontari</td><td>Consentimiento (revocable en cualquier momento)</td></tr>
<tr><td>Prevenir fraude, abuso y garantizar la seguridad</td><td>Interés legítimo / obligación legal</td></tr>
<tr><td>Cumplir requerimientos de autoridades y ejercer o defender derechos</td><td>Obligación legal</td></tr>
</tbody>`)}

<h2>5. Cuánto tiempo conservamos los datos</h2>
<ul>
<li><strong>Datos de cuenta y Contenido del Usuario:</strong> mientras la cuenta esté activa y hasta <strong>[PLAZO CONSERVACIÓN] meses</strong> después de la baja, salvo supresión anticipada o norma que exija conservarlos más tiempo.</li>
<li><strong>Datos de facturación y comprobantes:</strong> por el plazo que exige la normativa fiscal y comercial (hasta 10 años).</li>
<li><strong>Logs técnicos y de seguridad:</strong> hasta 12 meses.</li>
<li><strong>Comunicaciones comerciales:</strong> hasta que revoques el consentimiento.</li>
</ul>
<p>Vencidos los plazos, los datos se eliminan o se anonimizan de forma irreversible.</p>

<h2>6. Con quién compartimos los datos</h2>
<p>Kontari no vende datos personales. Los comparte únicamente con:</p>
<ul>
<li><strong>Encargados / proveedores que actúan por cuenta de Kontari:</strong> Vercel Inc. (hosting/CDN, EE. UU.); proveedor de base de datos PostgreSQL administrada; Resend (correos transaccionales); Mercado Pago / MercadoLibre S.R.L. (pagos y suscripciones); proveedor de videollamadas; herramientas de soporte y monitoreo de errores.</li>
<li><strong>Autoridades públicas</strong> competentes, ante un requerimiento legal.</li>
<li><strong>Terceros en una reorganización societaria</strong> (fusión, adquisición, venta de activos), informándote previamente.</li>
</ul>
<p>Con cada encargado se celebran acuerdos que exigen niveles de protección adecuados y el uso de los datos sólo para prestar el servicio contratado.</p>

<h2>7. Transferencias internacionales</h2>
<p>Algunos proveedores (p. ej. Vercel, Resend) están ubicados fuera de la Argentina, principalmente en <strong>Estados Unidos</strong>. Cuando el país de destino no sea considerado de protección adecuada por la AAIP, la transferencia se ampara en cláusulas contractuales con obligaciones equivalentes a la Ley 25.326 o en alguna de las excepciones de su art. 12 (entre ellas, la ejecución del contrato con vos).</p>

<h2>8. Seguridad</h2>
<p>Kontari aplica medidas técnicas y organizativas razonables acordes al estado de la técnica y a la normativa de la AAIP: cifrado en tránsito (HTTPS/TLS), control de acceso por roles y permisos, autenticación sin contraseña por enlace de un solo uso, aislamiento de datos por cuenta, registros de auditoría, copias de seguridad y revisión de accesos. Ante un incidente de seguridad que afecte datos personales, Kontari lo comunicará a los usuarios afectados y a la AAIP cuando corresponda, sin dilación indebida.</p>

<h2>9. Tus derechos</h2>
<p>Como titular de los datos podés ejercer los derechos de <strong>acceso, rectificación, actualización y supresión</strong> de tus datos personales, así como <strong>oponerte</strong> a determinados tratamientos y <strong>revocar</strong> consentimientos.</p>
<ul>
<li><strong>Cómo:</strong> escribí a <strong>[EMAIL DE PRIVACIDAD]</strong> desde el correo registrado, o usá las opciones de tu perfil dentro del Servicio.</li>
<li><strong>Acceso:</strong> gratuito a intervalos no inferiores a seis (6) meses. Se responde dentro de los <strong>diez (10) días corridos</strong> (art. 14 Ley 25.326).</li>
<li><strong>Rectificación / supresión:</strong> se resuelven dentro de los <strong>cinco (5) días hábiles</strong> (art. 16 Ley 25.326).</li>
<li><strong>Baja de comunicaciones comerciales:</strong> cada correo incluye un enlace para desuscribirte.</li>
</ul>
<p><strong>Autoridad de control.</strong> Si considerás que tus derechos no fueron atendidos, podés reclamar ante la <strong>Agencia de Acceso a la Información Pública</strong> (Av. Pte. Julio A. Roca 710, Piso 2, CABA — argentina.gob.ar/aaip).</p>
<blockquote>La AAIP, Órgano de Control de la Ley N.º 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.</blockquote>

<h2>10. Datos de niñas, niños y adolescentes</h2>
<p>El Servicio está dirigido a profesionales y no está destinado a menores de 18 años. No recopilamos deliberadamente sus datos. Si un Contador carga datos de menores como parte del Contenido del Usuario, es responsable de contar con la base legal correspondiente.</p>

<h2>11. Decisiones automatizadas</h2>
<p>Kontari no adopta decisiones que produzcan efectos jurídicos sobre las personas basadas únicamente en tratamientos automatizados de sus datos.</p>

<h2>12. Cambios a esta Política</h2>
<p>Podemos actualizar esta Política. Los cambios sustanciales se notificarán al correo registrado y/o dentro del Servicio con al menos <strong>diez (10) días corridos</strong> de antelación.</p>

<h2>13. Contacto</h2>
<p><strong>[RAZÓN SOCIAL]</strong> — CUIT [CUIT]<br />Domicilio: [DOMICILIO LEGAL]<br />Privacidad y derechos: <strong>[EMAIL DE PRIVACIDAD]</strong><br />Contacto general: [EMAIL DE CONTACTO]</p>
`,

  cookies: `
<p>Esta Política explica cómo <strong>Kontari</strong> ([RAZÓN SOCIAL], CUIT [CUIT]) utiliza cookies y tecnologías de almacenamiento local en [SITIO WEB], en el panel de contadores y en el portal de clientes (el <strong>“Servicio”</strong>). Complementa la <a href="/legal/privacidad.html">Política de Privacidad</a>.</p>

<h2>1. Qué son las cookies</h2>
<p>Una cookie es un pequeño archivo que un sitio guarda en tu navegador. Sirve, entre otras cosas, para mantener tu sesión iniciada, recordar preferencias y proteger la seguridad de la navegación. Tecnologías equivalentes como <code>localStorage</code> y <code>sessionStorage</code> almacenan información de forma similar; en esta Política las llamamos genéricamente “cookies”.</p>

<h2>2. Qué cookies utilizamos</h2>
<p>Kontari utiliza <strong>únicamente cookies técnicas necesarias</strong> para que el Servicio funcione y sea seguro. <strong>No usamos cookies de analítica de terceros, de seguimiento publicitario ni de redes sociales.</strong> En la landing sólo se guarda la preferencia de tema y de este aviso.</p>
${t(`<thead><tr><th>Nombre</th><th>Tipo</th><th>Finalidad</th><th>Duración</th><th>Origen</th></tr></thead><tbody>
<tr><td>kontari-landing-theme (localStorage)</td><td>Funcional</td><td>Recordar la preferencia de tema claro/oscuro en el sitio</td><td>Persistente</td><td>Propia</td></tr>
<tr><td>kontari-cookie-consent (localStorage)</td><td>Necesaria</td><td>Recordar que ya viste y aceptaste este aviso</td><td>12 meses</td><td>Propia</td></tr>
<tr><td>authjs.session-token / __Secure-authjs.session-token</td><td>Necesaria</td><td>Mantener la sesión iniciada en la aplicación</td><td>Hasta 30 días</td><td>Propia</td></tr>
<tr><td>authjs.csrf-token</td><td>Necesaria</td><td>Protección contra ataques CSRF en el inicio de sesión</td><td>Sesión</td><td>Propia</td></tr>
<tr><td>authjs.callback-url</td><td>Necesaria</td><td>Recordar a qué página volver luego de iniciar sesión</td><td>Sesión</td><td>Propia</td></tr>
<tr><td>Cookies de Mercado Pago</td><td>Terceros</td><td>Procesamiento del pago y prevención de fraude durante el checkout</td><td>Según Mercado Pago</td><td>Terceros</td></tr>
</tbody>`)}
<p>Los nombres exactos de las cookies de sesión pueden variar según el entorno (<code>http</code>/<code>https</code>) y la versión de la librería de autenticación. Las cookies de Mercado Pago se establecen sólo si iniciás un pago y se rigen por la <a href="https://www.mercadopago.com.ar/privacidad" target="_blank" rel="noreferrer">política de privacidad de Mercado Pago</a>.</p>

<h2>3. Base legal</h2>
<p>Las cookies técnicas necesarias no requieren consentimiento previo porque son imprescindibles para prestar un servicio expresamente solicitado por vos (iniciar sesión, pagar, recordar tus preferencias). Igualmente te informamos de su uso mediante un aviso al ingresar. Si en el futuro incorporamos cookies de analítica o de marketing, te pediremos el consentimiento previo y podrás aceptarlas o rechazarlas por categoría.</p>

<h2>4. Cómo gestionar o eliminar cookies</h2>
<p>Podés bloquear o eliminar las cookies desde la configuración de tu navegador (Chrome, Firefox, Safari, Edge — sección de Privacidad / Cookies).</p>
<p><strong>Importante:</strong> si bloqueás las cookies necesarias, <strong>no vas a poder iniciar sesión ni usar el Servicio</strong>, porque dependen de ellas para mantener la sesión y la seguridad.</p>

<h2>5. Cambios</h2>
<p>Si cambian las cookies que utilizamos, actualizaremos esta Política y, cuando corresponda, volveremos a mostrar el aviso.</p>

<h2>6. Contacto</h2>
<p>Consultas sobre esta Política: <strong>[EMAIL DE PRIVACIDAD]</strong> — [RAZÓN SOCIAL], [DOMICILIO LEGAL].</p>
`,

  "tratamiento-de-datos": `
<p>Este Anexo forma parte de los <a href="/legal/terminos.html">Términos y Condiciones</a> de <strong>Kontari</strong> y regula el tratamiento de datos personales que <strong>Kontari</strong> ([RAZÓN SOCIAL], CUIT [CUIT], [DOMICILIO LEGAL] — el <strong>“Encargado”</strong>) realiza <strong>por cuenta y siguiendo las instrucciones</strong> del Usuario que contrata el Servicio (el <strong>“Responsable”</strong>), cuando este carga en la plataforma datos personales de terceros. Se aplica la <strong>Ley N.º 25.326</strong>, su Decreto N.º 1558/2001 y las Resoluciones de la <strong>AAIP</strong> aplicables (art. 25 Ley 25.326).</p>

<h2>1. Roles</h2>
<p>1.1. El <strong>Responsable</strong> determina la finalidad, el contenido y el uso de los datos personales que carga en el Servicio. Declara contar con base de licitud y, cuando corresponda, con el consentimiento de los titulares, y haber cumplido el deber de información (art. 6 Ley 25.326).</p>
<p>1.2. El <strong>Encargado</strong> trata esos datos <strong>únicamente</strong> para prestar el Servicio conforme a los Términos, a este Anexo y a las instrucciones documentadas del Responsable. El Encargado no cede los datos ni los usa para fines propios (art. 25.2 Ley 25.326).</p>
<p>1.3. Si el Encargado estuviera obligado por ley a un tratamiento no previsto en las instrucciones, informará al Responsable antes de tratarlo, salvo prohibición legal.</p>

<h2>2. Objeto, duración, naturaleza y finalidad</h2>
<ul>
<li><strong>Objeto:</strong> el tratamiento necesario para alojar y operar la información de gestión del estudio contable dentro del Servicio.</li>
<li><strong>Duración:</strong> mientras esté vigente el contrato del Servicio, más el período de recuperación/eliminación de la cláusula 9.</li>
<li><strong>Naturaleza y finalidad:</strong> almacenamiento, organización, consulta, comunicación entre Responsable y sus clientes, respaldo y supresión, para que el Responsable gestione su actividad profesional.</li>
<li><strong>Detalle</strong> de categorías de datos y de titulares: Anexo I.</li>
</ul>

<h2>3. Instrucciones del Responsable</h2>
<p>Las instrucciones del Responsable son los Términos, este Anexo, la configuración que aplica en el Servicio (permisos, usuarios, clientes, datos que decide cargar) y toda indicación adicional que curse por escrito a [EMAIL DE PRIVACIDAD]. El Encargado avisará si, a su criterio, una instrucción infringe la Normativa de Datos.</p>

<h2>4. Confidencialidad</h2>
<p>El Encargado garantiza que las personas autorizadas a tratar los datos se obligaron a la confidencialidad y recibieron la formación necesaria. El deber de confidencialidad subsiste tras la finalización de la relación (art. 10 Ley 25.326).</p>

<h2>5. Medidas de seguridad</h2>
<p>El Encargado aplica las medidas técnicas y organizativas descriptas en el Anexo II, acordes al art. 9 de la Ley 25.326 y a la normativa de seguridad de la AAIP. Podrá actualizarlas siempre que no disminuya el nivel de protección.</p>

<h2>6. Subencargados</h2>
<p>6.1. El Responsable <strong>autoriza de forma general</strong> al Encargado a contratar subencargados para prestar el Servicio. La lista vigente está en el Anexo III.</p>
<p>6.2. El Encargado impone a cada subencargado, por contrato, obligaciones de protección de datos equivalentes a las de este Anexo, y responde frente al Responsable por su gestión.</p>
<p>6.3. El Encargado informará con antelación razonable la incorporación o sustitución de subencargados. El Responsable podrá oponerse por motivos fundados vinculados a la protección de datos dentro de los <strong>quince (15) días corridos</strong>; si la objeción no puede resolverse, podrá rescindir el Servicio sin penalidad.</p>

<h2>7. Asistencia al Responsable</h2>
<p>Teniendo en cuenta la naturaleza del tratamiento, el Encargado asistirá al Responsable, en la medida de lo razonable, para: (a) atender los derechos de los titulares (acceso, rectificación, actualización, supresión, oposición) —si un titular contacta directamente al Encargado, este lo derivará al Responsable—; (b) garantizar la seguridad del tratamiento; (c) notificar incidentes de seguridad; (d) realizar evaluaciones de impacto, cuando correspondan. El Servicio incluye herramientas de exportación y de eliminación de datos.</p>

<h2>8. Incidentes de seguridad</h2>
<p>El Encargado notificará al Responsable <strong>sin dilación indebida y a más tardar dentro de las 48 horas</strong> de haber tomado conocimiento de un incidente de seguridad que afecte datos personales tratados por cuenta del Responsable, con la información disponible sobre naturaleza, categorías y volumen aproximado de datos y titulares afectados, consecuencias probables y medidas adoptadas. La notificación a los titulares y a la AAIP, si corresponde, es responsabilidad del Responsable, con asistencia del Encargado.</p>

<h2>9. Devolución o supresión al finalizar</h2>
<p>A la terminación del Servicio, el Encargado, a elección del Responsable: (i) mantendrá disponible la exportación del Contenido del Usuario durante <strong>treinta (30) días corridos</strong>; y luego (ii) eliminará o anonimizará de forma irreversible los datos personales tratados por cuenta del Responsable dentro de los <strong>[PLAZO CONSERVACIÓN] meses</strong> siguientes, incluidas las copias, salvo que una norma exija conservarlos, en cuyo caso los aislará y protegerá hasta que cese esa obligación.</p>

<h2>10. Auditoría e información</h2>
<p>El Encargado pondrá a disposición del Responsable la información razonablemente necesaria para demostrar el cumplimiento de este Anexo. Una vez al año, o ante un incidente relevante, el Responsable podrá solicitar información adicional o una auditoría acotada, con preaviso de <strong>treinta (30) días</strong>, en horario laboral, sin afectar la operación ni la confidencialidad de otros clientes, y a su costa. Pueden sustituirse por informes o certificaciones de terceros que posea el Encargado.</p>

<h2>11. Transferencias internacionales</h2>
<p>El Encargado podrá tratar y almacenar datos en servidores de subencargados ubicados fuera de la Argentina (ver Anexo III), amparando la transferencia en cláusulas contractuales con obligaciones equivalentes a la Ley 25.326 o en las excepciones de su art. 12. El Responsable presta su conformidad con estas transferencias en tanto sean necesarias para prestar el Servicio.</p>

<h2>12. Responsabilidad</h2>
<p>Cada parte responde por el incumplimiento de las obligaciones que este Anexo pone a su cargo. La responsabilidad del Encargado frente al Responsable se rige, además, por los límites de la cláusula 14 de los Términos. Nada en este Anexo limita la responsabilidad de cada parte frente a los titulares de los datos o frente a la AAIP conforme a la ley.</p>

<h2>13. Vigencia y prevalencia</h2>
<p>Este Anexo rige mientras el Encargado trate datos personales por cuenta del Responsable. En caso de contradicción entre este Anexo y el resto de los Términos <strong>en materia de protección de datos personales</strong>, prevalece este Anexo.</p>

<hr />
<h2>Anexo I — Detalle del tratamiento</h2>
<h3>Categorías de titulares de datos</h3>
<ul>
<li>Clientes del estudio contable (personas humanas y representantes de personas jurídicas).</li>
<li>Dependientes, socios y contactos de esos clientes.</li>
<li>Colaboradores del estudio dados de alta por el Responsable.</li>
</ul>
<h3>Categorías de datos personales</h3>
<ul>
<li>Identificación y contacto: nombre y apellido, razón social, CUIT/CUIL/DNI, domicilio, correo electrónico, teléfono.</li>
<li>Datos fiscales y previsionales: condición ante AFIP-ARCA, impuestos y regímenes, vencimientos, claves fiscales y credenciales que el Responsable decida almacenar, montos y datos de declaraciones.</li>
<li>Documentación cargada por el Responsable o sus clientes (comprobantes, estados, formularios, escaneos).</li>
<li>Datos de comunicación: mensajes de chat, participación en reuniones y sus metadatos.</li>
<li>Datos de uso del portal por parte de los clientes del estudio.</li>
</ul>
<h3>Operaciones de tratamiento</h3>
<p>Recolección, registro, organización, conservación, consulta, modificación, comunicación entre Responsable y sus clientes, respaldo, bloqueo y supresión.</p>

<h2>Anexo II — Medidas de seguridad</h2>
<ul>
<li>Cifrado de las comunicaciones en tránsito mediante TLS/HTTPS.</li>
<li>Control de acceso basado en roles y permisos; principio de mínimo privilegio.</li>
<li>Autenticación de usuarios sin contraseña, mediante enlace de un solo uso enviado al correo verificado.</li>
<li>Segregación lógica de los datos por cuenta / organización.</li>
<li>Registros de auditoría de accesos y operaciones sensibles.</li>
<li>Copias de seguridad periódicas y procedimientos de restauración.</li>
<li>Gestión de vulnerabilidades y actualización de dependencias.</li>
<li>Acceso del personal del Encargado limitado, nominado y sujeto a confidencialidad.</li>
<li>Procedimiento de gestión y notificación de incidentes de seguridad.</li>
<li>Baja segura de datos y de soportes.</li>
</ul>

<h2>Anexo III — Subencargados autorizados</h2>
${t(`<thead><tr><th>Subencargado</th><th>Servicio prestado</th><th>Ubicación</th></tr></thead><tbody>
<tr><td>Vercel Inc.</td><td>Hosting, CDN y ejecución de la aplicación</td><td>Estados Unidos</td></tr>
<tr><td>Proveedor de PostgreSQL administrado [COMPLETAR: Neon / Supabase / Railway]</td><td>Base de datos</td><td>[COMPLETAR: región]</td></tr>
<tr><td>Resend, Inc.</td><td>Envío de correos transaccionales</td><td>Estados Unidos</td></tr>
<tr><td>MercadoLibre S.R.L. — Mercado Pago</td><td>Procesamiento de pagos y suscripciones</td><td>Argentina</td></tr>
<tr><td>[COMPLETAR: proveedor de videollamadas / Jitsi]</td><td>Reuniones por video</td><td>[COMPLETAR]</td></tr>
<tr><td>[COMPLETAR: almacenamiento de archivos, p. ej. Vercel Blob / S3]</td><td>Almacenamiento de documentos</td><td>[COMPLETAR]</td></tr>
</tbody>`)}
<blockquote>Revisá y completá esta tabla con los proveedores reales y sus regiones antes de publicar. Mantené la lista sincronizada con la cláusula 6 de la Política de Privacidad.</blockquote>
`,
};

function page(file, title, bodyHtml) {
  const nav = NAV.map(
    ([href, , label]) =>
      `<a href="/legal/${href}"${href === file ? ' aria-current="page"' : ""}>${label}</a>`,
  ).join("\n        ");
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title} — Kontari</title>
<meta name="description" content="${title} de Kontari." />
<link rel="icon" href="/assets/k-logo.svg" type="image/svg+xml" />
<style>${STYLE}</style>
</head>
<body>
<header class="site">
  <div class="wrap">
    <a href="/"><img src="/assets/kontari-logo.svg" alt="Kontari" /></a>
    <a class="back" href="/">Volver al inicio</a>
  </div>
</header>
<main>
  <h1>${title}</h1>
  <p class="meta">Última actualización: ${LAST_UPDATED} · Versión ${VERSION}</p>
  <div class="notice"><strong>Borrador pendiente de completar.</strong> Reemplazá los marcadores entre corchetes (<code>[RAZÓN SOCIAL]</code>, <code>[CUIT]</code>, <code>[DOMICILIO LEGAL]</code>, <code>[EMAIL DE CONTACTO]</code>, <code>[JURISDICCIÓN]</code>, etc.) con los datos reales antes de publicar. Ver <code>legal/README.md</code> en el repositorio.</div>
${bodyHtml}
  <hr />
  <nav class="docs">
        ${nav}
  </nav>
</main>
<footer class="site">
  <div class="wrap">© 2026 Kontari — [RAZÓN SOCIAL], CUIT [CUIT]. Todos los derechos reservados.</div>
</footer>
</body>
</html>
`;
}

for (const [file, title] of NAV) {
  const key = file.replace(".html", "");
  writeFileSync(`${OUT}/${file}`, page(file, title, bodies[key]), "utf8");
  console.log("wrote", `${OUT}/${file}`);
}
