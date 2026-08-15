import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

function FormField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput placeholder={placeholder} style={styles.input} />
    </View>
  );
}

function BrokenForm() {
  return (
    <View style={styles.demoCard}>
      <Text style={styles.demoTitle}>A) Failure reproduction (intentionally broken)</Text>
      <Text style={styles.demoText}>
        This form is inside a fixed-height container without scrolling. On phone, focus the last
        field and open keyboard: it will be hidden.
      </Text>

      <View style={styles.brokenContainer}>
        <FormField label="Student name" placeholder="Enter full name" />
        <FormField label="Student ID" placeholder="Enter student ID" />
        <FormField label="Course" placeholder="Enter course name" />
        <FormField label="Email" placeholder="Enter email address" />
        <FormField label="Phone number" placeholder="Enter phone number" />
        <FormField label="Address (last field)" placeholder="This field is hidden by keyboard" />
      </View>

      <Text style={styles.captureText}>
        Failure capture: Last field is obscured because layout cannot move/scroll with keyboard.
      </Text>
    </View>
  );
}

function FixedForm() {
  return (
    <View style={styles.demoCard}>
      <Text style={styles.demoTitle}>B) Keyboard-safe fix</Text>
      <Text style={styles.demoText}>
        Uses KeyboardAvoidingView + ScrollView so focused inputs stay reachable when keyboard
        appears.
      </Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
        style={styles.fixedContainer}>
        <ScrollView
          contentContainerStyle={styles.fixedContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <FormField label="Student name" placeholder="Enter full name" />
          <FormField label="Student ID" placeholder="Enter student ID" />
          <FormField label="Course" placeholder="Enter course name" />
          <FormField label="Email" placeholder="Enter email address" />
          <FormField label="Phone number" placeholder="Enter phone number" />
          <FormField label="Address (last field)" placeholder="Now this field stays reachable" />
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      <Text style={styles.captureText}>
        Fix capture: Last field can be scrolled into view and is no longer blocked by keyboard.
      </Text>
    </View>
  );
}

export default function Exercise8KeyboardFailureReproduction() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exercise 8 - Keyboard failure reproduction</Text>
      <BrokenForm />
      <FixedForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 14,
    paddingBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  demoCard: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    padding: 12,
    gap: 8,
    backgroundColor: '#fff',
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  demoText: {
    fontSize: 15,
    lineHeight: 21,
    color: '#444',
  },
  brokenContainer: {
    height: 250,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0b3b3',
    borderRadius: 8,
    padding: 10,
    gap: 8,
    backgroundColor: '#fff6f6',
  },
  fixedContainer: {
    height: 250,
    borderWidth: 1,
    borderColor: '#b8d5ff',
    borderRadius: 8,
    backgroundColor: '#f5f9ff',
  },
  fixedContent: {
    padding: 10,
    gap: 8,
  },
  fieldGroup: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  bottomSpacer: {
    height: 18,
  },
  captureText: {
    fontSize: 14,
    color: '#555',
  },
});
