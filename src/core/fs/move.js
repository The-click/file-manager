import { pipeline } from "node:stream/promises";
import fs from "node:fs/promises";
import { createReadStream, createWriteStream } from "fs";
import path from "path";
import FsCommandBase from "./base.js";

class MoveCLICommand extends FsCommandBase {
    #name = "mv";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { oldFilePath, newFilePath } = await this.getArgs(args);
            const readStream = createReadStream(oldFilePath);
            const writeStream = createWriteStream(newFilePath);
            await pipeline(readStream, writeStream);
            await fs.rm(oldFilePath);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    async getArgs(args) {
        const [oldFilePath, dirPath] = this.validatePassedArgs(args, 2);
        const [absOldFilePath, absDirPath] = this.getAbsolutePath([
            oldFilePath,
            dirPath,
        ]);
        const newFilePath = path.resolve(
            absDirPath,
            path.win32.basename(oldFilePath)
        );

        if (await this.isFileExist(newFilePath)) {
            const error = new Error("No new path found " + absDirPath);
            error.code = "FEXIST";
            throw error;
        }

        if (!(await this.isFileExist(absOldFilePath))) {
            const error = new Error("File not found " + absOldFilePath);
            error.code = "FEXIST";
            throw error;
        }

        return { oldFilePath: absOldFilePath, newFilePath };
    }
}

export default MoveCLICommand;
