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
            const { oldFilePath, newFileName } = this.getArgs(args);
            const newFilePath = path.resolve(oldFilePath, "..", newFileName);

            if (await this.isFileExist(newFilePath)) {
                const error = new Error("File already exists");
                error.code = "FEXIST";
                throw error;
            }

            await fs.rename(oldFilePath, newFilePath);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    getArgs(args) {
        const [oldFilePath, newFileName] = this.validatePassedArgs(args, 2);
        const [absOldFilePath] = this.getAbsolutePath([oldFilePath]);

        return { oldFilePath: absOldFilePath, newFileName };
    }
}

export default RenameCLICommand;
