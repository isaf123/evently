import { toast } from 'react-toastify'

export const showMessage = (message: string, type: "success" | "error") => {
    if (type === "success") {
        toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "mt-16"
        });
    } else {
        toast.error(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "mb-10"
        });
    }
}