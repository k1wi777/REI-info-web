# DESIGN.md — Sistema visual de REI Web

> Documenta el sistema **tal como quedó construido** en la Feature
> `2026-10-27_01-54__fundaciones-visuales-shell-docs`. La dirección visual es
> **Plano en grafito** (estructura de Juego de planos + paleta de El estándar) y
> la tipografía **A · Archivo Expandido**. Las decisiones de producto viven en
> `docs/product-strategy.md` y `PRODUCT.md`; este archivo describe la
> implementación.
>
> La Feature `2026-10-27_22-04__home-demostrativa-playwright` añadió los actos,
> las demos de mecanismo y la evidencia real de producto sobre la misma
> dirección: no cambia tokens, tipografía ni hero.

## Principios

- Una sola fuente de estilos: `app/globals.css` declara los tokens en `@theme`.
- Los componentes usan utilidades derivadas (`bg-surface`, `text-secondary`,
  `border-hairline`); no hay colores literales en JSX.
- Server Components por defecto. El cliente se limita al estado activo de la
  navegación (`NavLinks`, `DocsTabs`, `DocsSidebar`) y al botón de copiar.
- El sitio es solo oscuro: `color-scheme: dark`, sin tema claro paralelo.

## Tokens

### Color

| Rol | Token | Valor |
|-----|-------|-------|
| Lienzo | `--color-canvas` | `#0A0A0B` |
| Superficie profunda | `--color-surface-deep` | `#0E0E10` |
| Superficie | `--color-surface` | `#111114` |
| Hairline | `--color-hairline` | `#1E1E22` |
| Hairline medio | `--color-hairline-strong` | `#26262C` |
| Borde fuerte | `--color-border-strong` | `#2E2E35` |
| Atenuado (solo ≥ 24 px o no textual) | `--color-muted` | `#6E6E78` |
| Atenuado AA para texto pequeño | `--color-muted-strong` | `#8A8A94` |
| Secundario | `--color-secondary` | `#A1A1AA` |
| Texto | `--color-foreground` | `#F5F5F5` |
| Acento | `--color-accent` | `#8B5CF6` |
| Texto sobre acento | `--color-on-accent` | `#0A0A0B` |
| Acento para texto | `--color-accent-text` | `#A78BFA` |
| Éxito | `--color-success` | `#7FB98A` |
| Aviso | `--color-warning` | `#E0A33A` |
| Error | `--color-error` | `#E5646B` |
| Foco | `--color-focus` | `#A78BFA` |

Reglas: `--color-muted` no se usa para texto pequeño; aviso y error nunca
aparecen sin etiqueta o trama textual. La banda de aprobación es la única región
violeta de la home y no es un relleno sólido: usa borde y fondo en alfa
(`border-accent/40 bg-accent/10`), etiqueta y estado en `accent-text` y detalle
en `secondary`; sus líneas decorativas van al 40 % del acento. El verde sigue
reservado a `done`; el foco y la selección son estados interactivos, no regiones.

### Tipografía

| Rol | Token | Tamaño / interlineado |
|-----|-------|-----------------------|
| Display | `--text-display` | 72 px / 0.92, tracking -0.035em, `wdth` 112 |
| Titular | `--text-title` | 44 px / 1.0, tracking -0.03em, `wdth` 112 |
| Título de docs | `--text-docs-title` | 32 px / 1.1, `wdth` 100 |
| Encabezado de docs | `--text-docs-heading` | 24 px / 1.2, `wdth` 100 |
| Cuerpo | `--text-body` | 17 px / 1.6 |
| Lectura de docs | `--text-docs` | 16 px / 1.7 |
| Metadata | `--text-meta` | 10 px / 1.4 |
| Metadata pequeña | `--text-meta-sm` | 9.5 px / 1.4 |
| Código | `--text-code` | 12.5 px / 1.7 |
| Interfaz | `--text-ui` | 15 px / 1.0 |
| Navegación | `--text-nav` | 12 px / 1.0 |
| Micro | `--text-micro` | 10 px / 1.0 |
| Marca | `--text-brand` | 22 px / 1.0 |

Display y titulares usan `clamp()` con el token como máximo para no desbordar
desde 360 px: display `clamp(2.5rem, 7vw, 4.5rem)`, titular
`clamp(2rem, 4vw, 2.75rem)`, título de docs `clamp(1.75rem, 3vw, 2rem)`.

### Retícula, forma y movimiento

| Token | Valor | Uso |
|-------|-------|-----|
| `--container-site` | 1344 px | Contenedor global |
| `--container-reading` | 72ch | Prosa y bloques de lectura |
| `--container-sidebar` | 240 px | Sidebar de documentación |
| `--layout-header-height` | 64 px | Cabecera (más 1 px de hairline) |
| `--layout-grid` | 72 px | Retícula de la hoja |
| `--radius-xs` | 2 px | Controles |
| `--radius-sm` | 4 px | Bloques de código |
| `--duration-fast` | 150 ms | Cambios de color y borde |
| `--duration-slow` | 700 ms | Momento memorable |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Movimiento |

Hojas, bandas y hairlines no llevan radio. La retícula base usa múltiplos de
8 px y la guía de 72 px en la home.

## Tipografía y fuentes

- **Archivo 600** para tesis y titulares, con eje de ancho `wdth` al **112 %**.
- **Geist 400/500** para cuerpo, interfaces y navegación.
- **Geist Mono 400** para metadata, estados, cotas y código.
- No se incorpora ninguna otra familia.

Servicio: `next/font/google` en `app/layout.tsx` con `axes: ["wdth"]` para
Archivo y `subsets: ["latin"]` para las tres familias. La descarga ocurre en
build y los woff2 se sirven desde el propio sitio en `/_next/static/media/`:
mismo origen, sin CDN en runtime y con `font-display: swap` más fuentes de
respaldo con métricas ajustadas (`Archivo Fallback`, `Geist Fallback`,
`Geist Mono Fallback`).

Verificación: el eje de ancho se aplica (`"wdth" 112, "wght" 600` en display y
`"wdth" 100, "wght" 600` en docs), la tesis mide 72 px/0.92 a 1280 px, los
titulares 44 px/1.0, el cuerpo 17 px/1.6, docs 16 px/1.7, metadata 9.5–10 px y
código 12.5 px. Los tres woff2 latinos que carga el sitio suman **139,2 KiB**,
dentro del objetivo de ≈140 KB. `next/font` emite además rangos unicode no
latinos que el navegador no descarga para el contenido en español. No fue
necesario el fallback a `next/font/local`; si el eje dejara de comportarse, el
cambio previsto es mover los woff2 latinos a `app/fonts/` conservando tokens,
escala y API.

## Componentes

### Primitivas (`components/ui`)

| Componente | Responsabilidad |
|------------|-----------------|
| `Container` | Ancho máximo del sitio y márgenes fluidos. |
| `ButtonLink` | Enlace con apariencia de botón: primario (fondo texto) y secundario (outline). |
| `StatusTag` | Etiqueta de estado con tono y texto obligatorio. |
| `CodeBlock` | Bloque de código en servidor, legible sin JavaScript. |
| `CopyButton` | Único cliente del bloque: copia, confirma y restaura a los 2 s. |

`components/ui` no importa features ni datos de REI (solo `lib/cn` y, en
`ButtonLink`, la comprobación de enlace externo de `content/site`).

### Shell (`components/layout`)

`SiteHeader` (marca, navegación y CTA), `MobileNav` (`<details>` nativo),
`SiteFooter`, `BrandMark`, `NavLinks` (estado activo), `DocsShell`, `DocsTabs`,
`DocsSidebar` (sidebar de la sección activa + disclosure móvil), `DocsToc`,
`DocsPager`, `DocArticle`, `DocBlocks` y `ApprovalBand`.

La navegación móvil no usa estado de cliente ni bloqueo de scroll: `<details>`
funciona sin JavaScript y por teclado. La marca y el CTA permanecen visibles.

### Home (`features/home`)

`HeroSheet` se conserva sin cambios: tesis, deck, CTAs, matriz de
responsabilidades, panel de metadata y línea de cotas. A partir del hero, la
página se compone en cuatro actos de fondo completo (`ActSection`): problema
(`bg-canvas` + retícula tenue), proceso (`bg-surface-deep` + `accent/5`),
evidencia (`bg-surface` + `success/5`) y cierre (`bg-canvas`). Cada acto lleva
borde superior, etiqueta en `type-meta` y tesis; el contenido sigue en
`Container`.

Cada demo usa `DemoSection` para la cabecera editorial (etiqueta, titular,
intro, nota y enlace) y contenido propio:

| Demo | Componente | Qué muestra |
|------|------------|-------------|
| Problema | `demos/problem-demo` | «Sin REI / Con REI» sobre el mismo caso, pasos numerados y marcas con etiqueta textual. |
| Puerta | `demos/gate-demo` | `pending → ready → puerta → in_progress → review → done`, artefactos en `<details>` y banda violeta. |
| Agentes | `demos/agents-demo` | Grafo de los cinco roles; cada nodo es un `<details>` con responsabilidad y límite; el Initializer es rama lateral. |
| Visor | `demos/viewer-demo` | Marco de navegador con capturas reales, rail de anotaciones y FICHA/móvil; el diff se muestra solo si existe. |
| GitHub Issues | `demos/github-issues-demo` | Capturas reales con número, labels y estado, cuerpo de la épica y diagrama `.rei → issue / rama / PR`. |
| Terminal y árbol | `demos/terminal-demo` | Salida real de `rei items status` y `.rei/specs/<id>/` como texto, sin vídeo ni tecleo simulado. |

Las demos de mecanismo se etiquetan «Ejemplo de mecanismo»; las de evidencia
muestran capturas del producto y su fecha. Los datos viven en
`features/home/data/{acts,demos,evidence}.ts` y los roles, estados y puerta se
importan de `content/rei`. No hay `"use client"` nuevo: la interacción usa
`<details>`/`<summary>` y anclas `:target`.

### Evidencia y procedencia

`public/evidence/manifest.json` es la fuente única de las capturas: archivo,
dimensiones, `source`, fecha, descripción, `alt` y, en issues, número, labels y
estado. Lo genera `pnpm capture:evidence` (`scripts/capture-evidence.mjs`) con
`playwright-core` contra el Chrome del sistema, sin descargar navegadores:

- GitHub Issues públicas de `k1wi777/REI-Harness` (#2 feature, #3 épica y #5
  hija de backlog), con cabecera, labels, estado real (`Closed`) y cuerpo.
- Visor `rei view` del Work Item
  `2026-10-27_12-08__referencia-operacion-docs` en 1440×900, FICHA y móvil
  390×844; el diff solo si el visor lo muestra.

Las capturas se integran con `next/image` (dimensiones del manifiesto, `sizes` y
carga diferida), sin `priority` ni calidad distinta de la predeterminada. No hay
capturas simuladas, métricas ni issues inventadas.

### Documentación

`app/(site)/docs/layout.tsx` monta `DocsShell`. Cada página usa `DocArticle`
(encabezado, TOC, contenido, banda de aprobación y pager). La prosa se modela
con `DocBlock` (`paragraph`, `list`, `code`, `table`, `note`) en
`content/docs.ts`; Comandos y FAQ declaran su TOC desde sus propios datos.

## Estados y significado

- Ciclo: `pending → ready → in_progress → review → done`.
- Ramas: `blocked` y `changes_requested`.
- `done` se distingue en verde, pero el texto del estado siempre está presente.
- El estado actual se anuncia con texto (`actual: ready`) y un `sr-only`
  «(estado actual)»; nunca solo con color.
- Aviso y error siempre llevan etiqueta textual (`StatusTag`, notas con título).

## Momento memorable

Solo en la matriz de la home: las bandas entran desde el borde de la hoja
(`matrix-band-in`), la banda de aprobación se cierra sobre el eje horizontal
(`gate-close`) y la firma se dibuja al final (`signature-draw`). Solo se animan
`transform` y `opacity`, una vez por carga, sin JavaScript ni librerías. Los
elementos decorativos son `aria-hidden` y el texto existe desde el primer
render. Con `prefers-reduced-motion: reduce`, las tres animaciones se desactivan
y se muestra el estado final.

Las listas de pasos de las demos añaden un revelado escalonado ligado al scroll
(`animation-timeline: view()`) bajo `@supports` y
`prefers-reduced-motion: no-preference`: solo `opacity` y `transform`, sin
JavaScript. Si el navegador no soporta la línea de tiempo o la persona reduce el
movimiento, el contenido queda visible en su estado final; ninguna demo parte de
`opacity: 0` fuera de esa mejora.

## Accesibilidad

- `html lang="es"`; un `h1` por página y jerarquía sin saltos.
- Skip link como primer tabulable hacia `main#contenido` (con `tabIndex={-1}`).
- Foco visible global: anillo de 2 px y separación de 2 px.
- `aria-current="page"` en cabecera, tabs y sidebar; `aria-label` distinto en
  cabecera, sidebar, TOC y pager.
- `<details>`/`<summary>` nativos para menú móvil, sidebar móvil, FAQ, artefactos
  y nodos de agentes; funcionan sin JavaScript y por teclado.
- Copiar: confirmación visible «Copiado» y `aria-live="polite"`; si falla,
  «No se pudo copiar; selecciona el texto». El código está en el HTML servido.
- Capturas con `alt` del manifiesto; el rail de anotaciones es una `<ol>` con
  texto y los diagramas (agentes, proyección, árbol) tienen equivalente textual.
- Las marcas de color (`warning`, `error`, `success`) siempre llevan etiqueta.
- Responsive desde 360 px; las tablas y el código tienen scroll interno, nunca
  la página.
- Contraste comprobado (WCAG AA): texto 18.15:1, secundario 7.72:1,
  muted-strong 5.79:1, acento-text 7.27:1, éxito 8.68:1, aviso 8.92:1,
  error 6.00:1 y `on-accent` sobre acento 4.67:1. El foco (4.67:1) supera el
  3:1 exigido a componentes no textuales.

## Datos y contenido

- `content/site.ts`: marca, versión documentada, enlaces externos, navegación,
  árbol de docs y registro de rutas.
- `content/rei/`: tipos, comandos, estados, roles y descriptor único de la
  aprobación.
- `features/<slug>/data/`: contenido propio de cada feature.
- `features/home/data/acts.ts` y `demos.ts`: actos, pasos del problema, etapas de
  la puerta, posiciones de los agentes, terminal y árbol de artefactos.
- `features/home/data/evidence.ts`: deriva las capturas del manifiesto generado
  (`public/evidence/manifest.json`); no duplica rutas ni textos alternativos.
- Una sola fuente por dato. No se duplican comandos, estados ni roles.
- Sin cifras, testimonios, clientes ni comparativas inventadas. La home no usa
  cifras externas.
- «Changelog», «Conceptos» y «Guías» no se muestran porque sus rutas no existen.

## Reglas de uso

1. No declarar colores literales en componentes: usar los tokens de color.
2. No añadir familias tipográficas ni pesos fuera de Archivo 600, Geist 400/500
   y Geist Mono 400.
3. No usar violeta como decoración: en la home solo la banda de aprobación, con
   tratamiento en alfa (borde y fondo, no bloque relleno); en docs, el bloque de
   aprobación.
4. No crear UI para funciones inexistentes (búsqueda, selector de versiones,
   tabs sin ruta).
5. Mantener el contenido legible sin JavaScript; cualquier nuevo cliente debe
   justificar interacción real.
6. Reutilizar `Container`, `ButtonLink`, `StatusTag`, `CodeBlock` y
   `CopyButton`; no introducir un kit de UI.
7. Respetar `--container-reading` en prosa y `--layout-grid` en la home.
8. Toda ruta nueva se añade a `ROUTES` y al árbol de docs antes de enlazarla.
9. Las capturas se leen del manifiesto y se sirven con `next/image`; no se
   duplican rutas, dimensiones ni `alt`, y no se inventan capturas ni issues.
10. El violeta sigue reservado a la puerta de aprobación; las demos no lo usan
    como decoración ni para marcar controles.

## Assets

Los únicos rasters de producto del sitio son las capturas de
`public/evidence/`, generadas por `pnpm capture:evidence` y versionadas con su
manifiesto. Su procedencia está declarada en `manifest.json` (archivo, fuente,
fecha, `alt`, dimensiones y, en issues, número, labels y estado) y se muestran
con `next/image`, `sizes` y carga diferida. `hero.png` y
`visorEspecificaciones.png` de la raíz son referencias locales de dirección: no
se versionan, no se usan en la web y no son evidencia. El `favicon.ico` existente
proviene del scaffold de `create-next-app` y no se modificó; el resto de la
identidad es tipográfica, retícula y color.

## Verificación de cierre

- `V1` `pnpm lint` — pasa.
- `V4` `pnpm test` — pasa; los datos de demos y el manifiesto de evidencia se
  cubren sin tests de UI. Las nuevas comprobaciones viven en
  `features/home/data/{demos,evidence}.test.ts`.
- `V2` `pnpm build` — pasa; las rutas `/`, `/docs` y las páginas de producto se
  prerenderizan, más `sitemap.xml` y `robots.txt`.
- `pnpm capture:evidence` — genera las diez capturas reales y el manifiesto con
  Chrome del sistema; falla con causa y sin manifiesto parcial.
- `V3` revisión manual/documentada — 360/768/1024/1440 sin scroll horizontal de
  página, teclado en disclosures, foco visible, alt y equivalentes textuales,
  `prefers-reduced-motion` sin animación (estado final), sin JavaScript y CLS 0.
- `rei validate` — sin `FAIL`.
- `playwright-core` es la única dependencia nueva y es `devDependency`; no hay
  dependencias de runtime nuevas.
