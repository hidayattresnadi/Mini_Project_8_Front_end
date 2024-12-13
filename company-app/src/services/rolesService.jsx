import apiClient from "../axiosConfig.jsx";

const getAll = async () => {
    return await apiClient.get("/Role");
};

const modifyRole = async (id,data) => {
    return await apiClient.patch(`/modify_role/${id}`, data)
}

const RoleService = {
    getAll,
    modifyRole
};
    
export default RoleService;