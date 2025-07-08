import MyContext from "../context/MyContext";
import { useContext, useEffect, useState } from "react";
import Round from "./Round";
import { Container } from "./styled/Container";
import formatDateTime from "../utils/formatDateTime";
import fetchLangs from "../utils/fetchLangs";
import allWordsOxford from "../utils/dataOxford";
import { allWordsMine } from "../utils/dataMyLists";
import fetchEngExamples from "../utils/fetchEngExamples";
import fetchTranslation from "../utils/fetchTranslation";
import spinnerImg from "../img/spinner.png";
import { keyframes } from "../../stitches.config";
import { useNavigate } from "react-router-dom";

const rotate360 = keyframes({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
});

// Get random number
const getRandomNum = (upperLimit: number): number => Math.floor(Math.random() * upperLimit);

const Rounds = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const {
        langInPractice,
        words,
        currentQuizData,
        setCurrentQuizData,
        currentQuizCounter,
        selectedMode,
        isLoading,
        setIsLoading,
    } = context;

    const navigate = useNavigate();

    useEffect(() => {
        if (!langInPractice) {
            navigate("/practise"); // this is because the 'practise/online-session/:lang' URL (where this component is) should not be accessed by typing it, only in-app
        }
    }, [langInPractice]);

    const [nextRevision, setNextRevision] = useState<number>(-1);

    useEffect(() => {
        if (selectedMode === "review-your-words") {
            reviewYourWords(words, langInPractice, setCurrentQuizData, setNextRevision);
        }
        if (selectedMode === "new-online-session") {
            startOnlineSession(langInPractice, setCurrentQuizData, setIsLoading);
        }
        // Set next revision
        const wordsOfPractisedLang: Array<{ [key: string]: string }> = words.filter((wordObj) =>
            wordObj.language.toLowerCase().includes(langInPractice.split(" ")[1].toLowerCase())
        );
        const wordsOfPractisedLangRevisions: number[] = wordsOfPractisedLang.map((x) => +x.nextRevisionDateTime);
        const soonest = wordsOfPractisedLangRevisions.sort((a, b) => a - b)[0];
        setNextRevision(soonest);
    }, [words, langInPractice]);

    // Get when next revision
    const getWhenNext = (timestamp: number): string => {
        if (timestamp === 0) return "...";
        const now: number = Date.now();
        const difference: number = timestamp - now;
        const inMunites: number = Math.floor(difference / 1000 / 60);
        const inHours: number = Math.floor(difference / 1000 / 60 / 60);
        let result: string = "";
        // Cases
        if (inMunites < 60) result = inMunites > 1 ? `in ${inMunites} minutes` : `in ${inMunites} minute`;
        if (inMunites >= 60 && inHours < 24) result = inHours > 1 ? `in ${inHours} hours` : `in ${inHours} hour`;
        else result = Math.floor(inHours / 24) > 1 ? `in ${Math.floor(inHours / 24)} days` : `in ${Math.floor(inHours / 24)} day`;
        return result;
    };

    let content = null;

    if (currentQuizData.length > 0 && currentQuizCounter < currentQuizData.length) {
        // IF THERE IS currentQuizData AND THE COUNTER IS WITHIN BOUNDS, SHOW ROUND
        content = <Round roundData={currentQuizData[currentQuizCounter]} rounds={currentQuizData.length} />;
    } else if (isLoading) {
        // SHOW LOADING SPINNER
        content = (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "100px",
                    animation: `${rotate360} 0.8s linear infinite`,
                }}
            >
                <img src={spinnerImg} alt="Loading Spinner" style={{ maxWidth: "100%" }} />
            </div>
        );
    } else {
        // SHOW 'ALL DONE' MSG IF SELECTED MODE IS REVIEW
        if (selectedMode === "review-your-words" && currentQuizData.length === 0)
            content = (
                <Container>
                    <div
                        style={{
                            marginTop: "5rem",
                            fontSize: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "2rem",
                        }}
                    >
                        <div>You’ve reviewed all current words.</div>
                        <div>Wait for the next scheduled revision or add new words to continue.</div>
                        {nextRevision && (
                            <div>
                                Next revision:{" "}
                                <span style={{ opacity: 0.5 }}>{nextRevision && formatDateTime(nextRevision)} </span>
                                <span style={{ opacity: 0.2 }}>({getWhenNext(nextRevision)})</span>
                            </div>
                        )}
                    </div>
                </Container>
            );
    }

    return content;
};

// ============================================================================================================

// Dependency function
function reviewYourWords(words: any, langInPractice: string, setCurrentQuizData: any, setNextRevision: any): void {
    if (words.length === 0) return;

    const wordsSelectedLang: any[] = words.filter((wordObj: any) => {
        const compareTo = langInPractice ? langInPractice.split(" ")[1].toLowerCase() : location.pathname.split("/")[2];
        return wordObj.language.toLowerCase() === compareTo;
    });

    if (wordsSelectedLang.length === 0) return;

    const count: number = Math.min(10, wordsSelectedLang.length); // Pick smallest not to request more words than available

    const indices = new Set<number>(); // Init a set of unique values

    while (indices.size < count) {
        indices.add(getRandomNum(wordsSelectedLang.length)); // Push to set until it is needed length
    }

    const wordsThisPractice: any[] = [...indices]
        .map((i) => wordsSelectedLang[i])
        .filter((entry) => entry.nextRevisionDateTime <= Date.now() || !entry.nextRevisionDateTime); // Make an array, map to word objs, filter only those to practise now

    // Update state
    setCurrentQuizData(wordsThisPractice);
    setNextRevision(
        words
            .filter((word: any) => word.language === langInPractice.split(" ")[1].toLowerCase())
            .map((x: any) => x.nextRevisionDateTime)
            .sort((a: any, b: any) => a - b)[0]
    );
}

// ============================================================================================================

// Dependency function
function startOnlineSession(langInPractice: string, setCurrentQuizData: any, setIsLoading: any): void {
    setIsLoading(true);

    // Get lang code (string)
    const getLangCode = async () => {
        const resp = await fetchLangs();
        return resp.result.find((langObj: any) =>
            langObj.codeName.toLowerCase().includes(langInPractice.split(" ")[1].toLowerCase())
        )?.full_code;
    };

    // Fetch 10 random words from prepared sets
    const amountOfWords: number = 10; // amount of words, amount of rounds
    const wordsToPractice: string[] = [];
    // Get prepared words
    ((): void => {
        let myRandomIndeces: number[] = [];
        // Generate 10 random indeces within certain bounds
        while (myRandomIndeces.length !== amountOfWords) {
            myRandomIndeces.push(getRandomNum([...allWordsOxford, ...allWordsMine].length));
            myRandomIndeces = [...new Set(myRandomIndeces)];
        }
        // Get words at those random indeces
        for (let i = 0; i < myRandomIndeces.length; i++) {
            const stringSplitters = ["v.", "n.", "adj.", "prep.", "adv.", "exclam.", "number", "det.", "ad ", "conj.", "n,"];
            let word: string = [...allWordsOxford, ...allWordsMine][myRandomIndeces[i]].trim().toLowerCase();
            stringSplitters.forEach((x) => {
                if (word.includes(x)) word = word.split(x)[0].trim().toLowerCase();
            });
            if (word.split(" ")[1] === "ad") word = word.split(" ")[0];
            wordsToPractice.push(word);
        }
    })();

    // Fetch English examples and translate them
    (async () => {
        let responseExamples: any[], responseWords: any[];

        let fetchedExamples: string[] = await Promise.all(wordsToPractice.map(async (word) => await fetchEngExamples(word)));
        const langCode: string = await getLangCode();

        if (!fetchedExamples) return;

        if (langInPractice.toLowerCase().includes("english")) {
            // Don't translate if it's English
            responseExamples = fetchedExamples;
            responseWords = wordsToPractice;
        } else {
            responseExamples = await Promise.all(fetchedExamples.map((example: string) => fetchTranslation(example, langCode))); // translated examples
            responseWords = await Promise.all(wordsToPractice.map((word: string) => fetchTranslation(word, langCode))); // translated words
        }

        // Update state
        setIsLoading(false);

        // Compose data for current session
        const data: Array<{ [key: string]: any }> = wordsToPractice.map((word, index) => ({
            word: !langInPractice.toLowerCase().includes("english") ? responseWords[index].result : responseWords[index],
            translation: word,
            pronunciation: responseWords[index].targetTransliteration,
            exampleTarget: responseExamples[index].result
                ? `${responseExamples[index].result} (${responseExamples[index].targetTransliteration})`
                : responseExamples[index],
            exampleTranslation: responseExamples[index].sourceTransliteration,
            language: langInPractice.split(" ")[1].toLowerCase(),
            note: responseExamples[index].result ? "Content fetched online can be a bit off..." : "",
            id: `${Date.now()}.${index + 1}`,
            revisedTimes: 0,
        }));

        // Update state
        setCurrentQuizData(data);
    })();
}

// ============================================================================================================

export default Rounds;
