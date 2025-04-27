import fs from "node:fs/promises";
import errrHandler from "../utils/errorHandler.js";

const removeFileCore = async (filePath) => {
    try {
        await fs.rm(filePath);
    } catch (e) {
        errrHandler(e);
    }
};

export default removeFileCore;
