# DESIGN.md — Sistema visual de REI Web

> Documenta el sistema **tal como quedó construido** en la Feature
> `2026-10-27_01-54__fundaciones-visuales-shell-docs`. La dirección visual es
> **Plano en grafito** (estructura de Juego de planos + paleta de El estándar) y
> la tipografía **A · Archivo Expandido**. Las decisiones de producto viven en
> `docs/product-strategy.md` y `PRODUCT.md`; este archivo describe la
> implementación.

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
violeta de la home; el foco y la selección son estados interactivos, no regiones.

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

`HeroSheet` compone tesis, deck, CTAs, matriz de responsabilidades, panel de
metadata y línea de cotas. `HomeSection` renderiza los bloques editoriales y
`FinalCta` cierra la página. Los datos viven en `features/home/data/` y los roles
se leen de `content/rei`.

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
(`matrix-band-in`), la banda violeta se cierra sobre el eje horizontal
(`gate-close`) y la firma se dibuja al final (`signature-draw`). Solo se animan
`transform` y `opacity`, una vez por carga, sin JavaScript ni librerías. Los
elementos decorativos son `aria-hidden` y el texto existe desde el primer
render. Con `prefers-reduced-motion: reduce`, las tres animaciones se desactivan
y se muestra el estado final.

## Accesibilidad

- `html lang="es"`; un `h1` por página y jerarquía sin saltos.
- Skip link como primer tabulable hacia `main#contenido` (con `tabIndex={-1}`).
- Foco visible global: anillo de 2 px y separación de 2 px.
- `aria-current="page"` en cabecera, tabs y sidebar; `aria-label` distinto en
  cabecera, sidebar, TOC y pager.
- `<details>`/`<summary>` nativos para menú móvil, sidebar móvil y FAQ.
- Copiar: confirmación visible «Copiado» y `aria-live="polite"`; si falla,
  «No se pudo copiar; selecciona el texto». El código está en el HTML servido.
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
- Una sola fuente por dato. No se duplican comandos, estados ni roles.
- Sin cifras, testimonios, clientes ni comparativas inventadas. La home no usa
  cifras externas.
- «Changelog», «Conceptos» y «Guías» no se muestran porque sus rutas no existen.

## Reglas de uso

1. No declarar colores literales en componentes: usar los tokens de color.
2. No añadir familias tipográficas ni pesos fuera de Archivo 600, Geist 400/500
   y Geist Mono 400.
3. No usar violeta como decoración: en la home solo la banda de aprobación; en
   docs, el bloque de aprobación.
4. No crear UI para funciones inexistentes (búsqueda, selector de versiones,
   tabs sin ruta).
5. Mantener el contenido legible sin JavaScript; cualquier nuevo cliente debe
   justificar interacción real.
6. Reutilizar `Container`, `ButtonLink`, `StatusTag`, `CodeBlock` y
   `CopyButton`; no introducir un kit de UI.
7. Respetar `--container-reading` en prosa y `--layout-grid` en la home.
8. Toda ruta nueva se añade a `ROUTES` y al árbol de docs antes de enlazarla.

## Assets

No se añaden imágenes raster ni ilustraciones. El `favicon.ico` existente
proviene del scaffold de `create-next-app` y no se modificó; el resto de la
identidad es tipográfica, retícula y color.

## Verificación de cierre

- `V1` `pnpm lint` — pasa.
- `V2` `pnpm build` — pasa; las rutas `/`, `/docs` y las cuatro páginas de docs
  se prerenderizan, más `sitemap.xml` y `robots.txt`.
- `V3` revisión manual/documentada — 360/768/1280 sin scroll horizontal de
  página, teclado en disclosures, foco visible, copiar verificado, enlaces
  internos existentes, `prefers-reduced-motion` sin animación y CLS 0.
- `rei validate` — sin `FAIL`.
- `package.json` y `pnpm-lock.yaml` sin cambios; sin dependencias nuevas.
