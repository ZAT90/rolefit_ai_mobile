import AsyncStorage from '@react-native-async-storage/async-storage';

const HAS_SEEN_INTRO_KEY = 'rolefit_ai_has_seen_intro';

export const getHasSeenIntro = async () => {
  const value = await AsyncStorage.getItem(HAS_SEEN_INTRO_KEY);

  return value === 'true';
};

export const markIntroSeen = () => {
  return AsyncStorage.setItem(HAS_SEEN_INTRO_KEY, 'true');
};
