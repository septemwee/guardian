import BarChatHeader from '@/components/barchat';
import NavChat from '@/components/navchat';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other' | 'guardian_alert'; 
}

const TAB_BAR_HEIGHT = 0;

const Chatpage = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const getGuardianResponse = (userMessage: string): { type: 'scam' | 'normal'; text: string } => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    const scamKeywords = [
      'ยินดีด้วย', 'คุณคือผู้โชคดี', 'รับรางวัล', 'ฟรี', 'ถูกรางวัล',
      'คลิกเลย', 'แอดไลน์', 'กดลิงก์',
      'ด่วน!', 'ภายใน 24 ชม.', 'บัญชีของท่านจะถูกระงับ',
      'ยืนยันตัวตน', 'อัปเดตข้อมูล',
      'กรมสรรพากร', 'ตำรวจ', 'ไปรษณีย์ไทย', 'พัสดุตกค้าง',
      'เงินกู้', 'สินเชื่อ', 'ดอกเบี้ยต่ำ', 'ลงทุน', 'ผลตอบแทนสูง',
      'คืนค่าธรรมเนียม',
      '.xyz', '.club', '.cc', '.top', '.live', 'bit.ly', 'shorturl.at'
    ];

    const isScam = scamKeywords.some(keyword => lowerCaseMessage.includes(keyword));

    if (isScam) {
      return {
        type: 'scam',
        text: '🚨 TrueGuardian แจ้งเตือน: ข้อความนี้มีความเสี่ยงสูง อาจเป็นมิจฉาชีพ! กรุณาอย่ากดลิงก์, อย่าให้ข้อมูลส่วนตัว หรือโอนเงินโดยเด็ดขาด',
      };
    }

    if (lowerCaseMessage.includes('สวัสดี') || lowerCaseMessage.includes('หวัดดี')) {
      return { type: 'normal', text: 'สวัสดีค่ะ! ยินดีที่ได้พูดคุยกับคุณนะคะ 😊' };
    } 
    
    if (lowerCaseMessage.includes('สบายดีไหม')) {
      return { type: 'normal', text: 'ฉันเป็น AI ค่ะ เลยไม่รู้สึกอะไร แต่ก็ยินดีที่ได้ทำงานให้คุณค่ะ!' };
    }
    
    return { type: 'normal', text: 'ขอโทษค่ะ ฉันยังไม่เข้าใจคำถามของคุณ' };
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const userMessageText = messageText;
      const userMessage: Message = {
        id: Date.now().toString(),
        text: userMessageText,
        sender: 'user',
      };

      setMessages(prevMessages => [userMessage, ...prevMessages]);
      setMessageText('');

      setTimeout(() => {
        const response = getGuardianResponse(userMessageText); 
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          sender: response.type === 'scam' ? 'guardian_alert' : 'other',
        };

        setMessages(prevMessages => [responseMessage, ...prevMessages]);
      }, 1000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={
        item.sender === 'user'
          ? styles.userMessageContainer
          : item.sender === 'guardian_alert'
            ? styles.alertMessageContainer 
            : styles.otherMessageContainer
      }
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <BarChatHeader />
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={TAB_BAR_HEIGHT}
        >
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatContent}
            inverted={true}
          />
          <NavChat
            messageText={messageText}
            setMessageText={setMessageText}
            onSend={handleSendMessage}
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatContent: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  userMessageContainer: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    margin: 8,
    padding: 12,
    borderRadius: 15,
    maxWidth: '80%',
  },
  otherMessageContainer: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    margin: 8,
    padding: 12,
    borderRadius: 15,
    maxWidth: '80%',
  },
  // *** 5. เพิ่ม Style สำหรับการแจ้งเตือนโดยเฉพาะ ***
  alertMessageContainer: {
    backgroundColor: '#FFF4E5', // สีพื้นหลังโทนส้มอ่อน
    borderColor: '#FFB74D', // สีขอบโทนส้ม
    borderWidth: 1,
    alignSelf: 'center', // แสดงผลกลางจอ
    marginVertical: 10,
    marginHorizontal: '5%',
    padding: 12,
    borderRadius: 15,
    maxWidth: '90%', // ทำให้กว้างกว่าข้อความปกติ
  },
  messageText: {
    fontSize: 16,
  },
});

export default Chatpage;