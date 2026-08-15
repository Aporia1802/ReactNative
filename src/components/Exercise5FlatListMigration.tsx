import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';

type Announcement = {
  id: string;
  title: string;
  time: string;
  course: string;
};

const announcements: Announcement[] = [
  {
    id: 'ann-001',
    title: 'Assignment 2 submission deadline updated to Sunday 23:59.',
    time: '08:30',
    course: 'Mobile Development',
  },
  {
    id: 'ann-002',
    title: 'Room changed from B203 to C105 for the networking lab.',
    time: '09:45',
    course: 'Computer Networks',
  },
  {
    id: 'ann-003',
    title: 'Guest seminar starts at 14:00 in the main auditorium.',
    time: '11:10',
    course: 'Student Affairs',
  },
];

const renderAnnouncementItem: ListRenderItem<Announcement> = ({ item }) => {
  return (
    <View style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemMeta}>
        {item.course} - {item.time}
      </Text>
    </View>
  );
};

function ItemSeparator() {
  return <View style={styles.separator} />;
}

function ListHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Exercise 5 - FlatList migration</Text>
      <Text style={styles.headerSubtitle}>
        Announcements are rendered with FlatList instead of ScrollView + map.
      </Text>
    </View>
  );
}

function ListFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>End of announcements</Text>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No announcements available</Text>
      <Text style={styles.emptySubtitle}>Please check again later.</Text>
    </View>
  );
}

export default function Exercise5FlatListMigration() {
  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data={announcements}
      renderItem={renderAnnouncementItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ListHeader}
      ListFooterComponent={ListFooter}
      ListEmptyComponent={EmptyState}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 8,
    paddingBottom: 32,
  },
  header: {
    gap: 6,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
  },
  itemCard: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    gap: 4,
  },
  itemTitle: {
    fontSize: 17,
    lineHeight: 23,
    fontWeight: '600',
  },
  itemMeta: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 8,
  },
  footer: {
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#666',
  },
  emptyState: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 4,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
