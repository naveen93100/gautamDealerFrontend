// import { useQuery } from "@tanstack/react-query";
// import { apiCall } from "../api";

// export const getGaloSalesClient = async (userId) => {
//     try {
//         const res = await apiCall(
//             "GET",
//             `/api/galoSales/get-proposals/${userId}`,
//         );
//         console.log(res, "parposal");
//         return res.data?.sales;
//     } catch (er) {
//         throw new Error(er?.response?.data?.message || "Something went wrong");
//     }
// };

// export const createGaloSalesClient = async (payload) => {
//     try {
//         const res = await apiCall(
//             "POST",
//             "/api/galoSales/create-client",
//             payload,
//         );
//         return res?.data;
//     } catch (er) {
//         throw er?.response?.data?.message;
//     }
// };

// export const updateGaloSalesClient = async (payload) => {
//     try {
//         const res = await apiCall(
//             "PATCH",
//             "/api/galoSales/update-client/",
//             payload,
//         );
//         return res.data;
//     } catch (er) {
//         throw er?.response?.data?.message;
//     }
// };

// export const createGaloSalesClientProposal = async (payload) => {
//     try {
//         let res = await apiCall(
//             "POST",
//             "/api/galoSales/create-proposal",
//             payload,
//         );
//         return res?.data;
//     } catch (er) {
//         throw er?.response?.data?.message;
//     }
// };

// export const updateGaloSalesClientProposal = async (payload) => {
//     try {
//         let res = await apiCall(
//             "PUT",
//             "/api/galoSales/update-proposal",
//             payload,
//         );
//         return res?.data;
//     } catch (er) {
//         throw er?.response?.data?.message;
//     }
// };

// export const getGaloSalesClientProposal = async (clientId) => {
//     try {
//         let res = await apiCall(
//             "GET",
//             `/api/galoSales/get-proposals/${clientId}`,
//         );

//         return res?.data?.data;
//     } catch (er) {
//         throw er?.response?.data?.message;
//     }
// };

// export const deleteGaloSalesClientProposal = async (propId) => {
//     try {
//         let res = await apiCall(
//             "DELETE",
//             `/api/galoSales/delete-proposal/${propId}`,
//         );
//         return res?.data;
//     } catch (er) {
//         throw er?.response?.data?.message;
//     }
// };

import { apiCall } from "../api";
import { useQuery } from "@tanstack/react-query";

// ============================
//  CLIENT APIs
// ============================

/**
 * Get all clients for a sales person
 * GET /api/galoSales/get-galoclient/:salesId
 */
export const getGaloClient = async (salesId) => {
    const res = await apiCall(
        "GET",
        `/api/galoSales/get-galoclient/${salesId}`,
    );
    return res?.data?.sales; // controller returns { success, sales: [...] }
};

/**
 * Create a new client
 * POST /api/galoSales/create-galoclient
 * Payload: { salesId, name, phone, gstin, ... }
 */
export const createGaloSalesClient = async (payload) => {
    const res = await apiCall(
        "POST",
        "/api/galoSales/create-galoclient",
        payload,
    );
    return res?.data; // { success, message, data: {...} }
};

/**
 * Update a client
 * PATCH /api/galoSales/update-galoclient
 * Payload MUST include: { customerId, salesId, ...other fields }
 */
export const updateGaloSalesClient = async (payload) => {
    const res = await apiCall(
        "PATCH",
        "/api/galoSales/update-galoclient",
        payload,
    );
    return res?.data; // { success, message }
};

// ============================
//  PROPOSAL APIs
// ============================

/**
 * Get all proposals for a given client (customer)
 * GET /api/galoSales/get-proposals/:customerId
 */
export const getGaloSalesClientProposal = async (customerId) => {
    const res = await apiCall(
        "GET",
        `/api/galoSales/get-proposals/${customerId}`,
    );
    console.log("Raw API response:", res);
    return res?.data?.data; // controller returns { success, data: [...] }
};

/**
 * Create a new proposal
 * POST /api/galoSales/create-proposal
 * Payload: { salesId, customerId, gst, termsAndConditions, selectedPanels }
 */
export const createGaloSalesClientProposal = async (payload) => {
    const res = await apiCall(
        "POST",
        "/api/galoSales/create-proposal",
        payload,
    );
    return res?.data;
};

/**
 * Update a proposal
 * PUT /api/galoSales/update-proposal
 * Payload MUST include: { propId, ...other fields }
 */
export const updateGaloSalesClientProposal = async (payload) => {
    const res = await apiCall("PUT", "/api/galoSales/update-proposal", payload);
    return res?.data;
};

/**
 * Delete a proposal
 * DELETE /api/galoSales/delete-proposal/:propId
 */
export const deleteGaloSalesClientProposal = async (propId) => {
    const res = await apiCall(
        "DELETE",
        `/api/galoSales/delete-proposal/${propId}`,
    );
    return res?.data;
};
