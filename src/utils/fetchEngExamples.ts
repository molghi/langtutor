// https://dictionaryapi.dev/ -- fetch examples in English

async function fetchEngExamples(word: string) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);

        // if (!res.ok) throw new Error("💥💥💥 Something failed...");
        if (!res.ok) return "";

        const data = await res.json();

        const result: any[] = data
            .map((x: any) => x.meanings.map((y: any) => y.definitions.filter((z: any) => z.example)))
            .flat(2)
            .map((x: any) => x.example); // filtering only those items that have examples, then flattening it and returning only example strings

        const getRandomNum = (upperLimit: number): number => Math.floor(Math.random() * upperLimit);

        return result.length > 0 ? result[getRandomNum(result.length)] : "";
    } catch (error) {
        console.error(error);
    }
}

export default fetchEngExamples;
