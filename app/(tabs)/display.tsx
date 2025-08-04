// screens/PermissionBoxExample.js OR app/index.js if using Expo Router
import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Alert,
  View,
} from 'react-native';
import PermissionBox from '@/components/ui/permissionBox'; // Adjust this path based on your project structure

const PermissionBoxExample = () => {
  // Mock data for the transaction
  const transactionData = {
    senderName: 'นวลจันทร์ วันเพ็ญ',
    senderAccount: 'จากวอลเล็ต',
    recipientName: 'สมชาย ใจดี',
    recipientAccount: 'บัญชีธนาคาร 123-4-56789-0',
    amount: 10000.00,
  };

  const handleReject = () => {
    Alert.alert('Transaction Rejected', 'คุณได้ปฏิเสธรายการนี้', [{
      text: 'ตกลง'
    }]);
    // In a real app, this would trigger an API call to reject the transaction
  };

  const handleAccept = () => {
    Alert.alert('Transaction Accepted', 'คุณได้อนุมัติรายการนี้', [{
      text: 'ตกลง'
    }]);
    // In a real app, this would trigger an API call to accept the transaction
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>รายการที่ต้องอนุมัติ</Text>
        </View>

        <View style={styles.cardWrapper}>
          <PermissionBox
            senderName={transactionData.senderName}
            senderAccount={transactionData.senderAccount}
            recipientName={transactionData.recipientName}
            recipientAccount={transactionData.recipientAccount}
            amount={transactionData.amount}
            onReject={handleReject}
            onAccept={handleAccept}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Adjust for Android status bar
  },
  scrollViewContent: {
    padding: 15,
  },
  header: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24, // Slightly larger for prominence
    fontWeight: 'bold',
    color: '#333',
  },
  cardWrapper: {
    marginTop: 20,
  },
});

export default PermissionBoxExample;