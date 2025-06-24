import { styled } from "../../stitches.config";
import { NavLink, Link } from "react-router-dom";
import { Container } from "./styled/Container";
import MyContext from "../context/MyContext";
import { useContext } from "react";

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
    const { langInPractice } = context;

    return (
        <Container data-name="Header" css={{ height: "initial" }}>
            <StyledHeader>
                <div className="column">
                    {/* LOGO */}
                    <div className="logo-box">
                        <Link to="/" className="heading">
                            LangTutor
                        </Link>
                        {langInPractice && <span title={langInPractice.split(" ")[1]}>{langInPractice.split(" ")[0]}</span>}
                    </div>
                </div>

                <div className="column">
                    {/* ACTION BUTTONS */}
                    <NavLink
                        to="/add-one"
                        className={`button ${({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}`}
                    >
                        Add Word
                    </NavLink>
                    <NavLink to="/practise" className="button">
                        Practise
                    </NavLink>
                </div>
            </StyledHeader>
        </Container>
    );
};

export default Header;
