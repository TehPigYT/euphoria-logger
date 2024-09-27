# Documentation - Colors Class

### `new Colors()`

Provides the ability to use ANSI color codes anywhere in your code simple and fast.

---

### `<Colors>.list`

Provides the list of all the available colors and formats available.

---

### `<Colors>.applyColor(color, text)`

Applies a specified color format to the given text.

**Parameters**

- `color` (String): The color format to use.
- `text` (String): The text to format.

> [!NOTE]
> Every available color can also be specified as a method as in the example below for more overall customizability on text.

```js
import { Colors } from "euphoria-logger";
const colors = new Colors();

colors.red; // red
colors.cyan; // cyan
colors.yellow; // yellow
colors.bgWhite; // bgWhite
// ... and so on
```

---