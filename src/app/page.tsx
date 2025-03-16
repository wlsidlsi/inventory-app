"use client";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Main from "@/components/Main";
import { useState, useEffect } from "react";
import { Album } from "./Album";
import { useIndexedDB } from "@/components/IndexedDbProvider";
import { PopupProvider } from "@/components/PopupProvider";

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]);

  const { getAllAlbums } = useIndexedDB();

  useEffect(() => {
    async function fetchAlbums() {
      const albums = await getAllAlbums();
      setAlbums(albums);
    }
    fetchAlbums();
  }, [getAllAlbums]);

  useEffect(() => {
    const updateAlbums = async () => {
      const albums = await getAllAlbums();
      setAlbums(albums);
    };
    window.addEventListener("indexedDBUpdate", updateAlbums);
    return () => {
      window.removeEventListener("indexedDBUpdate", updateAlbums);
    };
  });

  return (
    <PopupProvider>
      <Header />
      <Navigation lastAlbumId={albums.length && albums[albums.length - 1].id} />
      <Main albums={albums} />
    </PopupProvider>
  );
}
