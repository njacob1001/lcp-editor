import { Button } from "@/components/atoms/ui/button";
import { Database } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const SideMenu = () => {
  const { pathname } = useLocation();

  return (
    <div className="space-y-4">
      <div className="py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Modules
        </h2>

        <div className="space-y-1">
          <Button
            asChild
            variant={
              pathname.startsWith("/datamodel/finder") ? "secondary" : "ghost"
            }
            className="w-full justify-start"
          >
            <Link to="/datamodel/finder">
              <Database className="mr-2 h-4 w-4" />
              Datamodel
            </Link>
          </Button>
        </div>
      </div>

      {/* <div className="py-2">
      <h2 className="relative px-7 text-lg font-semibold tracking-tight">
        Playlists
      </h2>
      <ScrollArea className="h-[300px] px-1"></ScrollArea>
    </div> */}
    </div>
  );
};
