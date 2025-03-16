import api from '../api/config';

interface LoginRequest {
    username: string;
    password: string;
}

interface RegisterRequest {
    username: string;
    password: string;
    email: string;
}

interface AuthResponse {
    jwt: string;
}

export const authService = {
    async login(credentials: LoginRequest): Promise<void> {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);
            localStorage.setItem('token', response.data.jwt);
        } catch (error) {
            throw new Error('Login failed. Please check your credentials.');
        }
    },

    async register(userData: RegisterRequest): Promise<void> {
        try {
            const response = await api.post<AuthResponse>('/auth/register', userData);
            localStorage.setItem('token', response.data.jwt);
        } catch (error) {
            throw new Error('Registration failed. Please try again.');
        }
    },

    logout(): void {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}; 