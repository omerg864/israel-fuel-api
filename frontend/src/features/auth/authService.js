import axios from 'axios';
import {toast} from 'react-toastify';

const API_URL = '/api/users/';

const register = async (user) => {
    try {
        const response = await axios.post(API_URL, user);
        console.log(response.data);
        if (response.status === 201) {
            toast.success("User created please check your email to verify your account");
        }
        else {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const login = async (user) => {
    try {
        const response = await axios.post(API_URL + "login/", user);
        if (response.status === 200) {
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        } else {
            response.status(400);
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

const logout = async () => {
    localStorage.removeItem('user');
}

const getNewApiToken = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                accepts:"application/json"
            },
        }
        const response = await axios.get(API_URL + "generate/new/Token", config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const authService = {
    register,
    logout,
    login,
    getNewApiToken
};

export default authService;