// Import base logger

import { Logger } from "./classes/Logger.js";
import { LogManager } from "./classes/LogManager.js";
import { Colors } from "./classes/Colors.js";

// Import webhooks
import { DiscordWebhook } from "./classes/webhooks/Discord.js";
import { SlackWebhook } from "./classes/webhooks/Slack.js";
import { TelegramWebhook } from "./classes/webhooks/Telegram.js";
import { GuildedWebhook } from "./classes/webhooks/Guilded.js";

export {
  Logger,
  LogManager,
  Colors,
  DiscordWebhook,
  SlackWebhook,
  TelegramWebhook,
  GuildedWebhook,
};
