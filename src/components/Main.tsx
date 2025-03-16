import React from "react";
import Card from "./Card";
import { Album } from "@/app/Album";

export default function Main({ albums = [] }: { albums: Album[] }) {
  return (
    <main>
      <ul className="cards">
        {albums.map((album: Album) => {
          return <Card key={album.id}>{album}</Card>;
        })}
      </ul>
    </main>
  );
}
