import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type AuditIssue = {
  id: string;
  problem: string;
  fix: string;
};

const auditIssues: AuditIssue[] = [
  {
    id: 'missing-names',
    problem: 'Missing accessible names on icon-only controls.',
    fix: 'Added explicit accessibilityLabel and accessibilityHint.',
  },
  {
    id: 'wrong-roles',
    problem: 'Interactive items announced as generic views.',
    fix: 'Set accessibilityRole (button, checkbox, switch, header).',
  },
  {
    id: 'absent-states',
    problem: 'Screen reader could not detect checked/disabled/loading states.',
    fix: 'Added accessibilityState for checked, disabled, and busy.',
  },
  {
    id: 'order-problems',
    problem: 'Focus order jumped between unrelated regions.',
    fix: 'Kept a linear top-to-bottom DOM order for predictable navigation.',
  },
  {
    id: 'small-targets',
    problem: 'Touch targets were under 44x44.',
    fix: 'All interactive controls now use minimum 48x48 size.',
  },
  {
    id: 'contrast-failures',
    problem: 'Low-contrast secondary text and borders.',
    fix: 'Raised contrast with darker text and stronger control boundaries.',
  },
  {
    id: 'large-text-clipping',
    problem: 'Fixed heights clipped content at large text scale.',
    fix: 'Removed fixed heights and enabled wrapping in all text regions.',
  },
];

export default function Exercise10AccessibilityAudit() {
  const [isDone, setIsDone] = useState(false);
  const [notifyTeam, setNotifyTeam] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isSaving) {
      return;
    }

    const timer = setTimeout(() => {
      setIsSaving(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, [isSaving]);

  const canSubmit = useMemo(() => isDone && !isSaving, [isDone, isSaving]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Exercise 10 - Accessibility audit
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Audit record (without sight)</Text>
        {auditIssues.map((item) => (
          <View key={item.id} style={styles.issueRow}>
            <Text style={styles.issueProblem}>• Missing: {item.problem}</Text>
            <Text style={styles.issueFix}>Fix: {item.fix}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Fixed milestone screen</Text>
        <Text style={styles.helpText}>
          All controls below include accessible names, correct roles, states, and 48x48 minimum
          targets.
        </Text>

        <Pressable
          accessibilityRole="checkbox"
          accessibilityLabel="Mark milestone as completed"
          accessibilityHint="Double tap to toggle completion state."
          accessibilityState={{ checked: isDone }}
          onPress={() => setIsDone((prev) => !prev)}
          style={({ pressed }) => [styles.control, pressed && styles.pressedControl]}>
          <Text style={styles.controlText}>{isDone ? '☑' : '☐'} Milestone completed</Text>
        </Pressable>

        <Pressable
          accessibilityRole="switch"
          accessibilityLabel="Notify team after submit"
          accessibilityHint="Double tap to enable or disable notifications."
          accessibilityState={{ checked: notifyTeam }}
          onPress={() => setNotifyTeam((prev) => !prev)}
          style={({ pressed }) => [styles.control, pressed && styles.pressedControl]}>
          <Text style={styles.controlText}>
            {notifyTeam ? 'ON' : 'OFF'} - Notify team after submission
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Submit milestone update"
          accessibilityHint="Submits milestone progress."
          accessibilityState={{ disabled: !canSubmit, busy: isSaving }}
          disabled={!canSubmit}
          onPress={() => setIsSaving(true)}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && canSubmit && styles.primaryPressed,
            !canSubmit && styles.primaryDisabled,
          ]}>
          <Text style={styles.primaryText}>{isSaving ? 'Saving update...' : 'Submit update'}</Text>
        </Pressable>

        <View accessibilityRole="status" style={styles.statusBox}>
          <Text style={styles.statusText}>
            Status: {isSaving ? 'Saving in progress' : canSubmit ? 'Ready to submit' : 'Complete milestone first'}
          </Text>
        </View>

        <Text style={styles.largeTextSample}>
          Large-text check: this paragraph intentionally wraps to multiple lines without clipping,
          even at larger font settings and narrow screen widths.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    paddingBottom: 28,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111111',
  },
  card: {
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  issueRow: {
    gap: 2,
  },
  issueProblem: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1e1e1e',
  },
  issueFix: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2d2d2d',
  },
  helpText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1f1f1f',
  },
  control: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#4d4d4d',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  pressedControl: {
    backgroundColor: '#ebf1ff',
  },
  controlText: {
    fontSize: 16,
    lineHeight: 23,
    color: '#111111',
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#0b57d0',
  },
  primaryPressed: {
    backgroundColor: '#0846a8',
  },
  primaryDisabled: {
    backgroundColor: '#8aa9df',
  },
  primaryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  statusBox: {
    borderWidth: 1,
    borderColor: '#6b6b6b',
    borderRadius: 8,
    padding: 10,
  },
  statusText: {
    fontSize: 15,
    lineHeight: 21,
    color: '#1f1f1f',
  },
  largeTextSample: {
    fontSize: 19,
    lineHeight: 28,
    color: '#111111',
  },
});
