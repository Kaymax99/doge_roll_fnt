import { Outlet } from "react-router-dom";
import { CustomNavbar } from "../CustomNavbar";
import { CustomFooter } from "../CustomFooter";

export const WithNavbarAndFooter = () => {
    return (
      <>
        <CustomNavbar/>
        <div className="blurredBg">
          <Outlet />
          <CustomFooter/>
        </div>
      </>
    );
  };