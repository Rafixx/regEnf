# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Frontend del "Libro de registro" de enfermería. La API vive en el repo hermano `regEnfAPI` (`../regEnfAPI`).

## Stack y convenciones

- React 18 + Vite 5 + Ant Design 5, JavaScript/JSX **sin TypeScript**. No introducir TS ni otras librerías de UI. Esta app es una excepción al stack ADC (NestJS/Angular).
- Estado global solo con React Context (`src/context/`: Patient > Planta > User > Incidencia, anidados en `src/main.jsx`). No añadir Redux/Zustand.
- Llamadas HTTP con axios en `src/services/*.js` contra `import.meta.env.VITE_API_URL`.
- Locale antd `esES` y fechas con dayjs. Textos de UI en español.
- Estilo neostandard (2 espacios, comillas simples, sin `;`): `npm run lint` / `npm run lint:fix`.

## Gotchas

- `vite.config.js` usa `base: '/regEnf/'` en producción: las rutas y los assets deben funcionar bajo ese subpath.
- `.env.development` apunta a la API de PRE (`vvdpedwebpre01:3006`) y `.env.production` a PRO (`vvdpedwebpro:3006`). Son hosts internos: hace falta estar en la red del hospital.
- La planta no tiene valor por defecto (`PlantaContext` arranca con `useState()`): hasta que se elige una no se muestra el mapa. El README todavía dice "1A por defecto", pero está desactualizado.
- Sin usuario (`?token=` ausente o inválido) la UI muestra "DESCONOCIDO" y desactiva la edición.
- Los tipos de incidencia del formulario (`items` en `src/components/incidencias/Form_incidencias.jsx`) deben coincidir con los `tipo` que mapea la API (`regEnfAPI/utils/incidencias.js`).
- No hay tests ni test runner. Para verificar, ejecuta `npm run build` y `npm run lint`.
