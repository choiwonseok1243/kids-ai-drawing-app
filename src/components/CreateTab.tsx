import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useStories } from '../contexts/StoryContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

interface Scene {
  description: string;
  prompt: string;
  image?: string;
  isGenerated?: boolean;
}

interface CreateTabProps {
  selectedImage: {
    title: string;
    description: string;
    date: string;
    uri: string;
  } | null;
}

type RootStackParamList = {
  Main: { screen: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CreateTab: React.FC<CreateTabProps> = ({ selectedImage }) => {
  const [scenes, setScenes] = useState<Scene[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const { addStory } = useStories();

  const handleAddScene = () => {
    setScenes([...scenes, { description: '', prompt: '', image: '', isGenerated: false }]);
  };

  const handleRemoveScene = (index: number) => {
    setScenes(scenes.filter((_, i) => i !== index));
  };

  const handleSceneChange = (index: number, field: keyof Scene, value: string) => {
    const newScenes = [...scenes];
    newScenes[index] = { ...newScenes[index], [field]: value };
    setScenes(newScenes);
  };

  if (!selectedImage) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">이미지를 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Selected Image Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">{selectedImage.title}</h2>
        <p className="text-gray-600 mb-2">{selectedImage.description}</p>
        <p className="text-sm text-gray-500">{selectedImage.date}</p>
      </div>

      {/* 완료 버튼을 스토리보드 제목 위로 이동 */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-bold border border-green-300 hover:bg-green-200 transition"
          onClick={() => {
            // 스토리 데이터 생성
            const story = {
              uri: selectedImage.uri,
              title: selectedImage.title,
              description: selectedImage.description,
              time: new Date().toISOString().slice(0, 10),
              scenes: scenes.map(scene => ({
                image: scene.image || '',
                prompt: scene.prompt,
                isGenerated: scene.isGenerated || false
              }))
            };
            // 스토리 추가
            addStory(story);
            // 보관함으로 이동
            navigation.navigate('Main', { screen: 'MyGallery' });
          }}
        >
          완료
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">스토리보드</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">장면 구성</h3>
          <button
            onClick={handleAddScene}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            장면 추가
          </button>
        </div>
        <div className="space-y-6 max-h-[calc(100vh-400px)] overflow-y-auto pr-4">
          {scenes.map((scene, index) => (
            <div key={index} className="relative border rounded-lg p-4">
              {/* 삭제 버튼: 우측 상단 원형 - 버튼 (인라인 스타일) */}
              <button
                onClick={() => handleRemoveScene(index)}
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid #ccc',
                  background: '#fff',
                  color: '#888',
                  fontSize: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
                aria-label="장면 삭제"
              >
                &minus;
              </button>
              <div className="flex justify-between items-start mb-4">
                <h4
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    border: '2px solid #f9a8d4', // 연핑크
                    background: '#fdf2f8',        // 연핑크 배경
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#d946ef',             // 진한 핑크
                    marginBottom: '0.5rem'
                  }}
                >
                  장면 {index + 1}
                </h4>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    장면 설명
                  </label>
                  <textarea
                    value={scene.description}
                    onChange={e => handleSceneChange(index, 'description', (e.target as HTMLTextAreaElement).value)}
                    className="w-full h-24 p-2 border rounded-md"
                    placeholder="이 장면에서 어떤 일이 일어나나요?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이미지 생성 프롬프트
                  </label>
                  <textarea
                    value={scene.prompt}
                    onChange={e => handleSceneChange(index, 'prompt', (e.target as HTMLTextAreaElement).value)}
                    className="w-full h-24 p-2 border rounded-md"
                    placeholder="이 장면을 표현하기 위한 이미지 생성 프롬프트를 입력하세요"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateTab; 