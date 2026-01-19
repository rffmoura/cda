// --- Helper 1: Formatar Requisitos (Já existia) ---
export const formatRequirements = (requirements: string) => {
  if (!requirements) return null;
  let cleaned = requirements.replace(/Additional Notes:?.*$/i, '');
  cleaned = cleaned.replace(/^(Minimum:|Recommended:)\s*/i, '');
  const keys = ['OS', 'Processor', 'Memory', 'Graphics', 'Storage', 'Sound Card', 'DirectX'];
  keys.forEach((key) => {
    const regex = new RegExp(`(${key}):`, 'g');
    cleaned = cleaned.replace(regex, `<br/><strong class="text-purple-400">$1:</strong>`);
  });
  return cleaned;
};
