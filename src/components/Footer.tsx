import { styled } from "@stitches/react";
import { Container } from "./styled/Container";

// STYLES
const StyledFooter = styled("div", {
    display: "flex",
    alignItems: "center",
    columnGap: "7rem",
    padding: "2rem 0",
    opacity: 0.3,
    fontSize: "1.4rem",
    transition: "all 0.1s",
    color: "$accent",
    "&:hover": {
        opacity: 1,
    },
});

// DATA TO BE SHOWN
const lastPractised = "Never";
const sessions = 1;

// MARKUP
const Footer = () => {
    return (
        <Container data-name="Footer-Container" css={{ height: "initial" }}>
            <StyledFooter data-name="Footer">
                <span>Last practised: {lastPractised}</span>
                {lastPractised !== "Never" && <span>Sessions today: {sessions}</span>}
            </StyledFooter>
        </Container>
    );
};

export default Footer;
