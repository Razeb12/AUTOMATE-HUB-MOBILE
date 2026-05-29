import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedProps, SharedValue } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface GaugeArcProps {
  radius: number;
  strokeWidth: number;
  progress: SharedValue<number>;
  color: string;
}

export const GaugeArc = React.memo(({ radius, strokeWidth, progress, color }: GaugeArcProps) => {
  const circumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - progress.value * circumference;
    return { strokeDashoffset };
  });

  return (
    <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth} style={styles.svg}>
      <Circle
        cx={radius + strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        r={radius}
        stroke="#E5E7EB"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      <AnimatedCircle
        cx={radius + strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        animatedProps={animatedProps}
        strokeLinecap="round"
      />
    </Svg>
  );
});

const styles = StyleSheet.create({
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
});
