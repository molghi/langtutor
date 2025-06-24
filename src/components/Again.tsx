import { Container } from "./styled/Container";
import { styled, fadeIn } from "../../stitches.config";
import { Link } from "react-router-dom";
import MyContext from "../context/MyContext";
import { useContext } from "react";

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

const Again = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { langInPractice } = context;

    return (
        <Container>
            <StyledAgain>
                <div className="page-title">Review submitted! Another session?</div>
                <div className="btns">
                    <Link to={`/practise/your-words/${langInPractice.split(" ")[1].toLowerCase()}`} className="button">
                        Yes
                    </Link>
                    <Link to="/" className="button">
                        No
                    </Link>
                </div>
            </StyledAgain>
        </Container>
    );
};

export default Again;
