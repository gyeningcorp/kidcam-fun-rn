import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

export const PirateFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const hatSize = faceWidth * 0.6;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Pirate hat */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.15,
            top: bounds.origin.y - hatSize * 0.85,
            fontSize: hatSize,
          },
        ]}
      >
        🏴‍☠️
      </Text>
      {/* Eye patch on left eye */}
      {face.leftEyePosition && (
        <View
          style={{
            position: 'absolute',
            left: face.leftEyePosition.x - faceWidth * 0.07,
            top: face.leftEyePosition.y - faceWidth * 0.06,
            width: faceWidth * 0.16,
            height: faceWidth * 0.14,
            backgroundColor: '#1a1a1a',
            borderRadius: faceWidth * 0.08,
            borderWidth: 2,
            borderColor: '#333',
          }}
        />
      )}
      {/* Eye patch strap hint */}
      {face.leftEyePosition && (
        <View
          style={{
            position: 'absolute',
            left: face.leftEyePosition.x - faceWidth * 0.3,
            top: face.leftEyePosition.y - faceWidth * 0.01,
            width: faceWidth * 0.25,
            height: 3,
            backgroundColor: '#333',
            transform: [{ rotate: '-15deg' }],
          }}
        />
      )}
      {/* Gold tooth / smile */}
      {face.bottomMouthPosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.bottomMouthPosition.x - faceWidth * 0.03,
              top: face.bottomMouthPosition.y - faceWidth * 0.02,
              fontSize: faceWidth * 0.08,
            },
          ]}
        >
          🪙
        </Text>
      )}
      {/* Parrot on shoulder */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 1.05,
            top: bounds.origin.y + faceWidth * 0.5,
            fontSize: faceWidth * 0.25,
            transform: [{ scaleX: -1 }],
          },
        ]}
      >
        🦜
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emoji: {
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
