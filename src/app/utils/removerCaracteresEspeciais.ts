export function removerCaracteresEspeciais(texto: string) {
  if (!texto) return null;
  return texto.replace(/\D/g, '');
}
