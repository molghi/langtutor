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
    langInPractice: string;
    setLangInPractice: React.Dispatch<React.SetStateAction<string>>;
    currentQuizData: any[];
    setCurrentQuizData: React.Dispatch<React.SetStateAction<any[]>>;
    currentQuizCounter: number;
    setCurrentQuizCounter: React.Dispatch<React.SetStateAction<number>>;
    answers: any[];
    setAnswers: React.Dispatch<React.SetStateAction<any[]>>;
    isFinished: boolean;
    setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
    selectedMode: string;
    setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isFirstRender: boolean;
    setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
    lastPracticed: number;
    setLastPracticed: React.Dispatch<React.SetStateAction<number>>;
    localStorageLastPractised: string;
}

const MyContext = createContext<ContextTypes | undefined>(undefined);

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const localStorageKey: string = "langtutor_user_words";
    const localStorageAccentColorKey: string = "langtutor_accent_color";
    const localStorageLastPractised: string = "langtutor_last_practised";

    const lastPractisedFromLS = localStorage.getItem(localStorageLastPractised);

    const wordsFromLS = localStorage.getItem(localStorageKey);

    const [showLangInfo, setShowLangInfo] = useState<string | null>(null);
    const [uiMessage, setUiMessage] = useState<string>("");
    const [words, setWords] = useState<any[]>(JSON.parse(wordsFromLS || "[]"));
    const [langInPractice, setLangInPractice] = useState<string>("");
    const [currentQuizData, setCurrentQuizData] = useState<any[]>([]);
    const [currentQuizCounter, setCurrentQuizCounter] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [selectedMode, setSelectedMode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
    const [lastPracticed, setLastPracticed] = useState<number>(lastPractisedFromLS ? +lastPractisedFromLS : -1);

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
                langInPractice,
                setLangInPractice,
                currentQuizData,
                setCurrentQuizData,
                currentQuizCounter,
                setCurrentQuizCounter,
                answers,
                setAnswers,
                isFinished,
                setIsFinished,
                selectedMode,
                setSelectedMode,
                isLoading,
                setIsLoading,
                isFirstRender,
                setIsFirstRender,
                lastPracticed,
                setLastPracticed,
                localStorageLastPractised,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
