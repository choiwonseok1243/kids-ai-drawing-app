import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { colors, typography, spacing, layout } from '../styles/theme';

const SAMPLE_DRAWINGS = [
  {
    id: 1,
    title: '꽃밭과 그림판',
    image: require('../assets/images/sample1.png')
  },
  {
    id: 2,
    title: '작약 꽃나들',
    image: require('../assets/images/sample2.png')
  },
  {
    id: 3,
    title: '마법의 아티카드',
    image: require('../assets/images/sample3.png')
  },
  {
    id: 4,
    title: '나모를 정돈케 돕까',
    image: require('../assets/images/sample4.png')
  }
];

export const CreateScreen = ({ navigation }) => {
  const [selectedDrawing, setSelectedDrawing] = useState(null);

  const handleDrawingSelect = (drawing) => {
    setSelectedDrawing(drawing);
    navigation.navigate('CreateDetail', { drawing });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>어떤한 그림으로 이야기를 만들어 볼까요?</Text>
        <Text style={styles.subtitle}>마법처리 그리고 나의 이야기를 만들어요!</Text>
      </View>

      <View style={styles.gridContainer}>
        {SAMPLE_DRAWINGS.map((drawing) => (
          <TouchableOpacity
            key={drawing.id}
            style={styles.gridItem}
            onPress={() => handleDrawingSelect(drawing)}
          >
            <View style={styles.imageContainer}>
              <Image
                source={drawing.image}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.imageTitle}>{drawing.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.gray.medium,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.sm,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: spacing.md,
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: layout.borderRadius,
    overflow: 'hidden',
    backgroundColor: colors.gray.light,
    ...layout.shadow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageTitle: {
    ...typography.caption,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
}); 