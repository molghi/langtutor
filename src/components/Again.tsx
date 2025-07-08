import { Container } from "./styled/Container";
import { styled, fadeIn } from "../../stitches.config";
import { Link } from "react-router-dom";
import MyContext from "../context/MyContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// STYLES
const StyledAgain = styled("div", {
    marginTop: "10rem",
    animation: `${fadeIn} 2000ms ease-out`,

    ".btns": {
        display: "flex",
        alignItems: "center",
        columnGap: "3rem",
        marginTop: "2rem",
        a: {
            fontSize: "3rem",
            padding: "1rem 2rem",
        },
    },
});

// MARKUP
const Again = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { langInPractice, isFinished, setIsFinished, setAnswers } = context;

    const navigate = useNavigate();

    const goTo = (path: string): void => {
        // Navigate to
        setIsFinished(false);
        navigate(path);
    };

    useEffect(() => {
        // Reset answers
        if (!isFinished) setAnswers([]);
    }, [isFinished]);

    const langPractised: string = langInPractice.split(" ")[1].toLowerCase();

    return (
        <Container>
            <StyledAgain>
                <div className="page-title">Review submitted! Another session?</div>

                <div className="btns">
                    <Link
                        to={`/practise/your-words/${langPractised}`}
                        className="button"
                        onClick={() => goTo(`/practise/your-words/${langPractised}`)}
                    >
                        Yes
                    </Link>
                    <Link to="/" className="button" onClick={() => goTo("/")}>
                        No
                    </Link>
                </div>
            </StyledAgain>
        </Container>
    );
};

export default Again;
