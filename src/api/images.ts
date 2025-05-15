import { API_BASE_URL, ENDPOINTS } from './config';

export type ImageData = {
  id?: string;
  uri: string;
  title: string;
  description: string;
  time: string;
};

// 이미지 업로드
export const uploadImage = async (imageData: ImageData): Promise<ImageData> => {
  try {
    // 이미지 파일 업로드를 위한 FormData 생성
    const formData = new FormData();
    formData.append('image', {
      uri: imageData.uri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    } as any);
    formData.append('title', imageData.title);
    formData.append('description', imageData.description);
    formData.append('time', imageData.time);

    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.UPLOAD_IMAGE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('이미지 업로드에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('이미지 업로드 중 오류:', error);
    throw error;
  }
};

// 이미지 목록 가져오기
export const getImages = async (): Promise<ImageData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GET_IMAGES}`);
    
    if (!response.ok) {
      throw new Error('이미지 목록을 가져오는데 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('이미지 목록 조회 중 오류:', error);
    throw error;
  }
};

// 이미지 정보 업데이트
export const updateImage = async (imageData: ImageData): Promise<ImageData> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.UPDATE_IMAGE}/${imageData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(imageData),
    });

    if (!response.ok) {
      throw new Error('이미지 정보 업데이트에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    console.error('이미지 업데이트 중 오류:', error);
    throw error;
  }
};

// 이미지 삭제
export const deleteImage = async (imageId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.DELETE_IMAGE}/${imageId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('이미지 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('이미지 삭제 중 오류:', error);
    throw error;
  }
}; 