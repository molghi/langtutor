import { styled, theme } from "../../stitches.config";
import { Container } from "./styled/Container";
import { Link } from "react-router-dom";

// STYLES
const StyledRound = styled("div", {
    transition: "all 0.5s",
    marginTop: "1rem",
    textAlign: "center",
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
        display: "flex",
        columnGap: "1rem",
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

// MARKUP
const Round = () => {
    // TEXT CONTENT
    const roundNumber: number = 10;
    const rounds: number = 10;
    const word: string = "tamizar";
    const pronunciation: string = "tamizar";

    return (
        <Container>
            <StyledRound>
                {/* PROGRESS BAR */}
                <div className="progress">
                    <span className="bar" style={{ width: roundNumber * 10 + "%" }}></span>
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

                    <div className="input-box">
                        <input type="text" placeholder="Type your answer..." autoFocus />
                    </div>
                </div>

                {/* BOTTOM BUTTON */}
                <div className="btn-box">
                    <Link to={roundNumber === rounds ? "/practise/results" : ""} className="button">
                        {roundNumber !== rounds ? <>Next round &gt;</> : <>Final round &gt;</>}
                    </Link>
                </div>
            </StyledRound>
        </Container>
    );
};

export default Round;
