import DnDCharacter from "../../components/characterSheet/DnDCharacter";

export const baseUrl = "http://localhost:8080/characters"
export const fetchCharacters = async (endpoint: string) => {
    try {
        const res = await fetch(baseUrl + endpoint, {
            method: "GET",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJicmluazkyM0Bob3RtYWlsLml0IiwiaWF0IjoxNjgzNjY5MjQwLCJleHAiOjE2ODQyNzQwNDB9.l_2wjcfICnGs8x8YA-IoJvVNgfG7-auMVNor2xxKvTyRMPdXfuAHGJapIyH-G5f4",
            }
        })
        if (res.ok) {
            const charactersArray = await res.json();
            return charactersArray;
        } else {
            console.log("Res not OK.", res.status)
        }
    } catch (error) {
        console.log("FATAL ERROR: ", error)
    }
}
export const createCharacter = async (endpoint: string, character:DnDCharacter, callbackFn: () => Promise<void>) => {
    try {
        const res = await fetch(baseUrl + endpoint, {
            method: "POST",
            body: JSON.stringify(character),
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJicmluazkyM0Bob3RtYWlsLml0IiwiaWF0IjoxNjgzNjY5MjQwLCJleHAiOjE2ODQyNzQwNDB9.l_2wjcfICnGs8x8YA-IoJvVNgfG7-auMVNor2xxKvTyRMPdXfuAHGJapIyH-G5f4",
                "Content-Type": "application/json",
            }
        });
        if (res.ok) {
            console.log("successfully created")
            callbackFn();
        } else {
            console.log("Res not OK.", res.status)
        }
        
    } catch (error) {
        console.log("FATAL ERROR: ", error)
    }
}