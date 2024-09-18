import { Logger } from "../src/classes/Logger.js";
import { Colors } from "../src/classes/Colors.js";

describe("Colors", () => {
  let colors;

  beforeEach(() => {
    colors = new Colors();
  });

  test("static colors should have correct ANSI codes", () => {
    const expectedColors = {
      black: "\x1b[30m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",

      reset: "\x1b[0m",
      bright: "\x1b[1m",
      dim: "\x1b[2m",
      underline: "\x1b[4m",
      blink: "\x1b[5m",
      reverse: "\x1b[7m",

      bgBlack: "\x1b[40m",
      bgRed: "\x1b[41m",
      bgGreen: "\x1b[42m",
      bgYellow: "\x1b[43m",
      bgBlue: "\x1b[44m",
      bgMagenta: "\x1b[45m",
      bgCyan: "\x1b[46m",
      bgWhite: "\x1b[47m",
    };

    expect(Colors.colors).toEqual(expectedColors);
  });

  test("applyColor should apply correct color formatting", () => {
    const text = "Hello, World!";
    const color = Colors.colors.red;
    const expectedOutput = `${color}${text}${Colors.colors.reset}`;

    expect(colors.applyColor(color, text)).toEqual(expectedOutput);
  });
});
