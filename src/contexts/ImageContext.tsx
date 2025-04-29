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
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [images, setImages] = useState<Image[]>([]);

  const addImage = (image: Image) => {
    setImages(prev => [image, ...prev]);
  };

  return (
    <ImageContext.Provider value={{ images, addImage }}>
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