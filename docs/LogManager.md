# Documentation - LogManager Class

### `new LogManager()`
Provides the ability to use mutliple [Logger](#new-loggeroptions) instances with each having its own seperate configuration options.

### `<LogManager>.add(name, options)`
Creates a [Logger](#new-loggeroptions) instance with the specified name and the given configuration.

**Parameters**
- `name` (String): The name of the Logger instance.
- `options` (Object, optional): The options of the Logger instance.

### `<LogManager>.get(name)`
Retrieves a [Logger](#new-loggeroptions) instance from the cache

**Parameters**
- `name` (String): The name of the Logger instance

### `<LogManager>.remove(name)`
The [Logger](#new-loggeroptions) instance to remove from the cache

**Parameters**
- `name` (String): The name of the Logger instance

### `<LogManager>.clear()`
Removes all the [Logger](#new-loggeroptions) instances from the cache.

### `<LogManager.loggers>`
Returns all the [Logger](#new-loggeroptions) instances stored in cache.