import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type Course = {
  id: string;
  name: string;
  credits: number;
};

const courses: Course[] = [
  { id: 'c1', name: 'Mobile Development', credits: 3 },
  { id: 'c2', name: 'Computer Networks', credits: 3 },
  { id: 'c3', name: 'Database Systems', credits: 4 },
  { id: 'c4', name: 'Information Security', credits: 3 },
  { id: 'c5', name: 'Artificial Intelligence', credits: 4 },
  { id: 'c6', name: 'Software Testing', credits: 2 },
];

function CourseCard({ course }: { course: Course }) {
  return (
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{course.name}</Text>
      <Text style={styles.cardMeta}>{course.credits} credits</Text>
    </View>
  );
}

export default function Exercise7ResponsiveCardLaboratory() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exercise 7 - Responsive card laboratory</Text>

      <Text style={styles.sectionTitle}>A) Flex-based responsive grid (recommended)</Text>
      <View style={styles.grid}>
        {courses.map((course) => (
          <View key={course.id} style={styles.flexCard}>
            <CourseCard course={course} />
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>B) Manual width arithmetic grid</Text>
      <View style={styles.grid}>
        {courses.map((course) => (
          <View key={`manual-${course.id}`} style={styles.manualCard}>
            <CourseCard course={course} />
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Comparison</Text>
      <Text style={styles.bullet}>
        • Flex-based grid adapts naturally with flexBasis + minWidth + maxWidth + flexGrow and wraps
        well when screen width or text size changes.
      </Text>
      <Text style={styles.bullet}>
        • Manual width arithmetic (for example 50% minus gap) is brittle: easy to break with bigger
        fonts, spacing changes, and narrow screens.
      </Text>
      <Text style={styles.bullet}>
        • Use manual arithmetic only when exact fixed column math is a strict requirement.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  sectionTitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  flexCard: {
    flexBasis: 180,
    minWidth: 150,
    maxWidth: 260,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  manualCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  cardContent: {
    padding: 12,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  cardMeta: {
    fontSize: 14,
    color: '#666',
  },
  bullet: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
});
