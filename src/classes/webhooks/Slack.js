import { removeColors } from "../utilities/removeColors.js";

const sendSymbol = Symbol('send');
class SlackWebhook {
  constructor(url) {
    this.url = url;
  }

  async [sendSymbol](message) {
    const data = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: removeColors(message) }),
    });

    if (!data.ok)
      console.error(
        `[LOGGER] Error sending message to Slack: ${data.statusText}`
      );
  }
}

export { SlackWebhook, sendSymbol };
