import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Browser() {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: 'https://www.google.com' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
});
