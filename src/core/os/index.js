import os from "os";
import CommandBase from "../cli-command/CommandBase.js";
class OsCommandBase extends CommandBase {
    #name = "os";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { method } = await this.getArgs(args);

            let answer;

            switch (method) {
                case "--EOL":
                    answer = JSON.stringify(os.EOL);
                    break;
                case "--cpus":
                    answer = JSON.stringify(os.cpus(), null, 2);
                    break;
                case "--homedir":
                    answer = os.homedir();
                    break;
                case "--username":
                    answer = os.userInfo({ encoding: "utf8" }).username;
                    break;
                case "--architecture":
                    answer = os.arch();
                    break;
                default:
                    const error = new Error(
                        `The command ${method} was not found`
                    );
                    error.code = "ARGNOT";
                    throw error;
            }

            this.printResult(answer);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    async getArgs(args) {
        const [method] = this.validatePassedArgs(args, 1);

        return { method };
    }
}

export default OsCommandBase;
