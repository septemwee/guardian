import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons เพื่อใช้ไอคอน

// รายชื่อเว็บไซต์ที่น่าสงสัย
const suspiciousWebsites = ['malicious.com', 'phishing-site.net', 'suspicious-domain.org'];

const BrowserMockup = () => {
  const [url, setUrl] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://google.com'); // ตั้งค่าเริ่มต้นเป็นเว็บจริง
  const [isLoading, setIsLoading] = useState(false);

  // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้กดปุ่ม 'Go'
  const handleGo = () => {
    // เพิ่ม console.log เพื่อแสดง URL ที่ผู้ใช้กรอกเข้ามา
    console.log('User entered URL:', url);
    
    if (!url.trim()) return; // ไม่ทำอะไรถ้าไม่มี URL

    // เพิ่ม "https://" ถ้าผู้ใช้ไม่ได้ใส่
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;

    // เพิ่ม console.log เพื่อแสดง URL ที่ถูกประมวลผลแล้ว
    console.log('Formatted URL:', formattedUrl);

    // ตรวจสอบเว็บไซต์ที่น่าสงสัย
    const isSuspicious = suspiciousWebsites.some(suspiciousUrl => formattedUrl.includes(suspiciousUrl));
    if (isSuspicious) {
      setIsModalVisible(true);
    } else {
      // โหลดเว็บจริงถ้าไม่ใช่เว็บน่าสงสัย
      setCurrentUrl(formattedUrl);
    }
  };

  // ฟังก์ชันปิด Modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // ฟังก์ชันสำหรับไปยัง URL ที่ผู้ใช้เลือกจาก Modal (ถ้าต้องการ)
  const proceedToUnsafeUrl = () => {
    setIsModalVisible(false);
    setCurrentUrl(url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`);
  };

  return (
    <View style={styles.container}>
      {/* Address Bar */}
      <View style={styles.addressBar}>
        <TextInput
          style={styles.input}
          placeholder="Enter URL..."
          onChangeText={text => setUrl(text)}
          value={url}
          autoCapitalize="none"
          onSubmitEditing={handleGo} // กด Enter บน Keyboard เพื่อ Go
        />
        <TouchableOpacity style={styles.button} onPress={handleGo}>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* WebView: แสดงเนื้อหาเว็บจริง */}
      <View style={styles.browserContent}>
        <WebView
          source={{ uri: currentUrl }}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent.description);
            // สามารถเพิ่มการจัดการข้อผิดพลาด เช่น การแสดงหน้าจอ Error แทน
          }}
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#D60000" />
          </View>
        )}
      </View>

      {/* Modal: หน้าต่างแจ้งเตือน */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons name="warning-outline" size={50} color="#e74c3c" />
            <Text style={styles.modalTitle}>⚠️ เว็บไซต์น่าสงสัย</Text>
            <Text style={styles.modalText}>
              เว็บไซต์นี้อาจเป็นอันตรายหรือหลอกลวง กรุณาใช้ความระมัดระวัง
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCloseButton]}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>ปิด</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalProceedButton]}
                onPress={proceedToUnsafeUrl}
              >
                <Text style={styles.modalButtonText}>เข้าชมต่อ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f0f0f0',
  },
  addressBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#D60000',
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  browserContent: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 5,
    elevation: 2,
  },
  modalCloseButton: {
    backgroundColor: '#95a5a6',
  },
  modalProceedButton: {
    backgroundColor: '#D60000',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BrowserMockup;
