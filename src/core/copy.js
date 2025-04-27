import { pipeline } from "node:stream/promises";
import fs from "fs";
import path from "path";
import errrHandler from "../utils/errorHandler.js";
import isFileExist from "./isFileExist.js";

const copyFileCore = async (oldFilePath, dirPath) => {
    try {
        const readStream = fs.createReadStream(oldFilePath);
        const newFilePath = path.resolve(dirPath, path.basename(oldFilePath));
        const writeStream = fs.createWriteStream(newFilePath);

        if (await isFileExist(newFilePath)) {
            const error = new Error("File already exists");
            error.code = "FEXIST";
            throw error;
        }

        await pipeline(readStream, writeStream);
    } catch (e) {
        errrHandler(e);
    }
};

export default copyFileCore;
