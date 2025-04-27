import colorText from "./colorText.js";

export default function errrHandler(err) {
    if (err.code === "ENOENT") {
        console.log(
            colorText(`По указанному пути не найден директория/файл`, "red")
        );
        return;
    }

    if (err.code === "EEXIST" || err.code === "FEXIST") {
        console.log(colorText("Директория/файл уже существует", "red"));
        return;
    }

    console.log("Неизвестная ошибка \n", err);
}
