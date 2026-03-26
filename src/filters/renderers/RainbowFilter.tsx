import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

export const RainbowFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const faceHeight = bounds.size.height;

  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [sparkleAnim]);

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Rainbow arc above head */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x - faceWidth * 0.1,
            top: bounds.origin.y - faceWidth * 0.7,
            fontSize: faceWidth * 0.8,
          },
        ]}
      >
        🌈
      </Text>
      {/* Sparkle particles */}
      {[
        { x: -0.2, y: 0.1 },
        { x: 1.05, y: 0.2 },
        { x: 0.1, y: -0.3 },
        { x: 0.8, y: -0.35 },
        { x: -0.15, y: 0.6 },
        { x: 1.1, y: 0.55 },
        { x: 0.5, y: -0.5 },
      ].map((pos, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: bounds.origin.x + faceWidth * pos.x,
              top: bounds.origin.y + faceHeight * pos.y,
              fontSize: faceWidth * (0.08 + (i % 3) * 0.03),
              opacity: sparkleOpacity,
            },
          ]}
        >
          {i % 2 === 0 ? '✨' : '💫'}
        </Animated.Text>
      ))}
      {/* Star on forehead */}
      <Animated.Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.35,
            top: bounds.origin.y + faceWidth * 0.05,
            fontSize: faceWidth * 0.15,
            opacity: sparkleOpacity,
          },
        ]}
      >
        ⭐
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emoji: {
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
