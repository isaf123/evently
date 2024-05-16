import { showMessage } from "@/components/Alert/Toast";
import { Button } from "@/components/ui/button"
import { IDeleteButton } from "@/interfaces/deleteButton"
import { IoTrashOutline } from "react-icons/io5"
import Swal from "sweetalert2";

export const DeleteButton: React.FC<IDeleteButton> = ({ onDelete }) => {
    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onDelete();
                showMessage('Event deleted successfully', 'success');
            }
        });
    };
    return (
        <Button className="rounded-sm border p-1 hover:bg-gray-100" onClick={handleDelete}>
            <IoTrashOutline size={20} />
        </Button>
    )
}