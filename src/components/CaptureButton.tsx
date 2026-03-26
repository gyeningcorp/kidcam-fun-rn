import React, { useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { colors } from '../theme/colors';

interface CaptureButtonProps {
  onPress: () => void;
}

export const CaptureButton: React.FC<CaptureButtonProps> = ({ onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.outerRing, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={styles.innerButton}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  outerRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.captureRing,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  innerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.captureInner,
  },
});
