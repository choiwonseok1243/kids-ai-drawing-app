import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { login } from '../api/auth';
import { useAuth } from '../contexts/AuthContext';
import { ToggleBar } from '../components/ToggleBar';

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setAuthData } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('알림', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await login(email, password);
      
      // 로그인 성공 시 인증 정보 저장
      await setAuthData(response.user, response.token);
      
      // 메인 화면으로 이동
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('로그인 실패', error instanceof Error ? error.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.topSpace} />
            <ToggleBar isLogin={true} />
            
            <View style={styles.contentContainer}>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>KINO</Text>
                <Text style={styles.subtitle}>당신의 그림을 기록하세요</Text>
              </View>

              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="이메일"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  editable={!isLoading}
                />
                <TextInput
                  style={styles.input}
                  placeholder="비밀번호"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={Keyboard.dismiss}
                  editable={!isLoading}
                />

                <TouchableOpacity 
                  style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.loginButtonText}>로그인</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.registerButton} 
                  onPress={() => navigation.navigate('Register')}
                  disabled={isLoading}
                >
                  <View style={styles.registerButtonContent}>
                    <Text style={styles.registerButtonText}>키노가 처음이신가요?</Text>
                    <View style={styles.registerLinkContainer}>
                      <Text style={styles.registerButtonLink}>계정 만들러 가기</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.bottomSpace} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  topSpace: {
    height: 80,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#7A1FA0',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: '#7A1FA0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  registerButtonText: {
    color: '#666',
    fontSize: 14,
  },
  registerLinkContainer: {
    backgroundColor: '#7A1FA0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  registerButtonLink: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  bottomSpace: {
    height: Platform.OS === 'ios' ? 20 : 100,
  },
  loginButtonDisabled: {
    backgroundColor: '#b984d1',
  },
}); 