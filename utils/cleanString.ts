// utils/cleanString.ts
export const cleanString = (str: string): string => {
    return str.replace(/\^c\d{2}\^/g, '');
  };