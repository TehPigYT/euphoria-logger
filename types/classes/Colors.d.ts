export class Colors {
    static colors: {
        black: string;
        red: string;
        green: string;
        yellow: string;
        blue: string;
        magenta: string;
        cyan: string;
        white: string;
        reset: string;
        bright: string;
        dim: string;
        underline: string;
        blink: string;
        reverse: string;
        bgBlack: string;
        bgRed: string;
        bgGreen: string;
        bgYellow: string;
        bgBlue: string;
        bgMagenta: string;
        bgCyan: string;
        bgWhite: string;
    };
    applyColor(color: any, text: any): string;
    get list(): string[];
}
