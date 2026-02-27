export const normalizeDigitsData = (value: string | undefined) => {
  if (!value) return ""
  
  // 1. Remove non-digits
  return value.replaceAll(/\D/g, '')
}

export const formatPhoneNumber = (value: string) => {
  // 1. Clean the input (digits only)
  const cleaned = normalizeDigitsData(value);

  // 2. Limit to 11 digits (Brazilian mobile max)
  const match = new RegExp(/^(\d{1,2})(\d{0,5})(\d{0,4})$/).exec(cleaned);

  if (match) {
    // If we have just area code
    if(match[2] === "") {
        return match[1].length === 2 ? `(${match[1]})` : match[1] // Wait for 2 digits to add parens
    }
    
    // Formatting: (XX) XXXXX-XXXX
    const suffix = match[3] ? `-${match[3]}` : ""
    return `(${match[1]}) ${match[2]}${suffix}`;
  }

  return value;
};

export const validatePhoneBR = (value: string): boolean => {
  const cleaned = normalizeDigitsData(value)
  return /^\d{10,11}$/.test(cleaned)
}

export const validateEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export const formatCPF = (value: string) => {
  // 1. Clean the input
  const cleaned = normalizeDigitsData(value);
  
  // 2. Limit to 11 digits
  // Regex logic: Capture groups to insert dots and dash
  return cleaned
    .replace(/(\d{3})(\d)/, '$1.$2')      // Add first dot
    .replace(/(\d{3})(\d)/, '$1.$2')      // Add second dot
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Add dash
    .replace(/(-\d{2})\d+$/, '$1');      // Prevent typing more than 11 digits
};
