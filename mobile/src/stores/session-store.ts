import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

type User = { id: string; email: string; role: string };
type Session = { token: string | null; user: User | null; restoring: boolean; setSession: (token: string, refreshToken: string, user: User) => Promise<void>; restore: () => Promise<void>; clear: () => Promise<void> };
export const useSessionStore = create<Session>((set) => ({
  token: null, user: null,
  restoring: false,
  setSession: async (token, refreshToken, user) => { await SecureStore.setItemAsync('refresh_token', refreshToken); set({ token, user }); },
  restore: async () => { set({ restoring: true }); try { const refreshToken = await SecureStore.getItemAsync('refresh_token'); if (!refreshToken) return; const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'}/auth/refresh`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken }) }); if (!response.ok) throw new Error(); const payload = await response.json(); await SecureStore.setItemAsync('refresh_token', payload.refreshToken); set({ token: payload.accessToken, user: payload.user }); } catch { await SecureStore.deleteItemAsync('refresh_token'); set({ token: null, user: null }); } finally { set({ restoring: false }); } },
  clear: async () => { await SecureStore.deleteItemAsync('refresh_token'); set({ token: null, user: null }); },
}));
