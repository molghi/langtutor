import { styled, theme, fadeIn, keyframes } from "../../stitches.config";
import { useState, useEffect } from "react";
import { Container } from "./styled/Container";
import { Link } from "react-router-dom";
import MyContext from "../context/MyContext";
import { useContext } from "react";
import languagesQuickInfo from "./languagesQuickInfo";
import spinnerImg from "../img/spinner.png";

// STYLES
const rotate360 = keyframes({
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
});
const StyledSelectLanguage = styled("div", {
    marginTop: "3rem",
    position: "relative",
    // height: "86vh",
    height: "calc(100vh-10%)",
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
        marginTop: "1rem",
        fontSize: "2rem",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        columnGap: "3rem",
    },

    ".action a": {
        transition: "all 0.3s",
    },

    ".lang-info": {
        position: "fixed",
        // bottom: "-23px",
        bottom: "2%",
        left: "50%",
        transform: "translateX(-65%)",
        zIndex: "10",
        boxShadow: "0 0 10px silver",
        pointerEvents: "none",
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
        "div:nth-child(1)": {
            marginBottom: "0.3rem",
        },
        span: {
            opacity: 0.5,
        },
    },

    ".active": {
        backgroundColor: "$accent",
        ".name": { color: "black" },
    },

    ".spinner": {
        maxWidth: "40px",
        animation: `${rotate360} 0.5s linear infinite`,
        img: {
            maxWidth: "100%",
        },
    },

    "@lg": {
        ".lang-info": {
            left: "64%",
        },
        ".box": {
            gap: "3rem",
        },
    },

    "@md": {
        ".box": {
            gap: "2rem",
        },
        ".name": {
            fontSize: "1.5rem",
        },
        ".flag": {
            fontSize: "3rem",
        },
        ".action": {
            textAlign: "center",
        },
        ".lang-info": {
            display: "none",
        },
    },
});

// Get random number
const getRandomNum = (upperLimit: number): number => Math.floor(Math.random() * upperLimit);

// LANG OPTIONS
const flagOptions: { [key: string]: string[] } = {
    English: ["🇬🇧", "🇺🇸", "🇨🇦", "🇦🇺"],
    Spanish: ["🇪🇸", "🇲🇽", "🇦🇷", "🇨🇴", "🇨🇱"],
    French: ["🇫🇷", "🇨🇦", "🇨🇭", "🇧🇪"],
    Arabic: ["🇸🇦", "🇪🇬", "🇵🇸", "🇲🇦"],
    Portuguese: ["🇧🇷", "🇵🇹"],
    German: ["🇩🇪", "🇦🇹", "🇨🇭"],
};
const langs: Array<{ [key: string]: string }> = [
    { langCode: "en", langFlag: flagOptions["English"][getRandomNum(flagOptions["English"].length)], langName: "English" },
    { langCode: "zh", langFlag: "🇨🇳", langName: "Chinese" },
    { langCode: "hi", langFlag: "🇮🇳", langName: "Hindi" },
    { langCode: "es", langFlag: flagOptions["Spanish"][getRandomNum(flagOptions["Spanish"].length)], langName: "Spanish" },
    { langCode: "fr", langFlag: flagOptions["French"][getRandomNum(flagOptions["French"].length)], langName: "French" },
    { langCode: "ar", langFlag: flagOptions["Arabic"][getRandomNum(flagOptions["Arabic"].length)], langName: "Arabic" },
    { langCode: "be", langFlag: "🇧🇩", langName: "Bengali" },
    {
        langCode: "pt",
        langFlag: flagOptions["Portuguese"][getRandomNum(flagOptions["Portuguese"].length)],
        langName: "Portuguese",
    },
    { langCode: "ru", langFlag: "🇷🇺", langName: "Russian" },
    { langCode: "ur", langFlag: "🇵🇰", langName: "Urdu" },
    { langCode: "de", langFlag: flagOptions["German"][getRandomNum(flagOptions["German"].length)], langName: "German" },
    { langCode: "cz", langFlag: "🇨🇿", langName: "Czech" },
    { langCode: "is", langFlag: "🇮🇸", langName: "Icelandic" },
    { langCode: "la", langFlag: "🇻🇦", langName: "Latin" },
    { langCode: "jp", langFlag: "🇯🇵", langName: "Japanese" },
    { langCode: "sw", langFlag: "🇰🇪", langName: "Swahili" },
    { langCode: "tr", langFlag: "🇹🇷", langName: "Turkish" },
    { langCode: "it", langFlag: "🇮🇹", langName: "Italian" },
    { langCode: "pe", langFlag: "🇮🇷", langName: "Persian" },
    { langCode: "ko", langFlag: "🇰🇷", langName: "Korean" },
    // { langCode: "vi", langFlag: "🇻🇳", langName: "Vietnamese" },
    { langCode: "po", langFlag: "🇵🇱", langName: "Polish" },
    { langCode: "th", langFlag: "🇹🇭", langName: "Thai" },
    { langCode: "gr", langFlag: "🇬🇷", langName: "Greek" },
    { langCode: "he", langFlag: "🇮🇱", langName: "Hebrew" },
    { langCode: "ka", langFlag: "🇬🇪", langName: "Georgian" },
];

// MARKUP
const SelectLanguage = ({ scenario }: { scenario: string }) => {
    // 'scenario' can be either 'your-words' or 'online-session'

    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { showLangInfo, setShowLangInfo, words, setWords, setLangInPractice, setCurrentQuizCounter, isLoading } = context;

    const [langChoice, setLangChoice] = useState<string>("");
    const [languages, setLanguages] = useState<any[]>([]);

    useEffect(() => {
        // REDUCE LANG OPTIONS IF REVIEWING YOUR WORDS
        if (scenario === "your-words") {
            setWords((prev) => prev.filter((x) => x));
            const languagesAdded: string[] = [...new Set(words.filter((x) => x).map((word) => word.language.toLowerCase()))];
            setLanguages(langs.filter((langObj) => languagesAdded.includes(langObj.langName.toLowerCase())));
        } else {
            setLanguages(langs);
        }
    }, []);

    const nowPath: string = location.pathname.split("/").slice(-1).join();

    // POPUP ELEMENT
    const popupElement = showLangInfo ? (
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
    ) : null;

    // CONTENT TO SHOW
    let content = null;

    // SHOW LANG OPTIONS
    if (languages.length > 0) {
        content = (
            <div className="box">
                {/* RENDER LANG ELEMENTS */}
                {languages.map((lang: any, i: number) => (
                    <div
                        key={i}
                        className={`option ${langChoice === lang.langCode ? "active" : ""}`}
                        data-lang={lang.langCode}
                        onMouseEnter={() => setShowLangInfo(lang.langCode)}
                        onMouseLeave={() => setShowLangInfo(null)}
                        onClick={() => {
                            setLangChoice(lang.langCode);
                            setLangInPractice(
                                (langs.find((entry) => entry.langCode === lang.langCode)?.langFlag || "") +
                                    " " +
                                    (langs.find((entry) => entry.langCode === lang.langCode)?.langName || "")
                            );
                        }}
                    >
                        <span className="content">
                            <span>
                                <span className="flag">{lang.langFlag}</span>
                                <span className="name">{lang.langName}</span>
                            </span>
                        </span>
                    </div>
                ))}

                {/* BOTTOM BUTTON BOX */}
                <div className="action">
                    {/* SHOW LOADING SPINNER */}
                    {isLoading && (
                        <div className="spinner">
                            <img src={spinnerImg} alt="Loading Spinner" />
                        </div>
                    )}

                    {/* BOTTOM BUTTON */}
                    <Link
                        to={`/practise/${nowPath}/${langs
                            .find((entry) => entry.langCode === langChoice)
                            ?.langName.toLowerCase()}`}
                        onClick={() => setCurrentQuizCounter(0)}
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
        );
    }

    // SHOW THERE IS NOTHING TO PRACTICE WITH
    if (languages.length === 0 && scenario === "your-words") {
        content = <div className="message">Nothing here yet because you haven't added any words to practise.</div>;
    }

    return (
        <Container data-name="Select Language">
            <StyledSelectLanguage>
                {/* SMALL TITLE */}
                <div className="small-title">{scenario === "your-words" ? "Your Words" : "Online Session"}</div>

                {/* BIG TITLE */}
                <div className="page-title" style={{ marginBottom: "3rem" }}>
                    Select Language
                </div>

                {/* CONTENT */}
                {content}

                {/* HOVER-ACTIVATED POP-UP */}
                {popupElement}
            </StyledSelectLanguage>
        </Container>
    );
};

export default SelectLanguage;
