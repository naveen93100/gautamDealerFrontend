// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//     createGaloSalesClient,
//     createGaloSalesClientProposal,
//     deleteGaloSalesClientProposal,
//     getGaloSalesClient,
//     getGaloSalesClientProposal,
//     updateGaloSalesClient,
//     updateGaloSalesClientProposal,
// } from "../services/Galo/GaloSalesApi";
// import toast from "react-hot-toast";

// export const useGetGaloSalesClient = (userId) => {
//     return useQuery({
//         queryKey: ["sales_client"],
//         queryFn: () => getSalesClient(userId),
//         staleTime: 5 * 60 * 1000,
//         refetchOnMount: false,
//         enabled: !!userId,
//     });
// };

// export const useCreateGaloSalesClient = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (payload) => createGaloSalesClient(payload),
//         onSuccess: (data) => {
//             toast.success(data?.message);
//             queryClient.invalidateQueries({
//                 queryKey: ["sales_client"],
//             });
//         },
//     });
// };

// export const useUpdateGaloSalesClient = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: (payload) => updateGaloSalesClient(payload),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["sales_client"],
//             });
//         },
//     });
// };

// export const useCreateGaloSalesClientProposal = (clientId) => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (payload) => createGaloSalesClientProposal(payload),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["sales_client_proposal", clientId],
//             });
//         },
//     });
// };

// export const useUpdateGaloSalesClientProposal = (clientId) => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (payload) => updateGaloSalesClientProposal(payload),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["sales_client_proposal", clientId],
//             });
//         },
//     });
// };

// export const useGetGaloSalesClientProposal = (clientId) => {
//     return useQuery({
//         queryKey: ["sales_client_proposal", clientId],
//         queryFn: () => getGaloSalesClientProposal(clientId),
//         staleTime: 5 * 60 * 1000,
//         refetchOnMount: false,
//         enabled: !!clientId,
//     });
// };

// export const useDeleteGaloSalesClientProposal = (clientId) => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (propId) => deleteGaloSalesClientProposal(propId),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ["sales_client_proposal", clientId],
//             });
//         },
//     });
// };

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    getGaloClient,
    createGaloSalesClient,
    updateGaloSalesClient,
    getGaloSalesClientProposal,
    createGaloSalesClientProposal,
    updateGaloSalesClientProposal,
    deleteGaloSalesClientProposal,
} from "../services/Galo/GaloSalesApi";

// ============================
//  CLIENT HOOKS
// ============================

/**
 * Fetch all clients for a sales person
 * Query key: ["galo_clients", salesId]
 */
export const useGetGaloClients = (salesId) => {
    return useQuery({
        queryKey: ["galo_clients", salesId],
        queryFn: () => getGaloClient(salesId),
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        enabled: !!salesId,
    });
};

export const useCreateGaloSalesClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createGaloSalesClient,
        onSuccess: (data) => {
            toast.success(data?.message || "Client created successfully!");
            queryClient.invalidateQueries({ queryKey: ["galo_clients"] });
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to create client");
        },
    });
};

export const useUpdateGaloSalesClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateGaloSalesClient,
        onSuccess: (data) => {
            toast.success(data?.message || "Client updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["galo_clients"] });
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to update client");
        },
    });
};

// ============================
//  PROPOSAL HOOKS
// ============================

// export const useGetGaloSalesClientProposal = (customerId) => {
//     return useQuery({
//         queryKey: ["galo_proposals", customerId],
//         queryFn: () => getGaloSalesClientProposal(customerId),
//         staleTime: 5 * 60 * 1000,
//         refetchOnMount: false,
//         enabled: !!customerId,
//     });
// };

export const useGetGaloSalesClientProposal = (customerId) => {
    return useQuery({
        queryKey: ["galo_proposals", customerId],
        queryFn: () => getGaloSalesClientProposal(customerId),
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        enabled: !!customerId,
    });
};

export const useCreateGaloSalesClientProposal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createGaloSalesClientProposal,
        onSuccess: (data, variables) => {
            toast.success(data?.message || "Proposal created successfully!");
            // Invalidate proposals for the specific customer
            queryClient.invalidateQueries({
                queryKey: ["galo_proposals", variables.customerId],
            });
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to create proposal");
        },
    });
};

export const useUpdateGaloSalesClientProposal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateGaloSalesClientProposal,
        onSuccess: (data, variables) => {
            toast.success(data?.message || "Proposal updated successfully!");
            // variables should contain customerId if you want to invalidate the list
            if (variables?.customerId) {
                queryClient.invalidateQueries({
                    queryKey: ["galo_proposals", variables.customerId],
                });
            }
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to update proposal");
        },
    });
};

export const useDeleteGaloSalesClientProposal = (customerId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteGaloSalesClientProposal,
        onSuccess: (data) => {
            toast.success(data?.message || "Proposal deleted successfully!");
            // Invalidate only the proposals for this customer
            queryClient.invalidateQueries({
                queryKey: ["galo_proposals", customerId],
            });
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to delete proposal");
        },
    });
};
