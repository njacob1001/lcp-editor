import { Outlet } from "react-router-dom";
import { SideMenu } from "@/components/templates/side-menu";

export const Controls = () => {
  return (
    <div className="grid grid-areas-app-layout grid-rows-app-layout grid-cols-app-layout">
      <Outlet />
      <div className="grid-in-app-header flex">hello</div>

      <nav className="grid-in-menu flex flex-col">
        <h2 className="px-7 pt-3 text-lg font-semibold tracking-tight">SURA</h2>
        <SideMenu />
      </nav>
    </div>
  );
};
