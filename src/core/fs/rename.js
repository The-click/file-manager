import fs from "node:fs/promises";
import errrHandler from "../../utils/errorHandler.js";
import isFileExist from "./isFileExist.js";

const renameFileCore = async (oldFilePath, newFilePath) => {
    try {
        if (await isFileExist(newFilePath)) {
            const error = new Error("File already exists");
            error.code = "FEXIST";
            throw error;
        }

        await fs.rename(oldFilePath, newFilePath);
    } catch (err) {
        errrHandler(err);
    }
};

export default renameFileCore;
