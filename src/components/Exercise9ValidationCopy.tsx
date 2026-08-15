import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type FormValues = {
  fullName: string;
  studentId: string;
  email: string;
  summary: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const MAX_SUMMARY_LENGTH = 120;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Please enter your full name. Spaces only are not allowed.';
  }

  if (!/^[A-Z]{2}\d{6}$/.test(values.studentId.trim())) {
    errors.studentId = 'Student ID must match format: 2 uppercase letters followed by 6 digits (e.g. SE123456).';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address such as name@school.edu.';
  }

  if (values.summary.length > MAX_SUMMARY_LENGTH) {
    errors.summary = `Summary is too long. Keep it within ${MAX_SUMMARY_LENGTH} characters.`;
  }

  return errors;
}

type TestCase = {
  id: string;
  label: string;
  values: FormValues;
};

const testCases: TestCase[] = [
  {
    id: 'spaces-only-name',
    label: 'Spaces-only name',
    values: {
      fullName: '     ',
      studentId: 'SE123456',
      email: 'student@school.edu',
      summary: 'Valid summary',
    },
  },
  {
    id: 'malformed-id',
    label: 'Malformed ID',
    values: {
      fullName: 'Nguyen Van A',
      studentId: '123-ABC',
      email: 'student@school.edu',
      summary: 'Valid summary',
    },
  },
  {
    id: 'email-error',
    label: 'Email error',
    values: {
      fullName: 'Nguyen Van A',
      studentId: 'SE123456',
      email: 'student.school.edu',
      summary: 'Valid summary',
    },
  },
  {
    id: 'overlong-summary',
    label: 'Overlong summary',
    values: {
      fullName: 'Nguyen Van A',
      studentId: 'SE123456',
      email: 'student@school.edu',
      summary:
        'This summary intentionally exceeds the maximum length so we can verify that users receive a concrete message with the exact limit.',
    },
  },
];

export default function Exercise9ValidationCopy() {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    studentId: '',
    email: '',
    summary: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [lastTestLabel, setLastTestLabel] = useState<string>('');

  const summaryCount = useMemo(() => values.summary.length, [values.summary.length]);

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function runValidation(inputValues: FormValues, label: string) {
    setValues(inputValues);
    setErrors(validate(inputValues));
    setLastTestLabel(label);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exercise 9 - Validation copy</Text>
      <Text style={styles.subtitle}>
        Replaced vague messages like &quot;Invalid input&quot; with actionable field-specific
        guidance.
      </Text>

      <View style={styles.formCard}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          style={styles.input}
          value={values.fullName}
          onChangeText={(text) => updateField('fullName', text)}
          placeholder="Enter full name"
        />
        {errors.fullName ? <Text style={styles.error}>{errors.fullName}</Text> : null}

        <Text style={styles.label}>Student ID</Text>
        <TextInput
          style={styles.input}
          value={values.studentId}
          onChangeText={(text) => updateField('studentId', text)}
          placeholder="SE123456"
          autoCapitalize="characters"
        />
        {errors.studentId ? <Text style={styles.error}>{errors.studentId}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={values.email}
          onChangeText={(text) => updateField('email', text)}
          placeholder="name@school.edu"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <Text style={styles.label}>Summary</Text>
        <TextInput
          style={[styles.input, styles.summaryInput]}
          value={values.summary}
          onChangeText={(text) => updateField('summary', text)}
          placeholder="Brief summary"
          multiline
        />
        <Text style={styles.counter}>
          {summaryCount}/{MAX_SUMMARY_LENGTH}
        </Text>
        {errors.summary ? <Text style={styles.error}>{errors.summary}</Text> : null}

        <Pressable style={styles.primaryButton} onPress={() => runValidation(values, 'Manual check')}>
          <Text style={styles.primaryButtonText}>Validate form</Text>
        </Pressable>
      </View>

      <View style={styles.testCard}>
        <Text style={styles.testTitle}>Test scenarios</Text>
        <Text style={styles.testSubtitle}>
          Tap a case to auto-fill and validate spaces-only names, malformed IDs, email errors, and
          overlong summaries.
        </Text>

        {testCases.map((item) => (
          <Pressable
            key={item.id}
            style={styles.testButton}
            onPress={() => runValidation(item.values, item.label)}>
            <Text style={styles.testButtonText}>{item.label}</Text>
          </Pressable>
        ))}

        {lastTestLabel ? <Text style={styles.lastRun}>Last run: {lastTestLabel}</Text> : null}
      </View>
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
  subtitle: {
    fontSize: 15,
    lineHeight: 21,
    color: '#555',
  },
  formCard: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 10,
    padding: 12,
    gap: 8,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
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
  summaryInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  counter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#666',
  },
  error: {
    fontSize: 13,
    color: '#b00020',
    lineHeight: 18,
  },
  primaryButton: {
    marginTop: 6,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: '#1f4bcc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  testCard: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 10,
    padding: 12,
    gap: 8,
    backgroundColor: '#fff',
  },
  testTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  testSubtitle: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  testButton: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#1f4bcc',
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f4bcc',
  },
  lastRun: {
    marginTop: 4,
    fontSize: 13,
    color: '#666',
  },
});
