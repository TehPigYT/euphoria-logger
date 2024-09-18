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
      throw new Error(`[LOGGER] You must enable console logs, file logs, or connect a webhook.`);
    }
    if (typeof console !== "boolean" && typeof console !== "object") {
      throw new Error(`[LOGGER] Console must be a boolean or an object.`);
    }
    (0, _validators.validateArray)("Files", files);
    (0, _validators.validateFiles)(files);
    (0, _validators.validateArray)("Webhooks", webhooks);
    (0, _validators.validateWebhooks)(webhooks);
    (0, _validators.validateArray)("Types", types);
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
    this.colors = new _Colors.Colors();
    this.format = format || this.#defaultFormat;
    this.typeFormats = this.#transformKeysToUpperCase(typeFormats) || this.#defaultTypeFormats();
    this.sources = {
      console,
      files,
      webhooks
    };
    if (this.bufferInterval) setInterval(() => this.#flushLogs(), this.bufferInterval);
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
  #defaultTypeFormats() {
    return {
      INFO: this.colors.applyColor("white", "INFO"),
      ERROR: this.colors.applyColor("red", "ERROR"),
      FAIL: this.colors.applyColor("red", "FAIL"),
      WARN: this.colors.applyColor("yellow", "WARN"),
      DEBUG: this.colors.applyColor("cyan", "DEBUG"),
      SUCCESS: this.colors.applyColor("green", "SUCCESS")
    };
  }
  log(type, message, show_memory = false) {
    const upperType = type.toUpperCase();
    if (!this.allowedTypes.has(upperType)) {
      throw new Error(`[LOGGER] The type ${type} does not exist in the provided types.`);
    }
    const timestamp = new Date().toLocaleString().substr(11, 10);
    const finalType = this.typeFormats[upperType] || upperType;
    const memoryUsage = show_memory ? (0, _measureSize.measureSize)(process.memoryUsage().rss) : "";
    const logMessage = {
      timestamp,
      type: finalType,
      message: typeof message === "string" ? message : JSON.stringify(message),
      memoryUsage
    };
    if (this.console) (0, _console.logToConsole)(this, this.format(logMessage), type);
    if (this.sources.webhooks.length) (0, _webhooks.logToWebhooks)(this, logMessage, type);
    if (!this.logBuffer.has(type)) this.logBuffer.set(type, []);
    this.logBuffer.get(type).push(logMessage);
    if (!this.bufferInterval) (0, _files.logToFiles)(this, logMessage, type);
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
  info(message, show_memory = false) {
    this.log("INFO", message, show_memory);
  }
  success(message, show_memory = false) {
    this.log("SUCCESS", message, show_memory);
  }
  warn(message, show_memory = false) {
    this.log("WARN", message, show_memory);
  }
  error(message, show_memory = false) {
    this.log("ERROR", message, show_memory);
  }
  debug(message, show_memory = false) {
    this.log("DEBUG", message, show_memory);
  }
}
exports.Logger = Logger;