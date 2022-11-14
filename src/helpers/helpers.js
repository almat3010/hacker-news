import sanitizeHtml from 'sanitize-html'

const cleanHtml = (text) => {
        return sanitizeHtml(text, {
        allowedTags: ["b", "i", "em", "strong", "a", "pre", "div", "code"],
        transformTags: {
            pre: "p",
            a: sanitizeHtml.simpleTransform("a", {
                target: "_blank",
                rel: "noopener noreferrer"
            })
        }
    });
}

export const transformTime = (time) => {
    const timeFormat = new Date(time * 1000);
    return `${timeFormat.getDate()}.${timeFormat.getMonth() + 1}.${timeFormat.getFullYear()}`;
}

export default cleanHtml