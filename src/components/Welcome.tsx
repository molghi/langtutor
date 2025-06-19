import React from "react";
import { styled, fadeIn } from "../../stitches.config";
import { Container } from "./styled/Container";

// STYLES
const StyledWelcome = styled("div", {
    animation: `${fadeIn} 900ms ease-out`,
    transition: "all 1s",
    marginTop: "10rem",

    "@sm": {
        marginTop: "3rem",
    },

    ".box": {
        fontSize: "1.8rem",
        lineHeight: 2,
        color: "$accent",
        "@md": {
            fontSize: "1.6rem",
        },
        "@sm": { fontSize: "1.4rem" },
    },

    ".emphasised": {
        textDecoration: "underline",
    },

    ".explainer": {
        textDecoration: "none",
        opacity: 0.3,
        fontStyle: "italic",
        display: "block",
        marginTop: "1rem",
        fontSize: "1.4rem",
        lineHeight: 1.5,
        transition: "all 0.1s",
        "&:hover": {
            opacity: 1,
        },
        "@sm": { fontSize: "1.2rem" },
    },
});

// MARKUP
const Welcome = () => {
    // TEXT CONTENT
    const messages: any = [
        {
            title: "Greetings, Young Learner!",
            text: `Here you may practise your language skills.<br />
                    Add your words and practise them later, or initiate an automatically generated practice session.<br />
                    Enhance your vocabulary with <span className="emphasised">spaced repetition*</span> and smart quizzes tailored
                    to your progress.`,
            explainer: `*Spaced Repetition System (SRS) is a learning technique that optimises memory retention by reviewing
                        information at increasing intervals. Difficult items appear more frequently, while easier ones are shown
                        less often, reinforcing knowledge just before forgetting occurs.`,
        },
        {
            title: "Embrace Mistakes",
            text: `No one is perfect from the start. Mistakes are part of the journey.<br />
Learn from them, and they will guide you toward mastery.<br />
No stress! Treat it as a game.`,
        },
        {
            title: "Language Immersion",
            text: `Engagement is essential. Surround yourself with the language.<br />
Immerse yourself through listening, reading, and speaking. Search for native resources.<br />
Try comprehensible input!`,
        },
        {
            title: "Diverse Sources",
            text: `Variety in practice strengthens comprehension.<br />
Explore different materials, styles, approaches, and methods for well-rounded mastery. Experiment!
`,
        },
        {
            title: "Steady!",
            text: `The path to fluency and overall comprehension is gradual.<br />
Each step forward, no matter how small, brings you closer.<br />
Progress may be invisible at times, but steady effort always leads to improvement.`,
        },
        {
            title: "Practice Makes Perfect",
            text: `Even a little bit counts!<br />
Regularity and consistency are crucial in any skill-acquisition process.<br />
Even small increments play an important role, especially in language learning.`,
        },
    ];

    // GET RANDOM TEXT
    const getRandom = (): number => Math.trunc(Math.random() * messages.length);
    const randomMsgNum: number = getRandom();

    return (
        <Container data-name="Message" css={{ height: "initial" }}>
            <StyledWelcome>
                {/* TITLE */}
                <div className="page-title">{messages[randomMsgNum].title}</div>

                {/* TEXT */}
                <div className="box">
                    {messages[randomMsgNum].text.split("<br />").map((line: any, i: number) => (
                        <React.Fragment key={i}>
                            <span>
                                {/* REPLACE SPAN AS TEXT WITH REAL SPAN, OR DON'T */}
                                {!line.includes("<span")
                                    ? line
                                    : line
                                          .split('<span className="emphasised">spaced repetition*</span>')
                                          .map((x: string, j: number) => (
                                              <React.Fragment key={j}>
                                                  {x}
                                                  {j === 0 && <span className="emphasised">spaced repetition*</span>}
                                              </React.Fragment>
                                          ))}
                            </span>
                            <br />
                        </React.Fragment>
                    ))}

                    {/* EXPLAINER */}
                    {messages[randomMsgNum].explainer && <div className="explainer">{messages[randomMsgNum].explainer}</div>}
                </div>
            </StyledWelcome>
        </Container>
    );
};

export default Welcome;
