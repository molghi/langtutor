import { styled } from "@stitches/react";
import { Container } from "./styled/Container";
import MyContext from "../context/MyContext";
import { useContext } from "react";

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
const sessions = 1;

// MARKUP
const Footer = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { lastPracticed } = context;

    const getWhen = (timestamp: number): string => {
        if (timestamp === 0) return "...";
        const now: number = Date.now();
        const difference: number = now - timestamp;
        const inMunites: number = Math.round(difference / 1000 / 60);
        const inHours: number = Math.round(difference / 1000 / 60 / 60);
        let result: string = "";
        if (inMunites < 60) {
            if (inMunites === 0) result = `Just now`;
            if (inMunites === 1) result = `1 minute ago`;
            else result = `${inMunites} minutes ago`;
        }
        if (inMunites >= 60 && inHours < 24) {
            if (inHours === 1) result = `1 hour ago`;
            else result = `${inHours} hours ago`;
        }
        if (inHours >= 24) {
            if (Math.round(inHours / 24) === 1) result = `1 day ago`;
            else result = `${Math.round(inHours / 24)} days ago`;
        }
        return result;
    };

    return (
        <Container data-name="Footer-Container" css={{ height: "initial" }}>
            <StyledFooter data-name="Footer">
                <span>Last practised: {lastPracticed === -1 ? "Never" : getWhen(lastPracticed)}</span>
                {/* {lastPracticed !== 0 && <span>Sessions today: {sessions}</span>} */}
            </StyledFooter>
        </Container>
    );
};

export default Footer;
