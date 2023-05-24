import { Outlet } from "react-router-dom";

export const WithoutNavbarAndFooter = () => {
    return (
        <div className="blurredGameBg">
            <Outlet />
        </div>
    );
  };