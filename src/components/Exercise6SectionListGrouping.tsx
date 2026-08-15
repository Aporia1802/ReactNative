import React from 'react';
import { SectionList, SectionListData, StyleSheet, Text, View } from 'react-native';

type Announcement = {
  id: string;
  title: string;
  time: string;
};

type AnnouncementSection = {
  title: 'Today' | 'This Week' | 'Earlier';
  data: Announcement[];
};

const sections: AnnouncementSection[] = [
  {
    title: 'Today',
    data: [
      { id: 't-1', title: 'Deadline for UI assignment moved to 23:59.', time: '08:15' },
      { id: 't-2', title: 'Lab room changed from A102 to A109.', time: '10:20' },
    ],
  },
  {
    title: 'This Week',
    data: [
      { id: 'w-1', title: 'Guest seminar on mobile accessibility this Thursday.', time: 'Mon' },
      { id: 'w-2', title: 'Quiz 3 opens on Wednesday at 09:00.', time: 'Tue' },
    ],
  },
  {
    title: 'Earlier',
    data: [
      { id: 'e-1', title: 'Updated grading rubric for final project.', time: 'Last week' },
      { id: 'e-2', title: 'Optional workshop resources uploaded.', time: '2 weeks ago' },
    ],
  },
];

function renderItem({ item }: { item: Announcement }) {
  return (
    <View style={styles.itemCard}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemMeta}>{item.time}</Text>
    </View>
  );
}

function renderSectionHeader({ section }: { section: SectionListData<Announcement, AnnouncementSection> }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.title}</Text>
    </View>
  );
}

export default function Exercise6SectionListGrouping() {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled
      ListHeaderComponent={
        <View style={styles.topBlock}>
          <Text style={styles.screenTitle}>Exercise 6 - SectionList grouping</Text>
          <Text style={styles.screenSubtitle}>
            Announcements are grouped into Today, This Week, and Earlier.
          </Text>
          <Text style={styles.analysisTitle}>Sticky header decision</Text>
          <Text style={styles.analysisText}>
            Sticky section headers improve this screen on narrow width and large text because users
            keep context while scrolling long grouped content. The header remains visible, so it is
            easier to know which time group each item belongs to. This is more helpful when cards
            wrap to multiple lines.
          </Text>
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  topBlock: {
    marginBottom: 10,
    gap: 6,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  screenSubtitle: {
    fontSize: 15,
    color: '#555',
    lineHeight: 21,
  },
  analysisTitle: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: '600',
  },
  analysisText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  header: {
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#cfd8ff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#203b97',
  },
  itemCard: {
    borderWidth: 1,
    borderColor: '#d7d7d7',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    gap: 4,
  },
  itemTitle: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '600',
  },
  itemMeta: {
    fontSize: 13,
    color: '#666',
  },
  separator: {
    height: 8,
  },
});
