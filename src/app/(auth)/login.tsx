import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {
  Text,
  TextField,
  Button,
  IconButton,
  Icon,
} from '@/components/ui';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const params = useLocalSearchParams<{ redirect?: string }>();
  const { signIn, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const { error: authError } = await signIn(email, password);
    if (authError) {
      setError(authError.message);
    } else {
      // Redirect to intended route or home
      const redirect = params.redirect || '/';
      router.replace(redirect as string);
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/reset-password');
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
            Welcome Back
          </Text>
          <Text variant="body" tone="ink-muted" className="text-center">
            Sign in to continue your fitness journey
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
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
            autoComplete="password"
            returnKeyType="done"
            onSubmitEditing={handleSignIn}
            className="mb-2"
          />

          {error && (
            <Text variant="footnote" tone="danger" className="mb-4 text-center">
              {error}
            </Text>
          )}

          <View style={styles.forgotPassword}>
            <Button variant="ghost" size="sm" onPress={handleForgotPassword}>
              Forgot Password?
            </Button>
          </View>

          <Button
            variant="primary"
            size="md"
            className="w-full mt-4"
            loading={loading}
            onPress={handleSignIn}
          >
            Sign In
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

        {/* Sign up link */}
        <View style={styles.signUpLink}>
          <Text variant="body" tone="ink-muted">
            Don&apos;t have an account?{' '}
          </Text>
          <Text
            variant="body"
            tone="primary"
            className="font-jakarta-semibold"
            onPress={() => router.push('/(auth)/signup')}
          >
            Sign Up
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
  forgotPassword: {
    alignItems: 'flex-end',
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