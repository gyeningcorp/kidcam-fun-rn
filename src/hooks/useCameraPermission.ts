import { useState, useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';

export function useCameraPermission() {
  const [permission, requestPermission] = useCameraPermissions();

  return {
    hasPermission: permission?.granted ?? false,
    isLoading: !permission,
    requestPermission,
  };
}
