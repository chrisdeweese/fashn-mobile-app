import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';

export default function SignInScreen() {
  const colorScheme = useColorScheme();
  
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(-20);
  const googleButtonOpacity = useSharedValue(0);
  const googleButtonScale = useSharedValue(0.9);
  const githubButtonOpacity = useSharedValue(0);
  const githubButtonScale = useSharedValue(0.9);
  const footerOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate title
    titleOpacity.value = withTiming(1, { duration: 600 });
    titleTranslateY.value = withSpring(0, { damping: 15, stiffness: 120 });
    
    // Animate buttons with delays
    googleButtonOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
    googleButtonScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 100 }));
    
    githubButtonOpacity.value = withDelay(450, withTiming(1, { duration: 500 }));
    githubButtonScale.value = withDelay(450, withSpring(1, { damping: 12, stiffness: 100 }));
    
    // Animate footer
    footerOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const googleButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: googleButtonOpacity.value,
    transform: [{ scale: googleButtonScale.value }],
  }));

  const githubButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: githubButtonOpacity.value,
    transform: [{ scale: githubButtonScale.value }],
  }));

  const footerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }));

  const handleGoogleSignIn = () => {
    Alert.alert(
      'Google Sign In',
      'Demo: Google authentication would be integrated here',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue Demo', 
          onPress: () => router.replace('/(tabs)')
        }
      ]
    );
  };

  const handleGitHubSignIn = () => {
    Alert.alert(
      'GitHub Sign In',
      'Demo: GitHub authentication would be integrated here',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue Demo', 
          onPress: () => router.replace('/(tabs)')
        }
      ]
    );
  };

  const handleSkipSignIn = () => {
    router.replace('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Animated.View style={[styles.header, titleAnimatedStyle]}>
          <ThemedText type="title" style={styles.title}>Welcome to FASHN AI</ThemedText>
          <ThemedText style={styles.subtitle}>
            Sign in to save your virtual try-ons and access your wardrobe
          </ThemedText>
        </Animated.View>

        {/* Sign In Options */}
        <View style={styles.signInContainer}>
          {/* Google Sign In */}
          <Animated.View style={googleButtonAnimatedStyle}>
            <TouchableOpacity
              style={[styles.signInButton, styles.googleButton]}
              onPress={handleGoogleSignIn}
            >
              <View style={styles.googleIcon}>
                <ThemedText style={styles.googleIconText}>G</ThemedText>
              </View>
              <ThemedText style={styles.signInButtonText}>Continue with Google</ThemedText>
            </TouchableOpacity>
          </Animated.View>

          {/* GitHub Sign In */}
          <Animated.View style={githubButtonAnimatedStyle}>
            <TouchableOpacity
              style={[styles.signInButton, styles.githubButton]}
              onPress={handleGitHubSignIn}
            >
              <View style={styles.githubIcon}>
                <IconSymbol size={20} name="chevron.left.forwardslash.chevron.right" color="#fff" />
              </View>
              <ThemedText style={[styles.signInButtonText, { color: '#fff' }]}>Continue with GitHub</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.View style={[styles.footer, footerAnimatedStyle]}>
          <TouchableOpacity onPress={handleSkipSignIn}>
            <ThemedText style={styles.skipText}>Skip for now</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </ThemedText>
        </Animated.View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  signInContainer: {
    gap: 16,
    marginBottom: 60,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  githubButton: {
    backgroundColor: '#24292e',
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIconText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  githubIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  footer: {
    alignItems: 'center',
    gap: 16,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.7,
  },
  termsText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 20,
  },
}); 