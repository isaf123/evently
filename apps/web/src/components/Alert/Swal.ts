import Swal from "sweetalert2";

export const confirmSwal = async (title: string, text: string): Promise<boolean> => {
    const result = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    });

    return result.isConfirmed;
}