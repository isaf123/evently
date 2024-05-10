import Link from "next/link"
import { IoPencil } from "react-icons/io5"

export const EditButton = () => {
    return (
        <Link href='/event-organizer/events/create-events' className="rounded-sm border p-1 hover:bg-gray-100">
            <IoPencil size={20} />

        </Link>
    )
}