import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Define the types for the TransactionCard component props
interface TransactionCardProps {
  status: 'approved' | 'pending';
  senderName: string;
  senderAccount: string;
  recipientName: string;
  recipientAccount: string;
  amount: number;
}

const TransactionCard = ({ status, senderName, senderAccount, recipientName, recipientAccount, amount }: TransactionCardProps) => {
  const isApproved = status === 'approved';
  
  return (
    <View style={styles.card}>
      {/* Card Header (Status) */}
      <View style={[styles.cardHeader, isApproved ? styles.approvedHeader : styles.pendingHeader]}>
        <Ionicons
          name={isApproved ? "checkmark-circle" : "hourglass-outline"}
          size={20}
          color={isApproved ? "#15803d" : "#D60000"}
        />
        <Text style={[styles.statusText, isApproved ? styles.approvedText : styles.pendingText]}>
          {isApproved ? "อนุมัติ" : "รอการอนุมัติ"}
        </Text>
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
            <Ionicons name="arrow-forward" size={30} color="#D60000" />
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

        {/* Action Buttons (for pending status only) */}
        {!isApproved && (
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.rejectButtonText}>ปฏิเสธ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton}>
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
        )}
      </View>
    </View>
  );
};

const TrueMoneyYoungerList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>คุณแม่</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Date Divider for Approved Transaction */}
        <Text style={styles.dateDivider}>12:30 11 ก.ค. 2025</Text>
        <TransactionCard
          status="approved"
          senderName="นวลจันทร์ วันเพ็ญ"
          senderAccount="จากวอลเล็ต"
          recipientName="ดารา วันเพ็ญ"
          recipientAccount="123-5-43219-0"
          amount={8000}
        />

        {/* Date Divider for Pending Transaction */}
        <Text style={styles.dateDivider}>20:23 11 ก.ค. 2025</Text>
        <TransactionCard
          status="pending"
          senderName="นวลจันทร์ วันเพ็ญ"
          senderAccount="จากวอลเล็ต"
          recipientName="สมชาย ใจดี"
          recipientAccount="123-4-56789-0"
          amount={10000}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    position: 'relative',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    padding: 15,
  },
  dateDivider: {
    fontSize: 14,
    color: '#888',
    marginVertical: 10,
    marginLeft: 10,
  },
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
    padding: 15,
  },
  approvedHeader: {
    backgroundColor: '#e6ffed',
  },
  pendingHeader: {
    backgroundColor: '#fffff0',
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  approvedText: {
    color: '#15803d',
  },
  pendingText: {
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
    width: '45%',
    alignItems: 'center',
  },
  senderBox: {
    backgroundColor: '#fdebeb',
  },
  recipientBox: {
    backgroundColor: '#eef8ff',
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
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  rejectButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  acceptButton: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    height: 50,
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

export default TrueMoneyYoungerList;
