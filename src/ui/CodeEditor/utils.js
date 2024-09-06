export const minLinesNumber = (code, minNumberOfLines) => {
  const numberOfLines = code.split(/\r\n|\r|\n/).length;

  const isMinimum = numberOfLines >= minNumberOfLines;

  if (isMinimum) return code;
  else return code + '\n'.repeat(minNumberOfLines - numberOfLines);
};
