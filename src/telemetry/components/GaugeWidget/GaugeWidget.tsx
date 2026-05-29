import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GaugeArc } from './GaugeArc';
import { GaugeLabel } from './GaugeLabel';
import { useGaugeAnimation } from './useGaugeAnimation';
import { resolveGaugeColor } from '@shared/utils/formatValue';

interface GaugeWidgetProps {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  thresholds: { warn: number; critical: number };
}

export const GaugeWidget = React.memo(({ value, min, max, label, unit, thresholds }: GaugeWidgetProps) => {
  const progress = useGaugeAnimation(value, max);
  const color = resolveGaugeColor(value, thresholds);

  return (
    <View style={styles.container}>
      <GaugeArc radius={60} strokeWidth={10} progress={progress} color={color} />
      <View style={styles.labelContainer}>
        <GaugeLabel value={value} unit={unit} precision={0} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    margin: 10,
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
