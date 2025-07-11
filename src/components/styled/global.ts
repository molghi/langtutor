import { globalCss } from "../../../stitches.config";

export const globalStyles = globalCss({
    "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        lineHeight: 1,

        // SCROLLBAR STYLES
        scrollbarColor: "#333 transparent", // Firefox
        scrollbarWidth: "thin", // Firefox
        "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#333",
            borderRadius: "3px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
        },
    },

    html: {
        fontSize: "62.5%",
        height: "100%",
    },

    body: {
        fontFamily: "Share Tech Mono, monospace, sans-serif",
        backgroundColor: "black",
        color: "white",
        fontSize: "1.6rem",
        height: "100%",
        overflowX: "hidden",
    },

    "#root": {
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },

    ".app": {
        flexGrow: 1,
    },

    ".button": {
        cursor: "pointer",
        fontFamily: "inherit",
        textDecoration: "none",
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

    ".page-title": {
        fontSize: "4rem",
        backgroundColor: "$accent",
        color: "black",
        textShadow: "0 0 1px black",
        padding: "0.25rem 1rem",
        display: "inline-block",
        marginBottom: "2rem",
    },

    ".small-title": {
        marginBottom: "2rem",
        opacity: 0.3,
        "&:hover": {
            opacity: 1,
        },
    },

    ".required": {
        color: "red",
        position: "absolute",
        top: "1.3rem",
        left: "-2rem",
        textShadow: "0 0 3px red",
    },

    ".text-center": {
        textAlign: "center",
    },

    // BREAKPOINTS

    "@md": {
        ".page-title": {
            fontSize: "2.8rem",
        },
        ".button": {
            display: "block",
            width: "100%",
            textAlign: "center",
        },
    },

    "@xxs": {
        ".button": {
            padding: "1rem 1.2rem",
            fontSize: "1.4rem",
        },
    },
});
