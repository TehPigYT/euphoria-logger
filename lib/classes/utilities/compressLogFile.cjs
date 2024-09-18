"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compressLogFile = compressLogFile;
var _nodeFs = require("node:fs");
var _nodeStream = require("node:stream");
var _nodeUtil = require("node:util");
var _nodeZlib = require("node:zlib");
const {
  unlink
} = _nodeFs.promises;
const pipelineAsync = (0, _nodeUtil.promisify)(_nodeStream.pipeline);
async function compressLogFile(filePath) {
  try {
    await pipelineAsync((0, _nodeFs.createReadStream)(filePath), (0, _nodeZlib.createGzip)(), (0, _nodeFs.createWriteStream)(`${filePath}.gz`));
    await unlink(filePath);
    console.log(`[LOGGER] File compressed successfully: ${filePath}.gz`);
  } catch (err) {
    console.error(`[LOGGER] Error compressing file: ${err.message}`);
  }
}