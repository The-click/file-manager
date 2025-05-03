import fs from "node:fs/promises";
import FsCommandBase from "./base.js";

class AddCLICommand extends FsCommandBase {
    #name = "add";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { createPath } = this.getArgs(args);

            await fs.writeFile(createPath, "", {
                flag: "wx",
            });
        } catch (e) {
            this.errorHandler(e);
        }
    }

    getArgs(args) {
        const [newFileName] = this.validatePassedArgs(args, 1);
        const [createPath] = this.getAbsolutePath([newFileName]);

        return { createPath };
    }
}
class MkDirCLICommand extends FsCommandBase {
    #name = "mkdir";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { createPath } = this.getArgs(args);

            await fs.mkdir(createPath, { recursive: false });
        } catch (e) {
            this.errorHandler(e);
        }
    }

    getArgs(args) {
        const [newDirName] = this.validatePassedArgs(args, 1);
        const [createPath] = this.getAbsolutePath([newDirName]);

        return { createPath };
    }
}

export { AddCLICommand, MkDirCLICommand };
