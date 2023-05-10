import { Outlet } from "react-router-dom";
import { CustomNavbar } from "../CustomNavbar";

export const WithNavbar = () => {
    return (
      <>
        <CustomNavbar/>
        <Outlet />
      </>
    );
  };