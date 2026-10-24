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
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ResetPasswordScreen() {
  const { resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const { error: authError } = await resetPassword(email);
    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
  };

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.backButton}>
            <IconButton
              name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
              size="md"
              variant="ghost"
              accessibilityLabel="Go back"
              onPress={handleBackToLogin}
            />
          </View>

          <View style={styles.successContainer}>
            <Icon
              name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
              size={80}
              tone="success"
              className="mb-4"
            />
            <Text variant="heading" tone="ink" className="font-jakarta-bold mb-2 text-center">
              Email Sent!
            </Text>
            <Text variant="body" tone="ink-muted" className="text-center mb-6 px-8">
              We&apos;ve sent a password reset link to <Text variant="body" tone="ink" className="font-jakarta-medium">{email}</Text>. Check your inbox and follow the instructions to reset your password.
            </Text>

            <Button variant="primary" size="md" className="w-full mb-3" onPress={handleBackToLogin}>
              Back to Sign In
            </Button>

            <Button variant="ghost" size="md" className="w-full" onPress={() => setSent(false)}>
              Resend Email
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.backButton}>
          <IconButton
            name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
            size="md"
            variant="ghost"
            accessibilityLabel="Go back"
            onPress={handleBackToLogin}
          />
        </View>

        <View style={styles.header}>
          <Icon
            name={{ ios: 'key.fill', android: 'vpn_key', web: 'vpn_key' }}
            size={56}
            tone="primary"
            className="mb-4"
          />
          <Text variant="heading" tone="ink" className="font-jakarta-bold mb-2">
            Reset Password
          </Text>
          <Text variant="body" tone="ink-muted" className="text-center">
            Enter your email and we&apos;ll send you a link to reset your password
          </Text>
        </View>

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
            returnKeyType="done"
            onSubmitEditing={handleReset}
            className="mb-4"
          />

          {error && (
            <Text variant="footnote" tone="danger" className="mb-4 text-center">
              {error}
            </Text>
          )}

          <Button
            variant="primary"
            size="md"
            className="w-full"
            loading={loading}
            onPress={handleReset}
          >
            Send Reset Link
          </Button>
        </View>

        <View style={styles.signUpLink}>
          <Text variant="body" tone="ink-muted">
            Remember your password?{' '}
          </Text>
          <Text
            variant="body"
            tone="primary"
            className="font-jakarta-semibold"
            onPress={handleBackToLogin}
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
  successContainer: {
    alignItems: 'center',
    paddingTop: 32,
  },
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});