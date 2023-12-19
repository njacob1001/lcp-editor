import { Outlet } from "react-router-dom";
import { SideMenu } from "@/components/templates/side-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/atoms/ui/avatar";
import { SearchButton } from "@/components/molecules/search-button";

export const Controls = () => {
  return (
    <div className="grid grid-areas-app-layout grid-rows-app-layout grid-cols-app-layout gap-3 p-3 grow">
      <Outlet />
      <div className="grid-in-app-header flex gap-2">
        <SearchButton />
        <Avatar className="w-9 h-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <nav className="grid-in-menu flex flex-col">
        <div className="h-10 flex items-center">
          <h2 className="px-4 text-lg font-semibold tracking-tight">SURA</h2>
        </div>
        <SideMenu />
      </nav>
    </div>
  );
};
