import DnDCharacter from "../components/characterSheet/DnDCharacter";

export const MAP_LAYER = "map"
export const TOKEN_LAYER = "token"

export interface ICampaignDetails {
    name: string,
    nextSession: string,
    image: string,
    description: string,
}

export interface INewCampaign {
    name: string,
    id: number | undefined
}

export interface IAccountData {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
}
  
export interface IUserData {
    id?: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    profilePic: string;
    registration_date?: Date;
    accessToken?: string;
    bio: string;
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
    Cssclasses?: string;
}

export interface tokenDB {
    id?: string,
    layer?: string,
    currentSrc?: string,
    width?: number,
    height?: number,
    leftValue?: number,
    topValue?: number,
    scaleX?: number,
    scaleY?: number,
    angle?: number,
}

export interface ICoords {
    x: number | undefined,
    y: number | undefined
}
export interface INewTokenData {
    url?: string | null,
}

