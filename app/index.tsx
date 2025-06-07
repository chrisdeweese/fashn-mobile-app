import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    // For now, always show onboarding on app launch
    // In a real app, you'd check AsyncStorage for first-time user status
    router.replace('/onboarding');
  }, []);

  return null;
} 