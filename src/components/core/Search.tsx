import Fuse, { type FuseResult, type IFuseOptions } from "fuse.js";
import { useState, useMemo, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Search as SearchIcon } from "lucide-react";

import { capitalizeFirstLetter } from "@/lib/utils";

// Shape of each entry in /search-index.json (built by src/pages/search-index.json.ts)
type SearchDoc = {
  slug: string;
  title: string;
  description: string;
  tags: string;
  headers: string;
  body: string;
};

const options: IFuseOptions<SearchDoc> = {
  includeScore: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  includeMatches: true,
  minMatchCharLength: 2,
  useExtendedSearch: true,
  findAllMatches: true,
  keys: [
    { name: "slug", weight: 2.5 },
    { name: "title", weight: 2 },
    { name: "headers", weight: 2 },
    { name: "description", weight: 1.75 },
    { name: "tags", weight: 1.5 },
    { name: "body", weight: 1 },
  ],
};

export function Search() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);

  // Load the index the first time the dialog opens, not on every page load
  useEffect(() => {
    if (!open || docs) return;
    fetch("/search-index.json")
      .then((res) => res.json())
      .then(setDocs)
      .catch(() => setDocs([]));
  }, [open, docs]);

  const fuse: Fuse<SearchDoc> = useMemo(
    () => new Fuse(docs ?? [], options),
    [docs],
  );
  const results: FuseResult<SearchDoc>[] = useMemo(
    () => fuse.search(searchValue),
    [fuse, searchValue],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <SearchIcon className="w-[1.2rem] h-[1.2rem]" />
          </Button>
        </DialogTrigger>
        <DialogContent className="md:h-1/2 md:mx-0 w-full h-full">
          <DialogHeader>
            <DialogTitle hidden={true}>Search</DialogTitle>
            <DialogDescription asChild className="relative">
              <div className="mt-6 flex flex-col">
                <Input
                  placeholder="Search ..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                {results.length > 0 && (
                  <ScrollArea className="relative md:max-h-dynamic_search mt-4">
                    <ul className="list-none m-0">
                      {results.map(({ item, refIndex }) => (
                        <li
                          className=" px-4 m-0 py-2 flex flex-row items-center hover:rounded text-foreground bg-background hover:text-primary-foreground hover:bg-primary"
                          key={refIndex}
                        >
                          <a
                            href={`/${item.slug}`}
                            key={refIndex}
                            className=" no-underline hover:text-primary-foreground"
                          >
                            {item.title
                              ? capitalizeFirstLetter(item.title)
                              : capitalizeFirstLetter(item.slug.split("/").pop() || "")}
                            {item.slug.startsWith("archive/") && (
                              <span className="ml-2 text-xs opacity-70">(Archive)</span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}