import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type CourseImageMode = 'local' | 'remote' | 'loading' | 'failed' | 'informative' | 'decorative';

type CourseCardProps = {
  id: string;
  title: string;
  task: string;
  imageMode: CourseImageMode;
  source?: ImageSourcePropType;
  informativeLabel?: string;
  onCompleteTask: () => void;
  isCompleted: boolean;
};

function CourseCard({
  title,
  task,
  imageMode,
  source,
  informativeLabel,
  onCompleteTask,
  isCompleted,
}: CourseCardProps) {
  const [isLoading, setIsLoading] = useState(imageMode === 'loading');
  const [hasError, setHasError] = useState(false);
  const [resolvedSource, setResolvedSource] = useState<ImageSourcePropType | undefined>(
    imageMode === 'loading' ? undefined : source
  );

  useEffect(() => {
    if (imageMode !== 'loading') {
      return;
    }

    const timer = setTimeout(() => {
      setResolvedSource({
        uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=60',
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [imageMode]);

  const accessibilityProps = useMemo(() => {
    if (imageMode === 'decorative') {
      return {
        accessible: false as const,
        importantForAccessibility: 'no' as const,
      };
    }

    if (imageMode === 'informative') {
      return {
        accessible: true as const,
        accessibilityLabel:
          informativeLabel ?? 'Hinh minh hoa noi dung hoc phan va chu de bai hoc hien tai',
      };
    }

    return {
      accessible: true as const,
    };
  }, [imageMode, informativeLabel]);

  return (
    <View style={styles.card}>
      <Text style={styles.modeLabel}>Case: {imageMode}</Text>
      <View style={styles.imageFrame}>
        {resolvedSource && !hasError ? (
          <Image
            source={resolvedSource}
            resizeMode="cover"
            style={styles.image}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            {...accessibilityProps}
          />
        ) : null}

        {isLoading ? (
          <View style={styles.overlay}>
            <ActivityIndicator />
            <Text style={styles.helperText}>Dang tai hinh anh...</Text>
          </View>
        ) : null}

        {hasError ? (
          <View style={styles.overlay}>
            <Text style={styles.fallbackTitle}>Khong tai duoc hinh anh</Text>
            <Text style={styles.helperText}>Noi dung khoa hoc van hoat dong binh thuong.</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.task}>{task}</Text>
      <Pressable style={styles.action} onPress={onCompleteTask}>
        <Text style={styles.actionText}>
          {isCompleted ? 'Da hoan thanh tac vu' : 'Danh dau hoan thanh tac vu'}
        </Text>
      </Pressable>
      <Text style={styles.resilienceNote}>
        Task completion is independent of image state (loading/failed/missing).
      </Text>
    </View>
  );
}

const cards: Omit<CourseCardProps, 'onCompleteTask' | 'isCompleted'>[] = [
  {
    id: 'local',
    title: 'Lap trinh di dong - Anh local',
    task: 'Nop bai thuc hanh giao dien truoc 23:59.',
    imageMode: 'local',
    source: require('@/assets/images/react-logo.png'),
  },
  {
    id: 'remote',
    title: 'Co so du lieu - Anh remote',
    task: 'Hoan tat quiz 10 cau trong tuan nay.',
    imageMode: 'remote',
    source: {
      uri: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60',
    },
  },
  {
    id: 'loading',
    title: 'Mang may tinh - Trang thai loading',
    task: 'Doc tai lieu ve mo hinh OSI va tra loi cau hoi.',
    imageMode: 'loading',
  },
  {
    id: 'failed',
    title: 'Tri tue nhan tao - Trang thai failed',
    task: 'Hoan tat bai tap phan loai du lieu.',
    imageMode: 'failed',
    source: { uri: 'https://invalid.example.com/course-card-not-found.jpg' },
  },
  {
    id: 'informative',
    title: 'An toan thong tin - Anh informative',
    task: 'Nop bao cao danh gia rui ro bao mat.',
    imageMode: 'informative',
    source: {
      uri: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=60',
    },
    informativeLabel: 'So do khoa hoc bao mat thong tin va bieu tuong khoa bao ve du lieu',
  },
  {
    id: 'decorative',
    title: 'Ky nang mem - Anh decorative',
    task: 'Tham gia thao luan nhom va gui bien ban.',
    imageMode: 'decorative',
    source: {
      uri: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=60',
    },
  },
];

export default function Exercise3ImageResilience() {
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Exercise 3 - Image resilience (CourseCard)</Text>
      {cards.map((card) => (
        <CourseCard
          key={card.id}
          {...card}
          isCompleted={Boolean(completedIds[card.id])}
          onCompleteTask={() => {
            setCompletedIds((prev) => ({
              ...prev,
              [card.id]: !prev[card.id],
            }));
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 14,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  card: {
    borderWidth: 1,
    borderColor: '#bcbcbc',
    borderRadius: 10,
    padding: 12,
    gap: 8,
    backgroundColor: '#fff',
  },
  modeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    textTransform: 'uppercase',
  },
  imageFrame: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    minHeight: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 170,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 10,
  },
  fallbackTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  task: {
    fontSize: 16,
    lineHeight: 22,
  },
  action: {
    backgroundColor: '#2463eb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  resilienceNote: {
    fontSize: 13,
    color: '#555',
  },
});
