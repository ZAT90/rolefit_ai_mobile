import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ScreenWrapperProps = {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
};

export const ScreenWrapper = ({
  children,
  title,
  showBackButton,
}: ScreenWrapperProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const canGoBack = navigation.canGoBack();
  const shouldShowBackButton = showBackButton ?? canGoBack;

  return (
    <View style={[styles.container, {paddingTop: insets.top + 8}]}>
      <View style={styles.header}>
        {shouldShowBackButton ? (
          <Pressable
            accessibilityLabel="Go back"
            hitSlop={12}
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backIcon}>{'<'}</Text>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        ) : (
          <View style={styles.headerSpacer} />
        )}

        {title ? (
          <Text numberOfLines={1} style={styles.headerTitle}>
            {title}
          </Text>
        ) : (
          <View style={styles.headerTitle} />
        )}

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101820',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 44,
    paddingHorizontal: 16,
  },
  backButton: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 36,
    minWidth: 72,
  },
  backIcon: {
    color: '#dbeafe',
    fontSize: 22,
    fontWeight: '700',
    marginRight: 6,
  },
  backText: {
    color: '#dbeafe',
    fontSize: 15,
    fontWeight: '700',
  },
  headerSpacer: {
    minWidth: 72,
  },
  headerTitle: {
    color: '#f8fafc',
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
