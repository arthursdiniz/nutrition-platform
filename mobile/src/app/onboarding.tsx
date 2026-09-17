import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '@/services/api/client';
import { theme } from '@/theme/tokens';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router=useRouter();
  const [step,setStep]=useState(0); const [loading,setLoading]=useState(false); const [form,setForm]=useState({displayName:'',heightCm:'',currentWeightKg:'',goal:'',activityLevel:'',dietaryPreferences:'',allergies:'',restrictions:''});
  const field=(key:keyof typeof form,label:string,placeholder='Prefiro não informar')=><><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} value={form[key]} onChangeText={v=>setForm({...form,[key]:v})} placeholder={placeholder} style={styles.input}/></>;
  const save=async()=>{setLoading(true);try{await api.http.put('/nutrition-profile',{...form,heightCm:form.heightCm?Number(form.heightCm):null,currentWeightKg:form.currentWeightKg?Number(form.currentWeightKg):null});router.replace('/');}catch{Alert.alert('Não foi possível salvar','Tente novamente.');}finally{setLoading(false)}};
  const pages=[<>{field('displayName','Como prefere ser chamada?')}</>,<>{field('heightCm','Altura em cm','Ex.: 165')}{field('currentWeightKg','Peso atual em kg','Ex.: 68')}</>,<>{field('goal','Objetivo','Ex.: Mais energia')}{field('activityLevel','Nível de atividade','Ex.: Moderado')}{field('dietaryPreferences','Preferências alimentares')}{field('allergies','Alergias')}{field('restrictions','Restrições')}</>];
  return <SafeAreaView style={styles.page}><View style={styles.content}><Text style={styles.step}>Etapa {step+1} de 3</Text><Text style={styles.title}>{step===0?'Vamos começar por você':step===1?'Seu momento atual':'Preferências e cuidados'}</Text><Text style={styles.body}>Todos os campos são opcionais. Você pode informar depois.</Text>{pages[step]}<View style={styles.actions}>{step>0&&<Button title="Voltar" onPress={()=>setStep(step-1)}/>}<Button title={step===2?(loading?'Salvando...':'Concluir'):'Continuar'} disabled={loading} onPress={step===2?save:()=>setStep(step+1)}/></View></View></SafeAreaView>;
}
const styles=StyleSheet.create({page:{flex:1,backgroundColor:theme.colors.background},content:{flex:1,padding:theme.spacing.xl,justifyContent:'center',gap:theme.spacing.sm},step:{color:theme.colors.primary,fontWeight:'600'},title:{fontSize:30,fontWeight:'700',color:theme.colors.textPrimary},body:{fontSize:16,color:theme.colors.textSecondary,marginBottom:8},label:{color:theme.colors.textPrimary,fontWeight:'600'},input:{backgroundColor:theme.colors.surface,borderRadius:theme.radius.md,padding:theme.spacing.md,fontSize:16},actions:{flexDirection:'row',justifyContent:'space-between',marginTop:16}});
