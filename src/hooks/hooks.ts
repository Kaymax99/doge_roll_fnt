import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { v4 as uuidv4 } from 'uuid';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const padTo2Digits = (num: string) => {
    return num.toString().padStart(2, '0');
  }
  
export const formatDate = (date: Date) => {
    return [
        padTo2Digits(date.toString().slice(8)),
        padTo2Digits(date.toString().slice(5, 7)),
        padTo2Digits(date.toString().slice(0, 4)),
    ].join('/');
}

export const genTokenId = () => {
    const uuid = uuidv4();
    return uuid;
}