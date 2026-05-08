import { useQuery } from "@tanstack/react-query";
import { apiCall } from "../api";

export const getSalesClient = async (userId) => {
  try {
    const res = await apiCall("GET", `/api/sales/get-client/${userId}`);
    return res.data?.sales;
  } catch (er) {
    throw new Error(er?.response?.data?.message || "Something went wrong");
  }
};

export const createSalesClient = async (payload) => {
  try {
    const res = await apiCall("POST", "/api/sales/create-client", payload);
    return res?.data;
  } catch (er) {
    throw er?.response?.data?.message;
  }
};

export const updateSalesClient = async (payload) => {
  try {
    const res = await apiCall("PATCH", "/api/sales/update-client/", payload);
    return res.data;
  } catch (er) {
    throw er?.response?.data?.message;
  }
};

export const createSalesClientProposal=async(payload)=>{
     try {
       let res = await apiCall("POST", "/api/sales/create-proposal", payload);
       return res?.data
        
     } catch (er) {
        throw er?.response?.data?.message;
     }
}

export const updateSalesClientProposal=async(payload)=>{
     try {
        let res = await apiCall("PUT", "/api/sales/update-proposal", payload);
        return res?.data
        
     } catch (er) {
        throw er?.response?.data?.message
     }
}

export const getSalesClientProposal = async (clientId) => {
  try {
    let res = await apiCall("GET", `/api/sales/get-proposals/${clientId}`);
    return res?.data?.data;
  } catch (er) {
    throw er?.response?.data?.message;
  }
};

export const deleteSalesClientProposal = async (propId) => {
  try {
    let res = await apiCall(
      "DELETE",
      `/api/sales/delete-proposal/${propId}`,
    );
    return res?.data;
  } catch (er) {
    throw er?.response?.data?.message;
  }
};

