import { INewCampaign } from "../../components/MyGames";
import DnDCharacter from "../../components/characterSheet/DnDCharacter";

export const baseUrl = "http://localhost:8080/"
export const fetchContent = async (endpoint: string) => {
    try {
        const res = await fetch(baseUrl + endpoint, {
            method: "GET",
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJicmluazkyM0Bob3RtYWlsLml0IiwiaWF0IjoxNjg0NzU1OTk0LCJleHAiOjE2ODUzNjA3OTR9._3CNnoFSFhbac5M35PpoLgyQ1_Ec92K3fpkOa-0D0PHkJnP124wExuAs7L2JvGBp",
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
export const createUpdate = async (endpoint: string | undefined, type: string, body:DnDCharacter | INewCampaign, callbackFn: () => Promise<void>) => {
    try {
        const res = await fetch(baseUrl + endpoint, {
            method: type,
            body: JSON.stringify(body),
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJicmluazkyM0Bob3RtYWlsLml0IiwiaWF0IjoxNjg0NzU1OTk0LCJleHAiOjE2ODUzNjA3OTR9._3CNnoFSFhbac5M35PpoLgyQ1_Ec92K3fpkOa-0D0PHkJnP124wExuAs7L2JvGBp",
                "Content-Type": "application/json",
            }
        });
        if (res.ok) {
            console.log("operation successfull")
            callbackFn();
        } else {
            console.log("Res not OK.", res.status)
        }
        
    } catch (error) {
        console.log("FATAL ERROR: ", error)
    }
}