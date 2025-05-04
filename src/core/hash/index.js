import fs from "fs";
import crypto from "crypto";
import CommandBase from "../cli-command/CommandBase.js";

class HashCLICommand extends CommandBase {
    #name = "hash";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { pathToFile } = this.getArgs(args);
            const hashValue = await this.getHash(pathToFile);
            this.printReuslt(hashValue);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    getHash(path) {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash("sha256");
            const rs = fs.createReadStream(path);
            rs.on("error", reject);
            rs.on("data", (chunk) => hash.update(chunk));
            rs.on("end", () => resolve(hash.digest("hex")));
        });
    }

    getArgs(args) {
        const [pathToFile] = this.validatePassedArgs(args, 1);
        const [absPathToFile] = this.getAbsolutePath([pathToFile]);

        return { pathToFile: absPathToFile };
    }
}

export default HashCLICommand;
