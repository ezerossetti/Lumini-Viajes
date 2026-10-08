## Cambios implementados - 2026-09-29

### Servicios
- Se dejó una sola fotografía fija en el marco.
- Se quitó el enlace "VER NUESTRA FLOTA", los indicadores de carrusel y la apertura de la galería.
- Se retiraron las referencias y archivos exclusivos de la galería.

### Pie de página
- Se desplazó hacia la izquierda el contenido derecho del pie en escritorio para evitar que WhatsApp flotante tape "Volver arriba".
- "Volver arriba" ahora apunta a la sección de inicio y no al encabezado fijo.

### Formulario de cotización
- Pasajeros acepta solo dígitos, requiere un valor positivo y tiene un máximo de 5 dígitos.
- La fecha se ingresa como DD-MM-YYYY; los guiones se agregan automáticamente y el cursor avanza entre día, mes y año.
- La fecha puede escribirse o seleccionarse desde el calendario. Se validan el calendario real y que no sea anterior al día actual; el campo sigue siendo opcional.
- Backspace puede cruzar los guiones automáticos para borrar la fecha completa.
- Origen y destino se limitan a 100 caracteres cada uno; los detalles, a 500 caracteres.
- Al preparar la vista previa, se recortan espacios exteriores y se aplican nuevamente los límites antes de generar el mensaje.
- Se conserva la vista previa y el enlace a WhatsApp con el texto precargado; el sitio no confirma ni envía una reserva automáticamente.

### Verificaciones
- Los campos de texto conservan las mayúsculas y minúsculas ingresadas.
- Se revisó que el contenido del mensaje se presenta como texto y se codifica para el enlace de WhatsApp.
- El botón "Reanudar" del carrusel se explicó como control de rotación automática; no se modificó.

## Cambios del 2026-09-28

### Contacto e imágenes
- Se actualizó el diseño editorial de la sección de contacto y se incorporó un paisaje ilustrativo, identificado como ficticio y no asociado a una ubicación real.
- Se optimizaron 18 imágenes a WebP con ancho máximo de 1920 px. El peso combinado pasó de 19.105.358 a 3.628.794 bytes (81 % menos).
- En la limpieza posterior se retiraron originales duplicados sin referencias y el informe temporal de optimización.

### Limpieza de Cobertura
- Se eliminó la sección Cobertura, su componente y sus recursos asociados.
- Se retiraron la integración inactiva de MapTiler y dependencias específicas de esa sección. Se conservaron las dependencias compartidas que utilizan Navbar y Cotización.

### Cotización, experiencias y eventos
- Se añadió la opción de recorrido "Solo ida" o "Ida y vuelta" y el recorrido pasó a incluirse en el mensaje de WhatsApp.
- Los botones de destinos y experiencias empezaron a completar el formulario con el servicio, destino o evento correspondiente.
- Se incorporó una vista previa para revisar o corregir la consulta antes de continuar a WhatsApp; el mensaje no se envía automáticamente.
- Se añadieron fechas y fuentes de eventos: Oktoberfest 2026, Cosquín Rock 2027 y Jesús María 2027 pendiente de confirmación. Los eventos finalizados se ocultan y no se promete disponibilidad.
- Se agregó navegación táctil al carrusel de experiencias. También se había incorporado una galería interactiva para la flota; fue retirada el 2026-09-29 para dejar una sola foto fija.

### Publicación y documentación
- Se documentó la estructura estática del sitio, la vista local y el mantenimiento de eventos en `README.md`.
- Se agregó `PUBLICACION.md` con los pasos para publicar en Vercel y `tools/build-static.mjs` con `vercel.json` para generar la carpeta `dist`.
- Se creó `REVISION-WEB.md` para registrar fuentes de eventos, rendimiento y comprobaciones.
- La configuración de publicación quedó preparada; no se realizó un despliegue.
