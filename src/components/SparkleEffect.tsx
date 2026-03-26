import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { FaceData } from '../filters/FilterDefinition';

const NUM_SPARKLES = 12;

interface SparkleEffectProps {
  face: FaceData;
  active: boolean;
}

export const SparkleEffect: React.FC<SparkleEffectProps> = ({ face, active }) => {
  const anims = useRef(
    Array.from({ length: NUM_SPARKLES }, () => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    if (!active) return;

    anims.forEach((anim, i) => {
      const angle = (Math.PI * 2 * i) / NUM_SPARKLES;
      const distance = 40 + Math.random() * 60;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const delay = i * 60;

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(anim.translateX, {
            toValue: dx,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: dy,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.spring(anim.scale, {
              toValue: 1,
              friction: 4,
              useNativeDriver: true,
            }),
            Animated.timing(anim.scale, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]).start();
    });

    return () => {
      anims.forEach((anim) => {
        anim.translateX.setValue(0);
        anim.translateY.setValue(0);
        anim.opacity.setValue(0);
        anim.scale.setValue(0);
      });
    };
  }, [active, anims]);

  if (!active || !face.leftCheekPosition || !face.rightCheekPosition) return null;

  const cx =
    (face.leftCheekPosition.x + face.rightCheekPosition.x) / 2;
  const cy =
    (face.leftCheekPosition.y + face.rightCheekPosition.y) / 2;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {anims.map((anim, i) => (
        <Animated.Text
          key={i}
          style={{
            position: 'absolute',
            left: cx,
            top: cy,
            fontSize: 16 + (i % 3) * 4,
            transform: [
              { translateX: anim.translateX },
              { translateY: anim.translateY },
              { scale: anim.scale },
            ],
            opacity: anim.opacity,
          }}
        >
          {i % 3 === 0 ? '✨' : i % 3 === 1 ? '💫' : '⭐'}
        </Animated.Text>
      ))}
    </View>
  );
};
