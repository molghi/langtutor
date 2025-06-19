import { theme } from "../../stitches.config";

function checkNewColor(newColor: string): string {
    // mimick DOM addition to get the computed color
    const span = document.createElement("span");
    document.body.appendChild(span);
    span.style.color = newColor;
    let color = window.getComputedStyle(span).color;
    document.body.removeChild(span);

    const rgbValues = color
        .slice(4, -1)
        .split(",")
        .map((x) => +x.trim()); // just the rgb values (r,g,b)

    if (rgbValues[0] < 40 && rgbValues[1] < 40 && rgbValues[2] < 40) return `rgb(0, 128, 0)`; // return green if it is too dark

    return color;
}

function changeUiColor(localStorageAccentColorKey: string): void {
    // Prompt
    let newColor = prompt("Type your new interface color:");
    if (newColor && newColor.length > 0) newColor = newColor.trim();

    if (!newColor) return;
    if (newColor && newColor.trim().length < 3) return;

    // Check and return safe color
    const safeColor = checkNewColor(newColor);

    // Change in UI
    if (!safeColor) return;
    document.documentElement.style.setProperty("--colors-accent", safeColor);

    // Change in LS
    localStorage.setItem(localStorageAccentColorKey, safeColor);
}

export default changeUiColor;
