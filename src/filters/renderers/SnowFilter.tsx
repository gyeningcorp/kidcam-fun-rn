import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const SNOWFLAKES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * SCREEN_W,
  size: 12 + Math.random() * 16,
  speed: 2000 + Math.random() * 3000,
  delay: Math.random() * 2000,
  emoji: i % 3 === 0 ? '❄️' : i % 3 === 1 ? '❅' : '❆',
}));

export const SnowFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const faceHeight = bounds.size.height;

  const anims = useRef(SNOWFLAKES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    SNOWFLAKES.forEach((flake, i) => {
      const animate = () => {
        anims[i].setValue(0);
        Animated.timing(anims[i], {
          toValue: 1,
          duration: flake.speed,
          delay: flake.delay,
          useNativeDriver: true,
        }).start(() => animate());
      };
      animate();
    });
  }, [anims]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Falling snowflakes */}
      {SNOWFLAKES.map((flake, i) => {
        const translateY = anims[i].interpolate({
          inputRange: [0, 1],
          outputRange: [-50, SCREEN_H + 50],
        });
        const opacity = anims[i].interpolate({
          inputRange: [0, 0.1, 0.9, 1],
          outputRange: [0, 0.8, 0.8, 0],
        });

        return (
          <Animated.Text
            key={flake.id}
            style={{
              position: 'absolute',
              left: flake.x,
              top: 0,
              fontSize: flake.size,
              color: '#FFFFFF',
              opacity,
              transform: [{ translateY }],
            }}
          >
            {flake.emoji}
          </Animated.Text>
        );
      })}
      {/* Frost effect on face edges */}
      <View
        style={{
          position: 'absolute',
          left: bounds.origin.x - faceWidth * 0.1,
          top: bounds.origin.y - faceHeight * 0.1,
          width: faceWidth * 1.2,
          height: faceHeight * 1.2,
          borderRadius: faceWidth * 0.5,
          borderWidth: 3,
          borderColor: 'rgba(180, 220, 255, 0.35)',
          backgroundColor: 'rgba(200, 230, 255, 0.06)',
        }}
      />
      {/* Ice crystals near face */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x - faceWidth * 0.15,
            top: bounds.origin.y + faceHeight * 0.3,
            fontSize: faceWidth * 0.12,
          },
        ]}
      >
        🧊
      </Text>
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 1.02,
            top: bounds.origin.y + faceHeight * 0.25,
            fontSize: faceWidth * 0.1,
          },
        ]}
      >
        🧊
      </Text>
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
