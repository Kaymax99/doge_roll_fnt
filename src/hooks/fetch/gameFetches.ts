import DnDCharacter from "../../components/characterSheet/DnDCharacter";
import { INewCampaign, tokenDB } from "../../types/Interfaces";

export const baseUrl = "http://localhost:8080/"
export const getDeleteContent = async (endpoint: string, type: string, token: string) => {
    try {
        const res = await fetch(baseUrl + endpoint, {
            method: type,
            headers: {
                Authorization: token,
            }
        })
        if (res.ok && type === "GET") {
            const data = await res.json();
            return data;
        } else if (res.ok) {
            const data = res;
            return data;
        } else {
            console.log("Res not OK.", res.status)
        }
    } catch (error) {
        console.log("FATAL ERROR: ", error)
    }
}
export const createUpdate = async (endpoint: string | undefined, type: string, body: DnDCharacter | INewCampaign | { tokens: tokenDB[]; maps: fabric.Object[]; },  token: string, callbackFn?: () => Promise<void>) => {
    try {
        const res = await fetch(baseUrl + endpoint, {
            method: type,
            body: JSON.stringify(body),
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            }
        });
        if (res.ok && callbackFn) {
            callbackFn();
        } else if (!res.ok) {
            console.log("Res not OK.", res.status)
        }
        
    } catch (error) {
        console.log("FATAL ERROR: ", error)
    }
}
/* export const saveOnUnload = (body) => {
    console.log("nice")
    const blolb = new Blob([JSON.stringify({body: body})], {type : "", })
    navigator.sendBeacon()
} */
/* export const saveTokens = async (endpoint: string | undefined, body:{ tokens: fabric.Object[]; maps: fabric.Object[]; }) => {
    try {
        const res = await fetch(baseUrl + endpoint), {
            method: "POST",
            body: JSON.stringify()
        }
    } catch (error) {
        console.log(error)
    }
} */