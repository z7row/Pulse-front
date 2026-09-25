import { getusersprofile } from "./api/profile";


export type profile = {
    _id: string;
    name: string;
    pio: string;
    email: string;
    profilephoto: string;
    banner: string;
    data: any;
    goal: string;
};

export { getusersprofile };