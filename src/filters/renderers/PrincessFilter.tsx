import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

export const PrincessFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const crownSize = faceWidth * 0.5;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Crown on forehead */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.25,
            top: bounds.origin.y - crownSize * 0.8,
            fontSize: crownSize,
          },
        ]}
      >
        👑
      </Text>
      {/* Sparkles around face */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x - faceWidth * 0.15,
            top: bounds.origin.y + faceWidth * 0.1,
            fontSize: faceWidth * 0.15,
          },
        ]}
      >
        ✨
      </Text>
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 1.0,
            top: bounds.origin.y + faceWidth * 0.15,
            fontSize: faceWidth * 0.12,
          },
        ]}
      >
        ✨
      </Text>
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.05,
            top: bounds.origin.y - crownSize * 0.3,
            fontSize: faceWidth * 0.1,
          },
        ]}
      >
        💎
      </Text>
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.85,
            top: bounds.origin.y - crownSize * 0.3,
            fontSize: faceWidth * 0.1,
          },
        ]}
      >
        💎
      </Text>
      {/* Blush on cheeks */}
      {face.leftCheekPosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.leftCheekPosition.x - faceWidth * 0.06,
              top: face.leftCheekPosition.y - faceWidth * 0.04,
              fontSize: faceWidth * 0.12,
              opacity: 0.6,
            },
          ]}
        >
          🩷
        </Text>
      )}
      {face.rightCheekPosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.rightCheekPosition.x - faceWidth * 0.02,
              top: face.rightCheekPosition.y - faceWidth * 0.04,
              fontSize: faceWidth * 0.12,
              opacity: 0.6,
            },
          ]}
        >
          🩷
        </Text>
      )}
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
