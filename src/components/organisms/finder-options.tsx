import { api } from "@/__generated__/web-api";
import { Button } from "@/components/atoms/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChevronRightIcon,
  FolderPlus,
  Plus,
  TextCursorInput,
  Trash2,
} from "lucide-react";
import { useParams } from "react-router-dom";

const actions = {
  createFolder: api.postFinder,
  createModule: api.postFinder,
  rename: api.putFinderrename,
  delete: api.deleteFinderFinderId,
};

type ActionType = keyof typeof actions;

type Props = {
  onBackNavigation: () => void;
  name: string;
};

export const FinderOptions = ({ onBackNavigation, name }: Props) => {
  const { moduleType, finderId = "" } = useParams();
  const handleMutation = async (actionType: ActionType) => {
    if (actionType === "delete") {
      await actions.delete(undefined, { params: { finderId } });
      onBackNavigation();
      return;
    }

    if (actionType === "createFolder") {
      const name = prompt("Name") || "";
      await actions.createModule({
        isFolder: true,
        moduleType,
        currentFinderId: finderId,
        name,
      });
      return;
    }

    if (actionType === "createModule") {
      const name = prompt("Name") || "";
      await actions.createModule({
        isFolder: false,
        moduleType,
        currentFinderId: finderId,
        name,
      });
      return;
    }

    if (actionType === "rename") {
      const newName = prompt("New name") || "";

      await actions.rename({
        finderId,
        newName,
      });
      return;
    }
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handleMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [{ moduleType, finderId }],
      });
      queryClient.refetchQueries({
        queryKey: [{ moduleType, finderId }],
      });
    },
  });

  const handleClick = (actionType: ActionType) => () => {
    mutate(actionType);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <div className="overflow-hidden text-left text-ellipsis whitespace-nowrap min-w-[7rem] max-w-[14rem] capitalize">
            {name}
          </div>

          <ChevronRightIcon className="ml-2" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right" sideOffset={8}>
        <DropdownMenuItem onClick={handleClick("createModule")}>
          <Plus className="mr-2 h-5 w-5" />
          Create
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleClick("createFolder")}>
          <FolderPlus className="mr-2 h-5 w-5" />
          Folder
        </DropdownMenuItem>
        {Boolean(finderId) && (
          <>
            <DropdownMenuItem onClick={handleClick("rename")}>
              <TextCursorInput className="mr-2 h-5 w-5" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleClick("delete")}>
              <Trash2 className="mr-2 h-5 w-5" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
