import { styled, theme, fadeIn } from "../../stitches.config";
import { Container } from "./styled/Container";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// STYLES
const StyledRound = styled("div", {
    transition: "all 0.5s",
    marginTop: "1rem",
    textAlign: "center",
    animation: `${fadeIn} 2000ms ease-out`,

    ".progress": {
        marginBottom: "3rem",
        textAlign: "left",
        color: "$accent",
        "span:nth-child(2)": {
            marginRight: "1rem",
        },
    },

    ".bar": {
        display: "block",
        height: "5px",
        backgroundColor: "$accent",
        marginBottom: "1rem",
    },

    ".box": {
        maxWidth: "50rem",
        margin: "0 auto",
        color: "$accent",
    },

    ".round-title": {
        fontSize: "3rem",
        marginBottom: "3rem",
        fontStyle: "italic",
    },

    ".round-word": {
        display: "inline-block",
        marginBottom: "4rem",
    },

    ".row": {
        marginBottom: "3rem",
        textAlign: "left",
        lineHeight: 1.5,
        // display: "flex",
        // columnGap: "1rem",
    },

    ".row div": {
        display: "inline",
    },

    ".row div:first-child": {
        marginRight: "1rem",
    },

    ".input-box": { marginTop: "4rem", marginBottom: "5rem" },

    input: {
        cursor: "pointer",
        backgroundColor: "transparent",
        color: "inherit",
        fontFamily: "inherit",
        border: "1px solid $accent",
        outline: "none",
        padding: "1rem",
        fontSize: "inherit",
        transition: "box-shadow 0.3s",
        width: "100%",
        "&::placeholder": {
            color: "$accent",
        },
        "&:focus": {
            boxShadow: `0 0 15px ${theme.colors.accent}`,
        },
    },

    ".btn-box": {
        textAlign: "right",
    },

    ".row-title": { opacity: 0.5 },
});

interface RoundTypes {
    roundData: { [key: string]: any };
    currentQuizCounter: number;
    setCurrentQuizCounter: any;
    setAnswers: any;
    rounds: number;
}

// MARKUP
const Round = ({ roundData, currentQuizCounter, setCurrentQuizCounter, setAnswers, rounds }: RoundTypes) => {
    if (!roundData) return null;

    const inputRef = useRef<HTMLInputElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    // ROUND DATA
    const roundNumber: number = currentQuizCounter + 1;
    const word: string = roundData.word;
    const pronunciation: string = roundData.pronunciation;
    const definition: string = roundData.definition;
    const exampleTarget: string = roundData.exampleTarget;
    const note: string = roundData.note;

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        setInputValue("");
        inputRef.current && inputRef.current.focus();
    }, [roundData, currentQuizCounter]);

    const actionBtnClick = (isLastRound: boolean) => {
        setCurrentQuizCounter((prev: number) => prev + 1);
        setAnswers((prev: any[]) => [...prev, inputValue]);
        if (isLastRound) setCurrentQuizCounter(0);
    };

    const formSubmit = (e: React.FormEvent<HTMLFormElement>, isLastRound: boolean) => {
        e.preventDefault();
        btnRef.current && btnRef.current.click();
        setAnswers((prev: any[]) => [...prev, inputValue]);
        if (isLastRound) setCurrentQuizCounter(0);
    };

    return (
        <Container>
            <StyledRound>
                {/* PROGRESS BAR */}
                <div className="progress">
                    <span className="bar" style={{ width: 100 / rounds + "%" }}></span>
                    <span>Round:</span>
                    <span>
                        <span>{roundNumber}</span>
                        <span>/{rounds}</span>
                    </span>
                </div>

                {/* ROUND TEXT */}
                <div className="box">
                    <div className="round-title">How would you translate this?</div>
                    <div className="round-word page-title">{word}</div>

                    {pronunciation && (
                        <div className="row">
                            <div className="row-title">Pronunciation / Transliteration:</div>
                            <div className="row-value">{pronunciation}</div>
                        </div>
                    )}

                    {definition && (
                        <div className="row">
                            <div className="row-title">Definition:</div>
                            <div className="row-value">{definition}</div>
                        </div>
                    )}

                    {exampleTarget && (
                        <div className="row">
                            <div className="row-title">Example in target language:</div>
                            <div className="row-value">{exampleTarget}</div>
                        </div>
                    )}

                    {note && (
                        <div className="row">
                            <div className="row-title">Note:</div>
                            <div className="row-value">{note}</div>
                        </div>
                    )}

                    <form onSubmit={(e) => formSubmit(e, roundNumber === rounds)}>
                        <div className="input-box">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Type your answer..."
                                autoFocus
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                {/* BOTTOM BUTTON */}
                <div className="btn-box">
                    <Link
                        ref={btnRef}
                        to={roundNumber === rounds ? "/practise/results" : ""}
                        onClick={() => actionBtnClick(roundNumber === rounds)}
                        className="button"
                    >
                        {roundNumber !== rounds ? <>Next round &gt;</> : <>Finish &gt;</>}
                    </Link>
                </div>
            </StyledRound>
        </Container>
    );
};

export default Round;
