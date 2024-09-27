'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.sendSymbol = exports.DiscordWebhook = void 0;
var _removeColors = require('../utilities/removeColors.cjs');
const sendSymbol = (exports.sendSymbol = Symbol('send'));
class DiscordWebhook {
    constructor({ id, token }) {
        this.base_url = `https://discord.com/api/webhooks/${id}/${token}`;
    }
    async [sendSymbol](message) {
        const data = await fetch(this.base_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: (0, _removeColors.removeColors)(message),
            }),
        });
        if (!data.ok) console.error(`[LOGGER] Error sending message to Discord: ${data.statusText}`);
    }
}
exports.DiscordWebhook = DiscordWebhook;
