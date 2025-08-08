import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// --- Main App Component ---
const App = () => {
  const [stats] = useState({
    suspiciousMessages: 5,
    suspiciousCalls: 12,
    suspiciousWebsites: 3,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* ส่วนหัว: การ์ด True Guardian */}
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

      {/* ส่วน Dashboard แสดงสถิติ */}
      <View style={styles.dashboardContainer}>
        <Text style={styles.dashboardHeader}>รายงานความปลอดภัย</Text>
        <View style={styles.statCardsRow}>
          {/* สถิติข้อความน่าสงสัย */}
          <View style={styles.statCard}>
            <Ionicons name="chatbox-ellipses-outline" size={30} color="#D60000" />
            <Text style={styles.statNumber}>{stats.suspiciousMessages}</Text>
            <Text style={styles.statText}>ข้อความ</Text>
          </View>

          {/* สถิติสายโทรศัพท์น่าสงสัย */}
          <View style={styles.statCard}>
            <Ionicons name="call-outline" size={30} color="#D60000" />
            <Text style={styles.statNumber}>{stats.suspiciousCalls}</Text>
            <Text style={styles.statText}>สายโทรศัพท์</Text>
          </View>

          {/* สถิติเว็บน่าสงสัย */}
          <View style={styles.statCard}>
            <Ionicons name="globe-outline" size={30} color="#D60000" />
            <Text style={styles.statNumber}>{stats.suspiciousWebsites}</Text>
            <Text style={styles.statText}>เว็บไซต์</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
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
    minHeight: 120,
  },
  guardianText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    paddingLeft: 10,
  },
  shieldIconBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 20,
  },
  dashboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  dashboardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 20,
    color: '#333',
  },
  statCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
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
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#D60000',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
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
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#555',
  },
  navTextActive: {
    fontSize: 12,
    marginTop: 4,
    color: '#D60000',
    fontWeight: 'bold',
  },
});

export default App;
