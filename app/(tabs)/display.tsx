import React from 'react';
import {
  Platform, // <-- Added Platform here
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Alert, // Use Alert for demonstrating actions in a development environment
  View,
} from 'react-native';
import PermissionBox from '@/components/ui/permissionBox';// Assuming PermissionBox.js is in the same directory

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
    Alert.alert('Transaction Rejected', 'You have rejected the transaction.');
    // In a real app, this would trigger an API call to reject the transaction
  };

  const handleAccept = () => {
    Alert.alert('Transaction Accepted', 'You have accepted the transaction.');
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
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  scrollViewContent: {
    padding: 15,
  },
  header: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardWrapper: {
    marginTop: 20,
  },
});

export default PermissionBoxExample;
