# Lumini Viajes

Landing estática: HTML, CSS y JavaScript. No necesita React en el navegador.

- `index.html`: contenido de la home.
- `style.css` y los CSS de sección: diseño. `polish.css`: ajustes finales y responsive.
- `script.js`: menú móvil, eventos y consulta por WhatsApp.
- `experiences.js`: carrusel. `navbar.js`: navegación activa.
- `assets/`: imágenes, icono y videos originales pendientes de utilizar.
- `seo/`: páginas de destinos y servicios, conservadas para una revisión posterior.
- `creditos-imagenes.html`: atribuciones de las fotografías; conservar.
- `robots.txt` y `sitemap.xml`: configuración de indexación.

## Vista local

Desde esta carpeta: `python -m http.server 8766 --bind 127.0.0.1`.
Abrir http://127.0.0.1:8766/.

## Componentes opcionales

Navbar y Cotización tienen fuentes en `components/navbar` y `components/quote`. Sus README explican cómo recompilarlas. Las dependencias compartidas siguen en `components/coverage`; únicamente es una carpeta de herramientas, no una sección activa. No se necesita compilar para servir la web.

## Mantenimiento

Las fechas y fuentes de eventos están en `script.js`. Revisarlas antes de cada temporada. Una consulta no confirma una reserva.
Las imágenes en uso están optimizadas en WebP; se quitaron duplicados sin referencias. El historial de Git conserva las versiones anteriores. Los videos originales se mantienen para uso futuro.
