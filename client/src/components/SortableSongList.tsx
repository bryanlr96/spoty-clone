import { useEffect, useState } from "react"
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { Track } from "../types/SpotifyTypes"
import { useAuthContext } from "../hooks/useAuthContext"
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { HiChevronDown, HiChevronUp } from "react-icons/hi"



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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                    {items.map(id => {
                        const song = currentPlaylist.find(s => s.id === id)!
                        return <SortableCard key={song.id} song={song} />
                    })}
                </div>
            </SortableContext>
        </DndContext>
    )
}

function SortableCard({ song }: { song: Track }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: song.id })
    const { currentSong, setCurrentSong } = useAuthContext()

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const isActive = song.id === currentSong?.id

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer transition
        ${isActive ? "bg-amber-600 hover:bg-amber-500" : "bg-zinc-800 hover:bg-zinc-700"}`}
            onClick={() => setCurrentSong(song)}
            {...attributes}
        >
            <img src={song.image} alt={song.title} className="w-12 h-12 rounded object-cover" />
            <span className="text-white font-medium truncate flex-1">{song.title}</span>


            <button
                type="button"
                {...listeners}
                className="p-2 cursor-grab font-bold text-xl"
                onClick={(e) => e.stopPropagation()}
                aria-label="Drag handle"
            >
                <div className="flex flex-col items-center font-bold">
                    <HiChevronUp size={20} />
                    <HiChevronDown size={20} />
                </div>
            </button>
        </div>
    )
}
