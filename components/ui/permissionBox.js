// src/components/ui/permissionBox.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';

const PermissionBox = ({
  senderName,
  senderAccount,
  recipientName,
  recipientAccount,
  amount,
  onReject,
  onAccept,
}) => {
  const formatAmount = (value) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>รายละเอียดการทำรายการ</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>ผู้ส่ง:</Text>
        <Text style={styles.value}>{senderName}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>บัญชีผู้ส่ง:</Text>
        <Text style={styles.value}>{senderAccount}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailRow}>
        <Text style={styles.label}>ผู้รับ:</Text>
        <Text style={styles.value}>{recipientName}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>บัญชีผู้รับ:</Text>
        <Text style={styles.value}>{recipientAccount}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.amountRow}>
        <Text style={styles.label}>จำนวนเงิน:</Text>
        <Text style={styles.amountText}>{formatAmount(amount)}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={onReject}
        >
          <Text style={styles.buttonText}>ปฏิเสธ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={onAccept}
        >
          <Text style={styles.buttonText}>อนุมัติ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  divider: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28a745', // Green color for amount
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  rejectButton: {
    backgroundColor: '#dc3545', // Red for reject
  },
  acceptButton: {
    backgroundColor: '#007bff', // Blue for accept
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PermissionBox;