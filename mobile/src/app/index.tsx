import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { api } from '@/services/api/client';
import { theme } from '@/theme/tokens';
import { useSessionStore } from '@/stores/session-store';

export default function WelcomeScreen() {
  const router = useRouter();
  const { token, restore, restoring } = useSessionStore();
  useEffect(() => { void restore(); }, [restore]);
  const health = useQuery({
    queryKey: ['health'],
    queryFn: api.health,
    retry: false,
  });
  const profile = useQuery({ queryKey: ['nutrition-profile'], queryFn: () => api.http.get('/nutrition-profile'), enabled: Boolean(token), retry: false });
  const home = useQuery({ queryKey: ['home'], queryFn: () => api.http.get('/home').then(r => r.data), enabled: Boolean(token), retry: 1 });
  useEffect(() => { if (token && !profile.isLoading && profile.isSuccess && profile.data.status === 204) router.replace('/onboarding'); }, [token, profile.isLoading, profile.isSuccess, profile.data, router]);

  const apiStatus = restoring || health.isLoading
    ? 'Verificando API...'
    : health.isSuccess
      ? 'API disponível'
      : 'API ainda não está disponível';
  const homeMessage = home.isLoading ? 'Carregando seu dia...' : home.isError ? 'Não conseguimos carregar seu dia.' : home.data ? `${home.data.dailyTasks.completed} de ${home.data.dailyTasks.total} tarefas concluídas` : 'Faça login para ver sua rotina.';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>Renutrição</Text>
        <Text style={styles.subtitle}>Seu acompanhamento alimentar começa aqui.</Text>
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Ambiente de desenvolvimento</Text>
          <Text style={styles.status}>{apiStatus}</Text>
        </View>
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Seu dia</Text>
          <Text style={styles.status}>{homeMessage}</Text>
          {home.data && <Text style={styles.statusLabel}>Água registrada: {home.data.waterMl} ml</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, justifyContent: 'center', padding: theme.spacing.xl, gap: theme.spacing.md },
  title: { color: theme.colors.textPrimary, fontSize: 36, fontWeight: '700' },
  subtitle: { color: theme.colors.textSecondary, fontSize: 18, lineHeight: 26 },
  statusCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  statusLabel: { color: theme.colors.textSecondary, fontSize: 14 },
  status: { color: theme.colors.success, fontSize: 16, fontWeight: '600' },
});
