import axios, { Axios } from "axios";

class Service {
    public client: Axios

    constructor() {
        const instance = axios.create({
            baseURL: "http://localhost:4000/api",
        });

        instance.interceptors.request.use((config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.client = instance
    }
}

const service = new Service()

export default service;