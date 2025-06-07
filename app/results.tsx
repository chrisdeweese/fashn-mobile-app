import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

export default function ResultsScreen() {
  const colorScheme = useColorScheme();
  const { modelPhoto, garmentPhoto, garmentType } = useLocalSearchParams<{
    modelPhoto: string;
    garmentPhoto: string;
    garmentType: string;
  }>();

  const [isGenerating, setIsGenerating] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const progressWidth = useSharedValue(0);
  const resultScale = useSharedValue(0.8);
  const resultOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(50);
  const buttonsOpacity = useSharedValue(0);

  // Generation steps
  const generationSteps = [
    "Analyzing model pose and lighting",
    "Processing garment texture and fit",
    "Matching clothing to body shape",
    "Applying virtual try-on technology",
    "Enhancing realism and details",
    "Finalizing your result"
  ];

  const generatedResult = modelPhoto;

  useEffect(() => {
    const simulateProgress = async () => {
      for (let i = 0; i < generationSteps.length; i++) {
        setCurrentStep(i);
        progressWidth.value = withTiming((i + 1) / generationSteps.length * 100, { duration: 1200 });
        await new Promise(resolve => setTimeout(resolve, 1400));
      }
      
      // Reveal result with celebration animation
      setIsGenerating(false);
      setShowResult(true);
      
      // Animate result appearance
      resultOpacity.value = withTiming(1, { duration: 800 });
      resultScale.value = withSpring(1, { damping: 12, stiffness: 100 });
      
      // Animate buttons after result
      setTimeout(() => {
        buttonsOpacity.value = withTiming(1, { duration: 600 });
        buttonsTranslateY.value = withSpring(0, { damping: 15, stiffness: 120 });
      }, 400);
    };

    simulateProgress();
  }, []);

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const resultAnimatedStyle = useAnimatedStyle(() => ({
    opacity: resultOpacity.value,
    transform: [{ scale: resultScale.value }],
  }));

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  const handleDownload = () => {
    Alert.alert('Download', 'Image would be saved to your photo library');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share functionality would be implemented here');
  };

  const handleNewProject = () => {
    router.push('/');
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: isGenerating ? 'Generating...' : 'Results',
          headerBackTitle: 'Studio',
          headerShown: true,
        }} 
      />
      <ThemedView style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
          bounces={false}
        >
          {/* Generation Progress */}
          {isGenerating && (
            <View style={styles.progressSection}>
              <View style={[styles.progressCard, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
                <View style={styles.progressHeader}>
                  <View style={[styles.progressIconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '15' }]}>
                    <IconSymbol 
                      size={28} 
                      name="camera.fill" 
                      color={Colors[colorScheme ?? 'light'].tint} 
                    />
                  </View>
                  <ThemedText type="subtitle" style={styles.progressTitle}>
                    AI is creating your virtual try-on
                  </ThemedText>
                  <ThemedText style={styles.progressSubtitle}>
                    Using advanced machine learning to match pose, lighting, and fit
                  </ThemedText>
                </View>
                
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault + '15' }]}>
                    <Animated.View 
                      style={[
                        styles.progressFill, 
                        { backgroundColor: Colors[colorScheme ?? 'light'].tint },
                        progressAnimatedStyle
                      ]} 
                    />
                  </View>
                  <View style={styles.progressInfo}>
                    <ThemedText style={styles.progressText}>
                      {generationSteps[currentStep]}
                    </ThemedText>
                    <ThemedText style={styles.progressTime}>
                      {Math.round((currentStep + 1) / generationSteps.length * 100)}%
                    </ThemedText>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Main Result */}
          {showResult && (
            <View style={styles.resultSection}>
              <Animated.View style={[styles.resultCard, resultAnimatedStyle]}>
                <Image source={{ uri: generatedResult }} style={styles.resultImage} resizeMode="cover" />
              </Animated.View>
              
              <View style={styles.resultInfo}>
                <ThemedText type="title" style={styles.resultTitle}>Perfect Fit!</ThemedText>
              </View>
            </View>
          )}

          {/* Input Reference - Only shown during generation */}
          {isGenerating && (
            <View style={styles.inputSection}>
              <ThemedText type="subtitle" style={styles.inputSectionTitle}>Processing Images</ThemedText>
              <View style={styles.inputGrid}>
                <View style={styles.inputCard}>
                  <Image source={{ uri: modelPhoto }} style={styles.inputImage} resizeMode="cover" />
                  <View style={styles.inputLabel}>
                    <ThemedText style={styles.inputLabelText}>Model</ThemedText>
                  </View>
                </View>
                <View style={styles.inputCard}>
                  <Image source={{ uri: garmentPhoto }} style={styles.inputImage} resizeMode="cover" />
                  <View style={styles.inputLabel}>
                    <ThemedText style={styles.inputLabelText}>{garmentType}</ThemedText>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          {showResult && (
            <Animated.View style={[styles.actionsSection, buttonsAnimatedStyle]}>
              <View style={styles.primaryActions}>
                <TouchableOpacity
                  style={[styles.primaryButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
                  onPress={handleDownload}
                >
                  <IconSymbol size={18} name="photo.fill" color="#000" />
                  <ThemedText style={styles.primaryButtonText}>Save Image</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.primaryButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
                  onPress={handleShare}
                >
                  <IconSymbol size={18} name="paperplane.fill" color="#000" />
                  <ThemedText style={styles.primaryButtonText}>Share</ThemedText>
                </TouchableOpacity>
              </View>

              <View style={styles.secondaryActions}>
                <TouchableOpacity
                  style={[styles.tertiaryButton]}
                  onPress={handleNewProject}
                >
                  <ThemedText style={[styles.tertiaryButtonText, { color: Colors[colorScheme ?? 'light'].text, opacity: 0.7 }]}>
                    Start New Project
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  progressCard: {
    padding: 28,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  progressHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 20,
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  progressTime: {
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  resultSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
    alignItems: 'center',
  },
  resultCard: {
    width: '85%',
    aspectRatio: 3/4,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
    position: 'relative',
  },
  resultImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },

  resultInfo: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultDescription: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  inputSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    opacity: 0.8,
  },
  inputGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  inputCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputImage: {
    width: '100%',
    aspectRatio: 3/4,
  },
  inputLabel: {
    padding: 8,
    alignItems: 'center',
  },
  inputLabelText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
    opacity: 0.8,
  },
  actionsSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  primaryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryActions: {
    gap: 12,
  },
  tertiaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
}); 