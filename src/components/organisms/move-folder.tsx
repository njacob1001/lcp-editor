import { api } from "@/__generated__/web-api";
import { Tree } from "@/components/atoms/three";
import { Button } from "@/components/atoms/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Folder, LucideIcon, Workflow } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (folderId: string) => void;
};

type TreeDataItem = {
  id: string;
  name: string;
  icon?: LucideIcon;
  children?: TreeDataItem[];
};

type InputDataItem = {
  id: string;
  directory: string;
  name: string;
};

function transformData(
  inputData: InputDataItem[],
  initialPath = "",
  _original?: InputDataItem[]
): TreeDataItem[] {
  const original = _original || inputData;
  const groups = Object.groupBy(
    original,
    (item: InputDataItem) => item.directory
  ) as Record<string, InputDataItem[]>;
  const result: TreeDataItem[] = [];
  const keys = Object.keys(groups);

  groups[initialPath]?.forEach((item) => {
    const folder: TreeDataItem = {
      id: item.id,
      name: item.name,
    };

    const carry = initialPath
      ? `${initialPath}/${item.name.replace(/\s/g, "_")}`
      : item.name.replace(/\s/g, "_");

    if (keys.includes(carry)) {
      const carriedPath = initialPath
        ? `${initialPath}/${item.name.replace(/\s/g, "_")}`
        : item.name.replace(/\s/g, "_");

      folder.children = transformData(groups[item.name], carriedPath, original);
    }

    if (!folder.children?.length) {
      folder.icon = Folder;
    }
    result.push(folder);
  });
  return result;
}

const Content = ({ onOpenChange, onSubmit }: Props) => {
  const { finderId = "" } = useParams();
  const [selected, setSelected] = useState<TreeDataItem | undefined>(undefined);
  const { data = [] } = useQuery({
    queryKey: ["folders"],
    queryFn: () => api.getFinderfolders(),
  });

  const correctedData = data?.filter((item) => item.id !== finderId);
  const filtered = transformData(correctedData as InputDataItem[]);

  const handleClick = () => {
    onSubmit(selected?.id ?? "");
    onOpenChange(false);
    setSelected(undefined);
  };
  const submitText = selected ? `Move to ${selected?.name}` : "Move to home";
  return (
    <>
      <DialogHeader>
        <DialogTitle>Move element</DialogTitle>
        <DialogDescription>
          Select the folder you would like to move this element to.
        </DialogDescription>
      </DialogHeader>

      <div className="flex min-h-full space-x-2">
        <Tree
          data={filtered}
          className="flex-shrink-0 w-full h-[260px] border rounded-md"
          initialSlelectedItemId="f12"
          onSelectChange={setSelected}
          folderIcon={Folder}
          itemIcon={Workflow}
        />
      </div>

      <DialogFooter>
        <Button
          onClick={handleClick}
          className="max-w-60"
          type="submit"
          title={submitText}
        >
          <span className="overflow-hidden text-left text-ellipsis whitespace-nowrap">
            {submitText}
          </span>
        </Button>
      </DialogFooter>
    </>
  );
};

export const MoveFolder = ({ isOpen, onOpenChange, onSubmit }: Props) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-[425px]">
      <Content
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    </DialogContent>
  </Dialog>
);
