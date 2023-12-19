import { Button } from "@/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/ui/dropdown-menu";
import { ScrollArea } from "@/components/atoms/ui/scroll-area";
import { ArrowLeftIcon, ChevronRightIcon, Database } from "lucide-react";
import { Link } from "react-router-dom";

export const Finder = () => {
  return (
    <>
      <div className="grid-in-content-header flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/">
            <ArrowLeftIcon size={19} />
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <div className="overflow-hidden text-left text-ellipsis whitespace-nowrap min-w-[7rem] max-w-[14rem]">
                Testing
              </div>

              <ChevronRightIcon className="ml-2" size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right" sideOffset={8}>
            <DropdownMenuItem>
              <Database className="mr-2 h-4 w-4" />
              Test
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid-in-content flex">
        <ScrollArea className="border rounded-lg grow"></ScrollArea>
      </div>
    </>
  );
};
