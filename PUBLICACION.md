# Publicar Lumini en Vercel

## Vercel
1. Subir los cambios de este proyecto al repositorio de GitHub.
2. En Vercel, importar ese repositorio y elegir la rama main.
3. El archivo vercel.json configura el build: node tools/build-static.mjs, salida dist, sin framework.
4. Publicar y revisar la home, las páginas de destinos, el formulario y las imágenes.

El build copia solo la web y las fotos: excluye las dependencias de desarrollo y los videos originales que todavía no se utilizan. Si se incorporan videos más adelante, agregarlos explícitamente al build.
Vercel Hobby se limita a uso personal no comercial: para publicar Lumini como empresa corresponde un plan compatible. Esta preparación técnica no cambia esa condición. https://vercel.com/docs/plans/hobby

## Consultas
Los botones “Consultar viaje” de destinos y los del carrusel de Experiencias completan el formulario sin borrar pasajeros, origen ni notas personales. El botón de envío muestra un resumen; “Corregir datos” vuelve al formulario y “Continuar por WhatsApp” abre el mensaje. El usuario debe enviarlo en WhatsApp.

## Prueba local
Servir la raíz con python -m http.server 8766 --bind 127.0.0.1. Próximos eventos se mantiene en script.js y sus consultas abren WhatsApp directamente.
