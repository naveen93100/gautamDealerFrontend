import { apiCall } from "../api";

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
    const res = await apiCall("DELETE", "/api/dealer/delete-proposal", {type,proposalId});

    if(!res?.data?.success) throw new Error(res?.data?.message);
     
    return res?.data

  } catch (er) {
    throw new Error(er?.response?.data?.message || "Something went wrong");
  }
};
