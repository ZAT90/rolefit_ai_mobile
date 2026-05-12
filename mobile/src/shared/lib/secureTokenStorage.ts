import * as Keychain from 'react-native-keychain';

const TOKEN_SERVICE = 'rolefit_ai_auth_token';
const TOKEN_USERNAME = 'rolefit_ai_user';

export const saveAuthToken = (token: string) => {
  return Keychain.setGenericPassword(TOKEN_USERNAME, token, {
    service: TOKEN_SERVICE,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
};

export const getAuthToken = async () => {
  const credentials = await Keychain.getGenericPassword({
    service: TOKEN_SERVICE,
  });

  if (!credentials) {
    return null;
  }

  return credentials.password;
};

export const clearAuthToken = () => {
  return Keychain.resetGenericPassword({
    service: TOKEN_SERVICE,
  });
};
