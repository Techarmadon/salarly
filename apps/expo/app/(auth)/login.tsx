import React, { useState } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native'
import { TextInput, Button, Text, Surface, useTheme } from 'react-native-paper'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useRouter } from 'expo-router'
import { colors } from '../../constants/theme'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { login } = useAuth()
  const router = useRouter()
  const theme = useTheme()

  const handleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.replace('/(tabs)')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps='handled'
        >
          <Surface style={styles.surface} elevation={4}>
            <Text variant='headlineLarge' style={styles.title}>
              Welcome Back
            </Text>
            <Text variant='bodyMedium' style={styles.subtitle}>
              Sign in to continue
            </Text>

            <TextInput
              label='Email'
              value={email}
              onChangeText={setEmail}
              mode='outlined'
              keyboardType='email-address'
              autoCapitalize='none'
              style={styles.input}
              left={<TextInput.Icon icon='email' />}
            />

            <TextInput
              label='Password'
              value={password}
              onChangeText={setPassword}
              mode='outlined'
              secureTextEntry={!showPassword}
              style={styles.input}
              left={<TextInput.Icon icon='lock' />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            {error ? (
              <Text style={[styles.error, { color: theme.colors.error }]}>
                {error}
              </Text>
            ) : null}

            <Button
              mode='contained'
              onPress={handleLogin}
              loading={loading}
              disabled={loading || !email || !password}
              style={styles.button}
            >
              Login
            </Button>

            <Text variant='bodySmall' style={styles.hint}>
              <Text variant='bodySmall' style={styles.hint}>
                Don't have an account?{' '}
                <Link href='/'>
                  <Text style={{ color: theme.colors.primary }}>Register</Text>
                </Link>{' '}
                now.
              </Text>{' '}
            </Text>
          </Surface>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  surface: {
    padding: 30,
    borderRadius: 16,
    backgroundColor: colors.light.card,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: colors.light.foreground,
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    color: colors.light.mutedForeground,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
  },
  hint: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.light.mutedForeground,
  },
})
