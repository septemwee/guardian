import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* True Guardian Card */}
      <View style={styles.guardianCardContainer}>
        <LinearGradient
          colors={['#8A0000', '#D60000']}
          style={styles.guardianCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.guardianCardContent}>
            <Text style={styles.guardianText}>True Guardian</Text>
            <View style={styles.shieldIconBackground}>
              <MaterialCommunityIcons name="shield-lock-outline" size={60} color="#fff" />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Main Feature Buttons */}
      <View style={styles.mainButtonsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="chatbox-ellipses-outline" size={40} color="#D60000" />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureButton}>
            <Ionicons name="globe-outline" size={40} color="#D60000" />
            <Text style={styles.buttonText}>Browser</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.trueMoneyButton}>
          <View style={styles.trueMoneyContent}>
            <MaterialCommunityIcons name="wallet-outline" size={40} color="#D60000" />
            <Text style={styles.buttonText}>True Money</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? 25 : 0, // บรรทัดนี้ใช้ Platform
  },
  header: {
    padding: 15,
  },
  headerText: {
    fontSize: 18,
    color: '#888',
  },
  guardianCardContainer: {
    paddingHorizontal: 20,
    marginTop: 60,
    marginBottom: 20,
  },
  guardianCardGradient: {
    borderRadius: 20,
    padding: 20,
  },
  guardianCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guardianText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  shieldIconBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 5,
  },
  mainButtonsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  featureButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trueMoneyButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trueMoneyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  bottomNav: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navButton: {
    padding: 10,
  },
});

export default App;