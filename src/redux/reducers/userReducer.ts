import { PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "../../types/Interfaces";

export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"

export interface UserState {
    content: IUserData | null;
}

const initialState: UserState = {
    content: null,
}

export const userReducer = (
    state: UserState = initialState,
    action: PayloadAction<IUserData>
     ) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                content: action.payload,
            }
        case LOG_OUT:
            return initialState
        default:
            return state;

    }
}