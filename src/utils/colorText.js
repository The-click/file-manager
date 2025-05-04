export default function colorText(text, color) {
    switch (color) {
        case "red":
            return `\x1b[31m${text}\x1b[0m`;
        case "green":
            return `\x1b[32m${text}\x1b[0m`;
        default:
            return text;
    }
}
