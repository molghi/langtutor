import MyContext from "../context/MyContext";
import { useContext, useEffect, useState } from "react";
import Round from "./Round";
import { Container } from "./styled/Container";

const getRandomNum = (upperLimit: number): number => Math.floor(Math.random() * upperLimit);

const Rounds = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { langInPractice, words, setCurrentQuizData, currentQuizCounter, setCurrentQuizCounter, currentQuizData, setAnswers } =
        context;

    const [nextRevision, setNextRevision] = useState();

    useEffect(() => {
        if (words.length === 0) return;

        const wordsSelectedLang: any[] = words.filter((wordObj) => {
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
            .filter((entry) => entry.nextRevisionDateTime <= Date.now() || !entry.nextRevisionDateTime); // Make an array, map to word objs, filter only those that should be practised now

        console.log(wordsThisPractice);

        setCurrentQuizData(wordsThisPractice);

        setNextRevision(
            words
                .filter((word) => word.language === langInPractice.split(" ")[1].toLowerCase())
                .map((x) => x.nextRevisionDateTime)
                .sort((a, b) => a - b)[0]
        );

        console.log(words.filter((word) => word.language === langInPractice.split(" ")[1].toLowerCase()));
    }, [words, langInPractice]);

    const formatDateTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        const datePart = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        }).format(date);
        const timePart = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).format(date);
        return `${datePart} - ${timePart}`;
    };

    console.log(nextRevision);

    return currentQuizData.length > 0 ? (
        <Round
            roundData={currentQuizData[currentQuizCounter]}
            rounds={currentQuizData.length}
            currentQuizCounter={currentQuizCounter}
            setCurrentQuizCounter={setCurrentQuizCounter}
            setAnswers={setAnswers}
        />
    ) : (
        <Container>
            <div style={{ marginTop: "5rem", fontSize: "2rem", display: "flex", flexDirection: "column", rowGap: "2rem" }}>
                <div>You’ve reviewed all current words.</div>
                <div>Wait for the next scheduled revision or add new words to continue.</div>
                {nextRevision && (
                    <div>
                        Next revision: <span style={{ opacity: 0.5 }}>{nextRevision && formatDateTime(nextRevision)} </span>
                        <span style={{ opacity: 0.2 }}>(Now: {formatDateTime(Date.now())})</span>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Rounds;
