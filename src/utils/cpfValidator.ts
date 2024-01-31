export function isCPFValid(cpf: string): boolean {
  // Remover caracteres não numéricos
  const cleanedCPF = cpf.replace(/\D/g, "");

  // Verificar se o CPF tem 11 dígitos
  if (cleanedCPF.length !== 11) {
    return false;
  }

  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanedCPF)) {
    return false;
  }

  // Calcular os dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCPF[i]) * (10 - i);
  }
  const firstDigit = (sum * 10) % 11;

  if (firstDigit !== parseInt(cleanedCPF[9])) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCPF[i]) * (11 - i);
  }
  const secondDigit = (sum * 10) % 11;

  return secondDigit === parseInt(cleanedCPF[10]);
}
