export class LogManager {
    static instance: any;
    _loggers: any;
    add(name: any, options: any): void;
    get(name: any): any;
    remove(name: any): void;
    clear(): void;
    get loggers(): any;
}
