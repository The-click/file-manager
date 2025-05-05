import fs from "node:fs/promises";
import path from "path";
import FsCommandBase from "./base.js";

class RenameCLICommand extends FsCommandBase {
    #name = "rn";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { oldFilePath, newFilePath } = await this.getArgs(args);
            await fs.rename(oldFilePath, newFilePath);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    async getArgs(args) {
        const [oldFilePath, newFileName] = this.validatePassedArgs(args, 2);
        const [absOldFilePath] = this.getAbsolutePath([oldFilePath]);
        const newFilePath = path.resolve(absOldFilePath, "..", newFileName);

        if (await this.isFileExist(newFilePath)) {
            const error = new Error("File already exists");
            error.code = "FEXIST";
            throw error;
        }

        return { oldFilePath: absOldFilePath, newFilePath };
    }
}

export default RenameCLICommand;
