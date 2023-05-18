import DnDCharacter from "../../components/characterSheet/DnDCharacter";

export const baseUrl = "http://localhost:8080/characters"
export const fetchCharacters = async (endpoint: string) => {
    try {
        const res = await fetch(baseUrl + endpoint, {
            method: "GET",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJicmluazkyM0Bob3RtYWlsLml0IiwiaWF0IjoxNjg0MzIwNDA3LCJleHAiOjE2ODQ5MjUyMDd9.Jb1BDZBIwDJ_4Sgy_7U2ESZGoF4bspJ-os_zQFYLp8z0ySY3i_FpFkG_h4UGfs67",
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
export const createUpdateChar = async (endpoint: string | undefined, type: string ,character:DnDCharacter, callbackFn: () => Promise<void>) => {
    try {
        const res = await fetch(baseUrl + endpoint, {
            method: type,
            body: JSON.stringify(character),
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJicmluazkyM0Bob3RtYWlsLml0IiwiaWF0IjoxNjg0MzIwNDA3LCJleHAiOjE2ODQ5MjUyMDd9.Jb1BDZBIwDJ_4Sgy_7U2ESZGoF4bspJ-os_zQFYLp8z0ySY3i_FpFkG_h4UGfs67",
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