import DnDCharacter from "../components/characterSheet/DnDCharacter";

export interface ICampaignDetails {
    name: string,
    nextSession: string,
    image: string,
    description: string,
}

export interface INewCampaign {
    name: string,
    username: string | undefined
}

export interface IAccountData {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
}
  
export interface IUserData {
    name: string;
    surname: string;
    username: string;
    email: string;
    profilePic: string;
    registration_date: Date;
    accessToken: string;
}

export type LoginData = {
    username: string;
    password: string;
}

export interface GameCardProps {
    game: {
        id: number,
        name: string,
        nextSession: Date,
        image: string,
    }
}

export interface IMiniCardProps {
    user: IUserData | null
}

export interface CharCardProps {
    character: DnDCharacter;
    updateChars: () => Promise<void>;
    classes?: string;
}