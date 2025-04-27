import errrHandler from "../utils/errorHandler.js";
import copyFileCore from "./copy.js";
import removeFileCore from "./remove.js";

const moveFileCore = async (oldFilePath, dirPath) => {
    try {
        await copyFileCore(oldFilePath, dirPath);
        await removeFileCore(oldFilePath);
    } catch (e) {
        errrHandler(e);
    }
};

export default moveFileCore;
