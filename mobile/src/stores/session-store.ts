import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

type User = { id: string; email: string; role: string };
type Session = { token: string | null; user: User | null; setSession: (token: string, refreshToken: string, user: User) => Promise<void>; clear: () => Promise<void> };
export const useSessionStore = create<Session>((set) => ({
  token: null, user: null,
  setSession: async (token, refreshToken, user) => { await SecureStore.setItemAsync('refresh_token', refreshToken); set({ token, user }); },
  clear: async () => { await SecureStore.deleteItemAsync('refresh_token'); set({ token: null, user: null }); },
}));
