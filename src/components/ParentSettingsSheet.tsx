import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { settingsStore } from '../store/settingsStore';
import { colors } from '../theme/colors';

interface ParentSettingsSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const ParentSettingsSheet: React.FC<ParentSettingsSheetProps> = ({
  visible,
  onClose,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [savePhotos, setSavePhotos] = useState(true);

  useEffect(() => {
    if (visible) {
      settingsStore.getSoundEnabled().then(setSoundEnabled);
      settingsStore.getSavePhotos().then(setSavePhotos);
    }
  }, [visible]);

  const toggleSound = async (val: boolean) => {
    setSoundEnabled(val);
    await settingsStore.setSoundEnabled(val);
  };

  const toggleSavePhotos = async (val: boolean) => {
    setSavePhotos(val);
    await settingsStore.setSavePhotos(val);
  };

  const handleClearPhotos = () => {
    Alert.alert(
      'Clear All Photos',
      'Are you sure you want to delete all saved photos?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            await settingsStore.clearAllPhotos();
            Alert.alert('Done', 'All photos have been cleared.');
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>Parent Settings</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Sound Effects</Text>
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: '#555', true: colors.accentGreen }}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Save Photos to Gallery</Text>
            <Switch
              value={savePhotos}
              onValueChange={toggleSavePhotos}
              trackColor={{ false: '#555', true: colors.accentGreen }}
            />
          </View>

          <TouchableOpacity style={styles.dangerButton} onPress={handleClearPhotos}>
            <Text style={styles.dangerText}>Clear All Photos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 48,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#555',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  dangerButton: {
    marginTop: 24,
    backgroundColor: 'rgba(255, 82, 82, 0.15)',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.danger,
  },
  dangerText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: colors.accentBlue,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
