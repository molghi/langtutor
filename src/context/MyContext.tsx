import { createContext, ReactNode, useState } from "react";

interface ContextTypes {
    showLangInfo: string | null;
    setShowLangInfo: React.Dispatch<React.SetStateAction<string | null>>;
    localStorageKey: string;
    localStorageAccentColorKey: string;
    uiMessage: string;
    setUiMessage: React.Dispatch<React.SetStateAction<string>>;
    words: any[];
    setWords: React.Dispatch<React.SetStateAction<any[]>>;
}

const MyContext = createContext<ContextTypes | undefined>(undefined);

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const localStorageKey: string = "langtutor_user_words";
    const localStorageAccentColorKey: string = "langtutor_accent_color";

    const wordsFromLS = localStorage.getItem(localStorageKey);

    const [showLangInfo, setShowLangInfo] = useState<string | null>(null);
    const [uiMessage, setUiMessage] = useState<string>("");
    const [words, setWords] = useState<any[]>(JSON.parse(wordsFromLS || "[]"));

    return (
        <MyContext.Provider
            value={{
                showLangInfo,
                setShowLangInfo,
                localStorageKey,
                uiMessage,
                setUiMessage,
                localStorageAccentColorKey,
                words,
                setWords,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
