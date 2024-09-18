export function logToWebhooks(data, message, type) {
  const {
    sources: { webhooks = [] },
    types = [],
  } = data;
  if (!webhooks.length) return;

  const typeUpper = type.toUpperCase();
  const typeIndex = types.indexOf(typeUpper);

  webhooks.forEach((webhook) => {
    const webhookLevelIndex = types.indexOf(webhook.level?.toUpperCase());

    if (typeIndex < webhookLevelIndex) return;
    if (!webhook.types?.some((x) => x.toUpperCase() === typeUpper)) return;

    webhook.send(message).catch((err) => {
      console.error("[LOGGER] Error sending to webhook:", err);
    });
  });
}
