import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const longLabels = {
  header: 'Khu vực tiêu đề tổng quan học vụ của toàn bộ cổng thông tin khuôn viên',
  search:
    'Thanh tìm kiếm học phần, giảng viên, lịch học và thông báo quan trọng của nhà trường',
  statsA: 'Thống kê tổng số sinh viên đang theo học trong học kỳ hiện tại',
  statsB: 'Thống kê tổng số lớp học phần đang được mở theo kế hoạch đào tạo',
  statsC: 'Thống kê tổng số thông báo học vụ chưa đọc cần xử lý trong ngày',
  announcements:
    'Danh sách thông báo học vụ chi tiết, bao gồm thay đổi lịch, hạn nộp bài và cập nhật từ khoa',
  schedule:
    'Lịch học hôm nay theo từng khung giờ, phòng học, giảng viên phụ trách và trạng thái điểm danh',
  events:
    'Các sự kiện sắp diễn ra trong tuần này như hội thảo, sinh hoạt câu lạc bộ và hoạt động ngoại khóa',
  bottomNav:
    'Thanh điều hướng chức năng chính: Trang chủ, Thời khóa biểu, Thông báo, Hồ sơ cá nhân',
};

const decisions = [
  'Bỏ tất cả chiều cao cố định để mỗi khối tự giãn theo nội dung dài.',
  'Tăng cỡ chữ để giả lập stress test ngôn ngữ dài và khả năng đọc.',
  'Dùng flexWrap cho hàng thẻ thống kê để tự xuống dòng trên màn hình nhỏ.',
  'Đặt width: "100%" cho text trong khối và textAlign: "left" để tránh tràn ngang.',
  'Dùng ScrollView để đảm bảo toàn bộ nội dung vẫn truy cập được khi text tăng mạnh.',
];

export default function Exercise2TextStressTest() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Exercise 2 - Text stress test</Text>

      <View style={styles.wireframe}>
        <View style={styles.box}>
          <Text style={styles.label}>{longLabels.header}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>{longLabels.search}</Text>
        </View>

        <View style={styles.row}>
          <View style={[styles.box, styles.statBox]}>
            <Text style={styles.label}>{longLabels.statsA}</Text>
          </View>
          <View style={[styles.box, styles.statBox]}>
            <Text style={styles.label}>{longLabels.statsB}</Text>
          </View>
          <View style={[styles.box, styles.statBox]}>
            <Text style={styles.label}>{longLabels.statsC}</Text>
          </View>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>{longLabels.announcements}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>{longLabels.schedule}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>{longLabels.events}</Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>{longLabels.bottomNav}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Layout decisions</Text>
      {decisions.map((decision) => (
        <Text key={decision} style={styles.decisionItem}>
          • {decision}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  wireframe: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 10,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  box: {
    borderWidth: 1,
    borderColor: '#555',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  statBox: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 220,
  },
  label: {
    width: '100%',
    fontSize: 19,
    lineHeight: 27,
    textAlign: 'left',
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '600',
  },
  decisionItem: {
    fontSize: 17,
    lineHeight: 25,
  },
});
