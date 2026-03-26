import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useCameraPermissions } from 'expo-camera';

import { CameraScreen } from './src/screens/CameraScreen';
import { PhotoTakenScreen } from './src/screens/PhotoTakenScreen';
import { ParentGateScreen } from './src/screens/ParentGateScreen';
import { ParentSettingsSheet } from './src/components/ParentSettingsSheet';
import { useParentGate } from './src/hooks/useParentGate';
import { colors } from './src/theme/colors';

type Screen = 'camera' | 'photo' | 'parentGate';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [screen, setScreen] = useState<Screen>('camera');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const parentGate = useParentGate();

  // Generate initial challenge
  useEffect(() => {
    parentGate.generateChallenge();
  }, []);

  // Permission not yet determined
  if (!permission) {
    return (
      <View style={styles.centered}>
        <StatusBar hidden />
        <ActivityIndicator size="large" color={colors.accentBlue} />
      </View>
    );
  }

  // Permission denied
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <StatusBar hidden />
        <Text style={styles.permEmoji}>📷</Text>
        <Text style={styles.permTitle}>Camera Access Needed</Text>
        <Text style={styles.permSubtitle}>
          KidCam Fun needs your camera to show fun face filters!
        </Text>
        <TouchableOpacity style={styles.permButton} onPress={requestPermission}>
          <Text style={styles.permButtonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Main app screens
  if (screen === 'parentGate') {
    return (
      <ParentGateScreen
        challenge={parentGate.challenge}
        attempts={parentGate.attempts}
        isCoolingDown={parentGate.isCoolingDown}
        cooldownEnd={parentGate.cooldownEnd}
        onAnswer={parentGate.checkAnswer}
        onClose={() => setScreen('camera')}
        onSuccess={() => {
          setScreen('camera');
          setSettingsVisible(true);
        }}
      />
    );
  }

  if (screen === 'photo' && photoUri) {
    return (
      <PhotoTakenScreen
        photoUri={photoUri}
        onRetake={() => {
          setPhotoUri(null);
          setScreen('camera');
        }}
      />
    );
  }

  return (
    <>
      <CameraScreen
        onPhotoTaken={(uri) => {
          setPhotoUri(uri);
          setScreen('photo');
        }}
        onParentGate={() => {
          parentGate.generateChallenge();
          setScreen('parentGate');
        }}
      />
      <ParentSettingsSheet
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  permTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  permSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  permButton: {
    backgroundColor: colors.accentBlue,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  permButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
});
