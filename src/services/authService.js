import axios from "axios";
import Cookies from "js-cookie";
import apiClient from "@/utils/apiClient.js";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
    const response = await axios.post(
        `${API_URL}/auth/login`,
        {
            username,
            password,
        },
        {
            withCredentials: true,
        }
    );

    const {token, user} = response.data;

    if (token) {
        // Simpan token & user ke cookie dengan masa berlaku 1 jam (opsional)
        Cookies.set("token", token, {expires: 0.0417}); // 1 Jam
        Cookies.set("user", JSON.stringify(user), {expires: 0.0417}); // 1 Jam
    }

    return response.data;
};

export const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
};

export const getToken = () => Cookies.get("token");

export const getUser = () => {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
};

export const getTokenReset = async () => {
    const token = Cookies.get("token");

    const response = await axios.get(`${API_URL}/auth/reset-code`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
    return response.data;
};

export const generateTokenReset = async (username) => {
    const response = await apiClient.post(
        "/auth/generate-reset-code",
        {username}
    );

    console.log("Generate token");
    console.log(response.data);
    return response.data;
};

export const resetPassword = async (username, validationCode, newPassword) => {
    const response = await axios.post(
        `${API_URL}/auth/reset-password`,
        {
            username,
            validationCode,
            newPassword,
        },
        {
            withCredentials: true,
        }
    );

    return response.data;
};

