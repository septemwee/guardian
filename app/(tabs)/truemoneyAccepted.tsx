import React from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the type for the navigation prop
// Please add your other screens to this RootStackParamList
export type RootStackParamList = {
  Home: undefined;
};

// Define the navigation prop type for type-safe usage
type TrueMoneySuccessPageNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const TrueMoneySuccessPage = () => {
  const navigation = useNavigation<TrueMoneySuccessPageNavigationProp>();

  // Function to handle the "Go back to home" button
  const handleGoHome = () => {
    // In a real app, this would navigate to the main screen.
    // For this example, we'll just log it.
    console.log('Navigating back to home screen');
    // Example navigation to the 'Home' screen:
    // navigation.navigate('Home');
  };

  // Function to handle the "Share" button
  const handleShare = () => {
    // This would open the device's native share sheet.
    // We'll just log the action for this example.
    console.log('Sharing the transaction receipt');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Header with Close Button */}
        <View style={styles.header}>
          <Text style={styles.title}>โอนเงินสำเร็จ</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={[styles.iconContainer, styles.successIconBg]}>
            <Ionicons name="checkmark-circle-outline" size={50} color="#15803d" />
          </View>
          <Text style={styles.amountText}>฿ 10,000.00</Text>

          {/* User Details */}
          <View style={styles.userDetailsContainer}>
            {/* Sender */}
            <View style={styles.userSection}>
              <View style={[styles.avatar, styles.senderAvatar]} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>นวลจันทร์ วันเพ็ญ</Text>
                <Text style={styles.userSubText}>จากวอลเล็ต</Text>
              </View>
            </View>

            {/* Down Arrow Icon */}
            <View style={styles.arrowContainer}>
              <Ionicons name="arrow-down" size={24} color="#D60000" />
            </View>

            {/* Recipient */}
            <View style={styles.userSection}>
              <View style={[styles.avatar, styles.recipientAvatar]} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>สมชาย ใจดี</Text>
                <Text style={styles.userSubText}>บัญชีธนาคาร 123-4-56789-0</Text>
              </View>
            </View>
          </View>

          {/* Status Message */}
          <Text style={[styles.statusMessage, styles.successMessage]}>
            โอนเงินสำเร็จแล้ว
          </Text>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={handleShare}>
            <Text style={styles.shareButtonText}>แชร์</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={handleGoHome}>
            <LinearGradient
              colors={['#FF8C00', '#FF4500']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.homeButtonText}>กลับหน้าหลัก</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  cardContainer: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    padding: 5,
  },
  content: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  successIconBg: {
    backgroundColor: '#d9ffdb', // A light green background for the success icon
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D60000',
    marginBottom: 20,
  },
  userDetailsContainer: {
    width: '100%',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  senderAvatar: {
    backgroundColor: '#ffb6c1',
  },
  recipientAvatar: {
    backgroundColor: '#87cefa',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userSubText: {
    fontSize: 14,
    color: '#888',
  },
  arrowContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  statusMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  successMessage: {
    color: '#15803d', // A darker green for the success message
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  shareButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  homeButton: {
    
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TrueMoneySuccessPage;
