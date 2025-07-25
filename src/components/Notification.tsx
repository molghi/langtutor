import { styled } from "../../stitches.config";
import React from "react";
import { Container } from "./styled/Container";

// STYLES
const StyledNotification = styled("div", {
    border: "1px solid white",
    padding: "2rem",
    fontSize: "1.8rem",
    color: "white",
    backgroundColor: "black",
    position: "fixed",
    width: "900px",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "2rem",

    "@lg": {
        width: "90%",
    },

    "&.success": {
        borderColor: "lime",
        color: "lime",
    },

    "&.failure": {
        borderColor: "red",
        color: "red",
    },
});

// MARKUP
const Notification = ({ message }: { message: string }) => {
    const type: string = message.split(" ")[0]; // Notification type
    const text: string = message.split(" ").slice(1).join(" "); // Notification text

    // EITHER SUCCESS OR FAILURE MESSAGE
    const classes: string = type === "success" ? "success" : "failure";

    return (
        <Container data-name="Container">
            <StyledNotification className={classes}>
                {/* REPLACE BR AS PLAIN TEXT WITH REAL BR */}
                {!text.includes("<br>")
                    ? text
                    : text.split("<br>").map((string, index) => (
                          <React.Fragment key={index}>
                              {string}
                              <br />
                          </React.Fragment>
                      ))}
            </StyledNotification>
        </Container>
    );
};

export default Notification;
