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

export async function login(username: string, password: string) {
  // 임의로 아이디/비번이 맞으면 성공, 아니면 실패
  if (username === 'sm2025' && password === 'smcomputer') {
    return { token: 'mock-token' };
  } else {
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
  }
}

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