import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ToggleBarProps {
  isLogin?: boolean;
}

export const ToggleBar: React.FC<ToggleBarProps> = ({ isLogin = true }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={[styles.progress, isLogin ? styles.loginProgress : styles.registerProgress]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 40,
  },
  bar: {
    width: '100%',
    height: 4,
    backgroundColor: '#F0E6F5',
    borderRadius: 2,
  },
  progress: {
    position: 'absolute',
    height: '100%',
    width: '50%',
    backgroundColor: '#7A1FA0',
    borderRadius: 2,
  },
  loginProgress: {
    left: 0,
  },
  registerProgress: {
    right: 0,
  },
}); 