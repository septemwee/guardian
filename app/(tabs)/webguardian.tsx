import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';

const suspiciousWebsites = ['malicious.com', 'phishing-site.net', 'suspicious-domain.org'];

const BrowserMockup = () => {
  const [url, setUrl] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('https://google.com'); // ตั้งค่าเริ่มต้นเป็นเว็บจริง
  const [isLoading, setIsLoading] = useState(false);

  const handleGo = () => {
    // เพิ่ม "https://" ถ้าผู้ใช้ไม่ได้ใส่
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;

    // แสดงผล URL ที่ถูกประมวลผลในคอนโซล
    console.log('Processed URL:', formattedUrl);

    // ตรวจสอบเว็บไซต์ที่น่าสงสัย
    const isSuspicious = suspiciousWebsites.some(suspiciousUrl => formattedUrl.includes(suspiciousUrl));
    if (isSuspicious) {
      setCurrentUrl(formattedUrl);
      setIsModalVisible(true);
    } else {
      // โหลดเว็บจริงถ้าไม่ใช่เว็บน่าสงสัย
      setCurrentUrl(formattedUrl);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addressBar}>
        <TextInput
          style={styles.input}
          placeholder="Enter URL..."
          onChangeText={text => setUrl(text)}
          value={url}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleGo}>
          <Text style={styles.buttonText}>Go</Text>
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
          }}
        />
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#007aff" />
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
            <Text style={styles.modalTitle}>⚠️ Warning</Text>
            <Text style={styles.modalText}>
              This website ({currentUrl}) may be unsafe or deceptive. Proceed with caution.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeModal}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
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
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#D60000',
    borderRadius: 20,
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#e74c3c',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BrowserMockup;
