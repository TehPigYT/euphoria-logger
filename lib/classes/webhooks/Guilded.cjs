"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuildedWebhook = void 0;
var _removeColors = require("../utilities/removeColors.cjs");
class GuildedWebhook {
  constructor(url) {
    this.url = url;
  }
  async send(content) {
    const data = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: (0, _removeColors.removeColors)(content)
      })
    });
    if (!data.ok) {
      throw new Error(`Failed to send message: ${data.statusText}`);
    }
  }
}
exports.GuildedWebhook = GuildedWebhook;