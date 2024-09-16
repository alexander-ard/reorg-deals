// Returns a string concatenated by ',' if the value is an array, otherwise returns the value.

export const dataValueToString = (val) => {
  if (Array.isArray(val)) {
    return val.join(', ');
  }
  return val;
};
