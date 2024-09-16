// Exports an array of arrays as a CSV downlaod

export const exportAsCSV = (content) => {
  const escapeField = (field) => {
    // Convert to string and wrap in quotes if it contains commas, quotes, or newlines
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
      return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
  };

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    content.map((row) => row.map(escapeField).join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
};
