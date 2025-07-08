import { styled, fadeIn } from "../../stitches.config";
import { Container } from "./styled/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import MyContext from "../context/MyContext";
import { useContext } from "react";

// STYLES
const StyledSelectMode = styled("div", {
    marginTop: "3rem",
    animation: `${fadeIn} 900ms ease-out`,
    transition: "all 1s",

    ".box": {
        display: "flex",
        flexDirection: "column",
        rowGap: "3rem",
        marginTop: "1rem",
    },

    ".option": {
        display: "flex",
        alignItems: "center",
        columnGap: "2rem",
        rowGap: "1rem",
        flexWrap: "wrap",
        "&:active": {
            ".name": { opacity: 0.5 },
        },
    },

    ".name": {
        cursor: "pointer",
        border: "1px solid",
        borderColor: "$accent",
        color: "$accent",
        fontSize: "2rem",
        padding: "1rem 1.5rem",
        display: "inline-block",
        transition: "all .2s",
        "&:hover": {
            backgroundColor: "$accent",
            color: "black",
            boxShadow: "0 0 10px",
            boxShadowColor: "$accent",
        },
    },

    ".explainer": {
        color: "$accent",
        opacity: 0.5,
        transition: "all .2s",
        "&:hover": {
            opacity: 1,
        },
    },

    ".action": {
        flex: "1 1 100%",
        textAlign: "right",
        marginTop: "5rem",
    },

    ".no-hover": { pointerEvents: "none" },

    ".dimmed": { opacity: 0.5 },

    ".button": { fontSize: "2rem" },

    ".active": {
        backgroundColor: "$accent",
        color: "black",
    },

    "@lg": {
        ".option": {
            flexDirection: "column",
            alignItems: "start",
            rowGap: "1.5rem",
        },
    },

    "@md": {
        ".box": {
            rowGap: "4rem",
        },
        ".action": {
            textAlign: "center",
        },
    },
});

// MODE OPTIONS TO SHOW
const options: Array<{ [key: string]: any }> = [
    { name: "Review Your Words", active: true, explainer: "— For practising words you have previously interacted with" },
    { name: "New Online Session", active: true, explainer: "— For starting a fresh practice session with online content" },
    {
        name: "Practise Topics",
        active: false,
        explainer: "— [IN DEVELOPMENT] For practising words from a curated selection of topics",
    },
];

// MARKUP
const SelectMode = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { setSelectedMode } = context;

    const [modeChoice, setModeChoice] = useState<number>(-1);

    const changeMode = (i: number): void => {
        setModeChoice(i);
        setSelectedMode(options[i].name.toLowerCase().replaceAll(" ", "-"));
    };

    return (
        <Container data-name="Select Mode">
            <StyledSelectMode>
                {/* TITLE */}
                <div className="page-title">Select Mode</div>

                <div className="box">
                    {/* OPTIONS */}
                    {options.map((choice: any, i: number) => (
                        <div key={i} className="option">
                            <span
                                className={`name ${!choice.active ? "no-hover dimmed" : ""} ${modeChoice === i ? "active" : ""}`}
                                onClick={() => changeMode(i)}
                            >
                                {choice.name}
                            </span>
                            <span className="explainer">{choice.explainer}</span>
                        </div>
                    ))}

                    {/* BOTTOM BUTTON */}
                    <div className="action">
                        <Link to={`/practise/${modeChoice === 0 ? "your-words" : "online-session"}`} className="button">
                            Select Language &gt;
                        </Link>
                    </div>
                </div>
            </StyledSelectMode>
        </Container>
    );
};

export default SelectMode;
