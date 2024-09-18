// tests/logger.test.js
const { Logger } = require('../lib/classes/Logger');

describe('Logger', function() {
  it('should create a new Logger instance', function() {
    const logger = new Logger();
    expect(logger).toBeInstanceOf(Logger);
  });

  it('should log messages without errors', function() {
    const logger = new Logger();
    const message = 'Hello, world!';
    expect(() => logger.log("info", message)).not.toThrow();
  });

  // Add more tests as needed based on the actual methods and properties of Logger
});