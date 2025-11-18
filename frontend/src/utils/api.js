import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3900';

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
