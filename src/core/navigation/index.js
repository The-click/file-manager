import path from "path";
import fs from "node:fs/promises";
import CommandBase from "../cli-command/CommandBase.js";

class UpCLICommand extends CommandBase {
    #name = "up";

    get name() {
        return this.#name;
    }

    async execute() {
        try {
            if (process.env.currentDir === process.env.rootDir) {
                return process.env.currentDir;
            }

            process.env.currentDir = path.resolve(process.env.currentDir, "..");
        } catch (e) {
            this.errorHandler(e);
        }
    }
}

class ListCLICommand extends CommandBase {
    #name = "ls";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const listDirContents = [];
            const files = await fs.readdir(process.env.currentDir, {
                withFileTypes: true,
            });
            for (const file of files) {
                if (file.isDirectory()) {
                    listDirContents.push({
                        name: file.name,
                        type: "directory",
                    });
                }

                if (file.isFile()) {
                    listDirContents.push({
                        name: file.name,
                        type: "file",
                    });
                }
            }

            if (!listDirContents.length) {
                this.printResult(
                    `The ${process.env.currentDir} has no files or directories`
                );
                return;
            }

            listDirContents.sort(this.sortByTypeAndName);
            this.printResult(listDirContents, "table");
        } catch (e) {
            this.errorHandler(e);
        }
    }

    sortByTypeAndName(a, b) {
        if (a.type === "directory" && b.type === "directory") {
            return Number(a.name > b.name);
        }

        if (a.type === "file" && b.type === "file") {
            return Number(a.name > b.name);
        }

        return a.type === "file" ? 1 : -1;
    }
}

class ChangeDirCLICommand extends CommandBase {
    #name = "cd";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { newPath } = await this.getArgs(args);

            process.env.currentDir = newPath;
        } catch (e) {
            this.errorHandler(e);
        }
    }

    async getArgs(args) {
        const [newPath] = this.validatePassedArgs(args, 1);
        const [absNewPath] = this.getAbsolutePath([newPath]);

        if (!(await this.isFileExist(absNewPath))) {
            const error = new Error("No such directory " + absNewPath);
            error.code = "ENOENT";
            throw error;
        }

        const stat = await fs.lstat(absNewPath);

        if (!stat.isDirectory()) {
            const error = new Error("You must specify the directory");
            error.code = "ERR_INVALID_ARG_TYPE";
            throw error;
        }

        return { newPath: absNewPath };
    }
}

export { UpCLICommand, ListCLICommand, ChangeDirCLICommand };
