import React, { createContext, useState, useContext } from 'react';

type Image = {
  uri: string;
  title: string;
  description: string;
  time: string;
};

type ImageContextType = {
  images: Image[];
  addImage: (image: Image) => void;
  updateImage: (uri: string, data: Partial<Omit<Image, 'uri'>>) => void;
  removeImage: (uri: string) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [images, setImages] = useState<Image[]>([]);

  const addImage = (image: Image) => {
    setImages(prev => [image, ...prev]);
  };

  const updateImage = (uri: string, data: Partial<Omit<Image, 'uri'>>) => {
    setImages(prev => prev.map(img => img.uri === uri ? { ...img, ...data } : img));
  };

  const removeImage = (uri: string) => {
    setImages(prev => prev.filter(img => img.uri !== uri));
  };

  return (
    <ImageContext.Provider value={{ images, addImage, updateImage, removeImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
}; 