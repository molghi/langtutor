import { globalCss } from "../../../stitches.config";

export const globalStyles = globalCss({
    "*": { margin: 0, padding: 0, boxSizing: "border-box", lineHeight: 1 },
    html: { fontSize: "62.5%" },
    body: { fontFamily: "Share Tech Mono", backgroundColor: "black", color: "white", fontSize: "1.6rem" },

    ".button": {
        cursor: "pointer",
        fontFamily: "inherit",
        padding: "1.1rem 1.5rem",
        outline: "none",
        border: `1px solid`,
        borderColor: "$accent",
        transition: "box-shadow 0.3s",
        backgroundColor: "transparent",
        color: "$accent",
        fontSize: "inherit",
        "&:hover": {
            backgroundColor: `$accent`,
            color: "black",
            boxShadow: `0 0 10px`,
            boxShadowColor: `$accent`,
        },
        "&:active": {
            opacity: 0.7,
            boxShadow: "0 0 1px",
            boxShadowColor: `$accent`,
        },
    },

    "@xxs": {
        ".button": {
            padding: "1rem 1.2rem",
            fontSize: "1.4rem",
        },
    },
});
