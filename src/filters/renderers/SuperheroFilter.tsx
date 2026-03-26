import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

export const SuperheroFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const maskWidth = faceWidth * 0.9;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Mask over eyes area */}
      {face.leftEyePosition && face.rightEyePosition && (
        <View
          style={{
            position: 'absolute',
            left: face.leftEyePosition.x - faceWidth * 0.15,
            top: face.leftEyePosition.y - faceWidth * 0.1,
            width: maskWidth,
            height: faceWidth * 0.22,
            backgroundColor: 'rgba(220, 20, 20, 0.7)',
            borderRadius: faceWidth * 0.1,
            borderWidth: 2,
            borderColor: '#FFD700',
          }}
        />
      )}
      {/* Eye holes */}
      {face.leftEyePosition && (
        <View
          style={{
            position: 'absolute',
            left: face.leftEyePosition.x - faceWidth * 0.06,
            top: face.leftEyePosition.y - faceWidth * 0.05,
            width: faceWidth * 0.14,
            height: faceWidth * 0.1,
            backgroundColor: 'transparent',
            borderRadius: faceWidth * 0.07,
            borderWidth: 2,
            borderColor: '#FFD700',
          }}
        />
      )}
      {face.rightEyePosition && (
        <View
          style={{
            position: 'absolute',
            left: face.rightEyePosition.x - faceWidth * 0.06,
            top: face.rightEyePosition.y - faceWidth * 0.05,
            width: faceWidth * 0.14,
            height: faceWidth * 0.1,
            backgroundColor: 'transparent',
            borderRadius: faceWidth * 0.07,
            borderWidth: 2,
            borderColor: '#FFD700',
          }}
        />
      )}
      {/* Lightning bolt */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.3,
            top: bounds.origin.y - faceWidth * 0.4,
            fontSize: faceWidth * 0.35,
          },
        ]}
      >
        ⚡
      </Text>
      {/* Cape hint */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 1.0,
            top: bounds.origin.y + faceWidth * 0.3,
            fontSize: faceWidth * 0.2,
            transform: [{ rotate: '15deg' }],
          },
        ]}
      >
        🦸
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
