# Cobertura de Lumini

Componente React + TypeScript con Tailwind CSS compilado. El build genera HTML estático en la home existente: no requiere React en el navegador ni migrar el resto del sitio.

## Editar

- `CoverageSection.tsx`: componente y subcomponentes reutilizables.
- `data.ts`: tarjetas, fotos, enlaces y conexiones ilustrativas.
- `editorial.css`: composición, detalles SVG y breakpoints.
- `input.css`: Tailwind sin preflight para no alterar el resto de la home.

Desde esta carpeta:

```sh
npm ci
npm run typecheck
npm run build
```

El build actualiza únicamente el bloque marcado `coverage:start` / `coverage:end` en `index.html` y genera `assets/coverage/coverage.css`.

Para React/Next.js se puede importar `CoverageSection` y su CSS compilado. Las rutas de los assets son relativas a la raíz de la home; adaptarlas si se usa una ruta anidada.

La foto de Córdoba Capital queda declarada como `image: null`: reemplazarla por una fotografía adecuada en `data.ts`. Las otras cuatro fotografías proceden de los assets existentes y mantienen sus créditos en `creditos-imagenes.html`.

El SVG es una interpretación editorial simplificada: las conexiones no representan rutas de navegación ni posiciones geográficas exactas.
