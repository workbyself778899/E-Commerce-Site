import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://e-commerce-site-three-kappa.vercel.app';

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

// Attach token from localStorage to every request if present
api.interceptors.request.use((config) => {
	try {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers = config.headers || {};
			config.headers.Authorization = `Bearer ${token}`;
		}
	} catch (e) {
		// ignore if localStorage not available
	}
	return config;
});

export default api;
