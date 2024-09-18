import { removeColors } from "../utilities/removeColors.js";

class TelegramWebhook {
  constructor({ id, token }) {
    this.base_url = `https://api.telegram.org/bot${token}/sendMessage`;
    this.chat_id = id;
  }

  async send(message) {
    const data = await fetch(this.base_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: this.chat_id,
        text: removeColors(message),
      }),
    });

    if (!data.ok) {
      console.error(
        `[LOGGER] Error sending message to Telegram: ${data.statusText}`
      );
      console.error(`[LOGGER] Response Body: ${JSON.stringify(data)}`);
    }
  }
}

export { TelegramWebhook };
