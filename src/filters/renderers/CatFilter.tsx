import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

export const CatFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const faceHeight = bounds.size.height;
  const earSize = faceWidth * 0.35;
  const whiskerLen = faceWidth * 0.4;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Left ear */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.05,
            top: bounds.origin.y - earSize * 0.6,
            fontSize: earSize,
            transform: [{ rotate: '-15deg' }],
          },
        ]}
      >
        🐱
      </Text>
      {/* Right ear */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.6,
            top: bounds.origin.y - earSize * 0.6,
            fontSize: earSize,
            transform: [{ rotate: '15deg' }],
          },
        ]}
      >
        🐱
      </Text>
      {/* Nose */}
      {face.noseBasePosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.noseBasePosition.x - faceWidth * 0.08,
              top: face.noseBasePosition.y - faceWidth * 0.08,
              fontSize: faceWidth * 0.15,
            },
          ]}
        >
          🐾
        </Text>
      )}
      {/* Left whiskers */}
      {face.leftCheekPosition && (
        <Text
          style={[
            styles.whisker,
            {
              position: 'absolute',
              left: face.leftCheekPosition.x - whiskerLen,
              top: face.leftCheekPosition.y - 5,
              fontSize: faceWidth * 0.06,
            },
          ]}
        >
          ━━━
        </Text>
      )}
      {/* Right whiskers */}
      {face.rightCheekPosition && (
        <Text
          style={[
            styles.whisker,
            {
              position: 'absolute',
              left: face.rightCheekPosition.x + 5,
              top: face.rightCheekPosition.y - 5,
              fontSize: faceWidth * 0.06,
            },
          ]}
        >
          ━━━
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emoji: {
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  whisker: {
    color: '#555555',
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
