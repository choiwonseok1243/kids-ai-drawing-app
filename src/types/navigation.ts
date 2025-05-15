export type RootStackParamList = {
  Main: undefined;
  Drawing: undefined;
  Gallery: undefined;
  Settings: undefined;
  Home: {
    deletedImageUri?: string;
    action?: string;
  } | undefined;
  UploadPicture: {
    imageUri: string;
    onUpload: (data: { uri: string; title: string; description: string; time: string }) => void;
  };
  PictureDetails: {
    imageUri: string;
    title: string;
    description: string;
    time: string
  };
};

export type MainTabParamList = {
  Home: undefined;
  Draw: undefined;
  MyGallery: undefined;
  Settings: undefined;
}; 