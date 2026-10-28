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
>
> La ronda de pulido visual de la home no cambia la dirección ni el hero: afina
> la retícula editorial (cabecera a 7/5), introduce las **ventanas de producto**
> como único elemento elevado del sistema, agrupa el ciclo alrededor de la puerta
> y sustituye las capturas sueltas por marcos con barra de título.
>
> El pulido `2026-10-28_01-06__pulido-tipografia-movil-a11y` sube el suelo
> tipográfico, separa la escala de estados en móvil, ordena la jerarquía de
> encabezados y añade objetivos táctiles, enlace a la captura completa y nota de
> deslizamiento en la terminal. No cambia colores, familias, copy ni datos.

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
aparecen sin etiqueta o trama textual. El violeta marca la puerta y solo la
puerta: la fila de aprobación de la matriz, la banda del ciclo y la columna de la
puerta en el grafo de agentes. Nunca es un relleno sólido ni decoración: usa
borde y fondo en alfa (`border-accent/40 bg-accent/10`), etiqueta y estado en
`accent-text` y detalle en `secondary`; sus líneas decorativas van al 40 % del
acento. El verde sigue reservado a `done`; el foco y la selección son estados
interactivos, no regiones.

### Tipografía

| Rol | Token | Tamaño / interlineado |
|-----|-------|-----------------------|
| Display | `--text-display` | 72 px / 0.92, tracking -0.035em, `wdth` 112 |
| Titular | `--text-title` | 44 px / 1.0, tracking -0.03em, `wdth` 112 |
| Título de docs | `--text-docs-title` | 32 px / 1.1, `wdth` 100 |
| Encabezado de docs | `--text-docs-heading` | 24 px / 1.2, `wdth` 100 |
| Cuerpo | `--text-body` | 17 px / 1.6 |
| Lectura de docs | `--text-docs` | 16 px / 1.7 |
| Metadata | `--text-meta` | 11.5 px / 1.5 |
| Metadata pequeña | `--text-meta-sm` | 11 px / 1.5 |
| Pie y nota pequeña | `--text-caption` | 14 px / 1.5 |
| Código | `--text-code` | 13 px / 1.7 |
| Interfaz | `--text-ui` | 15 px / 1.0 |
| Navegación | `--text-nav` | 13 px / 1.0 |
| Micro | `--text-micro` | 10 px / 1.0, solo glifos decorativos `aria-hidden` |
| Marca | `--text-brand` | 22 px / 1.0 |

Display y titulares usan `clamp()` con el token como máximo para no desbordar
desde 360 px: display `clamp(2.5rem, 7vw, 4.5rem)`, titular
`clamp(2rem, 4vw, 2.75rem)`, título de docs `clamp(1.75rem, 3vw, 2rem)`.

**Suelo tipográfico.** Ningún texto real baja de 11 px. `--text-micro` queda
reservado al chevron decorativo del menú móvil (10 px, `aria-hidden`); el cuerpo
de las demos es siempre 17 px y 16 px solo aparece en lectura de docs y en
títulos de paso. Los tamaños arbitrarios (`text-[0.5rem]` y similares) no se
admiten: si algo no cabe, se ajustan anchos, gaps o columnas.

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
| `--radius-window` | 10 px | Ventanas de producto (terminal, visor, capturas) |
| `--shadow-sheet` | luz superior + 12 px de difusión | Hojas elevadas (cierre) |
| `--shadow-window` | luz superior + 64 px de difusión | Ventanas de producto |
| `--duration-fast` | 150 ms | Cambios de color y borde |
| `--duration-slow` | 700 ms | Momento memorable |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Movimiento |

Hojas, bandas y hairlines no llevan radio. La única superficie redondeada y con
elevación es la **ventana de producto**: representa algo que no es la hoja —una
terminal, un visor, una captura— y por eso flota. La retícula base usa múltiplos
de 8 px y la guía de 72 px en la home.

### Utilidades

| Utilidad | Uso |
|----------|-----|
| `type-display` … `type-code` | Roles tipográficos del sistema. |
| `type-caption` | Prosa pequeña en caja baja: pies de captura y notas dentro de marcos. |
| `sheet-grid` | Retícula de la hoja; solo en el acto del problema. |
| `stage-light` | Luz radial tenue sobre una zona con capturas. |
| `fade-bottom` | Recortes largos: el borde inferior se disuelve. |
| `fade-right` | Salidas con desplazamiento horizontal: matriz por debajo de `sm` y terminal por debajo de `xl`. |
| `scroll-code` | Barra de desplazamiento fina, dentro de la paleta. |

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
titulares 44 px/1.0, el cuerpo 17 px/1.6, docs 16 px/1.7, metadata 11–11.5 px,
código 13 px y pie 14 px. Los tres woff2 latinos que carga el sitio suman
**139,2 KiB**,
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
| `WindowFrame` | Marco de ventana con barra de título, controles decorativos, elevación y pie opcional. |
| `CodeBlock` | Bloque de código en servidor, legible sin JavaScript. |
| `CopyButton` | Único cliente del bloque: copia, confirma y restaura a los 2 s. |
| `CaptureLink` | Enlace «Ver captura completa» al archivo de una captura recortada. Sin dominio: solo recibe la ruta. |

`components/ui` no importa features ni datos de REI (solo `lib/cn` y, en
`ButtonLink`, la comprobación de enlace externo de `content/site`).

#### Ventanas de producto

`WindowFrame` es la forma de incrustar producto real. Barra de 3 controles
decorativos (`aria-hidden`, en `error`/`warning`/`success` al 75 %), título mono
en caja baja —comandos, hosts y rutas no se escriben en mayúsculas—, dato
opcional a la derecha y cuerpo sin relleno. Todo lo que no es la hoja se presenta
así: la terminal, el árbol de artefactos, el visor, el diff y las capturas de
GitHub. Los bordes son `ring-hairline-strong` y la elevación `shadow-window`; la
cara superior recibe una luz de 1 px. Las capturas largas se recortan con
`fade-bottom` y se anuncian como recorte en el pie, nunca se estiran para caber.
Toda captura recortada ofrece `CaptureLink` a su archivo completo; la terminal
lleva `scroll-code`, `tabIndex` y, donde el contenido desborda, `fade-right` más
la nota «Desliza o usa las flechas para ver la línea completa.» en su pie.

### Shell (`components/layout`)

`SiteHeader` (marca, navegación y CTA), `MobileNav` (`<details>` nativo),
`SiteFooter`, `BrandMark`, `NavLinks` (estado activo), `DocsShell`, `DocsTabs`,
`DocsSidebar` (sidebar de la sección activa + disclosure móvil), `DocsToc`,
`DocsPager`, `DocArticle`, `DocBlocks` y `ApprovalBand`.

La navegación móvil no usa estado de cliente ni bloqueo de scroll: `<details>`
funciona sin JavaScript y por teclado. La marca y el CTA permanecen visibles.

### Home (`features/home`)

`HeroSheet` mantiene tesis, deck, CTAs, matriz de responsabilidades, panel de
metadata y línea de cotas; su retícula es 6/6 en `lg` (la matriz dispone de unos
430 px a 1024) y 7/5 desde `xl`. A partir del hero, la
página se compone en cuatro actos de fondo completo (`ActSection`): problema
(`bg-canvas` + retícula tenue), proceso (`bg-surface-deep`), evidencia
(`bg-surface`) y cierre (`bg-canvas`). Cada acto lleva borde superior, número y
etiqueta en `type-meta` y tesis en la misma línea; el contenido sigue en
`Container`. No hay veladuras de color sobre el acto: el tono basta y el violeta
no se diluye como fondo.

`DemoSection` y `HomeSection` comparten cabecera editorial: etiqueta, titular en
7/12 y deck, nota y enlace en 5/12. El titular deja de ser una columna estrecha
con un hueco muerto al lado y la sección se lee de un vistazo; el aire entre
bloques se agrupa (grupos juntos, secciones separadas).

Cada demo usa `DemoSection` para la cabecera y contenido propio:

| Demo | Componente | Qué muestra |
|------|------------|-------------|
| Problema | `demos/problem-demo` | «Sin REI / Con REI» sobre el mismo caso: dos columnas separadas por hairline, pasos numerados y marcas de punto + etiqueta textual. |
| Puerta | `demos/gate-demo` | `pending → ready` · banda violeta con los tres artefactos · `in_progress → review → done`, y las ramas al pie. La firma queda en el centro del ciclo. |
| Agentes | `demos/agents-demo` | Rail con los cuatro roles y la puerta como columna marcada; cada nodo es un `<details>` con responsabilidad y límite; el Initializer cuelga como rama lateral discontinua. |
| Visor | `demos/viewer-demo` | Ventana de navegador con la captura real y anotaciones al margen; FICHA y móvil como ventanas pequeñas; el diff, si existe, en ventana propia con su lectura al lado. |
| GitHub Issues | `demos/github-issues-demo` | Captura principal de la épica, dos issues secundarias con labels y enlace, diagrama `.rei → issue / rama / PR` y el cuerpo publicado. |
| Terminal y árbol | `demos/terminal-demo` | Ventana tipo terminal con la salida real de `rei items status` (estados coloreados, línea activa marcada) y el árbol `.rei/specs/<id>/` como texto, sin vídeo ni tecleo simulado. |

Las demos de mecanismo se etiquetan «Ejemplo de mecanismo»; las de evidencia
muestran capturas del producto y su fecha. Los datos viven en
`features/home/data/{acts,demos,evidence}.ts` y los roles, estados y puerta se
importan de `content/rei`. No hay `"use client"` nuevo: la interacción usa
`<details>`/`<summary>` y anclas `:target`.

#### Suelo, matriz y estados

- Ningún texto real baja de 11 px y el cuerpo de las demos es 17 px. Los tamaños
  arbitrarios de la matriz se sustituyeron por `type-meta-sm`.
- Matriz del hero: las cuatro columnas de rol nunca bajan de 72 px útiles. Por
  debajo de `sm` la tabla conserva `min-w-[25rem]` y el wrapper desplaza en
  horizontal con `scroll-code`, `fade-right`, `tabIndex={0}` y `aria-label`; se
  ajustan anchos, gaps o columnas antes que reducir la tipografía. La columna de
  fase mide 6.5 rem desde `sm` para que «Implementación» no se parta.
- Escala de estados: cinco columnas desde `sm`; por debajo, dos filas (3 + 2) con
  12 px de separación y sin línea de cotas —con dos filas dejaría de ser una
  línea de tiempo—. El estado actual sigue anunciándose con texto y `sr-only`.
- Aire: los bloques de metadata comparten huecos de 6 px (`gap-y-1.5`) y las
  celdas de matriz usan `py-2.5`; no se añade texto para separar bloques.

#### Jerarquía de encabezados

- `h2` es la tesis de sección (`DemoSection`, `HomeSection`, `FinalCta`); `h3`
  son los títulos de columna del problema, los ítems de sección y los detalles de
  comandos.
- La ficha, la ventana, la anotación, la banda de aprobación y los grupos del pie
  usan `p` o `figcaption`: describen cromo, no estructuran la página, y conservan
  su `aria-labelledby`/`aria-label`.
- Los actos son regiones `aria-labelledby` sobre su etiqueta `p`; no se promueven
  a `h2` para no demoler la escala. Resultado: un solo `h1` por ruta y sin saltos.

#### Objetivos táctiles

- Mínimo 24 px en nav (`min-h-6 py-1.5`), marca (`py-1`), enlaces del pie, TOC,
  botón de copiar (`min-h-6 px-1.5 -mr-1.5`) y enlaces subrayados de una línea
  (`-mt-1.5 pt-1.5`, crecen hacia arriba sin mover el subrayado).
- El anillo de foco (2 px + 2 de separación) cabe dentro del marco que contiene
  el control: no se recorta en `CodeBlock` ni en la cabecera.

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
carga diferida), sin `priority` ni calidad distinta de la predeterminada. Cada
captura vive en una `WindowFrame` y se lee en tres niveles: la ventana (qué es),
el pie de la ventana (estado, fecha o etiquetas publicadas) y el pie de la figura
(qué se está viendo y qué se recorta). Los recortes se declaran; no hay capturas
simuladas, métricas ni issues inventadas.

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

Las etapas de la puerta añaden un revelado escalonado ligado al scroll
(`animation-timeline: view()`) bajo `@supports` y
`prefers-reduced-motion: no-preference`: `opacity`, `transform` y un `blur` de
3 px que llega a 0, sin JavaScript y una sola vez por elemento. El revelado se
aplica solo a esa demo, no a toda la página. Si el navegador no soporta la línea
de tiempo o la persona reduce el movimiento, el contenido queda visible en su
estado final; nada parte de `opacity: 0` fuera de esa mejora.

## Accesibilidad

- `html lang="es"`; un `h1` por página y jerarquía sin saltos. El cromo (ficha,
  ventana, anotaciones, banda y pie) no usa encabezados.
- Skip link como primer tabulable hacia `main#contenido` (con `tabIndex={-1}`).
- Foco visible global: anillo de 2 px y separación de 2 px.
- `aria-current="page"` en cabecera, tabs y sidebar; `aria-label` distinto en
  cabecera, sidebar, TOC y pager.
- `<details>`/`<summary>` nativos para menú móvil, sidebar móvil, FAQ y nodos de
  agentes; funcionan sin JavaScript y por teclado. El resumen lleva su propio
  `aria-label` y el marcador nativo se sustituye por un chevron dibujado.
- La salida del CLI es una región con `aria-label` y `tabIndex="0"` para poder
  desplazarse con teclado cuando no cabe en el ancho; el degradado derecho y la
  nota del pie avisan de que hay más línea.
- Objetivos táctiles ≥ 24 px en nav, marca, pie, TOC, botón de copiar y enlaces
  subrayados; el foco visible queda dentro de su marco.
- Copiar: confirmación visible «Copiado» y `aria-live="polite"`; si falla,
  «No se pudo copiar; selecciona el texto». El código está en el HTML servido.
- Capturas con `alt` del manifiesto y enlace «Ver captura completa» al archivo
  original; el rail de anotaciones es una `<ol>` con texto y los diagramas
  (agentes, proyección, árbol) tienen equivalente textual.
- Las marcas de color (`warning`, `error`, `success`) siempre llevan etiqueta.
- Responsive desde 360 px; las tablas y el código tienen scroll interno, nunca
  la página. Revisado a 360, 390, 768, 1024 y 1440.
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
9. Las capturas se leen del manifiesto y se sirven con `next/image` dentro de
   `WindowFrame`; no se duplican rutas, dimensiones ni `alt`, y no se inventan
   capturas ni issues.
10. El violeta sigue reservado a la puerta de aprobación; las demos no lo usan
    como decoración ni para marcar controles.
11. La hoja no se redondea ni se eleva: solo las ventanas de producto usan
    `rounded-window`, `shadow-window` y barra de título. Una ventana sin
    contenido real no se dibuja.
12. Ningún texto real baja de 11 px y las demos se leen a 17 px. Si no cabe, se
    ajustan gaps, anchos o columnas; nunca el tamaño.
13. Los controles y los enlaces de navegación, pie y cromo alcanzan 24 px de caja
    y conservan el anillo de foco completo. Las capturas recortadas enlazan a su
    archivo completo.

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
- `V3` revisión manual/documentada — 360/390/768/1024/1440 sin scroll horizontal
  de página; matriz, estados y cabecera legibles; capturas con «Ver captura
  completa»; terminal con degradado y nota; teclado en disclosures, matriz y
  terminal; foco visible; contraste AA sin cambios; alt y equivalentes textuales;
  `prefers-reduced-motion` sin animación (estado final) y sin JavaScript.
- `rei validate` — sin `FAIL`.
- `playwright-core` es la única dependencia nueva y es `devDependency`; no hay
  dependencias de runtime nuevas.
