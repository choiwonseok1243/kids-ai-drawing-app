import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Scene {
  image: string | null;
  prompt: string;
}

interface Story {
  uri: string | null;
  title: string;
  description: string;
  time: string;
  scenes: Scene[];
}

export const StoryPlayerScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { story } = route.params as { story: Story };
  const [currentIdx, setCurrentIdx] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const windowWidth = Dimensions.get('window').width;

  const goPrev = () => {
    if (currentIdx > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIdx - 1, animated: true });
      setCurrentIdx(currentIdx - 1);
    }
  };
  const goNext = () => {
    if (currentIdx < story.scenes.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIdx + 1, animated: true });
      setCurrentIdx(currentIdx + 1);
    }
  };

  const renderScene = ({ item, index }: { item: Scene; index: number }) => (
    <View style={[styles.slide, { width: windowWidth }]}> 
      <Text style={styles.title}>{story.title}</Text>
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.image || story.uri || '' }} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.storyBox}>
        <Text style={styles.storyLabel}>이야기 내용</Text>
        <Text style={styles.storyContent}>{item.prompt}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={story.scenes}
        renderItem={renderScene}
        keyExtractor={(_, idx) => idx.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentIdx}
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
          setCurrentIdx(idx);
        }}
        getItemLayout={(_, index) => ({ length: windowWidth, offset: windowWidth * index, index })}
        style={{ flex: 1 }}
      />
      <View style={styles.arrowRow}>
        <TouchableOpacity style={styles.arrowBtn} onPress={goPrev} disabled={currentIdx === 0}>
          <Ionicons name="chevron-back" size={28} color={currentIdx === 0 ? '#A16AE855' : '#A16AE8'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowBtn} onPress={goNext} disabled={currentIdx === story.scenes.length - 1}>
          <Ionicons name="chevron-forward" size={28} color={currentIdx === story.scenes.length - 1 ? '#A16AE855' : '#A16AE8'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A16AE8',
    marginBottom: 18,
    textAlign: 'center',
    fontFamily: 'BMJUA',
  },
  imageWrap: {
    width: '90%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#A16AE8',
    marginBottom: 18,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  storyBox: {
    width: '90%',
    backgroundColor: '#F8F6FF',
    borderRadius: 12,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#A16AE8',
    marginTop: 10,
  },
  storyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A16AE8',
    marginBottom: 8,
    fontFamily: 'BMJUA',
  },
  storyContent: {
    fontSize: 16,
    color: '#222',
    lineHeight: 22,
    fontFamily: 'BMJUA',
  },
  arrowRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  arrowBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3EFFF',
    marginHorizontal: 16,
  },
  arrowText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A16AE8',
    fontFamily: 'BMJUA',
  },
}); 