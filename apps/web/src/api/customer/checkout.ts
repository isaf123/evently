import { showMessage } from '@/components/Alert/Toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

export const dataTable = (page: number) => {
  const transactionData = useQuery({
    queryFn: async () => {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}transaction-user/details?page=${page}&pageSize=6`,
        { headers: { Authorization: `Bearer ${Cookies.get('Token Cust')}` } },
      );
    },
    queryKey: ['checkout', page],
  });

  return transactionData.data?.data;
};
export const updateStatusTrans = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      idTrans,
      status,
    }: {
      idTrans: number;
      status: string;
    }) => {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}transaction-user/update`,
        { idTrans, status },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('Token Cust')}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['checkout'],
      });
    },
  });
};
