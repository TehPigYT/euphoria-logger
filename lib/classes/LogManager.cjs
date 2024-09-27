'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.LogManager = void 0;
var _Logger = require('./Logger.cjs');
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
        this._loggers.set(name, new _Logger.Logger(options));
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
exports.LogManager = LogManager;
