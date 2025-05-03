import fs from "node:fs/promises";
import FsCommandBase from "./base.js";

class RemoveCLICommand extends FsCommandBase {
    #name = "rm";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { pathToFile } = this.getArgs(args);

            await fs.rm(pathToFile);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    getArgs(args) {
        const [pathToFile] = this.validatePassedArgs(args, 1);
        const [absPathToFile] = this.getAbsolutePath([pathToFile]);

        return { pathToFile: absPathToFile };
    }
}

export default RemoveCLICommand;
