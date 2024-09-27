# Documentation - LogManager Class

### `new LogManager()`

Provides the ability to use mutliple [Logger](https://github.com/TehPigYT/euphoria-logger/blob/master/docs/Logger.md) instances with each having its own seperate configuration options.

---

### `<LogManager>.add(name, options)`

Creates a [Logger](https://github.com/TehPigYT/euphoria-logger/blob/master/docs/Logger.md) instance with the specified name and the given configuration.

**Parameters**

-   `name` (String): The name of the Logger instance.
-   `options` (Object, optional): The options of the Logger instance.

---

### `<LogManager>.get(name)`

Retrieves a [Logger](https://github.com/TehPigYT/euphoria-logger/blob/master/docs/Logger.md) instance from the cache

**Parameters**

-   `name` (String): The name of the Logger instance

---

### `<LogManager>.remove(name)`

The [Logger](https://github.com/TehPigYT/euphoria-logger/blob/master/docs/Logger.md) instance to remove from the cache

**Parameters**

-   `name` (String): The name of the Logger instance

---

### `<LogManager>.clear()`

Removes all the [Logger](https://github.com/TehPigYT/euphoria-logger/blob/master/docs/Logger.md) instances from the cache.

---

### `<LogManager>.loggers`

Returns all the [Logger](https://github.com/TehPigYT/euphoria-logger/blob/master/docs/Logger.md) instances stored in cache.

---
