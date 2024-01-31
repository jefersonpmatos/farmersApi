export function isCNPJValid(cnpj: string): boolean {
  // Remover caracteres não numéricos
  const cleanedCNPJ = cnpj.replace(/\D/g, "");

  // Verificar se o CNPJ tem 14 dígitos
  if (cleanedCNPJ.length !== 14) {
    return false;
  }

  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanedCNPJ)) {
    return false;
  }

  // Calcular o primeiro dígito verificador
  let sum = 0;
  let factor = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanedCNPJ[i]) * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (firstDigit !== parseInt(cleanedCNPJ[12])) {
    return false;
  }

  // Calcular o segundo dígito verificador
  sum = 0;
  factor = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanedCNPJ[i]) * factor;
    factor = factor === 2 ? 9 : factor - 1;
  }
  const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  return secondDigit === parseInt(cleanedCNPJ[13]);
}
