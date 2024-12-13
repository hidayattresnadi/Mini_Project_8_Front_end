import apiClient from "../axiosConfig.jsx";

const getAll = async (params) => {
    return await apiClient.get("/LeaveRequest", { params });
};

const get = async (id) => {
    return await apiClient.get(`/LeaveRequest/${id}`);
};

const addLeaveRequest = async (data) => {
    return await apiClient.post(`/Employee/leave_request/1`,data);
};

const LeaveRequestService = {
    getAll,
    get,
    addLeaveRequest
};
    
export default LeaveRequestService;