import { removeColors } from '../utilities/removeColors.js';

const sendSymbol = Symbol('send');

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
            body: JSON.stringify({ content: removeColors(message) }),
        });

        if (!data.ok) console.error(`[LOGGER] Error sending message to Discord: ${data.statusText}`);
    }
}

export { DiscordWebhook, sendSymbol };
