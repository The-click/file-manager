import fs from "fs";
import FsCommandBase from "./base.js";

class ReadCLICommand extends FsCommandBase {
    #name = "cat";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { pathToFile } = this.getArgs(args);
            const readStream = fs.createReadStream(pathToFile);

            readStream.on("error", this.errorHandler.bind(this));
            readStream.on("data", (chunk) => {
                process.stdout.write(chunk + "\n");
            });
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

export default ReadCLICommand;
