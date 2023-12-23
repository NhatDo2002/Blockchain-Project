import axios from 'axios';

export const httpRequests = axios.create({
    baseURL: 'http://localhost:5000/',
});

export const get = async (path, options = {}) => {
    const response = await httpRequests.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await httpRequests.post(path, options);
    return response.data;
};
