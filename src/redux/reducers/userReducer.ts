import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAccountData, IUserData } from "../../App";

export const LOG_IN = "LOG_IN"

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
        default:
            return state;
    }
}