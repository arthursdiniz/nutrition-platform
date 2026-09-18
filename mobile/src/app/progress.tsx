import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { api } from '@/services/api/client';
import { theme } from '@/theme/tokens';

type WeightPoint = { date: string; weightKg: number };

export default function Progress() {
  const [weight, setWeight] = useState(''); const [waist, setWaist] = useState(''); const [saving, setSaving] = useState(false);
  const weights = useQuery({ queryKey: ['weights'], queryFn: () => api.http.get<WeightPoint[]>('/progress/weights').then(r => r.data) });
  const points = weights.data ?? []; const min = Math.min(...points.map(p => p.weightKg), 0); const max = Math.max(...points.map(p => p.weightKg), 1);
  const save = async () => { setSaving(true); try { if (weight) await api.http.post('/progress/weights', { weightKg: Number(weight) }); if (waist) await api.http.post('/progress/measurements', { measurementType: 'WAIST', valueCm: Number(waist) }); setWeight(''); setWaist(''); await weights.refetch(); Alert.alert('Progresso registrado', 'Seu bem-estar é mais amplo que um número na balança.'); } catch { Alert.alert('Não foi possível salvar', 'Tente novamente.'); } finally { setSaving(false); } };
  return <SafeAreaView style={s.page}><ScrollView contentContainerStyle={s.content}><Text style={s.title}>Seu progresso</Text><Text style={s.text}>Acompanhe tendências e também seus hábitos, energia e sono.</Text>
    <View style={s.chart}><Text style={s.label}>Tendência de peso</Text>{weights.isLoading ? <Text style={s.text}>Carregando tendência...</Text> : points.length === 0 ? <Text style={s.text}>Registre seu primeiro peso quando fizer sentido para você.</Text> : <View style={s.bars}>{points.map(point => <View key={point.date} style={s.barColumn}><View style={[s.bar, { height: 28 + ((point.weightKg - min) / Math.max(max - min, 1)) * 92 }]} /><Text style={s.caption}>{point.weightKg} kg</Text></View>)}</View>}</View>
    <TextInput keyboardType="decimal-pad" value={weight} onChangeText={setWeight} placeholder="Peso em kg — opcional" style={s.input}/><TextInput keyboardType="decimal-pad" value={waist} onChangeText={setWaist} placeholder="Cintura em cm — opcional" style={s.input}/><Button title={saving ? 'Salvando...' : 'Registrar'} disabled={saving || (!weight && !waist)} onPress={save}/></ScrollView></SafeAreaView>;
}
const s = StyleSheet.create({ page:{flex:1,backgroundColor:theme.colors.background},content:{padding:theme.spacing.xl,gap:theme.spacing.md},title:{fontSize:28,fontWeight:'700',color:theme.colors.textPrimary},text:{color:theme.colors.textSecondary},chart:{backgroundColor:theme.colors.surface,borderRadius:theme.radius.md,padding:theme.spacing.md,gap:theme.spacing.sm},label:{fontWeight:'700',color:theme.colors.textPrimary},bars:{height:140,flexDirection:'row',alignItems:'flex-end',gap:8},barColumn:{flex:1,alignItems:'center',justifyContent:'flex-end',gap:4},bar:{width:'100%',backgroundColor:theme.colors.primary,borderRadius:4},caption:{fontSize:10,color:theme.colors.textSecondary},input:{backgroundColor:theme.colors.surface,padding:theme.spacing.md,borderRadius:theme.radius.md}});
