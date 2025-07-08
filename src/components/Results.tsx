import { styled, fadeIn } from "../../stitches.config";
import { Container } from "./styled/Container";
import MyContext from "../context/MyContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// STYLES
const StyledResults = styled("div", {
    transition: "all 0.5s",
    paddingBottom: "7rem",
    color: "$accent",
    animation: `${fadeIn} 2000ms ease-out`,

    ".page-title": {
        marginBottom: "5px",
        display: "inline-block",
    },

    ".sub-title": {
        marginTop: "1rem",
        marginBottom: "4rem",
        lineHeight: 1.5,
        paddinLleft: "1rem",
    },

    ".items": {
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
    },

    ".btn-box": {
        textAlign: "right",
        marginTop: "5rem",
    },

    ".item": {
        position: "relative",
        backgroundColor: "#111",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        transition: "box-shadow 0.3s",
        "&:hover": {
            boxShadow: "0 0 5px #777",
        },
    },

    ".item-number": {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "-6rem",
        fontWeight: "bold",
        fontSize: "4rem",
        color: "rgba(255, 255, 255, 0.2)",
    },

    ".item-row": {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: "1rem",
    },

    ".item-row-title": {
        color: "#ccc",
    },

    ".item-word": {
        display: "inline-block",
        backgroundColor: "$accent",
        color: "black",
        padding: "0 3px",
        fontWeight: "bold",
    },

    ".item-row--correct": {
        ".item-row-value": {
            color: "limegreen",
        },
    },

    ".item-row-sub-title": {
        display: "inline-block",
        fontSize: "13px",
        opacity: 0.2,
        fontStyle: "italic",
        transition: "all .3s",
        "&:hover": {
            opacity: 1,
        },
    },

    ".flex": {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: "1rem",
    },

    ".item-rate-btn-box": {
        display: "flex",
        flex: "1 1 100%",
        marginTop: "1rem",
        columnGap: "1rem",
    },

    ".button--wrong": {
        color: "red",
        borderColor: "red",
        "&:hover": {
            backgroundColor: "red",
            color: "black",
        },
        "&.checked": {
            backgroundColor: "red",
            color: "black",
        },
    },

    ".button--hard": {
        color: "coral",
        borderColor: "coral",
        "&:hover": {
            backgroundColor: "coral",
            color: "black",
        },
        "&.checked": {
            backgroundColor: "coral",
            color: "black",
        },
    },

    ".button--good": {
        color: "limegreen",
        borderColor: "limegreen",
        "&:hover": {
            backgroundColor: "limegreen",
            color: "black",
        },
        "&.checked": {
            backgroundColor: "limegreen",
            color: "black",
        },
    },

    ".button--easy": {
        color: "dodgerblue",
        borderColor: "dodgerblue",
        "&:hover": {
            backgroundColor: "dodgerblue",
            color: "black",
        },
        "&.checked": {
            backgroundColor: "dodgerblue",
            color: "black",
        },
    },

    "@md": {
        ".btn-box .button": {
            marginTop: "2rem",
        },
    },
});

// MARKUP
const Results = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const {
        answers,
        currentQuizData,
        setWords,
        isFinished,
        langInPractice,
        localStorageKey,
        setCurrentQuizData,
        setCurrentQuizCounter,
        setAnswers,
        setLastPracticed,
        localStorageLastPractised,
        lastPracticed,
        setSessionsToday,
        localStorageSessionsToday,
    } = context;

    const navigate = useNavigate();

    if (!isFinished) {
        navigate("/practise"); // this is because one shouldn't be able to access this URL by typing it manually (when isFinished is falsy)
        return null;
    }

    const [ratings, setRatings] = useState<any>({});

    // Submit review
    const submitReview = () => {
        // Make array of proper ratings: practised word and its rating
        const properRatings: any[] = Object.entries(ratings).map((entry) => {
            const index = +entry[0].split("value")[1];
            entry[0] = currentQuizData[index].word;
            return entry;
        });

        // Update words / SRS method
        setWords((prev) => {
            const practisedLang: string = langInPractice.split(" ")[1].toLowerCase();
            const practisedWords: string[] = currentQuizData.map((x) => x.word.toLowerCase());
            const stateWords: any[] = prev.map((wordObj) => wordObj);

            const newState: any[] = practisedWords.map((practisedWord, index) => {
                const found = stateWords.find(
                    (wordObj) => wordObj.word.toLowerCase() === practisedWord && wordObj.language.toLowerCase() === practisedLang
                );

                if (typeof found === "object" && Object.keys(found).length > 0) {
                    const wordRating: string = properRatings.find(
                        (entry) => entry[0].toLowerCase() === practisedWord.toLowerCase()
                    )
                        ? properRatings.find((entry) => entry[0].toLowerCase() === practisedWord.toLowerCase())[1]
                        : "";
                    let revisionDate;
                    if (wordRating === "Wrong") revisionDate = Date.now(); // immediately
                    if (wordRating === "Hard")
                        revisionDate = found.revisedTimes > 1 ? Date.now() + 15 * 60 * 1000 : Date.now() + 24 * 60 * 60 * 1000; // in 15 min or tomorrow
                    if (wordRating === "Good")
                        revisionDate =
                            found.revisedTimes > 1 ? Date.now() + 24 * 60 * 60 * 1000 : Date.now() + 72 * 60 * 60 * 1000; // in 1 day or 3 days
                    if (wordRating === "Easy")
                        revisionDate =
                            found.revisedTimes > 1 ? Date.now() + 96 * 60 * 60 * 1000 : Date.now() + 192 * 60 * 60 * 1000; // in 4 days or 8 days
                    if (wordRating) {
                        found.nextRevisionDateTime = revisionDate;
                        found.revisedTimes += 1;
                        return found;
                    }
                } else {
                    const wordRating: string = properRatings.find((entry) => entry[0] === practisedWord)[1];
                    let revisionDate;
                    if (wordRating === "Wrong") revisionDate = Date.now(); // immediately
                    if (wordRating === "Hard") revisionDate = Date.now() + 15 * 60 * 1000; // in 15 min
                    if (wordRating === "Good") revisionDate = Date.now() + 24 * 60 * 60 * 1000; // in 1 day
                    if (wordRating === "Easy") revisionDate = Date.now() + 96 * 60 * 60 * 1000; // in 4 days
                    const wordObj = {
                        added: new Date().toISOString(),
                        definition: currentQuizData[index].definition || "",
                        exampleTarget: currentQuizData[index].exampleTarget || "",
                        exampleTranslation: currentQuizData[index].exampleTranslation || "",
                        id: `${Date.now()}.${index}`,
                        language: `${practisedLang}`,
                        note: currentQuizData[index].note || "",
                        pronunciation: currentQuizData[index].pronunciation || "",
                        ratedAs: "",
                        revisedTimes: 0,
                        translation: currentQuizData[index].translation || "",
                        word: practisedWord,
                        nextRevisionDateTime: revisionDate,
                    };
                    return wordObj;
                }
            });

            // console.log(newState);

            setLastPracticed(Date.now());
            setSessionsToday((prev) => {
                const newSessionsState = prev + 1;
                const dateLastSession = new Date(lastPracticed).getDate();
                const dateNow = new Date().getDate();
                if (dateLastSession !== dateNow) localStorage.setItem(localStorageSessionsToday, JSON.stringify(0));
                else localStorage.setItem(localStorageSessionsToday, JSON.stringify(newSessionsState));
                return newSessionsState;
            });
            localStorage.setItem(localStorageLastPractised, JSON.stringify(Date.now())); // Persist change to localStorage
            const final: any[] = [...prev, ...newState];
            // const final: any[] = [...prev];
            localStorage.setItem(localStorageKey, JSON.stringify(final)); // Persist change to localStorage
            return final;
        });

        setCurrentQuizData([]); // Reset
        setCurrentQuizCounter(0); // Reset
        setAnswers([]); // Reset
    };

    // EVALUATION BUTTONS CONTENT
    const buttons: Array<{ [key: string]: string }> = [
        { text: "Wrong", title: "You failed to recall the word" },
        { text: "Hard", title: "You struggled but got it right" },
        { text: "Good", title: "You recalled it correctly with little effort" },
        { text: "Easy", title: "You recalled it effortlessly" },
    ];

    return (
        <Container>
            <StyledResults>
                {/* TITLE & SUBTITLE */}
                <div className="page-title">Review Your Responses</div>
                <div className="sub-title">
                    ▶︎ Rate your knowledge for each question – this is required for the app to tailor your learning experience.
                </div>

                {/* RENDER ITEMS */}
                <ol className="items">
                    {currentQuizData.map((entry: any, i: number, a: any) => (
                        // ONE ITEM
                        <li className="item" data-id={entry.id} key={entry.id}>
                            <div className="item-number">{i + 1}</div>
                            <div className="item-row">
                                <div className="item-row-title">Question:</div>
                                <div className="item-row-value">
                                    {langInPractice.includes("English")
                                        ? "How would you define this?"
                                        : "How would you translate this?"}{" "}
                                    — <span className="item-word">{entry.word}</span>
                                </div>
                            </div>
                            <div className="item-row item-row--your">
                                <div className="item-row-title">Your Answer:</div>
                                <div className="item-row-value">{answers[i]}</div>
                            </div>
                            <div className="item-row item-row--correct">
                                <div className="item-row-title">Correct Answer:</div>
                                <div className="item-row-value">{entry.translation}</div>
                            </div>
                            {entry.pronunciation && (
                                <div className="item-row">
                                    <div className="item-row-title">Pronunciation / Transliteration:</div>
                                    <div className="item-row-value">{entry.pronunciation}</div>
                                </div>
                            )}
                            {entry.definition && (
                                <div className="item-row">
                                    <div className="item-row-title">Definition:</div>
                                    <div className="item-row-value">{entry.definition}</div>
                                </div>
                            )}
                            {entry.exampleTarget && (
                                <div className="item-row">
                                    <div className="item-row-title">Example sentence:</div>
                                    <div className="item-row-value">{entry.exampleTarget}</div>
                                </div>
                            )}
                            {entry.exampleTranslation && (
                                <div className="item-row">
                                    <div className="item-row-title">Example translated:</div>
                                    <div className="item-row-value">{entry.exampleTranslation}</div>
                                </div>
                            )}
                            {entry.note && (
                                <div className="item-row">
                                    <div className="item-row-title">Note:</div>
                                    <div className="item-row-value">{entry.note}</div>
                                </div>
                            )}

                            {/* RATE */}
                            <div className={`item-row ${i === a.length - 1 ? "flex" : ""}`}>
                                <div className="item-row-title">Rate Your Knowledge:</div>
                                <div className="item-row-sub-title">Hover over a button to see what it stands for</div>
                                <div className="item-rate-btn-box">
                                    {/* BUTTONS */}
                                    {buttons.map((btn, j: number) => {
                                        const key = `value${i}`;
                                        const isChecked = ratings[key] === btn.text;
                                        return (
                                            <button
                                                key={j}
                                                title={btn.title}
                                                className={`button button--${btn.text.toLowerCase()} ${
                                                    isChecked ? "checked" : ""
                                                }`}
                                                onClick={() =>
                                                    setRatings((prev: any) => {
                                                        const key = `value${i}`;
                                                        return { ...prev, [key]: btn.text };
                                                    })
                                                }
                                            >
                                                {btn.text}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </li>
                    ))}

                    {/* BOTTOM BUTTON */}
                    <div className="btn-box">
                        {Object.keys(ratings).length < currentQuizData.length && (
                            <span style={{ marginRight: "2rem" }}>Rate each question to submit!</span>
                        )}

                        <Link
                            to="/practise/again"
                            className="button"
                            style={{
                                opacity: Object.keys(ratings).length < currentQuizData.length ? 0.4 : 1,
                                pointerEvents: Object.keys(ratings).length < currentQuizData.length ? "none" : "initial",
                            }}
                            onClick={() => submitReview()}
                        >
                            Submit Review
                        </Link>
                    </div>
                </ol>
            </StyledResults>
        </Container>
    );
};

export default Results;

/*

*/

/*

*/
