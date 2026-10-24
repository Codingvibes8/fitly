import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  Text,
  TextField,
  Button,
  IconButton,
  Icon,
} from '@/components/ui';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function SignupScreen() {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!fullName.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!email.trim()) {
      setError('Please enter your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    setError('');
    if (!validateForm()) return;

    const { error: authError } = await signUp(email, password, fullName);
    if (authError) {
      setError(authError.message);
    } else {
      // Show success and redirect to login or home
      Alert.alert(
        'Account Created!',
        'Please check your email to verify your account, then sign in.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back button */}
        <View style={styles.backButton}>
          <IconButton
            name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
            size="md"
            variant="ghost"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
          />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Icon
            name={{ ios: 'dumbbell.fill', android: 'fitness_center', web: 'fitness_center' }}
            size={56}
            tone="primary"
            className="mb-4"
          />
          <Text variant="heading" tone="ink" className="font-jakarta-bold mb-2">
            Create Account
          </Text>
          <Text variant="body" tone="ink-muted" className="text-center">
            Start your fitness journey today
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <TextField
            label="Full Name"
            placeholder="Alex Morgan"
            leadingIcon={{ ios: 'person', android: 'person', web: 'person' }}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            autoComplete="name"
            returnKeyType="next"
            className="mb-4"
          />

          <TextField
            label="Email"
            placeholder="you@example.com"
            type="email"
            leadingIcon={{ ios: 'envelope', android: 'email', web: 'email' }}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            returnKeyType="next"
            className="mb-4"
          />

          <TextField
            label="Password"
            placeholder="••••••••"
            type="password"
            leadingIcon={{ ios: 'lock', android: 'lock', web: 'lock' }}
            value={password}
            onChangeText={setPassword}
            autoComplete="new-password"
            returnKeyType="next"
            className="mb-4"
          />

          <TextField
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            leadingIcon={{ ios: 'lock', android: 'lock', web: 'lock' }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoComplete="new-password"
            returnKeyType="done"
            onSubmitEditing={handleSignUp}
            className="mb-2"
          />

          {error && (
            <Text variant="footnote" tone="danger" className="mb-4 text-center">
              {error}
            </Text>
          )}

          <Text variant="footnote" tone="ink-muted" className="text-center px-4 mb-4">
            By creating an account, you agree to our{' '}
            <Text variant="footnote" tone="primary" className="font-jakarta-medium">Terms of Service</Text>
            {' '}and{' '}
            <Text variant="footnote" tone="primary" className="font-jakarta-medium">Privacy Policy</Text>
          </Text>

          <Button
            variant="primary"
            size="md"
            className="w-full"
            loading={loading}
            onPress={handleSignUp}
          >
            Create Account
          </Button>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text variant="footnote" tone="ink-subtle" className="px-4">
            or
          </Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social / Alternative */}
        <View style={styles.alternative}>
          <Button
            variant="secondary"
            size="md"
            className="w-full"
            icon={<Icon name={{ ios: 'apple.logo', android: 'apple', web: 'apple' }} size={20} tone="ink" />}
          >
            Continue with Apple
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="w-full mt-3"
            icon={<Icon name={{ ios: 'logo.google', android: 'g_translate', web: 'g_translate' }} size={20} tone="ink" />}
          >
            Continue with Google
          </Button>
        </View>

        {/* Login link */}
        <View style={styles.signUpLink}>
          <Text variant="body" tone="ink-muted">
            Already have an account?{' '}
          </Text>
          <Text
            variant="body"
            tone="primary"
            className="font-jakarta-semibold"
            onPress={() => router.push('/(auth)/login')}
          >
            Sign In
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  header: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 16,
  },
  form: {
    gap: 16,
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  alternative: {
    gap: 12,
    marginTop: 8,
  },
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});