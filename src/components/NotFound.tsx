import { Container } from "./styled/Container";
import { styled } from "@stitches/react";
import { Link } from "react-router-dom";

const StyledNotFound = styled("div", {
    textAlign: "center",
    marginTop: "5rem",

    "div:nth-child(1)": {
        fontSize: "20rem",
        fontWeight: "bold",
        marginBottom: "5rem",
    },

    "div:nth-child(2)": {
        fontSize: "5rem",
        marginBottom: "8rem",
    },
});

const NotFound = () => {
    return (
        <Container>
            <StyledNotFound>
                <div>404</div>
                <div>Page Not Found</div>
                <Link to="/" className="button">
                    Back to Home
                </Link>
            </StyledNotFound>
        </Container>
    );
};

export default NotFound;
