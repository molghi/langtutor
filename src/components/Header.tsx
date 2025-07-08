import { styled } from "../../stitches.config";
import { Container } from "./styled/Container";
import MyContext from "../context/MyContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// STYLES
const StyledHeader = styled("div", {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",

    ".column": {
        display: "flex",
        alignItems: "center",
    },

    ".heading": {
        color: "$accent",
        cursor: "pointer",
        opacity: 0.5,
        backgroundColor: "transparent",
        border: "none",
        fontFamily: "inherit",
        fontSize: "2.8rem",
        "&:hover": {
            opacity: 1,
        },
        "@xxs": {
            fontSize: "2.2rem",
        },
    },

    ".button:nth-child(1)": {
        borderRightWidth: 0,
    },

    ".active": {
        backgroundColor: "$accent",
        color: "black",
    },

    ".logo-box": {
        display: "flex",
        alignItems: "center",
        columnGap: "1rem",
        span: {
            fontSize: "3rem",
        },
    },
});

// MARKUP
const Header = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { langInPractice, currentQuizData, setCurrentQuizData, setCurrentQuizCounter, setAnswers, setIsFirstRender } = context;

    const navigate = useNavigate();

    // Redirect to
    const redirect = (to: string): void => {
        if (currentQuizData.length > 0) {
            // Prompt first
            const answer = confirm(`You are in the middle of a practice session.\nAre you sure you want to exit?`);
            if (!answer) return;
            setCurrentQuizData([]); // Reset
            setCurrentQuizCounter(0); // Reset
            setAnswers([]); // Reset
            navigate(to);
        } else {
            navigate(to);
        }
        setTimeout(() => {
            setIsFirstRender(false);
        }, 50);
    };

    return (
        <Container data-name="Header" css={{ height: "initial" }}>
            <StyledHeader>
                <div className="column">
                    {/* LOGO */}
                    <div className="logo-box">
                        <button className="heading" onClick={() => redirect("/")}>
                            LangTutor
                        </button>
                        {langInPractice && <span title={langInPractice.split(" ")[1]}>{langInPractice.split(" ")[0]}</span>}
                    </div>
                </div>

                <div className="column">
                    {/* ACTION BUTTONS */}
                    <button
                        className={`button ${location.pathname.includes("add-") ? "active" : ""}`}
                        onClick={() => redirect("/add-one")}
                    >
                        Add Word
                    </button>
                    <button
                        className={`button ${location.pathname.includes("practise") ? "active" : ""}`}
                        onClick={() => redirect("/practise")}
                    >
                        Practise
                    </button>
                </div>
            </StyledHeader>
        </Container>
    );
};

export default Header;
