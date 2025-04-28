import { pipeline } from "node:stream/promises";
import path from "path";
import errrHandler from "../../utils/errorHandler.js";
import zlib from "node:zlib";
import fs from "fs";

const compress = async (pathToFile, pathToDestination) => {
    try {
        const readStream = fs.createReadStream(pathToFile);
        const pathToCompressFile = path.resolve(
            pathToDestination,
            `${path.win32.basename(pathToFile)}.gz`
        );
        const writeStream = fs.createWriteStream(pathToCompressFile);
        const gzip = zlib.createBrotliCompress();

        await pipeline(readStream, gzip, writeStream);
    } catch (e) {
        errrHandler(e);
    }
};

const decompress = async (pathToFile, pathToDestination) => {
    try {
        const readStream = fs.createReadStream(pathToFile);
        const pathToDecompressFile = path.resolve(
            pathToDestination,
            path.parse(pathToFile).name
        );
        const writeStream = fs.createWriteStream(pathToDecompressFile);

        const unzip = zlib.createBrotliDecompress();

        await pipeline(readStream, unzip, writeStream);
    } catch (e) {
        errrHandler(e);
    }
};

export default { decompress, compress };
