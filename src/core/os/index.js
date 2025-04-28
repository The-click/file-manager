import os from "node:os";

function getOperSysEOL() {
    return os.EOL;
}

function getCPUS() {
    return os.cpus();
}

function getHomeDir() {
    return os.homedir();
}

function getArch() {
    return os.arch();
}

function getUserInfo() {
    return os.userInfo({ encoding: "utf8" }).username;
}

export default { getArch, getCPUS, getHomeDir, getOperSysEOL, getUserInfo };
