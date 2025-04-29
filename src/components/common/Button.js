import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../styles/theme';

export const Button = ({ 
  onPress, 
  title, 
  variant = 'primary', // primary, secondary, outline
  size = 'medium', // small, medium, large
  disabled = false 
}) => {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`]
  ];

  return (
    <TouchableOpacity 
      style={buttonStyles} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  // Sizes
  small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  medium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  large: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  // Text styles
  text: {
    ...typography.body,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.background,
  },
  secondaryText: {
    color: colors.background,
  },
  outlineText: {
    color: colors.primary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
}); 