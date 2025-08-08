import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

// รายการเว็บไซต์ที่น่าสงสัยและคำต้องสงสัย
const suspiciousWebsites = ['malicious.com', 'phishing-site.net', 'suspicious-domain.org'];
const suspiciousKeywords = ['โอนเงิน', 'รับรางวัล', 'ด่วน', 'ผู้โชคดี', 'ข้อมูลส่วนตัว'];

// สร้าง type ใหม่สำหรับ WebViewSource เพื่อแก้ปัญหา type error
type WebViewSourceType = { uri: string } | { html: string };

const BrowserMockup = () => {
  const webViewRef = useRef<WebView>(null);
  const [url, setUrl] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [webViewSource, setWebViewSource] = useState<WebViewSourceType>({ uri: 'https://www.google.com' });
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', text: '' });
  const [canGoBack, setCanGoBack] = useState(false);


  const checkUrlStructure = (url: string) => {
  try {
    const u = new URL(url);
    // ตัวอย่างเช็ค subdomain แปลกๆ (มีเลขเยอะๆ หรือ symbol แปลก)
    const subdomains = u.hostname.split('.');
    const subdomainParts = subdomains.slice(0, -2);
    if (subdomainParts.some(d => /\d/.test(d) || /[^a-z0-9-]/i.test(d))) {
      return { danger: true, reason: 'subdomain suspicious' };
    }
    // homograph / punycode check (ดูว่าชื่อโดเมนมี unicode หรือเปล่า)
    if (u.hostname.includes('xn--')) {
      return { danger: true, reason: 'punycode (homograph) detected' };
    }
    return { danger: false };
  } catch {
    return { danger: true, reason: 'invalid url' };
  }
};

  // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้กดปุ่ม 'Go'
  const handleGo = (inputUrl: string = url) => {
    // ป้องกันการโหลด URL ว่าง
    if (!inputUrl.trim()) {
      setUrl('https://www.google.com');
      setWebViewSource({ uri: 'https://www.google.com' });
      return;
    }

    let formattedUrl;
    // ตรวจสอบว่าเป็น URL หรือไม่ และเพิ่ม https:// ถ้าจำเป็น
    if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
      formattedUrl = inputUrl;
    } else {
      formattedUrl = `https://${inputUrl}`;
    }
    
    const isSuspiciousWebsite = suspiciousWebsites.some(suspiciousUrl => formattedUrl.includes(suspiciousUrl));
    const isHttp = formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://');
    
  const urlCheck = checkUrlStructure(formattedUrl);
if (urlCheck.danger) {
  let errorText = 'เว็บไซต์นี้มีความผิดปกติที่อาจเสี่ยงต่อความปลอดภัย';

  switch (urlCheck.reason) {
    case 'subdomain suspicious':
      errorText = `ชื่อเว็บไซต์มีส่วนย่อย (subdomain) ที่แปลก เช่น มีตัวเลขหรือสัญลักษณ์ที่ไม่น่าเชื่อถือ ซึ่งอาจเป็นสัญญาณของเว็บปลอม โปรดระวัง`;
      break;
    case 'punycode (homograph) detected':
      errorText = `ชื่อโดเมนใช้รหัสพิเศษ (punycode) ที่อาจถูกใช้หลอกลวงโดยการเลียนแบบชื่อเว็บจริง (homograph attack) โปรดตรวจสอบให้แน่ใจก่อนใช้งาน`;
      break;
    case 'invalid url':
      errorText = `ลิงก์ที่ป้อนไม่ถูกต้อง โปรดตรวจสอบ URL อีกครั้ง`;
      break;
  }

  setModalMessage({
    title: '⚠️ เว็บไซต์น่าสงสัย',
    text: errorText,
  });
  setIsModalVisible(true);
  return;
}


    if (isHttp) {
      setModalMessage({
        title: '⚠️ การเชื่อมต่อไม่ปลอดภัย',
        text: 'เว็บไซต์นี้ใช้การเชื่อมต่อแบบ HTTP ซึ่งอาจไม่ปลอดภัย กรุณาใช้ความระมัดระวัง',
      });
      setIsModalVisible(true);
    } else if (isSuspiciousWebsite) {
      setModalMessage({
        title: '⚠️ เว็บไซต์น่าสงสัย',
        text: 'เว็บไซต์นี้อาจเป็นอันตรายหรือหลอกลวง กรุณาใช้ความระมัดระวัง',
      });
      setIsModalVisible(true);
    } else {
      setWebViewSource({ uri: formattedUrl });
    }
  };



  const closeModal = () => {
    setIsModalVisible(false);
  };

  const proceedToUnsafeUrl = () => {
    setIsModalVisible(false);
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
    setWebViewSource({ uri: formattedUrl });
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    // อัปเดต URL ใน input field ให้ตรงกับหน้าเว็บที่แสดงอยู่
    setUrl(navState.url);
    setCanGoBack(navState.canGoBack);
    console.log('Current URL:', navState.url);
  };

  const goBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    } else {
      setWebViewSource({ uri: 'https://www.google.com' });
      setUrl('https://www.google.com');
    }
  };

  // ฟังก์ชันสำหรับจัดการข้อมูลที่ส่งมาจาก WebView (เนื้อหาของหน้าเว็บ)
  const handleOnMessage = (event: WebViewMessageEvent) => {
    try {
      const pageContent = event.nativeEvent.data;
      const lowerCaseContent = pageContent.toLowerCase();

      // ตรวจสอบคำต้องสงสัยในเนื้อหา
      const foundKeyword = suspiciousKeywords.find(keyword => 
        lowerCaseContent.includes(keyword)
      );

      if (foundKeyword) {
        setModalMessage({
          title: '⚠️ พบเนื้อหาที่น่าสงสัย',
          text: `หน้าเว็บนี้อาจมีเนื้อหาเกี่ยวกับการหลอกลวงหรือมิจฉาชีพ เช่นคำว่า "${foundKeyword}" กรุณาระวัง`,
        });
        setIsModalVisible(true);
      }
    } catch (e) {
      console.error("Error parsing message from WebView", e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Address Bar */}
      <View style={styles.addressBar}>
        <TouchableOpacity 
          style={[styles.backButton, !canGoBack && styles.disabledButton]} 
          onPress={goBack} 
          disabled={!canGoBack}
        >
          <Ionicons name="arrow-back" size={24} color={canGoBack ? '#D60000' : '#888'} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Enter URL..."
          onChangeText={text => setUrl(text)} // เชื่อมต่อกับ state อย่างถูกต้อง
          value={url} // แสดงค่าจาก state
          autoCapitalize="none"
          onSubmitEditing={() => handleGo()}
        />
        <TouchableOpacity style={styles.goButton} onPress={() => handleGo()}>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* WebView: แสดงเนื้อหาเว็บจริง */}
      <View style={styles.browserContent}>
        <WebView
          ref={webViewRef}
          source={webViewSource}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => {
            setIsLoading(false);
            // เมื่อโหลดหน้าเว็บเสร็จแล้ว ให้ส่ง JavaScript เพื่อดึงเนื้อหา
            if (webViewRef.current) {
              webViewRef.current.injectJavaScript(`
                setTimeout(() => {
                  window.ReactNativeWebView.postMessage(document.body.innerText);
                }, 500); // ดีเลย์เล็กน้อยเพื่อให้เนื้อหาโหลดครบ
                true;
              `);
            }
          }}
          onNavigationStateChange={handleNavigationStateChange}
          onMessage={handleOnMessage} // รับข้อมูลจาก JavaScript ที่ถูก inject
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent.description);
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
            <Text style={styles.modalTitle}>{modalMessage.title}</Text>
            <Text style={styles.modalText}>{modalMessage.text}</Text>
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
  backButton: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  goButton: {
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
