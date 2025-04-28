import fs from "fs";
import crypto from "crypto";
import errrHandler from "../../utils/errorHandler.js";

const calculateHash = async (pathToFile) => {
    try {
        const hashValue = await getHash(pathToFile);
        console.log(hashValue);
    } catch (error) {
        errrHandler(error);
    }
};

const getHash = (path) =>
    new Promise((resolve, reject) => {
        const hash = crypto.createHash("sha256");
        const rs = fs.createReadStream(path);
        rs.on("error", reject);
        rs.on("data", (chunk) => hash.update(chunk));
        rs.on("end", () => resolve(hash.digest("hex")));
    });

export default calculateHash;
