import { useEffect, useState } from "react"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Track } from "../types/SpotifyTypes"
import { useAuthContext } from "../hooks/useAuthContext"





export default function SortableSongList() {
    const { currentPlaylist, setCurrentPlaylist } = useAuthContext()

    const [items, setItems] = useState(currentPlaylist.map(song => song.id))

    useEffect(() => {
        setItems(currentPlaylist.map(song => song.id))
    }, [currentPlaylist])

    const sensors = useSensors(useSensor(PointerSensor))

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!over || active.id === over.id) return  // nada que hacer si no hay destino o es el mismo item

        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        if (oldIndex === newIndex) return

        const newItems = arrayMove(items, oldIndex, newIndex)
        setItems(newItems)

        const newPlaylist = newItems.map(id => currentPlaylist.find(song => song.id === id)!)
        setCurrentPlaylist(newPlaylist)
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                    {items.map(id => {
                        const song = currentPlaylist.find(s => s.id === id)!
                        return <SortableCard key={song.id} song={song} onClick={() => console.log('hola')} />
                    })}
                </div>
            </SortableContext>
        </DndContext>
    )
}

function SortableCard({ song, onClick }: { song: Track; onClick: (s: Track) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: song.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const { currentSong } = useAuthContext()

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            onClick={() => onClick(song)}
            className={song.id === currentSong?.id ? "flex items-center gap-4 p-2 bg-amber-600 rounded-lg cursor-pointer hover:bg-amber-500 transition" : "flex items-center gap-4 p-2 bg-zinc-800 rounded-lg cursor-pointer hover:bg-zinc-700 transition"}
        >
            <img src={song.image} alt={song.title} className="w-12 h-12 rounded object-cover" />
            <span className="text-white font-medium truncate">{song.title}</span>
        </div>
    )
}
