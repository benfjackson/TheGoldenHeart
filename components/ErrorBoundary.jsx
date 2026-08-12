import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { logError } from '../utils/logger';

export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    logError('ErrorBoundary', 'React render error', error, {
      componentStack: info.componentStack
    });
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    if (typeof __DEV__ !== 'undefined' && !__DEV__) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>Please restart the app.</Text>
        </View>
      );
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Render error</Text>
        <Text style={styles.message}>{this.state.error.message}</Text>
        <Text style={styles.stack}>{this.state.error.stack}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    color: '#FFA500',
    fontSize: 24,
    marginBottom: 12
  },
  message: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16
  },
  stack: {
    color: '#aaa',
    fontSize: 12,
    fontFamily: 'Courier'
  }
});
