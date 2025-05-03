import fs from "node:fs/promises";
import path from "path";
import CommandBase from "../cli-command/CommandBase.js";

class FsCommandBase extends CommandBase {
    constructor() {
        super();
    }

    execute() {}
    getArgs() {}

    async isFileExist(filePath) {
        try {
            await fs.access(filePath, fs.constants.F_OK);
            return true;
        } catch (err) {
            if (err.code === "ENOENT") {
                return false;
            }

            this.showError("operation");
        }
    }
}

export default FsCommandBase;
