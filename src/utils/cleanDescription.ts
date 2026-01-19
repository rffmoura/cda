export const cleanDescription = (html: string) => {
  if (!html) return '';

  // Lista de palavras que geralmente indicam o início de outra língua na RAWG
  const stopMarkers = [
    '<p>Español',
    '<p>En Español',
    'Español:',
    '<strong>Español',
    '<p>Deutsch',
    '<p>Français',
    '<p>Italiano',
    '<p>Pусский',
    '<h1>Español',
  ];

  let cutIndex = html.length;

  // Procura onde começa o primeiro marcador de língua estrangeira
  stopMarkers.forEach((marker) => {
    const index = html.indexOf(marker);
    if (index !== -1 && index < cutIndex) {
      cutIndex = index;
    }
  });

  // Retorna apenas o texto do início até antes do marcador
  return html.substring(0, cutIndex);
};
