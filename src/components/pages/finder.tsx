import { Button } from "@/components/atoms/ui/button";
import { ScrollArea } from "@/components/atoms/ui/scroll-area";
import { FinderOptions } from "@/components/organisms/finder-options";
import { ArrowLeftIcon } from "lucide-react";
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
        <FinderOptions />
      </div>
      <div className="grid-in-content flex">
        <ScrollArea className="border rounded-lg grow"></ScrollArea>
      </div>
    </>
  );
};
