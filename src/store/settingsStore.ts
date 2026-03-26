import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  soundEnabled: 'settings_sound_enabled',
  savePhotos: 'settings_save_photos',
};

export const settingsStore = {
  async getSoundEnabled(): Promise<boolean> {
    const val = await AsyncStorage.getItem(KEYS.soundEnabled);
    return val === null ? true : val === 'true';
  },

  async setSoundEnabled(enabled: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.soundEnabled, String(enabled));
  },

  async getSavePhotos(): Promise<boolean> {
    const val = await AsyncStorage.getItem(KEYS.savePhotos);
    return val === null ? true : val === 'true';
  },

  async setSavePhotos(enabled: boolean): Promise<void> {
    await AsyncStorage.setItem(KEYS.savePhotos, String(enabled));
  },

  async clearAllPhotos(): Promise<void> {
    // This is a placeholder — actual photo deletion would use expo-media-library
    // For now it just signals the intent
    await AsyncStorage.setItem('photos_cleared_at', new Date().toISOString());
  },
};
