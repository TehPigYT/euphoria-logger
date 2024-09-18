"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendSymbol = exports.SlackWebhook = void 0;
var _removeColors = require("../utilities/removeColors.cjs");
const sendSymbol = exports.sendSymbol = Symbol('send');
class SlackWebhook {
  constructor(url) {
    this.url = url;
  }
  async [sendSymbol](message) {
    const data = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: (0, _removeColors.removeColors)(message)
      })
    });
    if (!data.ok) console.error(`[LOGGER] Error sending message to Slack: ${data.statusText}`);
  }
}
exports.SlackWebhook = SlackWebhook;