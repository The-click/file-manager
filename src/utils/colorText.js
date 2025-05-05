export default function colorText(
    text,
    color,
    attribute = "",
    background = ""
) {
    let resultColor = `${text}\x1b[0m`;
    switch (color) {
        case "red":
            resultColor = "\x1b[31m" + resultColor;
            break;
        case "green":
            resultColor = "\x1b[32m" + resultColor;
            break;
        case "white":
            resultColor = "\x1b[37m" + resultColor;
            break;
        case "black":
            resultColor = "\x1b[30m" + resultColor;
            break;
        case "cyan":
            resultColor = "\x1b[36m" + resultColor;
        default:
            break;
    }

    switch (attribute) {
        case "bold":
            resultColor = "\x1b[1m" + resultColor;
            break;
        default:
            break;
    }

    switch (background) {
        case "black":
            resultColor = "\x1b[40m" + resultColor;
            break;
        case "white":
            resultColor = "\x1b[47m" + resultColor;
            break;
        default:
            break;
    }

    return resultColor;
}
