import axios from 'axios';
import {API_URL} from '@env';

export interface RegisterResponse {
  code: number;
  message: string;
  data: {
    email: string;
    password: string;
    id: number;
  };
}

export const registerService = async (
  email: string,
  password: string,
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error('The email is already registered.');
      throw new Error('The email is already registered. Please use another.');
    }
    throw new Error(
      error.response?.data?.message || 'Registration failed. Try again later.',
    );
  }
};
