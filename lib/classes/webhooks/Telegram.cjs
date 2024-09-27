'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.sendSymbol = exports.TelegramWebhook = void 0;
var _removeColors = require('../utilities/removeColors.cjs');
const sendSymbol = (exports.sendSymbol = Symbol('send'));
class TelegramWebhook {
    constructor({ id, token }) {
        this.base_url = `https://api.telegram.org/bot${token}/sendMessage`;
        this.chat_id = id;
    }
    async [sendSymbol](message) {
        const data = await fetch(this.base_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: this.chat_id,
                text: (0, _removeColors.removeColors)(message),
            }),
        });
        if (!data.ok) {
            console.error(`[LOGGER] Error sending message to Telegram: ${data.statusText}`);
            console.error(`[LOGGER] Response Body: ${JSON.stringify(data)}`);
        }
    }
}
exports.TelegramWebhook = TelegramWebhook;
