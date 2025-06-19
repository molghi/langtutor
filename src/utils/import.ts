import addManyWords from "./addManyWords";

// ================================================================================================

// Initialise choosing a file
function importWords(importerEl: React.RefObject<HTMLInputElement>) {
    if (!importerEl.current) return null;

    alert(
        "NOTE:\nWith this option, you can only import JSON, and it must be formatted exactly like the file that you can export here."
    );

    importerEl.current.click();
}

// ================================================================================================

// Process import -- happens after clicking
function processInput(
    event: React.ChangeEvent<HTMLInputElement>,
    setUiMessage: any,
    importerRef: React.RefObject<HTMLInputElement>,
    words: any[],
    setWords: any,
    localStorageKey: string
) {
    const file = event.target && event.target.files ? event.target.files[0] : ""; // Get the file
    if (!file) return; // Ensure there's a file selected

    const reader = new FileReader(); // Create FileReader instance

    reader.onload = (e) => {
        try {
            const jsonData = JSON.parse((e.target as FileReader).result as string); // Parse the JSON content
            const isValidInput = checkValidInput(jsonData); // Ensure the input was valid

            if (!isValidInput) {
                setUiMessage(
                    `error Invalid JSON! Check the formatting: you can import JSON formatted the same as what you can export.`
                );
                return console.error(
                    `Invalid JSON!\nPerhaps the formatting of the file was wrong...\nYou can import JSON formatted the same as what you can export.`
                );
            }

            addManyWords(jsonData, setUiMessage, words, setWords, localStorageKey, undefined, "import");
            setUiMessage("success Import successful!");
        } catch (err) {
            console.error("Invalid input file", err); // Error handling
            setUiMessage(
                `error Invalid input file! You can import only JSON and it must be formatted the same as what you can export.`
            );
            return null;
        } finally {
            if (!importerRef.current) return;
            importerRef.current.value = ""; // Reset the file input value to be able to import again without problems
        }
    };

    reader.readAsText(file); // Read the file as text
}

// ================================================================================================

// dependency of 'processInput' -- validate the input/imported thing -- making sure it's formatted the way I allow it
function checkValidInput(dataArr: any[]) {
    // dataArr is an array of word objects/entries

    if (!Array.isArray(dataArr)) return;

    let passed = true;

    dataArr.forEach((wordObj) => {
        if (!wordObj.hasOwnProperty("language") || typeof wordObj.language !== "string") return (passed = false);
        if (!wordObj.hasOwnProperty("word") || typeof wordObj.word !== "string") return (passed = false);
        if (!wordObj.hasOwnProperty("translation") || typeof wordObj.translation !== "string") return (passed = false);
        // these three props must be there in any case

        // these are optional:
        if (wordObj.hasOwnProperty("pronunciation") && typeof wordObj.pronunciation !== "string") return (passed = false); // if there's "pronunciation" and it's not a string, return false
        if (wordObj.hasOwnProperty("exampleTarget") && typeof wordObj.exampleTarget !== "string") return (passed = false);
        if (wordObj.hasOwnProperty("exampleTranslation") && typeof wordObj.exampleTranslation !== "string")
            return (passed = false);
        if (wordObj.hasOwnProperty("definition") && typeof wordObj.definition !== "string") return (passed = false);
        if (wordObj.hasOwnProperty("note") && typeof wordObj.note !== "string") return (passed = false);

        // to disregard: added, id, nextRevisionDateTime, ratedAs

        // except 'nextRevisionDateTime' the values of all props are strings
    });

    return passed;
}

// ================================================================================================

export { importWords, processInput };
