import { removeColors } from "../utilities/removeColors.js";

class GuildedWebhook {
  constructor(url) {
    this.url = url;
  }

  async send(content) {
    const data = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: removeColors(content) }),
    });

    if (!data.ok) {
      throw new Error(`Failed to send message: ${data.statusText}`);
    }
  }
}

export { GuildedWebhook };
