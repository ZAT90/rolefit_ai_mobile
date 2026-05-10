import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>RoleFit AI</Text>
      <Text style={styles.subtitle}>Career intelligence for serious roles</Text>
      <ActivityIndicator color="#8fb8ff" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#101820',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    color: '#f8fafc',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 10,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    textAlign: 'center',
  },
  loader: {
    marginTop: 28,
  },
});
