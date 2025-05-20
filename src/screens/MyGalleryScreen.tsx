import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useStories } from '../contexts/StoryContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';

type RootStackParamList = {
  StoryDetail: { story: any };
  StoryPlayer: { story: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MyGalleryScreen = () => {
  const { stories, removeStory } = useStories();
  const navigation = useNavigation<NavigationProp>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (uri: string | null) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠어요?', [
      { text: '취소', style: 'cancel' },
      { text: '삭제', style: 'destructive', onPress: () => removeStory(uri) },
    ]);
  };

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.time.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: any }) => (
    <LinearGradient
      colors={['#A18CD1', '#FBC2EB']}
      style={styles.card}
    >
      <View style={styles.leftContent}>
        <TouchableOpacity style={styles.playBtnBox} onPress={() => navigation.navigate('StoryPlayer', { story: item })}>
          <View style={styles.playBtnRect}>
            <Ionicons name="play" size={44} color="#fff" />
          </View>
        </TouchableOpacity>
        <View style={styles.textBox}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{item.time}</Text>
        </View>
        {isEditMode && (
          <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.uri)}>
            <Ionicons name="remove-circle" size={32} color="#FF8C94" />
          </TouchableOpacity>
        )}
      </View>
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => Alert.alert('마이페이지로 이동(구현 필요)')}
          style={styles.headerIconBtn}>
          <Ionicons name="happy-outline" size={28} color="#7A1FA0" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => setIsEditMode(e => !e)} style={styles.headerIconBtn}>
          <Ionicons name="pencil-outline" size={26} color="#7A1FA0" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerTextWrapper}>
        <Text style={styles.headerTitle}>아이와 함께한 창작의 순간들.</Text>
        <Text style={styles.headerSubtitle}>이곳에서 창작물을 다시 감상하세요</Text>
      </View>
      <View style={styles.searchBarWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="제목으로 검색"
          iconColor="#7A1FA0"
          iconSize={26}
        />
      </View>
      <FlatList
        data={filteredStories}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6FB',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 0,
    backgroundColor: 'transparent',
  },
  headerTextWrapper: {
    paddingHorizontal: 16,
    marginBottom: 4,
    marginTop: 8,
  },
  headerIconBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7A1FA0',
    marginBottom: 5,
    textAlign: 'left',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#EC913F',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 18,
    marginBottom: 0,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    marginBottom: 22,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 160,
    width: '100%',
  },
  leftContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginRight: 18,
  },
  playBtnBox: {
    marginBottom: 16,
  },
  playBtnRect: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  date: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  thumbnail: {
    width: 110,
    height: 110,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#fff',
    marginLeft: 8,
  },
  deleteBtn: {
    marginTop: 8,
  },
  searchBarWrapper: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
}); 