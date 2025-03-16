'use client';
import { useIndexedDB } from "@/components/IndexedDbProvider";
import { usePopupContext } from "./PopupProvider";
import { useRef } from "react";
import BulkEdit from "./BulkEdit";
import UploadInventory from "./UploadInventory";
interface NavigationProps {
  lastAlbumId?: number;
}

export default function Navigation({ lastAlbumId }: NavigationProps) {
  const { addItem, removeItem, removeAllItems } = useIndexedDB();  
  const { showPopup } = usePopupContext();
  const uploadForm = useRef((
    <UploadInventory />
  ));
  return (
    <nav>
      <div className='flex flex-wrap gap-y-10 my-10 px-5 justify-between'>
        <div className="flex flex-grow flex-wrap space-x-4 justify-center lg:justify-start lg:pl-[118px]">
          {["Total Inventory", "Viewing", "Total Pages", "Current Page", "Search Results"].map((item, index) => (
            <div key={index}>
              <span><strong>{item}:</strong><span className='ml-'>0</span></span>
            </div>
          ))}
        </div>
        <div className='flex flex-grow md:w-[340px] space-x-4 justify-center lg:justify-end'>
          <button id="add" onClick={() => addItem({ artistName: `My album ${Math.random()}`, year: "2023" })}><strong>+</strong></button>
          <button id="remove" className={lastAlbumId == 0 ? "invisible" : "visible"} onClick={() => lastAlbumId && removeItem(lastAlbumId)}><strong>-</strong></button>    
          <button id="bulkEdit" className='min-w-[120px] px-4 py-1' onClick={() => showPopup({ content: <BulkEdit />, leftBlock: uploadForm.current })} >Bulk Edit</button>
          <button id="clear" className='px-4 py-1' onClick={removeAllItems} onTouchStart={removeAllItems}>Clear</button>
        </div>
      </div>
      <hr />
    </nav>
  )
}
