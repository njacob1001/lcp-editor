import { api } from "@/__generated__/web-api";
import { Button } from "@/components/atoms/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/atoms/ui/dropdown-menu";
import { ScrollArea } from "@/components/atoms/ui/scroll-area";
import { FinderOptions } from "@/components/organisms/options-finder";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, DatabaseZap, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditorDataModel = () => {
  const { finderId = "", moduleType = "" } = useParams();
  const navigate = useNavigate();

  const handleFetch = async () => {
    const { finder, previous } = await api.getFinderfindByIdFinderId({
      params: { finderId },
    });

    const data = await api.getDatamodelId({
      params: { id: finder?.elementId || "" },
    });

    return { editor: data, previous: previous };
  };

  const { data } = useQuery({
    queryKey: [moduleType, finderId],
    queryFn: handleFetch,
  });

  const previousLink = `/${moduleType}/finder/${data?.previous?.id || ""}`;
  const previousName = data?.previous?.name
    ? `Back to ${data?.previous?.name}`
    : "Back to home";

  const handleBackNavigation = () => {
    navigate(previousLink);
  };

  return (
    <>
      <div className="grid-in-content-header flex gap-2">
        <Button variant="outline" asChild>
          <Link to={previousLink} title={previousName}>
            <ArrowLeftIcon size={19} />
          </Link>
        </Button>
        <FinderOptions
          disableCreation
          name={data?.editor?.name || ""}
          onBackNavigation={handleBackNavigation}
        >
          <DropdownMenuItem onClick={() => {}}>
            <Save className="mr-2 h-5 w-5" />
            Save
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
            <DatabaseZap className="mr-2 h-5 w-5" />
            Deploy
            <DropdownMenuShortcut className="ml-6">⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </FinderOptions>
      </div>
      <div className="grid-in-content flex">
        <ScrollArea className="border rounded-lg grow">editor</ScrollArea>
      </div>
    </>
  );
};
