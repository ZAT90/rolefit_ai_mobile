import type {ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {screenWrapperStyles as styles} from './styles/screenWrapperStyles';

type ScreenWrapperProps = {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  rightElement?: ReactNode;
};

export const ScreenWrapper = ({
  children,
  title,
  showBackButton,
  rightElement,
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

        <View style={styles.headerAction}>{rightElement}</View>
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
};
