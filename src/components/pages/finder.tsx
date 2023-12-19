import { Button } from "@/components/atoms/ui/button";
import { ScrollArea } from "@/components/atoms/ui/scroll-area";
import { FinderOptions } from "@/components/organisms/finder-options";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, Folder, Shapes } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "@/__generated__/web-api";

export const Finder = () => {
  const { moduleType = "", finderId = "" } = useParams();
  const { data } = useQuery({
    queryKey: [{ moduleType, finderId }],
    queryFn: () =>
      api.getFinderModuleType({
        params: { moduleType },
        queries: { finderId },
      }),
  });

  const navigate = useNavigate();

  const handleBackNavigation = () => {
    if (!data?.previous) return;

    navigate(`/${moduleType}/finder/${data?.previous?.url}`);
  };

  return (
    <>
      <div className="grid-in-content-header flex gap-2">
        {data?.previous && (
          <Button variant="outline" asChild>
            <Link
              to={`/${moduleType}/finder/${data?.previous?.url}`}
              title={data?.previous?.label}
            >
              <ArrowLeftIcon size={19} />
            </Link>
          </Button>
        )}
        <FinderOptions
          name={data?.name || moduleType}
          onBackNavigation={handleBackNavigation}
        />
      </div>
      <div className="grid-in-content flex">
        <ScrollArea className="border rounded-lg grow">
          <ul className="grid grid-cols-finder gap-3 my-5">
            {data?.elements?.map((item) => (
              <li key={item.id} className="h-24 overflow-hidden">
                <Link to={`/datamodel/finder/${item.id}`}>
                  <div className="flex flex-col items-center">
                    {item.elementType === "folder" ? (
                      <Folder className=" h-11 w-11" strokeWidth="1px" />
                    ) : (
                      <Shapes className=" h-11 w-11" strokeWidth="1px" />
                    )}
                    <span className="text-center mx-3 capitalize">
                      {item.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </>
  );
};
