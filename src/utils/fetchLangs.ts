// lingvanex -- fetch the list of the langs this api supports

async function fetchLangs() {
    try {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: import.meta.env.VITE_LINGVANEX_API_KEY,
            },
        };

        const res = await fetch("https://api-b2b.backenster.com/b1/api/v3/getLanguages?platform=api&code=en_GB", options);
        if (!res.ok) throw new Error("💥💥💥 Something failed...");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export default fetchLangs;
