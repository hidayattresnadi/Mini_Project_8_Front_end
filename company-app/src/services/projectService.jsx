import apiClient from "../axiosConfig.jsx";

const getAll = async (params) => {
    return await apiClient.get("/Project", { params });
};

const get = async (id) => {
    return await apiClient.get(`/Project/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/Project", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/Project/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/Project/${id}`);
};

const ProjectService = {
    getAll,
    get,
    create,
    update,
    remove,
};
    
export default ProjectService;