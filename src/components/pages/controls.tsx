import { Outlet } from "react-router-dom";
import { SideMenu } from "@/components/templates/side-menu";

export const Controls = () => {
  return (
    <div className="grid grid-areas-app-layout grid-rows-app-layout grid-cols-app-layout">
      <Outlet />

      <SideMenu />
    </div>
  );
};
