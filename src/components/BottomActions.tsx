import MyContext from "../context/MyContext";
import { useContext, useRef } from "react";
import { styled } from "../../stitches.config";
import changeUiColor from "../utils/changeUiColor";
import exportWords from "../utils/export";
import { importWords, processInput } from "../utils/import";

// STYLES
const StyledBottomActions = styled("div", {
    ".wrapper": {
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
    },

    ".inner": {
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        color: "$accent",
        "&:hover": {
            ".menu": {
                opacity: 1,
                visibility: "visible",
            },
        },
    },

    ".icon-btn": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "25px",
        height: "25px",
        borderRadius: "50%",
        backgroundColor: "$accent",
        cursor: "pointer",
        opacity: "0.3",
        "&:hover": {
            opacity: 1,
        },
    },

    svg: {
        width: "1.8rem",
    },

    ".menu": {
        position: "absolute",
        bottom: "109%",
        left: "-2px",
        opacity: "0",
        visibility: "hidden",
        padding: "0.5rem",
        transition: "all 0.3s",
        backgroundColor: "black",
        border: "1px solid",
        // borderColor: "$accent",
        borderColor: "#333",
    },

    ".action": {
        cursor: "pointer",
        padding: "3px 5px",
        fontSize: "1.4rem",
        whiteSpace: "nowrap",
        "&:hover": {
            backgroundColor: "$accent",
            color: "black",
        },
        "&:active": {
            opacity: 0.6,
        },
    },

    ".importer": {
        display: "none",
    },

    "@lg": {
        ".action": {
            padding: "10px 15px",
        },
        ".menu": {
            bottom: "112%",
        },
    },
});

// POSSIBLE ACTIONS TO SHOW
const actions: Array<{ [key: string]: string }> = [
    { name: "Change color", title: "Change the accent color of the interface" },
    { name: "Export", title: "Export as JSON" },
    { name: "Import", title: "Import as JSON" },
];

// MARKUP
const BottomActions = () => {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { localStorageAccentColorKey, localStorageKey, setUiMessage, words, setWords } = context;

    // Importer element reference
    const importerEl = useRef<HTMLInputElement | null>(null);

    // Perform action
    const performAction = (actionName: string): void => {
        if (actionName === "Change color") {
            changeUiColor(localStorageAccentColorKey);
        }
        if (actionName === "Export") {
            const data = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
            exportWords(data);
        }
        if (actionName === "Import") {
            importWords(importerEl);
        }
    };

    return (
        <StyledBottomActions data-name="Bottom Actions">
            <div className="wrapper">
                <div className="inner">
                    <div className="icon-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"></path>
                        </svg>
                    </div>

                    <div className="menu">
                        {/* RENDER ACTIONS */}
                        {actions.map((x: any, i: number) => (
                            <div key={i} className="action" title={x.title} onClick={() => performAction(x.name)}>
                                {x.name}
                            </div>
                        ))}

                        {/* INPUT FOR IMPORT */}
                        <input
                            ref={importerEl}
                            className="importer"
                            type="file"
                            accept=".json"
                            onChange={(e) => processInput(e, setUiMessage, importerEl, words, setWords, localStorageKey)}
                        />
                    </div>
                </div>
            </div>
        </StyledBottomActions>
    );
};

export default BottomActions;
