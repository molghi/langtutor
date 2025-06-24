import { globalStyles } from "./components/styled/global";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import BottomActions from "./components/BottomActions";
import AddOne from "./components/AddOne";
import AddMany from "./components/AddMany";
import SelectMode from "./components/SelectMode";
import SelectLanguage from "./components/SelectLanguage";
import MyContext from "./context/MyContext";
import { useContext, useEffect } from "react";
import Notification from "./components/Notification";
import Rounds from "./components/Rounds";
import Results from "./components/Results";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import Again from "./components/Again";

globalStyles();

function App() {
    const context = useContext(MyContext);
    if (!context) throw new Error("Error using context");
    const { uiMessage, setUiMessage, localStorageAccentColorKey, setWords, localStorageKey, langInPractice } = context;

    useEffect(() => {
        // Hide Notification after 5 sec
        if (uiMessage !== "") {
            const msgReset = () => setUiMessage("");
            const time = uiMessage.split(" ")[0] === "success" ? 6000 : 12000;
            const timer = setTimeout(msgReset, time);
            return () => clearTimeout(timer);
        }
    });

    useEffect(() => {
        // Check and set accent color
        const colorFromLS = localStorage.getItem(localStorageAccentColorKey);
        if (!colorFromLS) {
            localStorage.setItem(localStorageAccentColorKey, "green");
            document.documentElement.style.setProperty("--colors-accent", "green");
        } else {
            document.documentElement.style.setProperty("--colors-accent", colorFromLS);
        }
    }, []);

    useEffect(() => {
        // Get saved words into piece of state
        const wordsFromLS = localStorage.getItem(localStorageKey);
        setWords(JSON.parse(wordsFromLS || "[]"));
    }, []);

    return (
        <>
            <BrowserRouter>
                <div className="app">
                    <Header />
                    <Routes>
                        <Route index element={<Welcome />} />
                        <Route path="/add-one" element={<AddOne />} />
                        <Route path="/add-many" element={<AddMany />} />
                        <Route path="/practise" element={<SelectMode />} />
                        <Route path="/practise/online-session" element={<SelectLanguage scenario="online-session" />} />
                        <Route path="/practise/online-session/:lang" element={<Rounds />} />
                        <Route path="/practise/results" element={<Results />} />
                        <Route path="/practise/your-words" element={<SelectLanguage scenario="your-words" />} />
                        <Route path="/practise/your-words/:lang" element={<Rounds />} />
                        <Route path="/practise/again" element={<Again />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
                <BottomActions />
                {uiMessage !== "" && <Notification message={uiMessage} />}
            </BrowserRouter>
        </>
    );
}

export default App;
