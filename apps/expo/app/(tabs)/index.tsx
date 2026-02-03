import { View, StyleSheet } from 'react-native'
import { Text, Card } from 'react-native-paper'
import { useAuth } from '../../contexts/AuthContext'
import { colors } from '../../constants/theme'
import { router } from 'expo-router'
import { useEffect } from 'react'

export default function HomeScreen() {
  const { user, session, isPending } = useAuth()

  useEffect(() => {
    if (!session) {
      router.replace('/login')
    }
  }, [session, router])
  if (isPending) {
    return <Text>Loading...</Text>
  }
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant='headlineMedium' style={styles.title}>
            Hello, {user?.email}!
          </Text>
          <Text variant='bodyLarge' style={styles.subtitle}>
            Welcome to your home screen
          </Text>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.light.background,
  },
  card: {
    padding: 10,
    backgroundColor: colors.light.card,
  },
  title: {
    marginBottom: 8,
    color: colors.light.foreground,
  },
  subtitle: {
    color: colors.light.mutedForeground,
  },
})
