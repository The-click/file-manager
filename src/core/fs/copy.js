import { pipeline } from "node:stream/promises";
import fs from "fs";
import path from "path";
import FsCommandBase from "./base.js";

class CopyCLICommand extends FsCommandBase {
    #name = "copy";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { oldFilePath, dirPath } = this.getArgs(args);
            const readStream = fs.createReadStream(oldFilePath);
            const newFilePath = path.resolve(
                dirPath,
                path.win32.basename(oldFilePath)
            );
            const writeStream = fs.createWriteStream(newFilePath);

            if (await this.isFileExist(newFilePath)) {
                const error = new Error("File already exists");
                error.code = "FEXIST";
                throw error;
            }

            await pipeline(readStream, writeStream);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    getArgs(args) {
        const [oldFilePath, dirPath] = this.validatePassedArgs(args, 2);

        const [absOldFilePath, absDirPath] = this.getAbsolutePath([
            oldFilePath,
            dirPath,
        ]);

        return { oldFilePath: absOldFilePath, dirPath: absDirPath };
    }
}

export default CopyCLICommand;
