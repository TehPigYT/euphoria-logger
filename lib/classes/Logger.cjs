"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;
var _nodePerf_hooks = require("node:perf_hooks");
var _console = require("./sources/console.cjs");
var _webhooks = require("./sources/webhooks.cjs");
var _files = require("./sources/files.cjs");
var _measureSize = require("./utilities/measureSize.cjs");
var _validators = require("./utilities/validators.cjs");
var _Colors = require("./Colors.cjs");
// Import sources

// Import utilities

const colors = new _Colors.Colors();
class Logger {
  constructor({
    console = true,
    files = [],
    webhooks = [],
    types = ["DEBUG", "INFO", "SUCCESS", "WARN", "ERROR"],
    bufferInterval = null,
    typeFormats = {},
    format = null
  } = {}) {
    if (!console && !files.length && !webhooks.length) {
      throw new Error(`[LOGGER] You must either enable console logs, file logs, or connect a webhook.`);
    }
    if (typeof console !== "boolean" && typeof console !== "object") {
      throw new Error(`[LOGGER] Console must be a boolean or an object.`);
    }
    if (!Array.isArray(files)) {
      throw new Error(`[LOGGER] Files must be an array.`);
    }
    (0, _validators.validateFiles)(files);
    if (!Array.isArray(webhooks)) {
      throw new Error(`[LOGGER] Webhooks must be an array.`);
    }
    (0, _validators.validateWebhooks)(webhooks);
    if (!Array.isArray(types)) {
      throw new Error(`[LOGGER] Types must be an array.`);
    }
    (0, _validators.validateTypes)(types);
    (0, _validators.validateTypeFormats)(types, typeFormats);
    if (bufferInterval && typeof bufferInterval !== "number") {
      throw new Error(`[LOGGER] Buffer interval must be a number in milliseconds (ms).`);
    }
    this.console = console;
    this.performance = new Map();
    this.logBuffer = new Map();
    this.bufferInterval = bufferInterval;
    this.allowedTypes = new Set(types.map(t => t.toUpperCase()));
    this.colors = colors;
    this.format = format || this.#defaultFormat;
    this.typeFormats = this.#transformKeysToUpperCase(typeFormats) || {
      INFO: colors.applyColor("white", "INFO"),
      ERROR: colors.applyColor("red", "ERROR"),
      FAIL: colors.applyColor("red", "FAIL"),
      WARN: colors.applyColor("yellow", "WARN"),
      DEBUG: colors.applyColor("cyan", "DEBUG"),
      SUCCESS: colors.applyColor("green", "SUCCESS")
    };
    this.types = types;
    this.sources = {
      console,
      files,
      webhooks
    };
    if (this.bufferInterval) {
      setInterval(() => {
        this.#flushLogs();
      }, this.bufferInterval);
    }
  }
  #defaultFormat({
    timestamp,
    type,
    message,
    memoryUsage
  }) {
    return `[${timestamp}] - [${type}] - ${message}${memoryUsage ? ` - Memory: ${memoryUsage}` : ""}`;
  }
  #transformKeysToUpperCase(obj) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key.toUpperCase(), value]));
  }
  log(type, message, show_memory = false) {
    if (!this.sources.webhooks.length && !this.sources.files.length && !this.sources.console) {
      console.error(`[LOGGER] You must either enable console logs, file logs, or connect a webhook.`);
      return;
    }
    const timestamp = new Date().toISOString();
    const finalType = this.typeFormats[type.toUpperCase()] || type.toUpperCase();
    const memoryUsage = show_memory ? (0, _measureSize.measureSize)(process.memoryUsage().rss) : "";
    const logMessage = {
      timestamp,
      type: finalType,
      message: typeof message === "string" ? message : JSON.stringify(message),
      memoryUsage
    };

    // Log to console
    if (this.console) {
      (0, _console.logToConsole)(this, this.format(logMessage), type);
    }

    // Log to webhooks
    if (this.sources.webhooks.length) {
      (0, _webhooks.logToWebhooks)(this, logMessage, type);
    }

    // Add log message to buffer
    if (!this.logBuffer.has(type)) {
      this.logBuffer.set(type, []);
    }
    this.logBuffer.get(type).push(logMessage);

    // Log to files
    if (!this.bufferInterval) {
      (0, _files.logToFiles)(this, logMessage, type);
    }
  }
  #flushLogs() {
    this.logBuffer.forEach((logs, type) => {
      if (logs.length > 0) {
        (0, _files.logToFiles)(this, logs, type);
        this.logBuffer.set(type, []);
      }
    });
  }
  measure(label) {
    if (!label) {
      console.error(`[LOGGER] Label is required.`);
      return;
    }
    const times = this.performance.get(label) || [];
    times.push(_nodePerf_hooks.performance.now());
    this.performance.set(label, times);
  }
  endMeasure(label, log = true) {
    if (!label) {
      console.error(`[LOGGER] Label is required.`);
      return;
    }
    const times = this.performance.get(label);
    if (!times) {
      console.error(`[LOGGER] Label ${label} was not measured.`);
      return;
    }
    const final = _nodePerf_hooks.performance.now();
    times.push(final);
    if (log) {
      console.log(`[LOGGER] Total time >> ${label} - ${final - times[0]}ms`);
    }
    return times;
  }

  // Convenience methods for different log levels
  info(message, show_memory = false) {
    if (!this.allowedTypes.has("INFO")) {
      console.log("[LOGGER] The info type does not exist in the provided types.");
      return;
    }
    this.log("info", message, show_memory);
  }
  success(message, show_memory = false) {
    if (!this.allowedTypes.has("SUCCESS")) {
      console.log("[LOGGER] The success type does not exist in the provided types.");
      return;
    }
    this.log("success", message, show_memory);
  }
  warn(message, show_memory = false) {
    if (!this.allowedTypes.has("WARN")) {
      console.log("[LOGGER] The warn type does not exist in the provided types.");
      return;
    }
    this.log("warn", message, show_memory);
  }
  error(message, show_memory = false) {
    if (!this.allowedTypes.has("ERROR")) {
      console.log("[LOGGER] The error type does not exist in the provided types.");
      return;
    }
    this.log("error", message, show_memory);
  }
  debug(message, show_memory = false) {
    if (!this.allowedTypes.has("DEBUG")) {
      console.log("[LOGGER] The debug type does not exist in the provided types.");
      return;
    }
    this.log("debug", message, show_memory);
  }
}
exports.Logger = Logger;