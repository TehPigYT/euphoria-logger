import { Logger } from "./Logger.js";

class LogManager {
  static instance;
  _loggers = new Map();

  constructor() {
    if (LogManager.instance) {
      return LogManager.instance;
    }

    LogManager.instance = this;
  }

  add(name, options) {
    if (this._loggers.has(name)) {
      throw new Error(`[LOGGER] Logger ${name} already exists.`);
    }
    this._loggers.set(name, new Logger(options));
  }

  get(name) {
    if (!this._loggers.has(name)) {
      throw new Error(`[LOGGER] Logger ${name} does not exist.`);
    }
    return this._loggers.get(name);
  }

  remove(name) {
    if (!this._loggers.has(name)) {
      throw new Error(`[LOGGER] Logger ${name} does not exist.`);
    }
    this._loggers.delete(name);
  }

  clear() {
    this._loggers.clear();
  }

  get loggers() {
    return this._loggers;
  }
}

export { LogManager };
