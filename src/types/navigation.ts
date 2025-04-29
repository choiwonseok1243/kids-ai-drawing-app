export type RootStackParamList = {
  Main: undefined;
  Drawing: undefined;
  Gallery: undefined;
  Settings: undefined;
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
  CreateDetail: {
    drawing: {
      id: number;
      title: string;
      image: any;
    };
  };
};

export type MainTabParamList = {
  Home: undefined;
  Draw: undefined;
  MyGallery: undefined;
  Settings: undefined;
}; 