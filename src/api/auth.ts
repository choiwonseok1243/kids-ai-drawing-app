import { API_BASE_URL, ENDPOINTS } from './config';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface AuthError {
  message: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData: AuthError = await response.json();
      throw new Error(errorData.message || '로그인에 실패했습니다.');
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('로그인 중 오류가 발생했습니다.');
  }
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData: AuthError = await response.json();
      throw new Error(errorData.message || '회원가입에 실패했습니다.');
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('회원가입 중 오류가 발생했습니다.');
  }
}; 