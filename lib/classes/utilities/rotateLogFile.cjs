"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotateLogFile = rotateLogFile;
var _promises = require("fs/promises");
var _compressLogFile = require("./compressLogFile.cjs");
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function rotateLogFile(data, filePath) {
  try {
    const stats = await (0, _promises.stat)(filePath);
    if (!data || stats.size / 1024 < data) return;
    const {
      dir,
      base
    } = _path.default.parse(filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const newFilePath = _path.default.join(dir, `${base}.${timestamp}`);
    await (0, _promises.rename)(filePath, newFilePath);
    await (0, _compressLogFile.compressLogFile)(newFilePath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(`[LOGGER] Error rotating log file ${filePath}: ${err.message}`);
    }
  }
}