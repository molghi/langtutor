// lingvanex -- translate strings

async function fetchTranslation(word: string, langCode: string) {
    if (!word) return "";
    try {
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: import.meta.env.VITE_LINGVANEX_API_KEY,
            },
            body: JSON.stringify({ platform: "api", data: word, from: "en_GB", to: langCode, enableTransliteration: true }),
        };

        const res = await fetch("https://api-b2b.backenster.com/b1/api/v3/translate", options);
        if (!res.ok) throw new Error(`💥💥💥 Something failed... Word: ${word}. LangCode: ${langCode}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default fetchTranslation;
