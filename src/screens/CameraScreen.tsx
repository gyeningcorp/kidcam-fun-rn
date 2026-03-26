import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as MediaLibrary from 'expo-media-library';
import * as Haptics from 'expo-haptics';
import { StatusBar } from 'expo-status-bar';

import { FilterOverlay } from '../components/FilterOverlay';
import { FilterCarousel } from '../components/FilterCarousel';
import { CaptureButton } from '../components/CaptureButton';
import { SparkleEffect } from '../components/SparkleEffect';
import { useFaceDetection } from '../hooks/useFaceDetection';
import { filters } from '../filters/FilterRegistry';
import { settingsStore } from '../store/settingsStore';
import { colors } from '../theme/colors';

interface CameraScreenProps {
  onPhotoTaken: (uri: string) => void;
  onParentGate: () => void;
}

export const CameraScreen: React.FC<CameraScreenProps> = ({
  onPhotoTaken,
  onParentGate,
}) => {
  const cameraRef = useRef<CameraView>(null);
  const [filterIndex, setFilterIndex] = useState(0);
  const { face, isSmiling, handleFacesDetected } = useFaceDetection();

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current) return;

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        skipProcessing: false,
      });

      if (photo?.uri) {
        const saveEnabled = await settingsStore.getSavePhotos();
        if (saveEnabled) {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status === 'granted') {
            await MediaLibrary.saveToLibraryAsync(photo.uri);
          }
        }
        onPhotoTaken(photo.uri);
      }
    } catch (err) {
      console.warn('Capture failed:', err);
    }
  }, [onPhotoTaken]);

  const activeFilter = filters[filterIndex];

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="front"
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 50,
          tracking: true,
        }}
      />

      {/* Filter overlay */}
      <FilterOverlay face={face} filter={activeFilter} />

      {/* Smile sparkle effect */}
      {face && <SparkleEffect face={face} active={isSmiling} />}

      {/* Parent gate lock icon */}
      <TouchableOpacity style={styles.lockButton} onPress={onParentGate}>
        <Text style={styles.lockIcon}>🔒</Text>
      </TouchableOpacity>

      {/* Filter carousel */}
      <FilterCarousel
        filters={filters}
        activeIndex={filterIndex}
        onChange={setFilterIndex}
      />

      {/* Capture button */}
      <CaptureButton onPress={handleCapture} />

      {/* Bottom gradient overlay */}
      <View style={styles.bottomGradient} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  lockButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
  lockIcon: {
    fontSize: 20,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    // Using a simple semi-transparent overlay instead of LinearGradient
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
});
