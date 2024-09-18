import { Logger } from "../src/classes/Logger.js";
import { logToConsole } from "../src/classes/sources/console.js";
import { logToWebhooks } from "../src/classes/sources/webhooks.js";
import { logToFiles } from "../src/classes/sources/files.js";

jest.mock("../src/classes/sources/console.js");
jest.mock("../src/classes/sources/webhooks.js");
jest.mock("../src/classes/sources/files.js");

describe("Logger", () => {
  let logger;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (logger && logger.bufferInterval) {
      clearInterval(logger.bufferInterval);
    }
  });

  test("should throw error if no logging method is enabled", () => {
    expect(() => {
      new Logger({ console: false, files: [], webhooks: [] });
    }).toThrow(
      "[LOGGER] You must either enable console logs, file logs, or connect a webhook."
    );
  });

  test("should throw error if console is not boolean or object", () => {
    expect(() => {
      new Logger({ console: "invalid" });
    }).toThrow("[LOGGER] Console must be a boolean or an object.");
  });

  test("should throw error if files is not an array", () => {
    expect(() => {
      new Logger({ files: "invalid" });
    }).toThrow("[LOGGER] Files must be an array.");
  });

  test("should throw error if webhooks is not an array", () => {
    expect(() => {
      new Logger({ webhooks: "invalid" });
    }).toThrow("[LOGGER] Webhooks must be an array.");
  });

  test("should throw error if types is not an array", () => {
    expect(() => {
      new Logger({ types: "invalid" });
    }).toThrow("[LOGGER] Types must be an array.");
  });

  test("should throw error if bufferInterval is not a number", () => {
    expect(() => {
      new Logger({ bufferInterval: "invalid" });
    }).toThrow(
      "[LOGGER] Buffer interval must be a number in milliseconds (ms)."
    );
  });

  test("should log to console", () => {
    logger = new Logger();
    logger.log("info", "test message");
    expect(logToConsole).toHaveBeenCalled();
  });

  test("should log to webhooks", () => {
    logger = new Logger({ webhooks: [{ id: "123", token: "abc" }] });
    logger.log("info", "test message");
    expect(logToWebhooks).toHaveBeenCalled();
  });

  test("should log to files", () => {
    logger = new Logger({ files: [{ name: "log.txt" }] });
    logger.log("info", "test message");
    expect(logToFiles).toHaveBeenCalled();
  });

  test("should measure performance", () => {
    logger = new Logger();
    logger.measure("test");
    expect(logger.performance.get("test")).toHaveLength(1);
  });

  test("should end measure and log performance", () => {
    console.log = jest.fn();
    logger = new Logger();
    logger.measure("test");
    logger.endMeasure("test");
    expect(console.log).toHaveBeenCalled();
  });

  test("should log info message", () => {
    logger = new Logger();
    logger.info("test message");
    expect(logToConsole).toHaveBeenCalled();
  });

  test("should log success message", () => {
    logger = new Logger();
    logger.success("test message");
    expect(logToConsole).toHaveBeenCalled();
  });

  test("should log warn message", () => {
    logger = new Logger();
    logger.warn("test message");
    expect(logToConsole).toHaveBeenCalled();
  });

  test("should log error message", () => {
    logger = new Logger();
    logger.error("test message");
    expect(logToConsole).toHaveBeenCalled();
  });

  test("should log debug message", () => {
    logger = new Logger();
    logger.debug("test message");
    expect(logToConsole).toHaveBeenCalled();
  });
});
