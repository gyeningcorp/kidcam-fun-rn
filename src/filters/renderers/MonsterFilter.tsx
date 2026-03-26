import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

export const MonsterFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const hornSize = faceWidth * 0.25;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Left horn */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.05,
            top: bounds.origin.y - hornSize * 1.3,
            fontSize: hornSize,
            transform: [{ rotate: '-20deg' }],
          },
        ]}
      >
        📐
      </Text>
      {/* Right horn */}
      <Text
        style={[
          styles.emoji,
          {
            position: 'absolute',
            left: bounds.origin.x + faceWidth * 0.7,
            top: bounds.origin.y - hornSize * 1.3,
            fontSize: hornSize,
            transform: [{ rotate: '20deg' }, { scaleX: -1 }],
          },
        ]}
      >
        📐
      </Text>
      {/* Googly eyes over real eyes */}
      {face.leftEyePosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.leftEyePosition.x - faceWidth * 0.1,
              top: face.leftEyePosition.y - faceWidth * 0.12,
              fontSize: faceWidth * 0.22,
            },
          ]}
        >
          👁️
        </Text>
      )}
      {face.rightEyePosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.rightEyePosition.x - faceWidth * 0.1,
              top: face.rightEyePosition.y - faceWidth * 0.12,
              fontSize: faceWidth * 0.22,
            },
          ]}
        >
          👁️
        </Text>
      )}
      {/* Monster teeth */}
      {face.bottomMouthPosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.bottomMouthPosition.x - faceWidth * 0.15,
              top: face.bottomMouthPosition.y - faceWidth * 0.02,
              fontSize: faceWidth * 0.08,
              letterSpacing: -2,
            },
          ]}
        >
          🦷🦷🦷🦷
        </Text>
      )}
      {/* Green tint on skin */}
      <View
        style={{
          position: 'absolute',
          left: bounds.origin.x,
          top: bounds.origin.y,
          width: faceWidth,
          height: bounds.size.height,
          backgroundColor: 'rgba(0, 180, 0, 0.08)',
          borderRadius: faceWidth * 0.4,
        }}
      />
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
