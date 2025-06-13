import { styled } from "../../stitches.config";
import { Container } from "./styled/Container";

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
        opacity: 0.5,
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
});

const Header = () => {
    return (
        <>
            <Container>
                <StyledHeader>
                    <div className="column">
                        <h1 className="heading">LangTutor</h1>
                    </div>
                    <div className="column">
                        <button className="button">Add Word</button>
                        <button className="button">Practise</button>
                    </div>
                </StyledHeader>
            </Container>
        </>
    );
};

export default Header;
