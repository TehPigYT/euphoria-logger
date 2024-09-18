import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { createGzip } from "node:zlib";

const { unlink } = fsPromises;
const pipelineAsync = promisify(pipeline);

export async function compressLogFile(filePath) {
  try {
    await pipelineAsync(
      createReadStream(filePath),
      createGzip(),
      createWriteStream(`${filePath}.gz`)
    );
    await unlink(filePath);
    console.log(`[LOGGER] File compressed successfully: ${filePath}.gz`);
  } catch (err) {
    console.error(`[LOGGER] Error compressing file: ${err.message}`);
  }
}
