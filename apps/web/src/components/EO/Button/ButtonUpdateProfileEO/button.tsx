import { Button } from '@/components/ui/button'
import React from 'react'
import { GrUpdate } from 'react-icons/gr'
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

interface IUpdateProfile {
    onUpdate: () => void;
}

const ButtonUpdateProfileEO: React.FC<IUpdateProfile> = ({ onUpdate }) => {
    const handleUpdate = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to update your profile.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Jika user mengonfirmasi, maka panggil fungsi updateProfile
                await onUpdate();
            }
        });
    };


    return (
        <div>
            <ToastContainer />
            <Button variant='default' className='bg-blue-600 text-white' onClick={handleUpdate}>
                <GrUpdate className='mr-2 h-4 w-4' /> Update
            </Button>
        </div>
    )
}

export default ButtonUpdateProfileEO