import { ChevronDown } from "lucide-react";

interface Terminos {
  titulo: string;
  introduccion: string[];
  secciones: {
    titulo: string;
    contenido: string[];
  }[];
}

const terminos: Terminos = {
  titulo: "Términos y Condiciones",
  introduccion: [
    "Este documento establece los términos y condiciones generales (en adelante, los TÉRMINOS Y CONDICIONES) que regulan el uso de los contenidos, productos y servicios disponibles a través del sitio web monex.pe (en adelante, el SITIO WEB), propiedad de MONEX SAC (en adelante, el PROPIETARIO).",
    "Cualquier persona que desee acceder o utilizar el SITIO WEB o los servicios que ofrece, deberá aceptar y cumplir estos TÉRMINOS Y CONDICIONES, así como las políticas y normas que se incorporan en este documento. En caso de no estar conforme con ellos, deberá abstenerse de usar el SITIO WEB o adquirir productos y servicios.",
  ],
  secciones: [
    {
      titulo: "01. Del objeto",
      contenido: [
        "Los presentes TÉRMINOS Y CONDICIONES regulan el acceso y el uso del SITIO WEB, incluyendo todos los contenidos, productos y servicios disponibles públicamente en el dominio monex.pe.",
        "El PROPIETARIO se reserva el derecho de modificar en cualquier momento, sin previo aviso, la presentación, funcionalidad, contenidos, productos, servicios, precios y demás características del SITIO WEB. El USUARIO acepta que MONEX SAC puede suspender, desactivar o eliminar cualquier componente del SITIO WEB o limitar su acceso en cualquier momento.",
        "El acceso al SITIO WEB es libre y, por regla general, gratuito para el USUARIO, sin que sea necesario pagar contraprestación alguna, excepto los costes derivados de la conexión a Internet que corresponda al proveedor contratado por el propio USUARIO.",
        "El acceso a los contenidos y servicios del SITIO WEB no requiere registro ni suscripción previa. Este SITIO WEB está destinado exclusivamente a personas mayores de edad (18 años o más). MONEX SAC no se responsabiliza por el incumplimiento de este requisito por parte del USUARIO.",
        "El PROPIETARIO podrá gestionar directamente el SITIO WEB o delegar esta gestión en terceros, sin que ello afecte los términos aquí establecidos.",
      ],
    },
    {
      titulo: "02. Del Usuario",
      contenido: [
        "Quien accede o utiliza el SITIO WEB adquiere la condición de USUARIO y acepta estos TÉRMINOS Y CONDICIONES, incluidas sus futuras modificaciones, además de la legislación vigente aplicable. Se recomienda al USUARIO revisar periódicamente este documento para conocer posibles cambios.",
        "El USUARIO se compromete a usar el SITIO WEB conforme a su diseño y finalidad, quedando prohibida la utilización de software automatizado para interactuar o descargar contenidos y servicios sin autorización. Asimismo, el USUARIO debe emplear la información y servicios del SITIO WEB de manera legal, respetando la moral, el orden público, y sin causar perjuicio a terceros o interferir en el correcto funcionamiento del SITIO WEB.",
        "El mero acceso al SITIO WEB no implica la creación de ninguna relación contractual entre el PROPIETARIO y el USUARIO. Al acceder, el USUARIO declara ser mayor de edad y tener plena capacidad legal para aceptar estos TÉRMINOS Y CONDICIONES.",
      ],
    },
    {
      titulo: "03. Del acceso y navegación en la Plataforma",
      contenido: [
        "El PROPIETARIO no garantiza de manera absoluta la disponibilidad ni la continuidad de los contenidos, productos o servicios ofrecidos en el SITIO WEB. No obstante, se compromete a realizar los esfuerzos razonables para asegurar el correcto funcionamiento de la plataforma, sin que ello implique responsabilidad alguna para MONEX SAC. Asimismo, MONEX SAC no responde por posibles errores, fallos, software malicioso o cualquier daño que pudiera ocasionarse en el hardware o software de los dispositivos desde los cuales el USUARIO accede o utiliza el SITIO WEB. Tampoco será responsable por daños derivados de un uso indebido o inadecuado del SITIO WEB.",
        "En ningún caso MONEX SAC asumirá responsabilidad alguna por pérdidas, perjuicios o daños de cualquier naturaleza que resulten del acceso o uso del SITIO WEB.",
      ],
    },
    {
      titulo: "04. Política de privacidad y protección de datos",
      contenido: [
        "En cumplimiento con la legislación peruana vigente, el PROPIETARIO adopta las medidas necesarias para garantizar la confidencialidad y seguridad de los datos personales recopilados a través del SITIO WEB, evitando su alteración, pérdida o acceso no autorizado. El tratamiento de dichos datos se realizará conforme a los principios de legalidad, calidad, finalidad, transparencia y responsabilidad, y siempre con el consentimiento previo del titular de los datos.",
        "El uso de datos financieros o patrimoniales requerirá autorización expresa del titular, la cual podrá otorgarse mediante los mecanismos habilitados en el SITIO WEB. De igual manera, los datos personales sensibles, entendidos como aquellos que puedan generar discriminación o riesgos para su titular, serán tratados con especial cuidado y protección.",
        "El PROPIETARIO procurará que la información personal almacenada sea pertinente, precisa y esté actualizada para los fines para los que fue recopilada. El SITIO WEB puede contener enlaces a sitios web de terceros, los cuales cuentan con sus propias políticas de privacidad, por lo que MONEX SAC no se responsabiliza por el tratamiento de datos realizado fuera de monex.pe.",
        "MONEX SAC se reserva el derecho a modificar esta Política de Privacidad según necesidades o cambios legales. La continuación del uso del SITIO WEB tras dichas modificaciones implica la aceptación de las mismas.",
        "El acceso al SITIO WEB puede implicar la utilización de cookies, que son pequeños archivos almacenados en el navegador del USUARIO para facilitar la navegación y mejorar la experiencia. Estas cookies recopilan información como preferencias, historial de navegación, fecha y hora de acceso, duración de la visita, direcciones IP, frecuencia de visitas, entre otros datos anónimos.",
        "La información recolectada a través de cookies será utilizada exclusivamente para mejorar la calidad del SITIO WEB, detectar errores y adaptar los contenidos y servicios a las necesidades de los USUARIOS, sin identificar individualmente a los mismos.",
        "Si el USUARIO desea, puede configurar su navegador para rechazar, restringir o eliminar las cookies, aunque esta acción puede limitar ciertas funcionalidades del SITIO WEB. Los procedimientos para deshabilitar cookies varían según el navegador utilizado, por lo que se recomienda consultar las instrucciones del fabricante del navegador.",
        "Las políticas relacionadas con el uso de cookies podrán actualizarse en el futuro, por lo que se aconseja revisar periódicamente los TÉRMINOS Y CONDICIONES para mantenerse informado sobre cómo se utilizan las cookies en el SITIO WEB.",
      ],
    },
    {
      titulo: "05. Condiciones de contratación y pago",
      contenido: [
        "El SITIO WEB puede incluir enlaces, contenidos, servicios o funcionalidades procedentes de sitios web externos gestionados por terceros, tales como imágenes, videos, comentarios o motores de búsqueda, entre otros. Estos enlaces y contenidos externos tienen como objetivo mejorar la experiencia del USUARIO al navegar en el SITIO WEB, sin que ello implique recomendación, patrocinio o invitación para acceder a dichos sitios externos.",
        "MONEX SAC no controla ni supervisa el contenido, servicios o productos disponibles en los sitios vinculados, y no se responsabiliza ni garantiza la disponibilidad, exactitud, veracidad, legalidad o cualquier otra característica de esos sitios externos. De igual modo, el PROPIETARIO no asumirá responsabilidad alguna por daños o perjuicios derivados del acceso o uso de los contenidos, productos o servicios disponibles en sitios web de terceros accesibles mediante enlaces en el SITIO WEB.",
      ],
    },
    {
      titulo: "06. Política en materia de propiedad intelectual e industrial",
      contenido: [
        "MONEX SAC, en calidad de titular o cesionario, posee todos los derechos de propiedad intelectual e industrial sobre el SITIO WEB, incluyendo, pero no limitado a, el código fuente, imágenes, archivos de audio o video, logotipos, marcas, combinaciones cromáticas, estructuras, diseños y demás elementos distintivos. Estos derechos están protegidos por la legislación peruana vigente y por tratados internacionales aplicables.",
        "Queda estrictamente prohibida la reproducción, distribución, comunicación pública o cualquier forma de explotación de los contenidos del SITIO WEB con fines comerciales, a través de cualquier medio o soporte, sin la previa autorización expresa de MONEX SAC.",
        "El USUARIO se compromete a respetar estos derechos y podrá únicamente visualizar, imprimir, copiar o almacenar los contenidos, siempre que sea para uso personal y sin fines comerciales.",
        "Asimismo, el USUARIO se abstendrá de suprimir, alterar, manipular o intervenir de cualquier manera los elementos, archivos o contenidos del SITIO WEB, así como de realizar actos que comprometan la seguridad del SITIO, sus bases de datos o archivos protegidos, incluyendo accesos no autorizados mediante credenciales o permisos restringidos.",
        "En caso de que el USUARIO o terceros detecten contenidos en el SITIO WEB que pudieran vulnerar derechos de propiedad intelectual o industrial, deberán comunicarlo inmediatamente a MONEX SAC mediante los datos de contacto disponibles en el SITIO WEB o enviando un correo a: contacto@monex.pe",
      ],
    },
    {
      titulo: "07. Legislación y Jurisdicción Aplicable",
      contenido: [
        "MONEX SAC se reserva el derecho de iniciar las acciones civiles o penales que considere necesarias frente al uso indebido del SITIO WEB, sus contenidos, productos o servicios, así como por el incumplimiento de estos TÉRMINOS Y CONDICIONES.",
        "La relación jurídica entre el USUARIO y MONEX SAC estará regida por la legislación vigente en la República del Perú, con especial referencia a las normas aplicables en la ciudad de Lima. En caso de surgir cualquier controversia relacionada con la interpretación o aplicación de estos TÉRMINOS Y CONDICIONES, las partes se someterán a la jurisdicción ordinaria de los tribunales competentes conforme a la legislación peruana.",
      ],
    },
    {
      titulo: "08. Clientes y Publicidad",
      contenido: [
        "MONEX SAC, con RUC [incluir RUC de MONEX], es una empresa dedicada a brindar servicios tecnológicos y publicidad en internet, con más de cinco años de experiencia en ofrecer soluciones orientadas a audiencias segmentadas. Nuestra misión es contribuir a mejorar la calidad de vida de nuestros usuarios a través de productos y servicios que optimizan su tiempo mediante la comparación eficiente de información.",
        "Colaboramos con empresas del sector financiero, proporcionando potenciales clientes que llegan a sus negocios a través de monex.pe, nuestra plataforma de alto tráfico enfocada en la comparación y cambio de divisas. Nuestro trabajo ha permitido que numerosas empresas se posicionen exitosamente en el mercado del cambio online, y este éxito nos impulsa a transparentar nuestros procesos mediante esta cláusula.",
        "Es importante aclarar y aceptar lo siguiente: la posición de los clientes en nuestras tablas comparativas está determinada por la antigüedad de su relación con nosotros y los contratos suscritos por períodos semestrales o anuales. Además, la plataforma diferencia a las empresas que realizan operaciones superiores a $10,000 de aquellas con montos menores.",
        "Para iniciar la contratación de servicios publicitarios, es fundamental que los interesados completen el formulario correspondiente con información veraz y transparente, garantizando así una publicidad honesta hacia nuestros usuarios. Para consultas sobre secciones específicas como subastas del tipo de cambio, pueden comunicarse al correo: publicidad@monex.pe. Para asistencia general, escribir a: info@monex.pe.",
        "Recordamos que los usuarios en internet confían más en empresas formales, con RUC activo y debidamente registradas en la Superintendencia de Banca, Seguros y AFP (SBS).",
      ],
    },
  ],
};

export default function TerminosYCondiciones() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-justify text-gray-800">
      <h1 className="text-2xl font-bold mb-4">{terminos.titulo}</h1>

      {terminos.introduccion.map((texto, index) => (
        <p key={index} className="mb-4">
          {texto}
        </p>
      ))}

      {terminos.secciones.map((seccion, index) => (
        <details key={index} open className="mb-4 group">
          <summary className="text-xl font-semibold mt-6 mb-2 cursor-pointer list-none flex items-center justify-between">
            {seccion.titulo}
            <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
          </summary>
          {seccion.contenido.map((parrafo, pIndex) => (
            <p key={pIndex} className="mb-4">
              {parrafo}
            </p>
          ))}
        </details>
      ))}
    </div>
  );
}
