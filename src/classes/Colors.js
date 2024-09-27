class Colors {
    static colors = {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',

        reset: '\x1b[0m',
        bright: '\x1b[1m',
        dim: '\x1b[2m',
        underline: '\x1b[4m',
        blink: '\x1b[5m',
        reverse: '\x1b[7m',

        bgBlack: '\x1b[40m',
        bgRed: '\x1b[41m',
        bgGreen: '\x1b[42m',
        bgYellow: '\x1b[43m',
        bgBlue: '\x1b[44m',
        bgMagenta: '\x1b[45m',
        bgCyan: '\x1b[46m',
        bgWhite: '\x1b[47m',
    };

    constructor() {
        Object.keys(Colors.colors).forEach((color) => {
            this[color] = (text) => this.applyColor(Colors.colors[color], text);
        });
    }

    applyColor(color, text) {
        return `${color}${text}${Colors.colors.reset}`;
    }

    get list() {
        return Object.keys(Colors.colors);
    }
}

export { Colors };
