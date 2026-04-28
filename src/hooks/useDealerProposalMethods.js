import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProposal, fetchProposal } from "../services/Dealer/DealerApi";
import toast from "react-hot-toast";

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

export const useRefetchProposal=()=>{
    const queryClient = useQueryClient();
    
    const refetchProposal=(dealerId,customerId)=>{
         return queryClient.refetchQueries({
            queryKey:["clientProposalHistory", dealerId, customerId]
         })
    }

    return {refetchProposal}
}