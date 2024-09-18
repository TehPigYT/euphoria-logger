import { rename, stat } from "fs/promises";
import { compressLogFile } from "./compressLogFile.js";
import path from "path";

export async function rotateLogFile(data, filePath) {
  try {
    const stats = await stat(filePath);
    if (!data || stats.size / 1024 < data) return;

    const { dir, base } = path.parse(filePath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const newFilePath = path.join(dir, `${base}.${timestamp}`);

    await rename(filePath, newFilePath);
    await compressLogFile(newFilePath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.error(
        `[LOGGER] Error rotating log file ${filePath}: ${err.message}`
      );
    }
  }
}
