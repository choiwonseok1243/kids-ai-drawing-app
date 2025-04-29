import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const addUploadedImage = (image) => {
    setUploadedImages(prev => [...prev, {
      id: Date.now(),
      ...image
    }]);
  };

  const value = {
    uploadedImages,
    addUploadedImage
  };

  return (
    <ImageContext.Provider value={value}>
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