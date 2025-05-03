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
            const { oldFilePath, newFilePath } = await this.getArgs(args);
            const readStream = fs.createReadStream(oldFilePath);
            const writeStream = fs.createWriteStream(newFilePath);
            await pipeline(readStream, writeStream);
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

        if (
            (await this.isFileExist(newFilePath)) ||
            !(await this.isFileExist(oldFilePath))
        ) {
            const error = new Error("Invalid input");
            error.code = "FEXIST";
            throw error;
        }

        return { oldFilePath: absOldFilePath, newFilePath };
    }
}

export default CopyCLICommand;
