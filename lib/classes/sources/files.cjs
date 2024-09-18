"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logToFiles = logToFiles;
var _promises = require("fs/promises");
var _path = require("path");
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
  files.forEach(async file => {
    const filePath = file.name || file;
    const fileTypes = file.types?.map(t => t.toUpperCase()) || [];
    const fileLevelIndex = types.indexOf(file.level?.toUpperCase()) || -1;
    if (message === true) {
      logBuffer.forEach((logs, key) => {
        if (!logs.length) return;
        const keyUpper = key.toUpperCase();
        if (fileTypes.includes(keyUpper) || types.indexOf(keyUpper) >= fileLevelIndex || !file.types && !file.level) {
          const logString = (0, _formatMessage.formatMessage)(data, file, logs);
          appendPromises.push(handleFileAppend(filePath, file.maxSize, logString));
          logBuffer.set(key, []);
        }
      });
      return;
    }
    if (!file.types || file.types.some(t => t.toUpperCase() === typeUpper)) {
      const formattedLogMessage = (0, _formatMessage.formatMessage)(data, file, message);
      appendPromises.push(handleFileAppend(filePath, file.maxSize, formattedLogMessage));
    }
  });
  try {
    await Promise.all(appendPromises);
  } catch (err) {
    console.error("[LOGGER] Error processing file append operations:", err);
  }
}
async function handleFileAppend(filePath, maxSize, logString) {
  try {
    await ensureDirectoryExists(filePath);
    await (0, _rotateLogFile.rotateLogFile)(maxSize, filePath);
    await (0, _promises.appendFile)(filePath, logString + "\n");
  } catch (err) {
    console.error(`[LOGGER] Error appending to file ${filePath}: ${err}`);
  }
}
async function ensureDirectoryExists(filePath) {
  const dir = (0, _path.dirname)(filePath);
  try {
    await (0, _promises.mkdir)(dir, {
      recursive: true
    });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}