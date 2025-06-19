import { styled } from "../../stitches.config";
import { NavLink, Link } from "react-router-dom";
import { Container } from "./styled/Container";

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
});

// MARKUP
const Header = () => {
    return (
        <Container data-name="Header" css={{ height: "initial" }}>
            <StyledHeader>
                <div className="column">
                    {/* LOGO */}
                    <Link to="/" className="heading">
                        LangTutor
                    </Link>
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
