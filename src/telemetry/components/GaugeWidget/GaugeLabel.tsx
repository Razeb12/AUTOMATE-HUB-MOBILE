import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface GaugeLabelProps {
  value: number;
  unit: string;
  precision?: number;
}

export const GaugeLabel = React.memo(({ value, unit, precision = 0 }: GaugeLabelProps) => (
  <View style={styles.container}>
    <Text style={styles.value}>{value.toFixed(precision)}</Text>
    <Text style={styles.unit}>{unit}</Text>
  </View>
));

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  unit: {
    fontSize: 14,
    color: '#6B7280',
  },
});
