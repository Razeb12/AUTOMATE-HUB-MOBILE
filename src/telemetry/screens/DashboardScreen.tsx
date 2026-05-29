import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTelemetryStream } from '../hooks/useTelemetryStream';
import { ConnectionBanner } from '../components/ConnectionBanner/ConnectionBanner';
import { GaugeWidget } from '../components/GaugeWidget/GaugeWidget';
import { useTelemetryStore } from '../store/telemetry.slice';
import { TokenService } from '../../auth/services/TokenService';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from 'react-native';

export function DashboardScreen() {
  const [token, setToken] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    TokenService.get().then(t => setToken(t));
  }, []);

  useTelemetryStream('test-session', token || '');

  const rpm = useTelemetryStore(s => s.rpm);
  const speed = useTelemetryStore(s => s.speed);
  const coolantTemp = useTelemetryStore(s => s.coolantTemp);

  if (!token) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#208AEF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ConnectionBanner />
      
      <View style={styles.grid}>
        <GaugeWidget 
          label="RPM" 
          value={rpm} 
          unit="RPM" 
          min={0} 
          max={8000} 
          thresholds={{ warn: 5500, critical: 6500 }} 
        />
        <GaugeWidget 
          label="Speed" 
          value={speed} 
          unit="km/h" 
          min={0} 
          max={260} 
          thresholds={{ warn: 100, critical: 130 }} 
        />
        <GaugeWidget 
          label="Coolant" 
          value={coolantTemp} 
          unit="°C" 
          min={-40} 
          max={215} 
          thresholds={{ warn: 95, critical: 105 }} 
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={async () => {
          await TokenService.clear();
          navigation.replace('Login');
        }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 16,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
