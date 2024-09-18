"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.measureSize = measureSize;
const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
function measureSize(bytes, decimals = 2) {
  if (bytes === 0) return "0 B";
  if (bytes < 0) return "Invalid value";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + UNITS[i];
}