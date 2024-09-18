# Documentation - Logger Class

### `new Logger(options)`
Creates a new logger instance with the specified configuration.

#### Parameters
- `options` (Object, optional): Configuration options for the logger.
  - `console` (Object): Configuration for console logging.
    - `level` (String): Minimum log level for console output (e.g., 'info', 'warn', 'error').
    - `types` (Array): Specific log types to be logged to the console (e.g., ['WARN']).
  - `webhooks` (Array): Configuration for webhook logging. It exclusively supports the webhook classes provided by the package.
  - `files` (Array): Configuration for file logging.
    - `name` (String): File name for the log file.
    - `maxSize` (Number): Maximum file size in kilobytes before rotation.
    - `level` (String): Minimum log level for the file.
    - `types` (Array): Specific log types to be logged to the file.
  - `bufferInterval` (Number): Interval in milliseconds to buffer log messages before writing to files.
  - `types` (Array): Custom log types. Default is ['DEBUG', 'INFO', 'SUCCESS', 'WARN', 'ERROR'].
  - `typeFormats` (Object): Custom formats for log types, supports colors provided by the [Colors]() class.
  - `format` (Function): Custom format function for log messages.
    - Parameters:
      - `timestamp` (String): Timestamp of the log message.
      - `type` (String): Log type.
      - `message` (String): Log message.
      - `memory` (String): Memory usage used by the application. (Only used when show_memory argument is set to `true`)

### Example Usage

```js
import { Logger } from "euphoria-logger";
const logger = new Logger();

logger.log("info", "Hello world");

logger.measure("test");
// code to measure
logger.endMeasure("test");

logger.info("Hello world");
```

### `<Logger>.log(type, message, show_memory)`
Logs a message at the specified type.

**Parameters**
- `type` (String): The type level (e.g., 'info', 'warn', 'error').
- `message` (String): The message to log.
- `show_memory` (Boolean, optional): Shows the application memory usage

### `<Logger>.measure(name)`
Starts measuring the execution time of the set timer with the given name.

**Parameters**
- `name` (String): The name of the measured timer.

### `<Logger>.endMeasure(name)`
End the measurement of the execution time of the set timer with the given name.

**Parameters**
- `name` (String): The name of the measured timer.

<br>

## Helper Methods
All these methods require their types to be present in order to function. These methods are mostly used for convienience

### `<Logger>.info(message, show_memory)`
If the info type exists, it will log in an info level message.

**Parameters**
- `message` (String): The message to log.
- `show_memory` (Boolean, optional): Shows the application memory usage

### `<Logger>.success(message, show_memory)`
If the success type exists, it will log in a success level message.

**Parameters**
- `message` (String): The message to log.
- `show_memory` (Boolean, optional): Shows the application memory usage

### `<Logger>.warn(message, show_memory)`
If the warn type exists, it will log in a warn level message.

**Parameters**
- `message` (String): The message to log.
- `show_memory` (Boolean, optional): Shows the application memory usage

### `<Logger>.debug(message, show_memory)`
If the debug type exists, it will log in a debug level message.

**Parameters**
- `message` (String): The message to log.
- `show_memory` (Boolean, optional): Shows the application memory usage

### `<Logger>.error(message, show_memory)`
If the error type exists, it will log in an error level message.

**Parameters**
- `message` (String): The message to log.
- `show_memory` (Boolean, optional): Shows the application memory usage