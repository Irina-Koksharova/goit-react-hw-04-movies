const dateConversion = name => {
  if (!name) {
    return;
  }
  return ` (${name.slice(0, 4)})`;
};

export { dateConversion };
