import React from 'react'
import Card from './Card'
import { Album } from "@/app/Album";

export default function Main({ albums = [] }: { albums: Album[] }) {
  let i = 0;
  return (
    <main>
      <ul className='cards'>
        {
          albums.map((album: Album) => {
            return (
              <Card key={album.id} index={i++}>{album}</Card>
            )
          })
        }
      </ul>
    </main>
  )
}
