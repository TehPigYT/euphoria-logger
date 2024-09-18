"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logToFiles = logToFiles;
var _promises = require("fs/promises");
var _rotateLogFile = require("../utilities/rotateLogFile.cjs");
var _formatMessage = require("../utilities/formatMessage.cjs");
async function logToFiles(data, message, type) {
  const {
    sources: {
      files = []
    },
    types = [],
    logBuffer
  } = data;
  if (!files.length) return;
  const typeUpper = type.toUpperCase();
  const appendPromises = [];
  files.forEach(file => {
    const filePath = file.name || file;
    const fileTypes = file.types?.map(t => t.toUpperCase()) || [];
    const fileLevelIndex = types.indexOf(file.level?.toUpperCase()) || -1;
    if (message === true) {
      for (const [key, logs] of logBuffer.entries()) {
        if (!logs.length) continue;
        const keyUpper = key.toUpperCase();
        if (fileTypes.includes(keyUpper) || types.indexOf(keyUpper) >= fileLevelIndex || !file.types && !file.level) {
          const logString = (0, _formatMessage.formatMessage)(data, file, logs);
          appendPromises.push((0, _rotateLogFile.rotateLogFile)(file.maxSize, filePath).then(() => (0, _promises.appendFile)(filePath, logString + "\n")).catch(err => {
            console.error(`[LOGGER] Error appending to file ${filePath}: ${err}`);
          }));
          logBuffer.set(key, []);
        }
      }
      return;
    }
    if (!file.types || file.types.some(t => t.toUpperCase() === typeUpper)) {
      const formattedLogMessage = (0, _formatMessage.formatMessage)(data, file, message);
      appendPromises.push((0, _rotateLogFile.rotateLogFile)(file.maxSize, filePath).then(() => (0, _promises.appendFile)(filePath, formattedLogMessage + "\n")).catch(err => {
        console.error(`[LOGGER] Error appending to file ${filePath}: ${err}`);
      }));
    }
  });
  await Promise.all(appendPromises).catch(err => {
    console.error("[LOGGER] Error processing file append operations:", err);
  });
}