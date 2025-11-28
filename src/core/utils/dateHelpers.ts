export const getMinAllowedMonth = (): string => {
  const now = new Date();
  const fiveYearsAgo = new Date(now.getFullYear() - 5, now.getMonth(), 1);
  const year = fiveYearsAgo.getFullYear();
  const month = String(fiveYearsAgo.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const getMaxAllowedMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const normalizeMonthYearToDate = (monthYear: string): string => {
  if (!monthYear || !/^\d{4}-\d{2}$/.test(monthYear)) {
    return '';
  }
  return `${monthYear}-01`;
};

export const isValidMonthYear = (monthYear: string): boolean => {
  if (!monthYear || !/^\d{4}-\d{2}$/.test(monthYear)) {
    return false;
  }

  const minAllowed = getMinAllowedMonth();
  const maxAllowed = getMaxAllowedMonth();

  return monthYear >= minAllowed && monthYear <= maxAllowed;
};

export const formatMonthYearForDisplay = (monthYear: string): string => {
  if (!monthYear || !/^\d{4}-\d{2}$/.test(monthYear)) {
    return '';
  }

  const [year, month] = monthYear.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);

  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};
