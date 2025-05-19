import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Scene = {
  image: string | null;
  prompt: string;
  isGenerated?: boolean;
};

export type Story = {
  uri: string | null; // 대표 이미지
  title: string;
  description: string;
  time: string;
  scenes: Scene[];
};

interface StoryContextType {
  stories: Story[];
  addStory: (story: Story) => void;
  removeStory: (uri: string | null) => void;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

const STORAGE_KEY = 'STORY_LIST';

export const StoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [stories, setStories] = useState<Story[]>([]);

  // Load stories from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setStories(JSON.parse(json));
      } catch (e) {
        console.error('Failed to load stories', e);
      }
    })();
  }, []);

  // Save stories to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }, [stories]);

  const addStory = (story: Story) => {
    setStories(prev => [story, ...prev]);
  };

  const removeStory = (uri: string | null) => {
    setStories(prev => prev.filter(story => story.uri !== uri));
  };

  return (
    <StoryContext.Provider value={{ stories, addStory, removeStory }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStories = () => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStories must be used within a StoryProvider');
  }
  return context;
}; 