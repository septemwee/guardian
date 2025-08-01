import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const TrueMoneyPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={openModal}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ยืนยันการโอนเงิน</Text>
      </View>

      <View style={styles.content}>
        {/* Sender Section */}
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

        {/* Recipient Section */}
        <View style={styles.userSection}>
          <View style={[styles.avatar, styles.recipientAvatar]} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>สมชาย ใจดี</Text>
            <Text style={styles.userSubText}>บัญชีธนาคาร 123-4-56789-0</Text>
          </View>
        </View>

        {/* Amount Summary */}
        <View style={styles.amountSummary}>
          <Text style={styles.totalLabel}>ยอดรวมทั้งหมด</Text>
          <Text style={styles.totalAmount}>฿ 10,000.00</Text>
        </View>
        
        {/* Confirmation Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={openModal}>
          <LinearGradient
            colors={['#FF8C00', '#FF4500']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.confirmButtonText}>ยืนยันการโอนเงิน ฿ 10,000.00</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Modal Popup */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>การโอนเงินนี้ดูผิดปกติ</Text>
            <Text style={styles.modalMessage}>คุณแน่ใจว่าจะทำรายการนี้หรือไม่?</Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={closeModal}
              >
                <Text style={styles.cancelText}>ยกเลิก</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.confirmButtonModal]}
                onPress={() => {
                  closeModal();
                  // ใส่ logic เช่น navigation.goBack() หรืออื่น ๆ
                  console.log('User confirmed back');
                }}
              >
                <Text style={styles.confirmText}>ดำเนินการต่อ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  backButton: {
    paddingRight: 15,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
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
  amountSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  totalLabel: {
    fontSize: 18,
    color: '#555',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D60000',
  },
  confirmButton: {
    borderRadius: 10,
    overflow: 'hidden',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 25,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#eee',
  },
  confirmButtonModal: {
    backgroundColor: '#D60000',
  },
  cancelText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TrueMoneyPage;
