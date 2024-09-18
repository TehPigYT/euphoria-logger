import { removeColors } from "../utilities/removeColors.js";

const sendSymbol = Symbol('send');
class GuildedWebhook {
  constructor(url) {
    this.url = url;
  }

  async [sendSymbol](content) {
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

export { GuildedWebhook, sendSymbol };
