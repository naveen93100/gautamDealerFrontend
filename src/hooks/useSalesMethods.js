import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSalesClient,
  createSalesClientProposal,
  deleteSalesClientProposal,
  getSalesClient,
  getSalesClientProposal,
  updateSalesClient,
  updateSalesClientProposal,
} from "../services/Sales/SalesApi";
import toast from "react-hot-toast";

export const useGetSalesClient = (userId) => {
  return useQuery({
    queryKey: ["sales_client"],
    queryFn: () => getSalesClient(userId),
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    enabled: !!userId,
  });
};

export const useCreateSalesClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => createSalesClient(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["sales_client"],
      });
    },
  });
};

export const useUpdateSalesClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
      mutationFn: (payload) => updateSalesClient(payload),
      onSuccess: () => {
      queryClient.invalidateQueries({
          queryKey: ["sales_client"],
        });
    },
});
};

export const useCreateSalesClientProposal=(clientId)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(payload)=>createSalesClientProposal(payload),
        onSuccess:()=>{
             queryClient.invalidateQueries({
                queryKey:['sales_client_proposal',clientId]
             })
        }
    })
}

export const useUpdateSalesClientProposal=(clientId)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(payload)=>updateSalesClientProposal(payload),
        onSuccess:()=>{
             queryClient.invalidateQueries({
                queryKey:['sales_client_proposal',clientId]
             })
        }
    })
}


export const useGetSalesClientProposal = (clientId) => {
  return useQuery({
      queryKey: ["sales_client_proposal",clientId],
      queryFn: () => getSalesClientProposal(clientId),
      staleTime: 5 * 60 * 1000,
      refetchOnMount: false,
      enabled: !!clientId,
    });
};


export const useDeleteSalesClientProposal=(clientId)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(propId)=>deleteSalesClientProposal(propId),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['sales_client_proposal',clientId]
            })
        }
    })
}