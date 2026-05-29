import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'obd_access_token';

export const TokenService = {
  async save(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },
  async get(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },
  async clear(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};
