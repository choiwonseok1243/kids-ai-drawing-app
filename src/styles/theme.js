export const colors = {
  primary: '#4A90E2',
  secondary: '#50E3C2',
  background: '#FFFFFF',
  text: '#333333',
  error: '#FF4444',
  success: '#4CAF50',
  gray: {
    light: '#F5F5F5',
    medium: '#9B9B9B',
    dark: '#4A4A4A'
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

export const typography = {
  h1: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  body: {
    fontSize: 16
  },
  caption: {
    fontSize: 14,
    color: colors.gray.medium
  }
};

export const layout = {
  containerPadding: spacing.md,
  borderRadius: 8,
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
}; 