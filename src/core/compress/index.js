import { pipeline } from "node:stream/promises";
import path from "path";
import zlib from "node:zlib";
import fs from "fs";
import CommandBase from "../cli-command/CommandBase.js";

class CompressCLICommand extends CommandBase {
    #name = "compress";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { pathToFile, pathToDestination } = await this.getArgs(args);
            const readStream = fs.createReadStream(pathToFile);
            const pathToCompressFile = path.resolve(
                pathToDestination,
                `${path.win32.basename(pathToFile)}.gz`
            );
            const writeStream = fs.createWriteStream(pathToCompressFile);
            const gzip = zlib.createBrotliCompress();

            await pipeline(readStream, gzip, writeStream);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    async getArgs(args) {
        const [pathToFile, pathToDestination] = this.validatePassedArgs(
            args,
            2
        );
        const [absPathToFile, absPathToDestination] = this.getAbsolutePath([
            pathToFile,
            pathToDestination,
        ]);

        if (!(await this.isFileExist(absPathToDestination))) {
            const error = new Error(
                "No new path found " + absPathToDestination
            );
            error.code = "FEXIST";
            throw error;
        }

        if (!(await this.isFileExist(absPathToFile))) {
            const error = new Error("File not found " + absPathToFile);
            error.code = "FEXIST";
            throw error;
        }

        return {
            pathToFile: absPathToFile,
            pathToDestination: absPathToDestination,
        };
    }
}

class DecompressCLICommand extends CommandBase {
    #name = "decompress";

    get name() {
        return this.#name;
    }

    async execute(args) {
        try {
            const { pathToFile, pathToDestination } = await this.getArgs(args);
            const readStream = fs.createReadStream(pathToFile);
            const pathToDecompressFile = path.resolve(
                pathToDestination,
                path.parse(pathToFile).name
            );
            const writeStream = fs.createWriteStream(pathToDecompressFile);

            const unzip = zlib.createBrotliDecompress();

            await pipeline(readStream, unzip, writeStream);
        } catch (e) {
            this.errorHandler(e);
        }
    }

    async getArgs(args) {
        const [pathToFile, pathToDestination] = this.validatePassedArgs(
            args,
            2
        );
        const [absPathToFile, absPathToDestination] = this.getAbsolutePath([
            pathToFile,
            pathToDestination,
        ]);

        if (!(await this.isFileExist(absPathToDestination))) {
            const error = new Error(
                "No new path found " + absPathToDestination
            );
            error.code = "FEXIST";
            throw error;
        }

        if (!(await this.isFileExist(absPathToFile))) {
            const error = new Error("File not found " + absPathToFile);
            error.code = "FEXIST";
            throw error;
        }

        return {
            pathToFile: absPathToFile,
            pathToDestination: absPathToDestination,
        };
    }
}

export { CompressCLICommand, DecompressCLICommand };

// TODO Проверка на существование декомприсионного файла
