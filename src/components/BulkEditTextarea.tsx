import { useEffect, useState } from "react";
import { useIndexedDB } from "./IndexedDbProvider";
import { Album } from "@/app/Album";

export default function BulkEditTextarea() {
  const { getAllItems, removeAllItems, addItem } = useIndexedDB();
  const [textItems, setTextItems] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const getItemsResult = await getAllItems();
      const textItems = getItemsResult.map((item) => item.toString());
      setTextItems(textItems.join("\n"));
    };
    fetchData();
  }, [getAllItems]);

  function debounce(func: () => void, wait = 300) {
    let timeout: NodeJS.Timeout;
    return function () {
      clearTimeout(timeout);
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
  const debouncedUpdateItems = debounce(updateItems);
  useEffect(() => {
    debouncedUpdateItems();
  }, [textItems, debouncedUpdateItems]);
  return (
    <div className="h-full w-full overflow-scroll">
      <div className="h-[96%] flex w-max flex-wrap">
        <div className="flex text-black py-2 bg-gray-200">
          <span className="whitespace-pre text-[13px] font-mono">`{Album.keys().map((key) => key)}`</span>
        </div>
        <textarea
          className="min-h-[100%] flex-grow resize-none w-full overflow-hidden"
          placeholder="Bulk Edits"
          value={textItems}
          style={{
            whiteSpace: "pre",
            fontFamily: "monospace",
          }}
          onChange={(e) => {
            setTextItems(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
