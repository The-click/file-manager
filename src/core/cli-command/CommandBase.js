import path from "path";

class CommandBase {
    constructor() {}

    execute() {}
    getArgs() {}

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

    showError(type) {
        if (type === "input") {
            process.stderr.write("Invalid input\n");
        }
        if (type === "operation") {
            process.stderr.write("Operation failed\n");
        }
    }

    errorHandler(err) {
        console.log(err);
        if (
            err.code === "ENOENT" ||
            err.code === "EEXIST" ||
            err.code === "FEXIST" ||
            err.code === "EISDIR" ||
            err.code === "ARGNOT" ||
            err.code === "ERR_INVALID_ARG_TYPE"
        ) {
            this.showError("input");
            return;
        }

        this.showError("operation");
    }
}

export default CommandBase;
