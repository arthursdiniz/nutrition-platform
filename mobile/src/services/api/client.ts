import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1';

const http = axios.create({
  baseURL,
  timeout: 10_000,
  headers: { Accept: 'application/json' },
});

export const api = {
  register: async (email: string, password: string) => (await http.post('/auth/register', { email, password })).data,
  login: async (email: string, password: string) => (await http.post('/auth/login', { email, password })).data,
  health: async () => {
    const origin = baseURL.replace(/\/api\/v1$/, '');
    const response = await axios.get(`${origin}/actuator/health`, { timeout: 5_000 });
    return response.data as { status: string };
  },
  http,
};
