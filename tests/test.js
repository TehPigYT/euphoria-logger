new Logger({
    console: { level: "info", types: ["WARN"] }
    webhooks: {
        new DiscordWebhook({
            id: "",
            token: "",
        }),
        new SlackWebhook(),
        new TelegramWebhook({
            id: "",
            token: "",
        }),
        new GuildedWebhook({
            id: "",
            token: "",
        })
    },
    files: [
        { name: "test.log" },
        { name: "info.log", maxSize: 1024, level: "info" }, // maxSize in kb
        { name: "warn.log", types: ["ERROR"] },
    ],
    bufferInterval: 5000, // in ms
    types: ["INFO", "WARN", "ERROR"], // custom types, default is ["DEBUG", "INFO", "SUCCESS", "WARN", "ERROR"]
    typeFormats: { // supports colors provided by the Colors class
        INFO: Colors.red("INFO"),
        WARN: Colors.blue("WARN"),
        ERROR: Colors.yellow("ERROR"),
    },
    format: ({ timestamp, type, message }) => `${timestamp} - [${type}] ${message}`,
})