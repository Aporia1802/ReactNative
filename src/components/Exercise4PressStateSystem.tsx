import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

type CommonButtonProps = {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  forceFocused?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

type IconButtonProps = Omit<CommonButtonProps, 'label'> & {
  iconName: keyof typeof Ionicons.glyphMap;
  accessibilityLabel: string;
};

function PrimaryButton({
  label = 'Primary action',
  disabled = false,
  loading = false,
  forceFocused = false,
  onPress,
  style,
}: CommonButtonProps) {
  const [focused, setFocused] = useState(false);
  const showFocus = focused || forceFocused;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed }) => [
        styles.baseButton,
        styles.primaryButton,
        pressed && styles.primaryPressed,
        showFocus && styles.focusedOutline,
        (disabled || loading) && styles.disabledButton,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.baseText, styles.primaryText]}>{label}</Text>
      )}
    </Pressable>
  );
}

function SecondaryButton({
  label = 'Secondary action',
  disabled = false,
  loading = false,
  forceFocused = false,
  onPress,
  style,
}: CommonButtonProps) {
  const [focused, setFocused] = useState(false);
  const showFocus = focused || forceFocused;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed }) => [
        styles.baseButton,
        styles.secondaryButton,
        pressed && styles.secondaryPressed,
        showFocus && styles.focusedOutline,
        (disabled || loading) && styles.disabledSecondaryButton,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color="#1f4bcc" />
      ) : (
        <Text style={[styles.baseText, styles.secondaryText]}>{label}</Text>
      )}
    </Pressable>
  );
}

function IconButton({
  iconName,
  accessibilityLabel,
  disabled = false,
  loading = false,
  forceFocused = false,
  onPress,
  style,
}: IconButtonProps) {
  const [focused, setFocused] = useState(false);
  const showFocus = focused || forceFocused;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled || loading}
      onPress={onPress}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={({ pressed }) => [
        styles.baseIconButton,
        styles.iconButton,
        pressed && styles.iconPressed,
        showFocus && styles.focusedOutline,
        (disabled || loading) && styles.disabledSecondaryButton,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color="#1f4bcc" />
      ) : (
        <Ionicons name={iconName} size={22} color="#1f4bcc" />
      )}
    </Pressable>
  );
}

export default function Exercise4PressStateSystem() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exercise 4 - Press-state system</Text>
      <Text style={styles.note}>
        All buttons keep minimum touch target 48x48 in pressed, focused, disabled, and loading
        states.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PrimaryButton</Text>
        <PrimaryButton label="Normal" />
        <PrimaryButton label="Focused (preview)" forceFocused />
        <PrimaryButton label="Disabled" disabled />
        <PrimaryButton label="Loading" loading />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SecondaryButton</Text>
        <SecondaryButton label="Normal" />
        <SecondaryButton label="Focused (preview)" forceFocused />
        <SecondaryButton label="Disabled" disabled />
        <SecondaryButton label="Loading" loading />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>IconButton</Text>
        <View style={styles.iconRow}>
          <IconButton iconName="heart-outline" accessibilityLabel="Yeu thich" />
          <IconButton iconName="bookmark-outline" accessibilityLabel="Luu" forceFocused />
          <IconButton iconName="share-social-outline" accessibilityLabel="Chia se" disabled />
          <IconButton iconName="download-outline" accessibilityLabel="Tai xuong" loading />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  note: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
  },
  section: {
    gap: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  baseButton: {
    minHeight: 48,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseIconButton: {
    minWidth: 48,
    minHeight: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  primaryButton: {
    backgroundColor: '#1f4bcc',
  },
  primaryPressed: {
    backgroundColor: '#173ba1',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#1f4bcc',
    backgroundColor: '#fff',
  },
  secondaryPressed: {
    backgroundColor: '#e9efff',
  },
  iconButton: {
    borderWidth: 1,
    borderColor: '#1f4bcc',
    backgroundColor: '#fff',
  },
  iconPressed: {
    backgroundColor: '#e9efff',
  },
  focusedOutline: {
    borderWidth: 2,
    borderColor: '#ff9f1a',
  },
  disabledButton: {
    backgroundColor: '#8e9bc9',
  },
  disabledSecondaryButton: {
    borderColor: '#9ba7cf',
    backgroundColor: '#f2f4fc',
    opacity: 0.7,
  },
  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#1f4bcc',
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
