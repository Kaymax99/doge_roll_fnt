import { AccountData, LoginData } from "../../App";

const baseUrl = `http://localhost:8080/api/auth/`;

export const accountActions = async (data: AccountData | LoginData, endpoint: string) => {
    try {
        const res = await fetch(baseUrl + endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (res.ok) {
            if (endpoint === "register") {
                console.log("Succesfully created account!")
            } else {
                console.log("Logged in!");
                const data = await res.json();
                return data
            }
        }
    } catch (error) {
        console.log("FATAL ERROR: ", error)
    }
}