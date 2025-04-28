import path from "path";
import readFileCore from "./core/fs/read.js";
import createCore from "./core/fs/create.js";
import renameFileCore from "./core/fs/rename.js";
import copyFileCore from "./core/fs/copy.js";
import removeFileCore from "./core/fs/remove.js";
import moveFileCore from "./core/fs/move.js";
import funcModule from "./core/os/index.js";
import calculateHash from "./core/hash/index.js";
import compression from "./core/compress/index.js";

// readFileCore(path.resolve("./", "blabla.js"));
// await createCore(path.resolve("./", "blabla"), "dir");
// await createCore(path.resolve("./", "blabla", "bla.js"), "file");
// await renameFileCore(
//     path.resolve("./", "blabla", "dd"),
//     path.resolve("./", "qwaqwa")
// );
// await copyFileCore(
//     path.resolve("./", "blabla.js"),
//     path.resolve("./", "blabla")
// );
// await moveFileCore(
//     path.resolve("./", "blabla.js"),
//     path.resolve("./", "blabla")
// );

// Получаем все экспортированные функции
// const allFunctions = Object.entries(funcModule);

// // Запускаем каждую функцию
// allFunctions.forEach(([funcName, func]) => {
//     if (typeof func === "function") {
//         console.log(`Запуск функции: ${funcName}`);
//         console.log(func());
//     }
// });

// await calculateHash(path.resolve("./", "blabla.txt"));

// compression.compress(path.resolve("./", "blabla.txt"), path.resolve("./"));

compression.decompress(path.resolve("./", "blabla.txt.gz"), path.resolve("./"));
