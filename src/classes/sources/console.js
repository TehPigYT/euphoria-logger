export function logToConsole(data, message, type) {
  const typeUpper = type.toUpperCase();
  const consoleLevelUpper = data.sources.console?.level?.toUpperCase();
  const typeIndex = data.types?.indexOf(typeUpper);
  const consoleLevelIndex = data.types?.indexOf(consoleLevelUpper);

  if (
    typeIndex < consoleLevelIndex &&
    !data.sources.console?.types?.some((x) => x.toUpperCase() === typeUpper)
  ) {
    return;
  }

  console.log(message);
}
