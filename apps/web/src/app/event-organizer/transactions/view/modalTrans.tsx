'use client';
import * as React from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { showMessage } from '@/components/Alert/Toast';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IModalTransProps {
  invoice?: string;
  image?: string;
  id?: Number;
}

const ModalTrans: React.FunctionComponent<IModalTransProps> = (props) => {
  const updateTrans = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}event-organizer/transaction/${props.id}`,
        {
          status_transaction: 'paid',
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('Token EO')}`,
          },
        },
      );
      console.log(response);
      showMessage(response.data.message, 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>

      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Transaction Receipt</DialogTitle>
          <DialogDescription>Invoice : {props.invoice}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="min-h-[450px] w-full bg-gray-100 border border-gray-300 shadow-sm rounded-md flex items-center justify-center">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}receipt/${props.image}`}
              alt=""
              className="w-[380px] h-fit"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <div className="w-full flex justify-end gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-900 text-white"
              >
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                className="border shadow-sm"
                onClick={() => {
                  updateTrans();
                }}
              >
                Confirm
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default ModalTrans;
