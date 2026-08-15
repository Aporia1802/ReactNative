import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Item = {
  rectangle: string;
  component: string;
  reason: string;
};

const labeledRectangles: Item[] = [
  {
    rectangle: 'Top Banner',
    component: 'Header',
    reason: 'Contains screen title and user info; reused across dashboard pages.',
  },
  {
    rectangle: 'Search Area',
    component: 'SearchBar',
    reason: 'Encapsulates keyword input + search action in one reusable unit.',
  },
  {
    rectangle: '3 Small Metric Boxes',
    component: 'StatCard',
    reason: 'Same visual structure repeated with different data (students, classes, notices).',
  },
  {
    rectangle: 'Announcements Block',
    component: 'AnnouncementList',
    reason: 'Represents dynamic list data and item rendering logic.',
  },
  {
    rectangle: 'Today Schedule Block',
    component: 'ScheduleCard',
    reason: 'Groups related timetable data with consistent card layout.',
  },
  {
    rectangle: 'Upcoming Events Block',
    component: 'EventCard',
    reason: 'A standalone data card with title/date/location that can be reused.',
  },
  {
    rectangle: 'Bottom Strip',
    component: 'BottomNavigation',
    reason: 'Persistent app navigation area shared by multiple screens.',
  },
];

const notPlainView: Item[] = [
  {
    rectangle: 'Search input inside Search Area',
    component: 'TextInput',
    reason: 'Needs keyboard input behavior; View cannot receive/edit text.',
  },
  {
    rectangle: 'Announcements list content area',
    component: 'FlatList',
    reason: 'Should virtualize and scroll many items efficiently instead of static View stacking.',
  },
  {
    rectangle: 'Bottom navigation buttons',
    component: 'Pressable',
    reason: 'Must respond to touch, feedback, and accessibility roles like real actions.',
  },
];

export default function Exercise1ComponentSelection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise 1 - Component selection</Text>

      <Text style={styles.sectionTitle}>A) Wireframe (self-drawn)</Text>
      <View style={styles.wireframe}>
        <View style={styles.box}>
          <Text>Header</Text>
        </View>
        <View style={styles.box}>
          <Text>SearchBar</Text>
        </View>
        <View style={styles.row}>
          <View style={[styles.box, styles.flex]}>
            <Text>StatCard</Text>
          </View>
          <View style={[styles.box, styles.flex]}>
            <Text>StatCard</Text>
          </View>
          <View style={[styles.box, styles.flex]}>
            <Text>StatCard</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text>AnnouncementList</Text>
        </View>
        <View style={styles.box}>
          <Text>ScheduleCard</Text>
        </View>
        <View style={styles.box}>
          <Text>EventCard</Text>
        </View>
        <View style={styles.box}>
          <Text>BottomNavigation</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>B) Rectangle - Component label + reason</Text>
      {labeledRectangles.map((item) => (
        <Text key={item.rectangle} style={styles.bullet}>
          • {item.rectangle} → {item.component}: {item.reason}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>C) 3 places that should NOT be plain View</Text>
      {notPlainView.map((item) => (
        <Text key={item.rectangle} style={styles.bullet}>
          • {item.rectangle} → {item.component}: {item.reason}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  wireframe: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 8,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  box: {
    borderWidth: 1,
    borderColor: '#555',
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  flex: {
    flex: 1,
  },
  bullet: {
    lineHeight: 20,
  },
});
