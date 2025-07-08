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
    sessionsToday: number;
    setSessionsToday: React.Dispatch<React.SetStateAction<number>>;
    localStorageSessionsToday: string;
}

const MyContext = createContext<ContextTypes | undefined>(undefined);

interface ContextProviderProps {
    children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const localStorageKey: string = "langtutor_user_words";
    const localStorageAccentColorKey: string = "langtutor_accent_color";
    const localStorageLastPractised: string = "langtutor_last_practised";
    const localStorageSessionsToday: string = "langtutor_sessions_today";

    const lastPractisedFromLS = localStorage.getItem(localStorageLastPractised);
    const sessionsTodayFromLS = localStorage.getItem(localStorageSessionsToday);
    const wordsFromLS = localStorage.getItem(localStorageKey);

    const [showLangInfo, setShowLangInfo] = useState<string | null>(null); // popup content in Select Languages
    const [uiMessage, setUiMessage] = useState<string>(""); // for UI msg
    const [words, setWords] = useState<any[]>(JSON.parse(wordsFromLS || "[]")); // all user words
    const [langInPractice, setLangInPractice] = useState<string>(""); // what language practising
    const [currentQuizData, setCurrentQuizData] = useState<any[]>([]); // array of current quiz data
    const [currentQuizCounter, setCurrentQuizCounter] = useState<number>(0); // current quiz counter
    const [answers, setAnswers] = useState<string[]>([]); // array of user answers
    const [isFinished, setIsFinished] = useState<boolean>(false); // is quiz finished?
    const [selectedMode, setSelectedMode] = useState<string>(""); // one of the 3 modes available
    const [isLoading, setIsLoading] = useState<boolean>(false); // for loading spinner
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true); // for Welcome component to show greeting screen upon page load
    const [lastPracticed, setLastPracticed] = useState<number>(lastPractisedFromLS ? +lastPractisedFromLS : -1); // timestamp when last practised
    const [sessionsToday, setSessionsToday] = useState<number>(sessionsTodayFromLS ? +sessionsTodayFromLS : 0); // how many sessions played today

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
                sessionsToday,
                setSessionsToday,
                localStorageSessionsToday,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
