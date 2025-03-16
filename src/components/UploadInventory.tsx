import { useIndexedDB } from "./IndexedDbProvider";
import { Album } from "@/app/Album";

export default function UploadInventory() {
  const { addItem } = useIndexedDB();
  async function loadAlbums(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.split('\n');
    await Promise.all(lines.map(async (line) => {
          const cols = line.replace(/\"/g, "").replace(/\ *\|/g, "|").split('|');
          const album = {
              artistName: cols[0] && cols[0].trim(),
              albumName: cols[1] && cols[1].trim(),
              upc: cols[2] && cols[2].trim(),
              year: cols[3] && cols[3].trim(),
              country: cols[4] && cols[4].trim(),
              genre: cols[5] && cols[5].trim(),
              variant: cols[6] && cols[6].trim(),
              image: cols[7] && cols[7].trim()
          };
          return addItem(new Album(album));
      }));
    }
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <form>
        <input type="file" name="file" id="file" onChange={loadAlbums} />
        <label htmlFor="file" className="sr-only">
          Upload a file
        </label>
      </form>
    </div>
  );
}
