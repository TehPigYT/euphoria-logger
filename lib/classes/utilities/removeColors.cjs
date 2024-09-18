"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeColors = removeColors;
function removeColors(text) {
  const ansiEscapeCodeRegex = /\x1b\[[0-9;]*m/g;
  return text.replace(ansiEscapeCodeRegex, "");
}