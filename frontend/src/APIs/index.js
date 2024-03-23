import { API_BASE_URL } from "../config";
import axios from 'axios';

const register = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, formData, {
            headers: {
                'Content-Type': 'application/json'

            }
        });

        return response
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        throw new Error('Failed to register user');
    }

};


const login = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to login user');
    }
}

const emailVerify = async (verificationCode) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/verify`, verificationCode, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        return response
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Email verification failed');
    }
}


const selectedCategory = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        // console.log("I am here: ", response);
        return response
    } catch (error) {
        console.log('SelectedCategory Error: ', error);
        throw new Error("selected category issue")
    }
}

const addSelectedCategory = async (token, categories) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/categories/select`, { 'category': categories }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response

    } catch (error) {
        console.log("Failed to add selected Category");
        throw new Error("Failed to add selected Category")
    }
}



export { register, login, emailVerify, selectedCategory, addSelectedCategory }