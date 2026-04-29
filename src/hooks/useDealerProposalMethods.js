import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createClient,
  deleteProposal,
  fetchProposal,
  getClient,
  updateClient,
} from "../services/Dealer/DealerApi";
import toast from "react-hot-toast";

export const useGetClient = (dealerId) => {
  return useQuery({
    queryKey: ["client"],
    queryFn: () => getClient(dealerId),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    enabled: !!dealerId,
  });
};

export const useProposal = (dealerId, customerId) => {
  return useQuery({
    queryKey: ["clientProposalHistory", dealerId, customerId],
    queryFn: () => fetchProposal(dealerId, customerId),
    refetchOnMount: false,
    enabled: !!dealerId && !!customerId,
  });
};

export const useDeleteProposal = (dealerId, customerId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, proposalId }) => deleteProposal(type, proposalId),
    onSuccess: (data, variables) => {
      toast.success(data?.message);
      queryClient.refetchQueries({
        queryKey: ["clientProposalHistory", dealerId, customerId],
      });
    },
  });
};

export const useRefetchProposal = () => {
  const queryClient = useQueryClient();

  const refetchProposal = (dealerId, customerId) => {
    return queryClient.refetchQueries({
      queryKey: ["clientProposalHistory", dealerId, customerId],
    });
  };

  return { refetchProposal };
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payLoad) => createClient(payLoad),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["client"],
      });
    },
    
  });
};

export const useUpdateClient=()=>{
   
   const queryClient=useQueryClient();

   return useMutation({
      mutationFn:({clientId,payLoad})=>updateClient(clientId,payLoad),
      onSuccess:()=>{
         queryClient.invalidateQueries({
          queryKey:['client']
         })
      }
   })
}