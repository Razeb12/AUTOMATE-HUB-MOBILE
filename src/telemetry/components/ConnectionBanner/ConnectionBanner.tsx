import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useConnectionStatus } from '../../hooks/useConnectionStatus';
import { ConnectionStatus } from '@websocket/websocket.types';
import { PulseDot } from './PulseDot';

export const ConnectionBanner = React.memo(() => {
  const status = useConnectionStatus();

  let color = '#6B7280';
  let text = 'Disconnected';
  let pulse = false;

  switch (status) {
    case ConnectionStatus.CONNECTED:
      color = '#22C55E';
      text = 'Live';
      pulse = true;
      break;
    case ConnectionStatus.CONNECTING:
    case ConnectionStatus.RECONNECTING:
      color = '#F59E0B';
      text = 'Connecting...';
      pulse = true;
      break;
    case ConnectionStatus.ERROR:
      color = '#EF4444';
      text = 'Connection Error';
      break;
  }

  return (
    <View style={styles.container}>
      <PulseDot color={color} pulse={pulse} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    margin: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});
