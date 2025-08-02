import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface PermissionBoxProps {
  senderName: string;
  senderAccount: string;
  recipientName: string;
  recipientAccount: string;
  amount: number;
  onReject: () => void;
  onAccept: () => void;
}

const PermissionBox = ({
  senderName,
  senderAccount,
  recipientName,
  recipientAccount,
  amount,
  onReject,
  onAccept,
}: PermissionBoxProps) => {
  return (
    <View style={styles.card}>
      {/* Card Header (Status) */}
      <View style={styles.cardHeader}>
        <Ionicons name="ribbon-outline" size={20} color="#FFD700" />
        <Text style={styles.statusText}>รอการอนุมัติ</Text>
      </View>

      {/* User and Amount Details */}
      <View style={styles.cardContent}>
        {/* Sender and Recipient Info */}
        <View style={styles.userBoxesContainer}>
          {/* Sender */}
          <View style={[styles.userBox, styles.senderBox]}>
            <View style={[styles.avatar, styles.senderAvatar]} />
            <Text style={styles.userName}>{senderName}</Text>
            <Text style={styles.userSubText}>{senderAccount}</Text>
          </View>
          
          {/* Arrow Separator */}
          <View style={styles.arrowIconContainer}>
            <Ionicons name="arrow-forward-sharp" size={30} color="#D60000" />
          </View>

          {/* Recipient */}
          <View style={[styles.userBox, styles.recipientBox]}>
            <View style={[styles.avatar, styles.recipientAvatar]} />
            <Text style={styles.userName}>{recipientName}</Text>
            <Text style={styles.userSubText}>{recipientAccount}</Text>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.totalLabel}>ยอดรวมทั้งหมด</Text>
          <Text style={styles.amountText}>฿ {amount.toFixed(2)}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
            <Text style={styles.rejectButtonText}>ปฏิเสธ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
            <LinearGradient
              colors={['#FF8C00', '#FF4500']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.acceptButtonText}>ยอมรับ</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Added this line to center the content horizontally
    padding: 15,
    backgroundColor: '#fffff0',
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D60000',
  },
  cardContent: {
    padding: 15,
  },
  userBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    // Use flex: 1 and marginHorizontal instead of fixed width
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  senderBox: {
    backgroundColor: '#fdebeb',
    // Add margin to separate from the arrow icon
    marginRight: 10,
  },
  recipientBox: {
    backgroundColor: '#eef8ff',
    // Add margin to separate from the arrow icon
    marginLeft: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  senderAvatar: {
    backgroundColor: '#ffb6c1',
  },
  recipientAvatar: {
    backgroundColor: '#87cefa',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  userSubText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  arrowIconContainer: {
    paddingHorizontal: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#555',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D60000',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  rejectButtonText: {
    color: '#D60000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  acceptButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PermissionBox;
