import { apiCall } from "../api";

export const getClient = async (dealerId) => {
  try {
    const res = await apiCall(
      "GET",
      `/api/dealer/get-customers?dealerId=${dealerId}`,
    );

    return res?.data?.data || [];
  } catch (er) {
    throw new Error(er?.response?.data?.message || "Something went wrong");
  }
};

export const fetchProposal = async (dealerId, customerId) => {
  try {
    let res = await apiCall(
      "GET",
      `/api/dealer/get-proposal?dealerId=${dealerId}&customerId=${customerId}`,
    );
    if (!res?.data?.success) {
      throw new Error(res?.data?.message || "Failed to fetch proposals");
    }
    return res?.data?.data;
  } catch (er) {
    throw new Error(er?.response?.data?.message || "Something went wrong");
  }
};

export const deleteProposal = async (type, proposalId) => {
  try {
    const res = await apiCall("DELETE", "/api/dealer/delete-proposal", {
      type,
      proposalId,
    });

    if (!res?.data?.success) throw new Error(res?.data?.message);

    return res?.data;
  } catch (er) {
    throw new Error(er?.response?.data?.message || "Something went wrong");
  }
};

export const createClient = async (payLoad) => {
  try {
    const res = await apiCall("POST", "/api/dealer/create-customer", payLoad);

    return res?.data;
  } catch (er) {
    throw er?.response?.data;
  }
};

export const updateClient = async (clientId, payLoad) => {
  try {
    const res = await apiCall(
      "PATCH",
      `/api/dealer/edit-customer/${clientId}`,
      payLoad,
    );
    return res?.data;
  } catch (er) {
    throw er?.response?.data
  }
};
