import path from "path";
import readFileCore from "./core/read.js";
import createCore from "./core/create.js";
import renameFileCore from "./core/rename.js";
import copyFileCore from "./core/copy.js";
import removeFileCore from "./core/remove.js";
import moveFileCore from "./core/move.js";

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
