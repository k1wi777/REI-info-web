---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/(site)/docs/page.tsx"]
---

# Home + Docs — REI Web

## Scope

- Superficie primaria: Home (`/`), modo Persuade.
- Superficie relacionada: docs shell (`/docs`, `/instalacion`, `/primer-work-item`, `/comandos`, ...), modo Read.
- Una sola dirección visual para ambas: la home puede ser más expresiva; docs es la versión sobria del mismo mundo.
- Esta ronda no implementa la home ni componentes finales.

## Audience and job

Desarrolladores que ya usan agentes y quieren un proceso de Spec Driven Development verificable; revisores que aprueban antes de que se escriba código; equipos que alternan entre OpenCode, Claude Code, Cursor y Codex; mantenedores que buscan referencia pública. La home debe responder qué es REI y por qué importa; docs debe permitir instalar, entender el flujo y consultar comandos, estados y roles.

## Action and proof

- Home: CTA primario «Instalar REI» hacia instalación; secundario «Ver el flujo».
- Docs: entrada por modo, instalación, primer Work Item, comandos y estados; copiar comandos; anterior/siguiente; TOC.
- Prueba: el mecanismo real —Work Item, puerta de aprobación humana, roles, estados y evidencia en el repositorio—. Sin métricas, testimonios, clientes ni comparativas inventadas.

## Constraints

- Español; fondos oscuros; AA; foco visible; teclado completo; HTML semántico; `prefers-reduced-motion`; responsive desde 360 px.
- Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript estricto; Server Components por defecto; JavaScript de cliente mínimo; sin kits de UI ni fuentes externas por CDN. Geist ya está instalado.
- Sin búsqueda ni selector de versiones en v1; no mostrar UI falsa para funciones inexistentes.
- La web no ejecuta comandos, no aprueba Work Items y no sustituye al CLI ni al visor. La aprobación se registra desde el CLI.
- Una sola fuente por dato: comandos, estados y roles se definen una vez y se importan.

## Chosen direction and memorable moment

**Plano en grafito**: la estructura de Juego de planos con la paleta de El estándar. La hoja, el bloque de firmas y las bandas de responsabilidad se quedan; el papel, el óxido y la nostalgia se sustituyen por grafito, hairlines y violeta. La puerta de aprobación es la única región violeta de la home; el verde solo marca completado. El momento: las bandas de responsabilidad cruzan la puerta; la banda violeta se cierra y la firma libera la hoja. Docs: la misma banda ocupa el ancho del artículo, el código es un detalle y la copia deja una marca verde.

## Confirmation

- Dirección confirmada: **Plano en grafito** (estructura de Juego de planos + paleta de El estándar).
- Confirmada por el usuario el 27.10.2026.
- Ronda de decisión: `0f792299`; payload `.impeccable/questions/direction-hybrid.json` con `status: confirmed` y `chosen: hybrid`.
- Esta ronda no crea el Work Item de implementación.

## Direction contract

THESIS: Un Work Item es una hoja y la aprobación es su bloque de firmas; la home demuestra la puerta, no la decora. Rechaza el hero centrado con terminal y tarjetas.

OWN-WORLD: Grafito `#0A0A0B`, superficies `#0E0E10`/`#111114`, hairlines `#1E1E22`/`#26262C`/`#2E2E35`, texto `#F5F5F5`/`#A1A1AA`/`#6E6E78`, acento `#8B5CF6` y éxito `#7FB98A`. Geist Sans para tesis y cuerpo; Geist Mono para metadata, estados y código. La puerta es una banda violeta de ancho completo con texto `#0A0A0B`; el verde solo en `done`. Docs es el mismo juego de hojas: índice/TOC, metadata y código como detalle. AA: `--muted-strong #8A8A94` y `--accent-text #A78BFA`; warning/error del visor con etiqueta y trama. Sin óxido, azul blueprint ni glass.

STORY: El visitante entiende que REI convierte el trabajo con agentes en especificación, aprobación humana y evidencia; cree que la puerta es real porque la ve cerrarse; instala REI o entra a docs para recorrer el primer Work Item.

FIRST VIEWPORT: Hoja única a sangre. Izquierda 7/12: tesis «El código empieza después de la aprobación» en Geist Sans 75 px, deck, CTA «Instalar REI» blanco y «Ver el flujo» outline. Derecha 5/12: matriz de responsabilidades Leader/Spec Author/Implementer/Reviewer; la fila de aprobación es una banda violeta completa con «Aprobación de la planificación / Pendiente»; panel de metadata y línea de cotas con los cinco estados, `done` en verde. Retícula de 72 px y marco de 1 px; la acción primaria está en la hoja.

FORM: Plano en grafito, híbrida confirmada sobre la candidata 3 (Juego de planos) con la paleta de El estándar; seed `833dc3b2`. La matriz y la puerta son la forma.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions

- Proveedor, dominio y canonical: sin decidir.
- Búsqueda: pospuesta; no forma parte de v1.
- Profundidad del changelog propio frente a GitHub Releases: sin decidir.
- Necesidad real de `/guias`: sin decidir.
