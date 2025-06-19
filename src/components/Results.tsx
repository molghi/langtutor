import { styled } from "../../stitches.config";
import { Container } from "./styled/Container";

// STYLES
const StyledResults = styled("div", {
    transition: "all 0.5s",
    paddingBottom: "7rem",
    color: "$accent",

    ".page-title": {
        marginBottom: "5px",
        display: "inline-block",
    },

    ".sub-title": {
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
    },

    ".item": {
        position: "relative",
        backgroundColor: "#111",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        transition: "box-shadow 0.3s",
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
    },

    ".button--hard": {
        color: "coral",
        borderColor: "coral",
        "&:hover": {
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
    },

    ".button--easy": {
        color: "dodgerblue",
        borderColor: "dodgerblue",
        "&:hover": {
            backgroundColor: "dodgerblue",
            color: "black",
        },
    },
});

// MARKUP
const Results = () => {
    // TEXT TO BE SHOWN
    const data: any = [{ id: 123, word: "tamizar", answerYour: "ded", answerCorrect: "der", pronunciation: "red" }];

    // EVALUATION BUTTONS
    const buttons = [
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
                    {data.map((entry: any, i: number, a: any) => (
                        // ONE ITEM
                        <li className="item" data-id={entry.id} key={entry.id}>
                            <div className="item-number">{i + 1}</div>
                            <div className="item-row">
                                <div className="item-row-title">Question:</div>
                                <div className="item-row-value">
                                    How would you translate this? — <span className="item-word">{entry.word}</span>
                                </div>
                            </div>
                            <div className="item-row item-row--your">
                                <div className="item-row-title">Your Answer:</div>
                                <div className="item-row-value">{entry.answerYour}</div>
                            </div>
                            <div className="item-row item-row--correct">
                                <div className="item-row-title">Correct Answer:</div>
                                <div className="item-row-value">{entry.answerCorrect}</div>
                            </div>
                            <div className="item-row">
                                <div className="item-row-title">Pronunciation / Transliteration:</div>
                                <div className="item-row-value">{entry.pronunciation}</div>
                            </div>

                            {/* RATE */}
                            <div className={`item-row ${i === a.length - 1 ? "flex" : ""}`}>
                                <div className="item-row-title">Rate Your Knowledge:</div>
                                <div className="item-row-sub-title">Hover over a button to see what it means</div>
                                <div className="item-rate-btn-box">
                                    {/* BUTTONS */}
                                    {buttons.map((btn, i: number) => (
                                        <button key={i} title={btn.title} className={`button button--${btn.text.toLowerCase()}`}>
                                            {btn.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </li>
                    ))}

                    {/* BOTTOM BUTTON */}
                    <div className="btn-box">
                        <button className="button">Submit Review</button>
                    </div>
                </ol>
            </StyledResults>
        </Container>
    );
};

export default Results;
