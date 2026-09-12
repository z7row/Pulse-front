import { getmeProfile } from "./api/myprofile";
import Cookies from "js-cookie";
export async function Getcoockies() {
    const token = Cookies.get("access_token");
    if (token) {
        const data = await getmeProfile();
        // console.log("data me profile", data)
        return data;
    }

}