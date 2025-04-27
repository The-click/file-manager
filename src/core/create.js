import fs from "node:fs/promises";
import errrHandler from "../utils/errorHandler.js";

const createCore = async (createPath, type) => {
    try {
        if (type === "file") {
            await fs.writeFile(createPath, "", {
                flag: "wx",
            });
        }

        if (type === "dir") {
            await fs.mkdir(createPath, { recursive: false });
        }
    } catch (err) {
        errrHandler(err);
    }
};

export default createCore;
