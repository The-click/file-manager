import fs from "fs";
import errrHandler from "../utils/errorHandler.js";

const readFileCore = async (pathToFile) => {
    try {
        const readStream = fs.createReadStream(pathToFile);

        readStream.on("error", errrHandler);
        readStream.on("data", (chunk) => {
            process.stdout.write(chunk + "\n");
        });
        // readStream.on("end", () => console.log("end"));
    } catch (e) {
        errrHandler(e);
    }
};

export default readFileCore;
