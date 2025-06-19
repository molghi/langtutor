import { styled } from "../../../stitches.config";

export const Container = styled("div", {
    maxWidth: "1000px",
    margin: "0 auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
    // paddingBottom: "100px",

    "@lg": {
        maxWidth: "750px",
    },
    "@md": {
        maxWidth: "460px",
    },
    "@xs": {
        maxWidth: "none",
        padding: "0 10px",
    },
});
