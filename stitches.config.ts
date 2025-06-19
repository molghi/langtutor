import { createStitches } from "@stitches/react";

const { styled, css, globalCss, keyframes, theme, createTheme, config } = createStitches({
    theme: {
        colors: {
            primary: "#0070f3",
            secondary: "#1c1c1e",
            // accent: "coral",
            accent: "green",
        },
        fonts: {
            body: "system-ui, sans-serif",
        },
    },
    media: {
        xxs: "(max-width: 400px)",
        xs: "(max-width: 480px)",
        sm: "(max-width: 640px)",
        md: "(max-width: 768px)",
        lg: "(max-width: 1024px)",
        xl: "(max-width: 1280px)",
    },
});

// Some easy animation
const fadeIn = keyframes({
    "0%": { opacity: 0, transform: "translateX(-100px)" },
    "100%": { opacity: 1, transform: "translateX(0)" },
});

const appear = keyframes({
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
});

export { styled, css, globalCss, keyframes, theme, createTheme, config, fadeIn, appear };
