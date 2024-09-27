import { appendFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { rotateLogFile } from '../utilities/rotateLogFile.js';
import { formatMessage } from '../utilities/formatMessage.js';

export async function logToFiles(data, message, type) {
    const {
        sources: { files = [] },
        types = [],
        logBuffer,
    } = data;
    if (!files.length) return;

    const typeUpper = type.toUpperCase();
    const appendPromises = [];

    files.forEach(async (file) => {
        const filePath = file.name || file;
        const fileTypes = file.types?.map((t) => t.toUpperCase()) || [];
        const fileLevelIndex = types.indexOf(file.level?.toUpperCase()) || -1;

        if (message === true) {
            logBuffer.forEach((logs, key) => {
                if (!logs.length) return;
                const keyUpper = key.toUpperCase();
                if (
                    fileTypes.includes(keyUpper) ||
                    types.indexOf(keyUpper) >= fileLevelIndex ||
                    (!file.types && !file.level)
                ) {
                    const logString = formatMessage(data, file, logs);
                    appendPromises.push(handleFileAppend(filePath, file.maxSize, logString));
                    logBuffer.set(key, []);
                }
            });
            return;
        }

        if (!file.types || file.types.some((t) => t.toUpperCase() === typeUpper)) {
            const formattedLogMessage = formatMessage(data, file, message);
            appendPromises.push(handleFileAppend(filePath, file.maxSize, formattedLogMessage));
        }
    });

    try {
        await Promise.all(appendPromises);
    } catch (err) {
        console.error('[LOGGER] Error processing file append operations:', err);
    }
}

async function handleFileAppend(filePath, maxSize, logString) {
    try {
        await ensureDirectoryExists(filePath);
        await rotateLogFile(maxSize, filePath);
        await appendFile(filePath, logString + '\n');
    } catch (err) {
        console.error(`[LOGGER] Error appending to file ${filePath}: ${err}`);
    }
}

async function ensureDirectoryExists(filePath) {
    const dir = dirname(filePath);
    try {
        await mkdir(dir, { recursive: true });
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}
