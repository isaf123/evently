export const getStatusStyles = (status: string) => {
    switch (status) {
        case "pending":
            return ' text-yellow-500 text-sm font-normal rounded-full capitalize text-center';
        case 'completed':
            return 'bg-green-100 text-green-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
}