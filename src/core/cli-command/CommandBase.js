import path from "path";
import colorText from "../../utils/colorText.js";
import fs from "fs/promises";
class CommandBase {
    constructor() {}

    execute() {}
    getArgs() {}

    printResult(text, type = "log") {
        if (type === "log") {
            console.log(colorText(text, "green"));
            return;
        }

        if (type === "table") {
            console.table(text);
        }
    }

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

    validatePassedArgs(passedArgs, countArg) {
        if (countArg === 0) {
            return [];
        }

        const filteredPassArgs = passedArgs.filter((arg) => arg.trim() !== "");

        if (filteredPassArgs.length < countArg) {
            const error = new Error("Required arguemnts were not passed");
            error.code = "ARGNOT";
            throw error;
        }

        return filteredPassArgs;
    }

    getAbsolutePath(pathList) {
        return pathList.map((pathItem) =>
            path.isAbsolute(pathItem)
                ? pathItem
                : path.resolve(process.env.currentDir, pathItem)
        );
    }

    showError(type, message) {
        if (type === "input") {
            process.stderr.write(
                `${colorText("Invalid input:", "red")} ${message}\n`
            );
        }
        if (type === "operation") {
            process.stderr.write(
                `${colorText("Operation failed:", "red")} ${message}\n`
            );
        }
    }

    errorHandler(err) {
        const typeInvalidInput = [
            "ENOENT",
            "EEXIST",
            "FEXIST",
            "EISDIR",
            "ARGNOT",
            "ERR_INVALID_ARG_TYPE",
        ];
        if (typeInvalidInput.includes(err.code)) {
            this.showError("input", err.message);
            return;
        }

        this.showError("operation", err.message);
    }
}

export default CommandBase;
