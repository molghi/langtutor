import { styled, theme, fadeIn } from "../../stitches.config";
import { useState, useEffect } from "react";
import { Container } from "./styled/Container";
import { Link } from "react-router-dom";
import MyContext from "../context/MyContext";
import { useContext } from "react";
import languagesQuickInfo from "./languagesQuickInfo";

// STYLES
const StyledSelectLanguage = styled("div", {
    marginTop: "3rem",
    position: "relative",
    // height: "86vh",
    animation: `${fadeIn} 2000ms ease-out`,
    transition: "all 1s",

    ".message": {
        fontStyle: "italic",
        color: "$accent",
        marginTop: "2rem",
    },

    ".box": {
        display: "flex",
        flexDirection: "row",
        rowGap: "3rem",
        columnGap: "4rem",
        flexWrap: "wrap",
    },

    ".option": {
        display: "flex",
        alignItems: "center",
        columnGap: "2rem",
        rowGap: "1rem",
        flexWrap: "wrap",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "$accent",
            boxShadow: `0 0 10px ${theme.colors.accent}`,
            ".name": {
                color: "black",
            },
            ".content": {
                borderColor: "$accent",
            },
        },
        "&:active": {
            opacity: 0.5,
        },
    },

    ".content": {
        display: "flex",
        alignItems: "center",
        columnGap: "1rem",
        padding: "1.2rem 1.5rem",
        border: "1px solid",
        borderColor: "#555",
        color: "#fff",
        "& > span": {
            display: "flex",
            alignItems: "center",
            columnGap: "1rem",
        },
    },

    "[data-lang]": {
        display: "flex",
        alignItems: "center",
        columnGap: "1rem",
    },

    ".flag": {
        fontSize: "4rem",
    },

    ".name": {
        fontSize: "2rem",
        pointerEvents: "none",
    },

    ".action": {
        flex: "1 1 100%",
        textAlign: "right",
        marginTop: "5rem",
        fontSize: "2rem",
    },

    ".action a": {
        transition: "all 0.3s",
    },

    ".lang-info": {
        position: "absolute",
        top: "88%",
        left: "0px",
        zIndex: "10",
        maxWidth: "77rem",
        width: "100%",
        lineHeight: "1.25",
        fontSize: "1.4rem",
        padding: "1.5rem",
        backgroundColor: "#111",
        border: "1px solid #333",
        color: "$accent",
        transition: "all 0.3s",
        div: {
            textDecoration: "underline",
            fontWeight: "bold",
        },
        span: {
            opacity: 0.5,
        },
    },

    ".active": {
        backgroundColor: "$accent",
        ".name": { color: "black" },
    },
});

// LANG OPTIONS
let langs = [
    { langCode: "en", langFlag: "🇬🇧", langName: "English" },
    { langCode: "zh", langFlag: "🇨🇳", langName: "Chinese" },
    { langCode: "hi", langFlag: "🇮🇳", langName: "Hindi" },
    { langCode: "es", langFlag: "🇪🇸", langName: "Spanish" },
    { langCode: "fr", langFlag: "🇫🇷", langName: "French" },
    { langCode: "ar", langFlag: "🇵🇸", langName: "Arabic" },
    { langCode: "be", langFlag: "🇧🇩", langName: "Bengali" },
    { langCode: "pt", langFlag: "🇧🇷", langName: "Portuguese" },
    { langCode: "ru", langFlag: "🇷🇺", langName: "Russian" },
    { langCode: "ur", langFlag: "🇵🇰", langName: "Urdu" },
    { langCode: "de", langFlag: "🇩🇪", langName: "German" },
    { langCode: "cz", langFlag: "🇨🇿", langName: "Czech" },
    { langCode: "is", langFlag: "🇮🇸", langName: "Icelandic" },
    { langCode: "la", langFlag: "🇻🇦", langName: "Latin" },
    { langCode: "jp", langFlag: "🇯🇵", langName: "Japanese" },
    { langCode: "sw", langFlag: "🇰🇪", langName: "Swahili" },
    { langCode: "tr", langFlag: "🇹🇷", langName: "Turkish" },
    { langCode: "it", langFlag: "🇮🇹", langName: "Italian" },
    { langCode: "pe", langFlag: "🇮🇷", langName: "Persian" },
    { langCode: "ko", langFlag: "🇰🇷", langName: "Korean" },
    { langCode: "vi", langFlag: "🇻🇳", langName: "Vietnamese" },
    { langCode: "po", langFlag: "🇵🇱", langName: "Polish" },
    { langCode: "th", langFlag: "🇹🇭", langName: "Thai" },
    { langCode: "gr", langFlag: "🇬🇷", langName: "Greek" },
    { langCode: "he", langFlag: "🇮🇱", langName: "Hebrew" },
];

// MARKUP
const SelectLanguage = ({ scenario }: { scenario: string }) => {
    // 'scenario' can be either 'your-words' or 'online-session'

    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { showLangInfo, setShowLangInfo, words } = context;

    const [langChoice, setLangChoice] = useState<string>("");
    const [languages, setLanguages] = useState<any[]>(langs);

    console.log(langChoice);

    useEffect(() => {
        // REDUCE LANG OPTIONS IF REVIEWING YOUR WORDS
        if (scenario === "your-words") {
            const languagesAdded: string[] = [...new Set(words.map((word) => word.language.toLowerCase()))];
            setLanguages(languages.filter((langObj) => languagesAdded.includes(langObj.langName.toLowerCase())));
        }
    }, []);

    return (
        <Container data-name="Select Language">
            <StyledSelectLanguage>
                {/* TITLE */}
                <div className="page-title" style={{ marginBottom: "3rem" }}>
                    Select Language
                </div>

                {/* FOR THE 'REVIEW YOUR WORDS' MODE */}
                {/* <div className="message">Nothing here yet because you haven't added any words to practise.</div> */}

                <div className="box">
                    {/* style={{ justifyContent: languages.length < 5 ? "initial" : "space-between" }} */}
                    {/* RENDER LANG ELEMENTS */}
                    {languages.map((lang: any, i: number) => (
                        <div
                            key={i}
                            className={`option ${langChoice === lang.langCode ? "active" : ""}`}
                            data-lang={lang.langCode}
                            onMouseEnter={() => setShowLangInfo(lang.langCode)}
                            onMouseLeave={() => setShowLangInfo(null)}
                            onClick={() => setLangChoice(lang.langCode)}
                        >
                            <span className="content">
                                <span>
                                    <span className="flag">{lang.langFlag}</span>
                                    <span className="name">{lang.langName}</span>
                                </span>
                            </span>
                        </div>
                    ))}

                    {/* BOTTOM BUTTON */}
                    <div className="action">
                        <Link
                            to={`/practise/online-session/${langs
                                .find((entry) => entry.langCode === langChoice)
                                ?.langName.toLowerCase()}`}
                            className="button"
                            style={{
                                pointerEvents: !langChoice ? "none" : "initial",
                                opacity: !langChoice ? 0.4 : 1,
                            }}
                        >
                            Begin Practice &gt;
                        </Link>
                    </div>
                </div>

                {/* HOVER-ACTIVATED POP-UP */}
                {showLangInfo && (
                    <div className="lang-info">
                        <div>Quick Info</div>
                        <span>Speakers:</span> {languagesQuickInfo(showLangInfo).speakers}
                        <br />
                        <span>Countries:</span> {languagesQuickInfo(showLangInfo).countries}
                        <br />
                        <span>Family:</span> {languagesQuickInfo(showLangInfo).family}
                        <br />
                        <span>Note:</span> {languagesQuickInfo(showLangInfo).note}
                    </div>
                )}
            </StyledSelectLanguage>
        </Container>
    );
};

export default SelectLanguage;
