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
    console.log('registering', email, password);
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('The email has already been used');
    }
    throw new Error('Registration failed');
  }
};
