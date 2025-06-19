import { useState } from "react";
import { styled, theme, fadeIn } from "../../stitches.config";
import { Container } from "./styled/Container";
import { Link } from "react-router-dom";
import MyContext from "../context/MyContext";
import { useContext } from "react";

// STYLES
const StyledAddOne = styled("div", {
    marginTop: "3rem",
    position: "relative",
    animation: `${fadeIn} 900ms ease-out`,
    transition: "all .5s",

    form: {
        maxWidth: "80rem",
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
    },

    ".input-box": {
        width: "100%",
        position: "relative",
    },

    "input, select": {
        width: "100%",
        color: "white",
        cursor: "pointer",
        backgroundColor: "transparent",
        fontFamily: "inherit",
        border: "1px solid",
        borderColor: "$accent",
        outline: "none",
        padding: "1rem",
        fontSize: "inherit",
        transition: "box-shadow 0.3s",
        "&::placeholder": {
            color: "white",
        },
        "&:focus": {
            boxShadow: `0 0 1rem ${theme.colors.accent}`,
            "&::placeholder": {
                color: "grey",
            },
        },
    },

    ".button[type='submit']": {
        alignSelf: "flex-start",
        marginTop: "1rem",
    },

    ".multi": {
        position: "absolute",
        bottom: "-4rem",
        right: 0,
        opacity: 0.5,
        "&:hover": {
            opacity: 1,
        },
    },
});

// DATA TO RENDER FIELDS
const fields = [
    {
        type: "select",
        name: "lang_select",
        required: "true",
        title: "Select Language",
        choices: [
            "🇬🇧 English",
            "🇨🇳 Chinese (Mandarin)",
            "🇮🇳 Hindi",
            "🇪🇸 Spanish",
            "🇫🇷 French",
            "🇵🇸 Arabic",
            "🇧🇩 Bengali",
            "🇵🇹 Portuguese",
            "🇷🇺 Russian",
            "🇵🇰 Urdu",
            "🇩🇪 German",
            "🇨🇿 Czech",
            "🇮🇸 Icelandic",
            "🇻🇦 Latin",
            "🇯🇵 Japanese",
            "🇰🇪 Swahili",
            "🇹🇷 Turkish",
            "🇮🇹 Italian",
            "🇮🇷 Persian",
            "🇰🇷 Korean",
            "🇻🇳 Vietnamese",
            "🇵🇱 Polish",
            "🇹🇭 Thai",
            "🇬🇷 Greek",
            "🇮🇱 Hebrew",
        ],
    },
    { type: "text", name: "word", required: true, title: "Word (in target language)" },
    { type: "text", name: "translation", required: true, title: "Translation" },
    { type: "text", name: "pronunciation", required: false, title: "Pronunciation / Transliteration (optional)" },
    { type: "text", name: "definition", required: false, title: "Definition (optional)" },
    { type: "text", name: "example-lang", required: false, title: "Example sentence (in target language, optional)" },
    { type: "text", name: "example-translated", required: false, title: "Example sentence (translation, optional)" },
    { type: "text", name: "note", required: false, title: "Note (optional)" },
];

// MARKUP
const AddOne = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { localStorageKey, setUiMessage } = context;

    const [fieldValues, setFieldValues] = useState<any>({});

    // MANIPULATE PIECE OF STATE
    const onFieldChange = (fieldName: string, newValue: string) => {
        setFieldValues((prev: any) => ({ ...prev, [fieldName]: newValue }));
    };

    // SMALL HELPER FUNCTIONS
    const capitalise = (value: string): string => (value ? value[0].toUpperCase() + value.slice(1).toLowerCase() : "");
    const trimAndLower = (value: string): string => (value ? value.trim().toLowerCase() : "");

    // ON FORM SUBMIT
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Create new entry
        const wordEntry = {
            language: fieldValues.lang_select,
            word: trimAndLower(fieldValues.word),
            translation: trimAndLower(fieldValues.translation),
            pronunciation: trimAndLower(fieldValues.pronunciation),
            definition: capitalise(trimAndLower(fieldValues.definition)),
            exampleTarget: capitalise(trimAndLower(fieldValues.example_lang)),
            exampleTranslation: capitalise(trimAndLower(fieldValues.example_translated)),
            note: capitalise(trimAndLower(fieldValues.note)),
            added: new Date().toISOString(),
            id: `${Date.now()}`, // "id": "1740676805544.19"
            ratedAs: "", // "ratedAs": "hard",
            nextRevisionDateTime: 0, // "nextRevisionDateTime": 1740763477104
        };
        // Push to storage
        const fromLS = localStorage.getItem(localStorageKey);
        if (!fromLS) localStorage.setItem(localStorageKey, JSON.stringify([wordEntry]));
        else localStorage.setItem(localStorageKey, JSON.stringify([...JSON.parse(fromLS), wordEntry]));
        // Reset fields
        setFieldValues((prev: any) => ({
            ...prev,
            lang_select: "",
            word: "",
            translation: "",
            pronunciation: "",
            definition: "",
            example_lang: "",
            example_translated: "",
            note: "",
        }));
        // Set UI msg
        setUiMessage("success Word added!");
    };

    // MARKUP
    return (
        <Container data-name="Add One">
            <StyledAddOne>
                <form onSubmit={formSubmit}>
                    {/* TITLE */}
                    <div className="page-title">Add a Word:</div>

                    {/* RENDER FIELDS: EITHER SELECT OR INPUT TEXT */}
                    {fields.map((field: any, i: number) => {
                        if (field.type === "select")
                            return (
                                <div key={i} className="input-box">
                                    <span className="required">*</span>
                                    <select
                                        name="languages"
                                        required={Boolean(field.required)}
                                        value={fieldValues.lang_select || ""}
                                        onChange={(e) => onFieldChange(field.name, e.target.value)}
                                    >
                                        <option value="" disabled>
                                            {field.title}
                                        </option>
                                        {field.choices.map((choice: string, j: number) => (
                                            <option key={j} value={choice.split(" ").slice(1).join(" ").trim()}>
                                                {choice}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        else
                            return (
                                <div key={i} className="input-box">
                                    {field.required && <span className="required">*</span>}
                                    <input
                                        autoComplete="off"
                                        name="word"
                                        type="text"
                                        placeholder={field.title}
                                        required={Boolean(field.required)}
                                        value={fieldValues[field.name] || ""}
                                        onChange={(e) => onFieldChange(field.name, e.target.value)}
                                    />
                                </div>
                            );
                    })}

                    {/* ACTION BUTTON */}
                    <button type="submit" className="button">
                        Add
                    </button>

                    {/* ANOTHER BUTTON */}
                    <Link to="/add-many" className="button multi">
                        Add Multiple
                    </Link>
                </form>
            </StyledAddOne>
        </Container>
    );
};

export default AddOne;
