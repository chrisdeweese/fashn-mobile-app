import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function StudioScreen() {
  const colorScheme = useColorScheme();
  const [selectedGarmentType, setSelectedGarmentType] = useState<'top' | 'bottom' | 'dress' | null>(null);
  const [modelPhoto, setModelPhoto] = useState<string | null>(null);
  const [garmentPhoto, setGarmentPhoto] = useState<string | null>(null);

  const handleImageUpload = async (type: 'model' | 'garment') => {
    Alert.alert(
      'Upload Photo',
      'Choose an option',
      [
        { 
          text: 'Camera', 
          onPress: () => openImagePicker(type, 'camera')
        },
        { 
          text: 'Photo Library', 
          onPress: () => openImagePicker(type, 'library')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const openImagePicker = async (type: 'model' | 'garment', source: 'camera' | 'library') => {
    try {
      // Request permissions
      if (source === 'camera') {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraPermission.status !== 'granted') {
          Alert.alert('Permission Required', 'Camera permission is required to take photos.');
          return;
        }
      } else {
        const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaLibraryPermission.status !== 'granted') {
          Alert.alert('Permission Required', 'Photo library permission is required to select photos.');
          return;
        }
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const imageUri = result.assets[0].uri;
        if (type === 'model') {
          setModelPhoto(imageUri);
        } else {
          setGarmentPhoto(imageUri);
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const handleGenerate = () => {
    if (!modelPhoto || !garmentPhoto || !selectedGarmentType) {
      Alert.alert('Missing Information', 'Please upload both photos and select a garment type');
      return;
    }
    
    // Navigate to results page with the data
    router.push({
      pathname: '/results',
      params: {
        modelPhoto,
        garmentPhoto,
        garmentType: selectedGarmentType,
      },
    });
  };

  const UploadBox = ({ title, type, hasImage, imageUri }: {
    title: string;
    type: 'model' | 'garment';
    hasImage: boolean;
    imageUri?: string | null;
  }) => (
    <TouchableOpacity 
      style={[
        styles.uploadBox, 
        { 
          backgroundColor: hasImage ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].background,
          borderColor: hasImage ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].tabIconDefault + '40',
          borderWidth: hasImage ? 2 : 1,
        }
      ]}
      onPress={() => handleImageUpload(type)}
    >
      {hasImage && imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.uploadedImage} resizeMode="cover" />
      ) : (
        <View style={styles.uploadContent}>
          <View style={[styles.uploadIcon, { backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault + '15' }]}>
            <IconSymbol 
              size={36} 
              name="camera.fill" 
              color={Colors[colorScheme ?? 'light'].tabIconDefault} 
            />
          </View>
          <ThemedText type="defaultSemiBold" style={styles.uploadTitle}>{title}</ThemedText>
        </View>
      )}
      {hasImage && (
        <View style={[styles.uploadedBadge, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
          <IconSymbol size={12} name="photo.fill" color="#fff" />
        </View>
      )}
    </TouchableOpacity>
  );

  const GarmentTypeButton = ({ type, label, icon }: {
    type: 'top' | 'bottom' | 'dress';
    label: string;
    icon: 'tshirt.fill' | 'figure.walk' | 'rectangle.fill';
  }) => {
    const isSelected = selectedGarmentType === type;
    return (
      <TouchableOpacity
        style={[
          styles.garmentButton,
          {
            backgroundColor: isSelected ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].background,
            borderColor: isSelected ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].tabIconDefault + '30',
            shadowOpacity: isSelected ? 0.15 : 0.05,
          }
        ]}
        onPress={() => setSelectedGarmentType(type)}
      >
        <IconSymbol 
          size={24} 
          name={icon} 
          color={isSelected ? '#000' : Colors[colorScheme ?? 'light'].tabIconDefault} 
        />
        <ThemedText 
          style={[
            styles.garmentButtonText,
            { color: isSelected ? '#000' : Colors[colorScheme ?? 'light'].text }
          ]}
        >
          {label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const isReadyToGenerate = modelPhoto && garmentPhoto && selectedGarmentType;

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>FASHN AI Studio</ThemedText>
        </View>

        {/* Upload Section */}
        <View style={styles.uploadSection}>
          <View style={styles.uploadGrid}>
            <View style={styles.uploadColumn}>
              <ThemedText style={styles.uploadLabel}>Select Model</ThemedText>
              <UploadBox
                title="Model"
                type="model"
                hasImage={!!modelPhoto}
                imageUri={modelPhoto}
              />
            </View>
            <View style={styles.uploadColumn}>
              <ThemedText style={styles.uploadLabel}>Select Garment</ThemedText>
              <UploadBox
                title="Garment"
                type="garment"
                hasImage={!!garmentPhoto}
                imageUri={garmentPhoto}
              />
            </View>
          </View>
        </View>

        {/* Garment Type Selection */}
        <View style={styles.garmentSection}>
          <View style={styles.garmentTypes}>
            <GarmentTypeButton type="top" label="Top" icon="tshirt.fill" />
            <GarmentTypeButton type="bottom" label="Bottom" icon="figure.walk" />
            <GarmentTypeButton type="dress" label="Dress" icon="rectangle.fill" />
          </View>
        </View>

        {/* Generate Button */}
        <View style={styles.generateSection}>
          <TouchableOpacity
            style={[
              styles.generateButton,
              {
                backgroundColor: isReadyToGenerate 
                  ? Colors[colorScheme ?? 'light'].tint 
                  : Colors[colorScheme ?? 'light'].tabIconDefault + '40',
                shadowOpacity: isReadyToGenerate ? 0.25 : 0.1,
              }
            ]}
            onPress={handleGenerate}
            disabled={!isReadyToGenerate}
          >
            <IconSymbol size={22} name="play.rectangle.fill" color="#000" />
            <ThemedText style={styles.generateButtonText}>Generate Try-On</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
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
    paddingVertical: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  uploadSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  uploadGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  uploadColumn: {
    flex: 1,
  },
  uploadLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  uploadBox: {
    flex: 1,
    borderRadius: 12,
    borderStyle: 'dashed',
    aspectRatio: 3/4,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  uploadContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  uploadedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  garmentSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  garmentTypes: {
    flexDirection: 'row',
    gap: 12,
  },
  garmentButton: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  garmentButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  generateSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 12,
    gap: 10,
    width: '100%',
    maxWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  generateButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
