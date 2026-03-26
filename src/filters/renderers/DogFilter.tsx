import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

export const DogFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const earSize = faceWidth * 0.35;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Left floppy ear */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x - earSize * 0.3,
            top: bounds.origin.y - earSize * 0.2,
            fontSize: earSize,
            transform: [{ rotate: '-25deg' }],
          },
        ]}
      >
        🐕
      </Text>
      {/* Right floppy ear */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth - earSize * 0.5,
            top: bounds.origin.y - earSize * 0.2,
            fontSize: earSize,
            transform: [{ rotate: '25deg' }, { scaleX: -1 }],
          },
        ]}
      >
        🐕
      </Text>
      {/* Dog nose */}
      {face.noseBasePosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.noseBasePosition.x - faceWidth * 0.1,
              top: face.noseBasePosition.y - faceWidth * 0.05,
              fontSize: faceWidth * 0.2,
            },
          ]}
        >
          🐽
        </Text>
      )}
      {/* Tongue below mouth */}
      {face.bottomMouthPosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.bottomMouthPosition.x - faceWidth * 0.08,
              top: face.bottomMouthPosition.y + faceWidth * 0.02,
              fontSize: faceWidth * 0.2,
            },
          ]}
        >
          👅
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
});
