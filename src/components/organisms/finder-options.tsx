import { Button } from "@/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/ui/dropdown-menu";
import { ChevronRightIcon, Database } from "lucide-react";

export const FinderOptions = () => (
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
);
