import Link from "next/link"
import { IoTrashOutline } from "react-icons/io5"

export const DeleteButton = () => {
    return (
        <Link href='/event-organizer/events/create-events' className="rounded-sm border p-1 hover:bg-gray-100">
            <IoTrashOutline size={20} />
        </Link>
    )
}