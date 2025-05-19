import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useStories } from '../contexts/StoryContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export const GalleryScreen = () => {
  const { stories } = useStories();

  const renderItem = ({ item, index }: any) => (
    <LinearGradient
      colors={['#A18CD1', '#FBC2EB']}
      style={styles.card}
    >
      <TouchableOpacity style={styles.playBtn}>
        <Ionicons name="play-circle" size={32} color="#fff" />
      </TouchableOpacity>
      <Image source={{ uri: item.uri }} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.time}</Text>
      </View>
      <TouchableOpacity style={styles.moreBtn}>
        <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>보관함</Text>
      <Text style={styles.headerSubtitle}>아이와 함께한 창작의 순간들.\n이곳에서 창작물을 다시 감상하세요</Text>
      <FlatList
        data={stories}
        renderItem={renderItem}
        keyExtractor={(_, idx) => idx.toString()}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f6fb',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
    textAlign: 'left',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#A16AE8',
    marginBottom: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    marginBottom: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  playBtn: {
    marginRight: 10,
    marginLeft: 2,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginRight: 14,
    borderWidth: 2,
    borderColor: '#fff',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  moreBtn: {
    marginLeft: 10,
    padding: 4,
  },
}); 