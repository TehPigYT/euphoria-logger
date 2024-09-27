export class Logger {
    constructor({
        console,
        files,
        webhooks,
        types,
        bufferInterval,
        typeFormats,
        format,
    }?: {
        console?: boolean;
        files?: any[];
        webhooks?: any[];
        types?: string[];
        bufferInterval?: any;
        typeFormats?: {};
        format?: any;
    });
    console: boolean;
    performance: any;
    logBuffer: any;
    bufferInterval: any;
    allowedTypes: any;
    colors: Colors;
    format: any;
    typeFormats: any;
    sources: {
        console: boolean;
        files: any[];
        webhooks: any[];
    };
    log(type: any, message: any, show_memory?: boolean): void;
    measure(label: any): void;
    endMeasure(label: any, log?: boolean): any;
    info(message: any, show_memory?: boolean): void;
    success(message: any, show_memory?: boolean): void;
    warn(message: any, show_memory?: boolean): void;
    error(message: any, show_memory?: boolean): void;
    debug(message: any, show_memory?: boolean): void;
    #private;
}
import { Colors } from './Colors.js';
