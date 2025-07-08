import { useState, useContext } from "react";
import { styled, fadeIn } from "../../stitches.config";
import { Container } from "./styled/Container";
import MyContext from "../context/MyContext";
import addManyWords from "../utils/addManyWords";

// STYLES
const StyledAddMany = styled("div", {
    marginTop: "1rem",
    color: "$accent",
    paddingBottom: "15rem",
    animation: `${fadeIn} 900ms ease-out`,
    transition: "all 1s",

    ".explainer *": { lineHeight: 1.5 },

    ul: {
        paddingLeft: "2rem",
        fontSize: "1.4rem",
    },

    ".example": {
        display: "flex",
        columnGap: "1rem",
        alignItems: "center",
        marginTop: "1.5rem",
    },

    pre: {
        padding: "7px 12px",
        fontFamily: "inherit",
        backgroundColor: "#181818",
        fontSize: "13px",
        whiteSpace: "pre-wrap",
    },

    code: {
        fontFamily: "monospace",
    },

    u: { color: "red" },

    form: {
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
        maxWidth: "100%",
    },

    ".input-box": {
        width: "100%",
        position: "relative",
    },

    textarea: {
        cursor: "pointer",
        backgroundColor: "transparent",
        fontFamily: "inherit",
        border: "1px solid",
        borderColor: "$accent",
        outline: "none",
        padding: "1rem",
        fontSize: "inherit",
        transition: "box-shadow 0.3s",
        resize: "vertical",
        width: "100%",
        color: "white",
        height: "50rem",
        minHeight: "15rem",
        marginTop: "2rem",
    },

    ".button": {
        alignSelf: "flex-start",
    },

    ".required": {
        top: "3.5rem",
    },

    "@md": {
        ".example": {
            display: "block",
        },
    },
});

// MARKUP
const AddMany = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { setUiMessage, words, setWords, localStorageKey } = context;

    const [fieldValue, setFieldValue] = useState<string>("");

    // ON FORM SUBMIT
    const formManyWordsSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        addManyWords(fieldValue, setUiMessage, words, setWords, localStorageKey, setFieldValue);
    };

    return (
        <Container data-name="Add Many">
            <StyledAddMany>
                <div>
                    {/* TITLE */}
                    <div className="page-title">Add Multiple Words:</div>

                    {/* EXPLAINER TEXT */}
                    <div className="explainer">
                        <div>
                            You can add multiple words at once, but they <u>must</u> follow a strict format:
                        </div>
                        <div>
                            <ul>
                                <li>
                                    Each word entry <u>must</u> be on a new line, with no empty lines between entries.
                                </li>
                                <li>
                                    Categories within a line (such as word, translation, pronunciation, etc.) <u>must</u> be
                                    separated using the | symbol.
                                </li>
                                <li>
                                    If you choose to skip certain categories (e.g., pronunciation or definition), you{" "}
                                    <u>must still</u> include a placeholder such as _ or - in their respective positions. This
                                    ensures the correct structure is maintained.
                                </li>
                                <li>
                                    This format is <u>mandatory</u>, and the order of categories in the example below is{" "}
                                    <u>strict</u> — failure to adhere to it will result in incorrect input.
                                </li>
                            </ul>
                        </div>
                        <div className="example">
                            <div>Example:</div>
                            <pre>
                                <code>
                                    language | word | translation | pronunciation | definition | example sentence | example
                                    translation | note language2 | word2 | translation2 | pronunciation2 | definition2 | example
                                    sentence2 | example translation2 | note2
                                </code>
                            </pre>
                        </div>
                        <div className="example">
                            <div>Example:</div>
                            <pre>
                                <code>
                                    german | Haus | house | haʊs | A building for people | Ich wohne in einem Haus. | I live in a
                                    house. | Common noun german | Vogel | bird | _ | _ | Eine Möwe ist ein lustiger Vogel. | _ | _
                                </code>
                            </pre>
                        </div>
                    </div>

                    {/* SUBMISSION FORM */}
                    <form onSubmit={formManyWordsSubmit}>
                        <div className="input-box">
                            <span className="required">*</span>
                            <textarea
                                placeholder="Your words here"
                                required
                                autoComplete="off"
                                name="bulkAdd"
                                value={fieldValue}
                                onChange={(e) => setFieldValue(e.target.value)}
                            ></textarea>
                        </div>

                        <button type="submit" className="button form__btn form__btn--bulk" title="Add many words at once">
                            Add Words
                        </button>
                    </form>
                </div>
            </StyledAddMany>
        </Container>
    );
};

export default AddMany;
