export function formatMessage(data, file, logMessage) {
  const format = file.format || "plain";
  const isArray = Array.isArray(logMessage);

  const formatJson = (log) => JSON.stringify(log);
  const formatCsv = (log) =>
    `${log.timestamp},${log.type},${log.message}${
      log.memoryUsage ? `,${log.memoryUsage}` : ""
    }`;
  const formatText = (log) => data.defaultFormat(log);

  let formattedMessage;

  switch (format) {
    case "json":
      formattedMessage = isArray
        ? logMessage.map(formatJson).join("\n")
        : formatJson(logMessage);
      break;

    case "csv":
      formattedMessage = isArray
        ? logMessage.map(formatCsv).join("\n")
        : formatCsv(logMessage);
      break;

    case "text":
      formattedMessage = isArray
        ? logMessage.map(formatText).join("\n")
        : formatText(logMessage);
      break;

    default:
      console.error(
        `[LOGGER] Invalid log format specified on file ${file.name
          .split("/")
          .pop()}. Supported options: 'json', 'csv', 'plain'`
      );
      return "";
  }

  return formattedMessage;
}
