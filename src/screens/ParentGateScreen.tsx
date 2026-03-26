import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const { width: SCREEN_W } = Dimensions.get('window');

interface ParentGateScreenProps {
  challenge: { a: number; b: number };
  attempts: number;
  isCoolingDown: boolean;
  cooldownEnd: number | null;
  onAnswer: (answer: number) => boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ParentGateScreen: React.FC<ParentGateScreenProps> = ({
  challenge,
  attempts,
  isCoolingDown,
  cooldownEnd,
  onAnswer,
  onClose,
  onSuccess,
}) => {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);

  useEffect(() => {
    if (!isCoolingDown || !cooldownEnd) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000));
      setCooldownSeconds(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCoolingDown, cooldownEnd]);

  const handleNumberPress = (num: number) => {
    if (isCoolingDown) return;
    setInput((prev) => prev + String(num));
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    if (!input || isCoolingDown) return;
    const answer = parseInt(input, 10);
    const correct = onAnswer(answer);
    if (correct) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onSuccess();
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setInput('');
    }
  };

  const numPad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['del', 0, 'go'],
  ];

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.lockEmoji}>🔒</Text>
        <Text style={styles.title}>Parent Check</Text>
        <Text style={styles.subtitle}>Solve to continue</Text>

        <View style={[styles.challengeBox, shake && styles.shake]}>
          <Text style={styles.challengeText}>
            {challenge.a} + {challenge.b} = ?
          </Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.inputText}>{input || '—'}</Text>
        </View>

        {isCoolingDown && (
          <Text style={styles.cooldownText}>
            Too many tries! Wait {cooldownSeconds}s
          </Text>
        )}

        {!isCoolingDown && attempts > 0 && (
          <Text style={styles.wrongText}>
            Try again ({3 - attempts} left)
          </Text>
        )}

        {/* Number pad */}
        <View style={styles.numPad}>
          {numPad.map((row, ri) => (
            <View key={ri} style={styles.numRow}>
              {row.map((key) => {
                if (key === 'del') {
                  return (
                    <TouchableOpacity
                      key="del"
                      style={[styles.numKey, styles.funcKey]}
                      onPress={handleDelete}
                    >
                      <Text style={styles.funcKeyText}>⌫</Text>
                    </TouchableOpacity>
                  );
                }
                if (key === 'go') {
                  return (
                    <TouchableOpacity
                      key="go"
                      style={[styles.numKey, styles.goKey]}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.goKeyText}>✓</Text>
                    </TouchableOpacity>
                  );
                }
                return (
                  <TouchableOpacity
                    key={key}
                    style={styles.numKey}
                    onPress={() => handleNumberPress(key as number)}
                  >
                    <Text style={styles.numKeyText}>{key}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const KEY_SIZE = Math.min(70, (SCREEN_W - 80) / 3);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  lockEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    ...typography.parentGate,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 30,
  },
  challengeBox: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 36,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  shake: {
    // Simple visual indicator — in production use Animated
    borderColor: colors.danger,
    borderWidth: 2,
  },
  challengeText: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
    textAlign: 'center',
  },
  inputBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 120,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  inputText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  cooldownText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  wrongText: {
    color: colors.accentYellow,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  numPad: {
    marginTop: 10,
  },
  numRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  numKey: {
    width: KEY_SIZE,
    height: KEY_SIZE,
    borderRadius: KEY_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  numKeyText: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '700',
  },
  funcKey: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  funcKeyText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 24,
  },
  goKey: {
    backgroundColor: colors.accentGreen,
  },
  goKeyText: {
    color: '#000',
    fontSize: 28,
    fontWeight: '800',
  },
});
