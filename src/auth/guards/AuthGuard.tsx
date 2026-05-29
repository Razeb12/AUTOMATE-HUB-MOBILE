import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { TokenService } from '../services/TokenService';
import { useNavigation } from '@react-navigation/native';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkToken = async () => {
      const token = await TokenService.get();
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigation.replace('Login');
      }
    };
    checkToken();
  }, [navigation]);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#208AEF" />
      </View>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
