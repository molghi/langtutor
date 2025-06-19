function addManyWords(
    fieldValue: any,
    setUiMessage: any,
    words: any[],
    setWords: any,
    localStorageKey: string,
    setFieldValue?: any,
    scenario: string = "bulkAdd" // can be either 'bulkAdd' or 'import'
) {
    // Make an array of word-lines: strings, each representing one word entry
    const wordLines: any[] = scenario === "bulkAdd" ? fieldValue.split("\n") : fieldValue;

    if (scenario === "bulkAdd") {
        // Count the length of each wordLine arrayed
        const wordLineLengths: number[] = wordLines.map((lineString) => lineString.split("|").length);

        // Is every line the needed length or not? (it must be 8, strictly)
        const everyLineIsCorrectLength: boolean = wordLineLengths.every((memberLength) => memberLength === 8);

        // If my pattern was violated somewhere, show an error msg and don't proceed
        if (!everyLineIsCorrectLength) return reactToViolation(wordLineLengths, setUiMessage);
    }

    let counter: number = 1; // For correct 'id'

    // Form word objects:
    const wordsToAdd: any[] = scenario === "bulkAdd" ? formWordObjects(wordLines, counter) : wordLines; // array of word objects

    let amountOfWords: number = wordsToAdd.length; // among these could also be those that already exist in my state

    // Add to state (only new ones)
    addWords(wordsToAdd, words, setWords, localStorageKey, amountOfWords);

    // Show message
    const msgText: string =
        amountOfWords > 0
            ? `${amountOfWords} ${amountOfWords === 1 ? "word" : "words"} added successfully!`
            : `You have already added these words.`;

    setUiMessage(`success ${msgText}`);

    if (scenario !== "bulkAdd") return;

    // Clear textarea input
    setFieldValue("");
}

// =======================================================================================

// dependency function
function formWordObjects(wordLines: string[], counter: number) {
    return wordLines.map((wordLine) => {
        const categories = [
            "language",
            "word",
            "translation",
            "pronunciation",
            "definition",
            "exampleTarget",
            "exampleTranslation",
            "note",
        ]; // this order is strict

        const split = wordLine.split("|").map((x) => x.trim());

        const obj = {
            [categories[0]]: split[0] === "_" || split[0] === "-" ? "" : split[0], // if it is '_' or '-', return an empty string; otherwise return what's there
            [categories[1]]: split[1] === "_" || split[1] === "-" ? "" : split[1],
            [categories[2]]: split[2] === "_" || split[2] === "-" ? "" : split[2],
            [categories[3]]: split[3] === "_" || split[3] === "-" ? "" : split[3],
            [categories[4]]: split[4] === "_" || split[4] === "-" ? "" : split[4],
            [categories[5]]: split[5] === "_" || split[5] === "-" ? "" : split[5],
            [categories[6]]: split[6] === "_" || split[6] === "-" ? "" : split[6],
            [categories[7]]: split[7] === "_" || split[7] === "-" ? "" : split[7],
            added: new Date().toISOString(),
            id: new Date().getTime() + `.${counter}`,
        };

        counter += 1;
        return obj;
    });
}

// =======================================================================================

// dependency function
function reactToViolation(wordLineLengths: number[], setUiMessage: any) {
    // Identify which lines (not zero-based) have violations:
    const linesWithViolations = wordLineLengths
        .map((length, index) => {
            if (length !== 8) return index + 1;
            else return "";
        })
        .filter((x) => x !== "")
        .join(", ");

    // Show an error message
    setUiMessage(
        `failure Cannot submit yet!<br>The example pattern was not followed on these lines:<br><br>${linesWithViolations}<br><br>Each line must consist of 8 parts, separated by '|', with exactly 7 separators.<br>No line must be empty.<br>Please correct the indicated lines to proceed.`
    );
}

// =======================================================================================

// dependency function
function addWords(wordsToAdd: any[], words: any[], setWords: any, localStorageKey: string, amountOfWords: number) {
    wordsToAdd.forEach((wordObj) => {
        // Check before adding: if such a 'word' already exists in my state wordbase and the 'language' is the same, do not add it
        const indexInState = words.findIndex(
            (stateWordObj) =>
                stateWordObj.word.trim().toLowerCase() === wordObj.word.toLowerCase() &&
                stateWordObj.language.trim().toLowerCase() === wordObj.language.toLowerCase()
        ); // look if the index is positive or negative (exists or doesn't)

        // if doesn't exist, add it to state and LS
        if (indexInState < 0)
            setWords((prev: any[]) => {
                const newOnes = [...prev, wordObj];
                localStorage.setItem(localStorageKey, JSON.stringify(newOnes)); // Push to LS
                return newOnes;
            });
        else amountOfWords -= 1; // if exists, do not add and decrement word count for the message
    });
}

// =======================================================================================

export default addManyWords;
