const validateArray = (name, type) => {
  if (!Array.isArray(type)) {
    throw new Error(`[LOGGER] ${name} must be an array.`);
  }
};

const validateObject = (config, index, type) => {
  if (typeof config !== "object" || config === null) {
    throw new Error(
      `[LOGGER] ${type} configuration at index ${index} must be an object.`
    );
  }
};

const validateStringProperty = (config, index, property) => {
  if (config[property] && typeof config[property] !== "string") {
    throw new Error(
      `[LOGGER] ${property} property at index ${index} must be a string.`
    );
  }
};

const validateArrayProperty = (config, index, property) => {
  if (config[property] && !Array.isArray(config[property])) {
    throw new Error(
      `[LOGGER] ${property} property at index ${index} must be an array.`
    );
  }
};

const validateFiles = (files) => {
  files.forEach((fileConfig, index) => {
    validateObject(fileConfig, index, "File");

    if (typeof fileConfig.name !== "string") {
      throw new Error(
        `[LOGGER] File configuration at index ${index} must have a "name" property of type string.`
      );
    }

    validateStringProperty(fileConfig, index, "format");
    validateStringProperty(fileConfig, index, "level");

    if (fileConfig.maxSize && typeof fileConfig.maxSize !== "number") {
      throw new Error(
        `[LOGGER] File configuration at index ${index} has an invalid "maxSize" property. It must be a number.`
      );
    }

    validateArrayProperty(fileConfig, index, "types");
    if (fileConfig.types) {
      fileConfig.types.forEach((type, typeIndex) => {
        if (typeof type !== "string") {
          throw new Error(
            `[LOGGER] File configuration at index ${index} has an invalid type at index ${typeIndex}. It must be a string.`
          );
        }
      });
    }
  });
};

import { DiscordWebhook } from "../webhooks/Discord.js";
import { TelegramWebhook } from "../webhooks/Telegram.js";
import { SlackWebhook } from "../webhooks/Slack.js";
import { GuildedWebhook } from "../webhooks/Guilded.js";

const classes = [DiscordWebhook, TelegramWebhook, SlackWebhook, GuildedWebhook];

const validateWebhooks = (webhooks) => {
  webhooks.forEach((webhookConfig, index) => {
    if (!classes.some((cls) => webhookConfig instanceof cls))
      throw new Error(
        `[LOGGER] Webhook configuration at index ${index} must be an instance of DiscordWebhook, TelegramWebhook, SlackWebhook, or GuildedWebhook.`
      );
    validateObject(webhookConfig, index, "Webhook");

    validateStringProperty(webhookConfig, index, "id");
    validateStringProperty(webhookConfig, index, "token");
    validateStringProperty(webhookConfig, index, "level");

    validateArrayProperty(webhookConfig, index, "types");
    if (webhookConfig.types) {
      webhookConfig.types.forEach((type, typeIndex) => {
        if (typeof type !== "string") {
          throw new Error(
            `[LOGGER] Webhook configuration at index ${index} has an invalid type at index ${typeIndex}. It must be a string.`
          );
        }
      });
    }
  });
};

const validateTypes = (types) => {
  types.forEach((type, index) => {
    if (typeof type !== "string") {
      throw new Error(`[LOGGER] Type at index ${index} must be a string.`);
    }
  });
};

const validateTypeFormats = (types, typeFormats) => {
  const upperCaseTypes = types.map((type) => type.toUpperCase());
  Object.keys(typeFormats).forEach((type) => {
    if (!upperCaseTypes.includes(type.toUpperCase())) {
      throw new Error(
        `[LOGGER] Type format key "${type}" is not a valid type.`
      );
    }

    if (typeof typeFormats[type] !== "string") {
      throw new Error(
        `[LOGGER] Type format value for key "${type}" must be a string.`
      );
    }
  });
};

export {
  validateArray,
  validateFiles,
  validateWebhooks,
  validateTypes,
  validateTypeFormats,
};
