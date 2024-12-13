import apiClient from "../axiosConfig.jsx";

const getAll = async () => {
    return await apiClient.get(`/Dashboard`);
};


const DashboardService = {
    getAll
};
    
export default DashboardService;