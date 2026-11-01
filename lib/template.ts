/**
 * Rellena marcadores `{nombre}` de una plantilla. Existe porque una función no
 * cruza la frontera servidor/cliente: los componentes cliente reciben cadenas.
 * Un marcador sin valor se deja tal cual para que el fallo sea visible.
 */
export function fillTemplate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (marker, name: string) =>
    name in values ? String(values[name]) : marker,
  );
}
