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
            navigate("/practise");
        }
    }, [langInPractice]);

    const [nextRevision, setNextRevision] = useState();

    useEffect(() => {
        if (selectedMode === "review-your-words") {
            reviewYourWords(words, langInPractice, setCurrentQuizData, setNextRevision);
        }
        if (selectedMode === "new-online-session") {
            startOnlineSession(langInPractice, setCurrentQuizData, setIsLoading);
        }
    }, [words, langInPractice]);

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
                                <span style={{ opacity: 0.2 }}>(Now: {formatDateTime(Date.now())})</span>
                            </div>
                        )}
                    </div>
                </Container>
            );
    }

    // console.log(currentQuizCounter, currentQuizData);

    return content;
};

// ============================================================================================================

function reviewYourWords(words: any, langInPractice: string, setCurrentQuizData: any, setNextRevision: any) {
    if (words.length === 0) return;

    const wordsSelectedLang: any[] = words.filter((wordObj: any) => {
        const compareTo = langInPractice ? langInPractice.split(" ")[1].toLowerCase() : location.pathname.split("/")[2];
        return wordObj.language.toLowerCase() === compareTo;
    });

    if (wordsSelectedLang.length === 0) return;

    const count = Math.min(10, wordsSelectedLang.length); // Pick smallest not to request more words than available

    const indices = new Set<number>(); // Init a set of unique values

    while (indices.size < count) {
        indices.add(getRandomNum(wordsSelectedLang.length)); // Push to set until it is needed length
    }

    const wordsThisPractice = [...indices]
        .map((i) => wordsSelectedLang[i])
        .filter((entry) => entry.nextRevisionDateTime <= Date.now() || !entry.nextRevisionDateTime); // Make an array, map to word objs, filter only those to practise now

    setCurrentQuizData(wordsThisPractice);

    setNextRevision(
        words
            .filter((word: any) => word.language === langInPractice.split(" ")[1].toLowerCase())
            .map((x: any) => x.nextRevisionDateTime)
            .sort((a: any, b: any) => a - b)[0]
    );
}

// ============================================================================================================

function startOnlineSession(langInPractice: string, setCurrentQuizData: any, setIsLoading: any) {
    setIsLoading(true);

    // Get lang code (string)
    const getLangCode = async () => {
        const resp = await fetchLangs();
        console.log(resp);
        return resp.result.find((langObj: any) =>
            langObj.codeName.toLowerCase().includes(langInPractice.split(" ")[1].toLowerCase())
        )?.full_code;
    };

    // Fetch 10 random words from prepared sets
    const amountOfWords: number = 2;
    const wordsToPractice: string[] = [];
    const getPreparedWords = () => {
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
    };
    getPreparedWords();

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

        setIsLoading(false);

        // Compose data for current session
        const data = wordsToPractice.map((word, index) => ({
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
        console.log(data);

        setCurrentQuizData(data);
    })();
}

// ============================================================================================================

export default Rounds;
