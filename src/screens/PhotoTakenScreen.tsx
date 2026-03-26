import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme/colors';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

interface PhotoTakenScreenProps {
  photoUri: string;
  onRetake: () => void;
}

export const PhotoTakenScreen: React.FC<PhotoTakenScreenProps> = ({
  photoUri,
  onRetake,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={{ uri: photoUri }}
        style={styles.photo}
        resizeMode="cover"
      />

      {/* Saved badge */}
      <View style={styles.savedBadge}>
        <Text style={styles.savedText}>Saved!</Text>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.retakeButton} onPress={onRetake}>
          <Text style={styles.retakeIcon}>📷</Text>
          <Text style={styles.retakeText}>Take Another!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  photo: {
    width: SCREEN_W,
    height: SCREEN_H,
    position: 'absolute',
  },
  savedBadge: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(105, 240, 174, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  savedText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
  actions: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.white,
  },
  retakeIcon: {
    fontSize: 22,
    marginRight: 8,
  },
  retakeText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
});
