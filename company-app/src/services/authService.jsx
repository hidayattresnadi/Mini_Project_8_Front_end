import apiClient from "../axiosConfig.jsx";

const create = async (data) => {
    return await apiClient.post("/User/register", data);
};

const login = async (userData) => {
    const response = await apiClient.post("/User/login", userData);
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = async (email) => {
    try {
        await apiClient.patch(`User/Log-Out`, null, {
            params: {
                email: email
            }
        });

    } catch (error) {
        console.log(error)
    }
};

const refreshToken = async () => {
    const response = await apiClient.post("User/refresh-Token");
    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
};


const AuthService = {
    create,
    login,
    logout,
    refreshToken
};

export default AuthService;