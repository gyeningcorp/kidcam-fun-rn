import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

export const SpaceFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const faceHeight = bounds.size.height;
  const helmetPad = faceWidth * 0.2;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Space helmet outline */}
      <View
        style={{
          position: 'absolute',
          left: bounds.origin.x - helmetPad,
          top: bounds.origin.y - helmetPad * 1.5,
          width: faceWidth + helmetPad * 2,
          height: faceHeight + helmetPad * 2,
          borderRadius: (faceWidth + helmetPad * 2) / 2,
          borderWidth: 4,
          borderColor: 'rgba(200, 200, 220, 0.6)',
          backgroundColor: 'rgba(150, 200, 255, 0.08)',
        }}
      />
      {/* Helmet visor shine */}
      <View
        style={{
          position: 'absolute',
          left: bounds.origin.x + faceWidth * 0.6,
          top: bounds.origin.y - helmetPad * 0.5,
          width: faceWidth * 0.15,
          height: faceHeight * 0.4,
          borderRadius: faceWidth * 0.08,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          transform: [{ rotate: '15deg' }],
        }}
      />
      {/* Stars around head */}
      {[
        { x: -0.3, y: -0.2, size: 0.12, emoji: '⭐' },
        { x: 1.1, y: 0.0, size: 0.1, emoji: '🌟' },
        { x: -0.2, y: 0.8, size: 0.08, emoji: '✨' },
        { x: 1.15, y: 0.7, size: 0.09, emoji: '⭐' },
        { x: 0.3, y: -0.5, size: 0.1, emoji: '🌟' },
        { x: 0.7, y: -0.45, size: 0.07, emoji: '✨' },
      ].map((star, i) => (
        <Text
          key={i}
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: bounds.origin.x + faceWidth * star.x,
              top: bounds.origin.y + faceHeight * star.y,
              fontSize: faceWidth * star.size,
            },
          ]}
        >
          {star.emoji}
        </Text>
      ))}
      {/* Rocket */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 1.15,
            top: bounds.origin.y - faceWidth * 0.3,
            fontSize: faceWidth * 0.2,
            transform: [{ rotate: '45deg' }],
          },
        ]}
      >
        🚀
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emoji: {
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
