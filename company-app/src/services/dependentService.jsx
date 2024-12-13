import apiClient from "../axiosConfig.jsx";

const getAll = async () => {
    return await apiClient.get("/Dependent");
};

const get = async (id) => {
    return await apiClient.get(`/Dependent/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/Dependent", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/Dependent/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/Dependent/${id}`);
};

const DependentService = {
    getAll,
    get,
    create,
    update,
    remove,
};
    
export default DependentService;