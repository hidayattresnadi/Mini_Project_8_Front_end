import apiClient from "../axiosConfig.jsx";

const getAll = async () => {
    return await apiClient.get("/WorksOn");
};

const get = async (id) => {
    return await apiClient.get(`/WorksOn/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/WorksOn", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/WorksOn/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/WorksOn/${id}`);
};

const WorksOnService = {
    getAll,
    get,
    create,
    update,
    remove,
};
    
export default WorksOnService;