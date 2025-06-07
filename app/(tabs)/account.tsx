import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AccountScreen() {
  const colorScheme = useColorScheme();

  const SettingsItem = ({ title, subtitle, icon, onPress, showArrow = true }: {
    title: string;
    subtitle?: string;
    icon: string;
    onPress: () => void;
    showArrow?: boolean;
  }) => (
    <TouchableOpacity 
      style={[styles.settingsItem, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} 
      onPress={onPress}
    >
      <View style={styles.settingsItemContent}>
        <View style={[styles.settingsIcon, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
          <IconSymbol size={20} name={icon} color={Colors[colorScheme ?? 'light'].tint} />
        </View>
        <View style={styles.settingsText}>
          <ThemedText type="defaultSemiBold" style={styles.settingsTitle}>{title}</ThemedText>
          {subtitle && <ThemedText style={styles.settingsSubtitle}>{subtitle}</ThemedText>}
        </View>
      </View>
      {showArrow && (
        <IconSymbol size={16} name="chevron.right" color={Colors[colorScheme ?? 'light'].tabIconDefault} />
      )}
    </TouchableOpacity>
  );

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('User signed out') }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Account</ThemedText>
          <ThemedText style={styles.subtitle}>
            Manage your profile and settings
          </ThemedText>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <View style={[styles.profileCard, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={[styles.profileImage, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
              <IconSymbol size={40} name="person.crop.circle.fill" color={Colors[colorScheme ?? 'light'].tint} />
            </View>
            <View style={styles.profileInfo}>
              <ThemedText type="subtitle" style={styles.profileName}>Demo User</ThemedText>
              <ThemedText style={styles.profileEmail}>demo@fashn.ai</ThemedText>
              <ThemedText style={styles.profilePlan}>Pro Plan</ThemedText>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <ThemedText style={[styles.editButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>Edit</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Usage & Billing</ThemedText>
          <SettingsItem
            title="API Usage"
            subtitle="View your monthly usage"
            icon="paperplane.fill"
            onPress={() => console.log('API Usage pressed')}
          />
          <SettingsItem
            title="Billing & Subscription"
            subtitle="Manage your subscription"
            icon="house.fill"
            onPress={() => console.log('Billing pressed')}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Preferences</ThemedText>
          <SettingsItem
            title="Notifications"
            subtitle="Manage your notifications"
            icon="house.fill"
            onPress={() => console.log('Notifications pressed')}
          />
          <SettingsItem
            title="Privacy & Security"
            subtitle="Control your privacy settings"
            icon="house.fill"
            onPress={() => console.log('Privacy pressed')}
          />
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Support</ThemedText>
          <SettingsItem
            title="Help Center"
            subtitle="Get help and support"
            icon="house.fill"
            onPress={() => console.log('Help pressed')}
          />
          <SettingsItem
            title="Contact Us"
            subtitle="Reach out to our team"
            icon="paperplane.fill"
            onPress={() => console.log('Contact pressed')}
          />
        </View>

        <View style={styles.section}>
          <TouchableOpacity 
            style={[styles.signOutButton, { borderColor: Colors[colorScheme ?? 'light'].tabIconDefault }]}
            onPress={handleSignOut}
          >
            <ThemedText style={[styles.signOutText, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>Sign Out</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>FASHN AI v1.0.0</ThemedText>
          <ThemedText style={styles.footerText}>Made with ❤️ for fashion</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  profilePlan: {
    fontSize: 12,
    opacity: 0.6,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsText: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  signOutButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
    marginBottom: 4,
  },
}); 