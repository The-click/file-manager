import path from "path";
import CopyCLICommand from "./core/fs/copy.js";
import FsCommandBase from "./core/fs/base.js";
import os from "os";
import { AddCLICommand, MkDirCLICommand } from "./core/fs/create.js";
import ReadCLICommand from "./core/fs/read.js";
import RemoveCLICommand from "./core/fs/remove.js";
import RenameCliCommand from "./core/fs/rename.js";
import MoveCLICommand from "./core/fs/move.js";
import OsCommandBase from "./core/os/index.js";
import HashCLICommand from "./core/hash/index.js";
import {
    CompressCLICommand,
    DecompressCLICommand,
} from "./core/compress/index.js";
import {
    ChangeDirCLICommand,
    ListCLICommand,
    UpCLICommand,
} from "./core/navigation/index.js";
import colorText from "./utils/colorText.js";

class CLIApplication {
    constructor() {
        this.commands = {};
        this.base = new FsCommandBase();
        process.env.currentDir = path.resolve(os.homedir());
        process.env.rootDir = path.parse(process.env.currentDir).root;
        this.userName = "";
    }

    setUserName() {
        if (process.env.npm_config_username) {
            this.userName = process.env.npm_config_username;
            return;
        }

        const args = process.argv.slice(2);

        if (!args.length) {
            this.userName = "guest";
            return;
        }

        const [key, value] = args[0]?.split("=");
        this.userName = key === "--username" ? value : "guest";
    }

    registerCommand(commandList) {
        this.commands = {};
        commandList.forEach((commandClass) => {
            this.commands[commandClass.name] = commandClass;
        });
    }

    startProcess() {
        console.log(`Welcome to the File Manager, ${this.userName}!`);
        process.stdin.on("data", async (data) => {
            const processData = data.toString().replace(os.EOL, "").split(" ");
            const [command, ...args] = processData;

            if (command === ".exit") {
                process.exit();
            }

            if (!this.commands[command]) {
                this.base.showError("input", `Unknown command ${command}`);
            } else {
                await this.commands[command].execute(args);
            }

            console.log(
                colorText(
                    `\nYou are currently in ${process.env.currentDir}`,
                    "white",
                    "bold"
                )
            );
        });

        process.stdin.on("error", (e) => {
            console.log(e);
        });

        process.on("SIGINT", function () {
            process.exit();
        });

        process.on("exit", () => {
            console.log(
                colorText(
                    `\nThank you for using File Manager, ${this.userName}, goodbye!`,
                    "white"
                )
            );
        });
    }
}

const app = new CLIApplication();
app.registerCommand([
    new CopyCLICommand(),
    new MkDirCLICommand(),
    new AddCLICommand(),
    new ReadCLICommand(),
    new RemoveCLICommand(),
    new RenameCliCommand(),
    new MoveCLICommand(),
    new OsCommandBase(),
    new HashCLICommand(),
    new CompressCLICommand(),
    new DecompressCLICommand(),
    new UpCLICommand(),
    new ListCLICommand(),
    new ChangeDirCLICommand(),
]);
app.setUserName();
app.startProcess();
