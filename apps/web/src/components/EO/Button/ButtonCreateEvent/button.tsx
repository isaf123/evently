import { Tooltip } from "@nextui-org/tooltip"
import Link from "next/link"
import { IoAddSharp } from "react-icons/io5"

export const CreateEventButton = () => {
    return (
        <Tooltip showArrow={true} content='Create an Event'>
            <Link href='/event-organizer/events/create-events' className="inline-flex items-center gap-[20px] text-white bg-blue-700 hover:bg-blue-800 px-5 py-[8px] rounded-full text-sm">
                <IoAddSharp size={20} />
                Create an Event
            </Link>
        </Tooltip>
    )
}