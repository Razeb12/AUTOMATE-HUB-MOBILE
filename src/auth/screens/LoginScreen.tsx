import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLogin } from '../hooks/useLogin';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TokenService } from '../services/TokenService';

export function LoginScreen() {
  const [apiKey, setApiKey] = useState('');
  const { login, isLoading, error } = useLogin();
  const navigation = useNavigation<any>();

  React.useEffect(() => {
    TokenService.get().then(token => {
      if (token) {
        navigation.replace('Dashboard');
      }
    });
  }, [navigation]);

  const handleLogin = async () => {
    const success = await login(apiKey || 'mock_api_key_123');
    if (success) {
      navigation.replace('Dashboard');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Automat Hub</Text>
        <Text style={styles.subtitle}>Enter your API key to connect</Text>
        
        <TextInput
          style={styles.input}
          placeholder="API Key"
          value={apiKey}
          onChangeText={setApiKey}
          autoCapitalize="none"
          secureTextEntry
        />
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Connect</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 32 },
  input: { borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 8, padding: 16, fontSize: 16, marginBottom: 16, backgroundColor: '#f5f5f5' },
  button: { backgroundColor: '#208AEF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  errorText: { color: '#ef4444', marginBottom: 16, textAlign: 'center', fontSize: 14 }
});
