import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function padTo2Digits(num: string) {
    return num.toString().padStart(2, '0');
  }
  
export function formatDate(date: Date) {
    return [
        padTo2Digits(date.toString().slice(8)),
        padTo2Digits(date.toString().slice(5, 7)),
        padTo2Digits(date.toString().slice(0, 4)),
    ].join('/');
}