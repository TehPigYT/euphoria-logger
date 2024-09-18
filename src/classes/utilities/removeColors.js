export function removeColors(text) {
  const ansiEscapeCodeRegex = /\x1b\[[0-9;]*m/g;
  return text.replace(ansiEscapeCodeRegex, "");
}
