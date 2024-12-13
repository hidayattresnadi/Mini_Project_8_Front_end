import apiClient from "../axiosConfig";

const remove = async (id) => {
    return await apiClient.delete(`/${id}`);
};

const getAll = async () => {
    return await apiClient.get(`/User`);
};

const getUser = async (id) => {
    return await apiClient.get(`/${id}`);
};


const update = async (id, data) => {
    return await apiClient.patch(`/${id}`, data);
}; 
const userService = {
    remove,
    getAll,
    getUser,
    update
};
    
export default userService;