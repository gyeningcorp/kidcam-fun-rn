import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FilterRendererProps } from '../FilterDefinition';

export const DinoFilter: React.FC<FilterRendererProps> = ({ face }) => {
  const { bounds } = face;
  const faceWidth = bounds.size.width;
  const spikeSize = faceWidth * 0.2;

  const spikes = [0, 0.15, 0.3, 0.45, 0.6, 0.75];

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Dino spikes along top of head */}
      {spikes.map((offset, i) => (
        <Text
          key={i}
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: bounds.origin.x + faceWidth * offset,
              top: bounds.origin.y - spikeSize * (0.8 + (i % 2) * 0.3),
              fontSize: spikeSize,
            },
          ]}
        >
          🦖
        </Text>
      ))}
      {/* Scale overlay on cheeks */}
      {face.leftCheekPosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.leftCheekPosition.x - faceWidth * 0.1,
              top: face.leftCheekPosition.y - faceWidth * 0.05,
              fontSize: faceWidth * 0.12,
            },
          ]}
        >
          🟢
        </Text>
      )}
      {face.rightCheekPosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.rightCheekPosition.x - faceWidth * 0.02,
              top: face.rightCheekPosition.y - faceWidth * 0.05,
              fontSize: faceWidth * 0.12,
            },
          ]}
        >
          🟢
        </Text>
      )}
      {/* Dino teeth below mouth */}
      {face.bottomMouthPosition && (
        <Text
          style={[
            styles.emoji,
            {
              position: 'absolute',
              left: face.bottomMouthPosition.x - faceWidth * 0.15,
              top: face.bottomMouthPosition.y,
              fontSize: faceWidth * 0.1,
              letterSpacing: 2,
            },
          ]}
        >
          🦷🦷🦷
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
