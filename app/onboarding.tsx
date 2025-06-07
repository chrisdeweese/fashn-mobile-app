import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.8);
  const step1Opacity = useSharedValue(0);
  const step1TranslateY = useSharedValue(30);
  const step2Opacity = useSharedValue(0);
  const step2TranslateY = useSharedValue(30);
  const step3Opacity = useSharedValue(0);
  const step3TranslateY = useSharedValue(30);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.9);

  useEffect(() => {
    // Animate title
    titleOpacity.value = withTiming(1, { duration: 800 });
    titleScale.value = withSpring(1, { damping: 15, stiffness: 150 });
    
    // Animate steps with delays
    step1Opacity.value = withDelay(400, withTiming(1, { duration: 600 }));
    step1TranslateY.value = withDelay(400, withSpring(0, { damping: 15, stiffness: 120 }));
    
    step2Opacity.value = withDelay(800, withTiming(1, { duration: 600 }));
    step2TranslateY.value = withDelay(800, withSpring(0, { damping: 15, stiffness: 120 }));
    
    step3Opacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
    step3TranslateY.value = withDelay(1200, withSpring(0, { damping: 15, stiffness: 120 }));
    
    // Animate button
    buttonOpacity.value = withDelay(1600, withTiming(1, { duration: 600 }));
    buttonScale.value = withDelay(1600, withSpring(1, { damping: 12, stiffness: 100 }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ scale: titleScale.value }],
  }));

  const step1AnimatedStyle = useAnimatedStyle(() => ({
    opacity: step1Opacity.value,
    transform: [{ translateY: step1TranslateY.value }],
  }));

  const step2AnimatedStyle = useAnimatedStyle(() => ({
    opacity: step2Opacity.value,
    transform: [{ translateY: step2TranslateY.value }],
  }));

  const step3AnimatedStyle = useAnimatedStyle(() => ({
    opacity: step3Opacity.value,
    transform: [{ translateY: step3TranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  const handleGetStarted = () => {
    router.push('/signin');
  };

  const ProcessStep = ({ icon, title, description, animatedStyle }: {
    icon: string;
    title: string;
    description: string;
    animatedStyle: any;
  }) => (
    <Animated.View style={[styles.stepCard, animatedStyle]}>
      <View style={[styles.stepIcon, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
        <IconSymbol size={32} name={icon as any} color="#000" />
      </View>
      <View style={styles.stepContent}>
        <ThemedText type="defaultSemiBold" style={styles.stepTitle}>{title}</ThemedText>
        <ThemedText style={styles.stepDescription}>{description}</ThemedText>
      </View>
    </Animated.View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <Animated.View style={[styles.header, titleAnimatedStyle]}>
          <ThemedText type="title" style={styles.title}>FASHN AI</ThemedText>
          <ThemedText style={styles.subtitle}>Virtual Try-On Technology</ThemedText>
        </Animated.View>

        {/* Process Steps */}
        <View style={styles.stepsContainer}>
          <ProcessStep
            icon="person.2.fill"
            title="Upload Model"
            description="Choose a photo of yourself or a model"
            animatedStyle={step1AnimatedStyle}
          />
          
          <ProcessStep
            icon="tshirt.fill"
            title="Select Garment"
            description="Upload any clothing item you want to try"
            animatedStyle={step2AnimatedStyle}
          />
          
          <ProcessStep
            icon="camera.fill"
            title="AI Magic"
            description="Our AI perfectly fits the garment to the model"
            animatedStyle={step3AnimatedStyle}
          />
        </View>

        {/* Get Started Button */}
        <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
          <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handleGetStarted}
          >
            <ThemedText style={styles.getStartedButtonText}>Start Trying On</ThemedText>
            <IconSymbol size={20} name="chevron.right" color="#000" />
          </TouchableOpacity>
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    opacity: 0.8,
    textAlign: 'center',
    fontWeight: '500',
  },
  stepsContainer: {
    gap: 24,
    marginBottom: 60,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  stepIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 18,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    gap: 12,
    width: '100%',
    maxWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  getStartedButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 