import fs from "fs";
import FsCommandBase from "./base.js";
import colorText from "../../utils/colorText.js";

class ReadCLICommand extends FsCommandBase {
    #name = "cat";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { pathToFile } = this.getArgs(args);

            await this.runStream(pathToFile);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    runStream(pathToFile) {
        return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(pathToFile);

            readStream.on("error", reject);
            readStream.on("end", resolve);
            readStream.on("data", (chunk) => {
                process.stdout.write(colorText(chunk + "\n", "cyan", "bold"));
            });
        });
    }

    getArgs(args) {
        const [pathToFile] = this.validatePassedArgs(args, 1);
        const [absPathToFile] = this.getAbsolutePath([pathToFile]);

        return { pathToFile: absPathToFile };
    }
}

export default ReadCLICommand;
