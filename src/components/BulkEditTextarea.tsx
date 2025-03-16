import { useEffect, useRef, useState } from "react";
import { useIndexedDB } from "./IndexedDbProvider";
import { Album } from "@/app/Album";

export default function BulkEditTextarea() {
  const { getAllItems, removeAllItems, addItem } = useIndexedDB();
  const [textItems, setTextItems] = useState<string>("");
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function debounce(func: () => void, wait = 300) {
      return function () {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => func(), wait);
      };
    }
    const getAllItemsAndUpdateText = async () => {
      try {
        console.log("fetching");
        const getItemsResult = await getAllItems();
        console.log("getItemsResult: ", getItemsResult.length);
        const textItems = getItemsResult.map((item) => item.toString());
        setTextItems(textItems.join("\n"));
        console.log("fetcedData");
      } catch (error) {
        console.error("Failed to fetch items: ", error);
      }
    };
    const debouncedGetAllItemsAndUpdateText = debounce(
      getAllItemsAndUpdateText
    );
    debouncedGetAllItemsAndUpdateText();
  }, [getAllItems]);

  function debounce(func: () => void, wait = 300) {
    let timeout: NodeJS.Timeout;
    return function () {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => func(), wait);
    };
  }

  const updateItems = async () => {
    if (textItems === "") return;
    await removeAllItems();
    await Promise.all(
      textItems.split("\n").map(async (item) => addItem(Album.fromString(item)))
    );
  };

  // const debouncedUpdateItems = debounce(updateItems);
  // useEffect(() => {
  //   debouncedUpdateItems();
  // }, [textItems, debouncedUpdateItems]);

  // useEffect(() => {
  //   const updateAlbums = async () => {
  //     const items = await getAllItems();
  //     const textItems = items.map((item) => item.toString());
  //     setTextItems(textItems.join("\n"));
  //   };
  //   window.addEventListener("indexedDBUpdate", debounce(updateAlbums));
  //   return () => {
  //     window.removeEventListener("indexedDBUpdate", debounce(updateAlbums));
  //   };
  // });

  function getTitle(title: string) {
    switch (title) {
      case "Artist Name":
        return "Artist Name".padEnd(70);
      case "Album Name":
        return "Album Name".padEnd(70);
      case "Barcode":
        return "Barcode".padEnd(37);
      case "Country":
        return "Country".padEnd(18);
      case "Year":
        return "Year".padEnd(19);
      case "Genre":
        return "Genre".padEnd(18);
      case "Variant":
        return "Variant".padEnd(18);
      case "Image":
        return "Image".padEnd(80);
      default:
        return title;
    }
  }

  return (
    <div className="h-full w-full overflow-scroll">
      <div className="h-[96%] flex w-max flex-wrap">
        <div className="flex text-black py-2 bg-gray-200 flex-grow p-4">
          {Album.keys().map((title) => (
            <span
              key={title}
              className="whitespace-pre text-[15px] font-mono font-semibold"
            >
              {getTitle(title)}
            </span>
          ))}
        </div>
        <textarea
          className="min-h-[100%] flex-grow resize-none w-full overflow-x-hidden p-4"
          placeholder="arist                                                                           | album                                                                          | barcode                                  | coutry             | year               | genre              | variant            | image                   "
          value={textItems}
          style={{
            whiteSpace: "pre",
            fontFamily: "monospace",
          }}
          // onChange={(e) => {
          //   setTextItems(e.target.value);
          // }}
        />
      </div>
    </div>
  );
}
