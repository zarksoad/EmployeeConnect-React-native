import axios from 'axios';
import {API_URL} from '@env';

export interface LoginResponse {
  accessToken: string;
  message: string;
}

export const loginService = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    console.log(API_URL);
    console.log('Sending request to:', API_URL);
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });
    return response.data.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    throw new Error(message);
  }
};
