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
  sender: 'user' | 'other';
}

// กำหนดความสูงของเมนูนำทาง (tab bar)
// ***สำคัญ: คุณต้องปรับค่านี้ให้พอดีกับความสูงของเมนูนำทางของคุณ***
// จากรูปภาพที่คุณส่งมา ลองใช้ค่า 110
const TAB_BAR_HEIGHT = 0;

const Chatpage = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  // ฟังก์ชันสำหรับสร้างการตอบกลับจาก AI แบบง่ายๆ
  const getAIResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('สวัสดี') || lowerCaseMessage.includes('หวัดดี')) {
      return 'สวัสดีค่ะ! ยินดีที่ได้พูดคุยกับคุณนะคะ 😊';
    } else if (lowerCaseMessage.includes('สบายดีไหม')) {
      return 'ฉันเป็น AI ค่ะ เลยไม่รู้สึกอะไร แต่ก็ยินดีที่ได้ทำงานให้คุณค่ะ!';
    } else if (lowerCaseMessage.includes('ช่วยอะไรได้บ้าง')) {
      return 'ฉันสามารถตอบคำถามง่ายๆ หรือพูดคุยทั่วไปกับคุณได้ค่ะ';
    } else {
      return 'ขอโทษค่ะ ฉันยังไม่เข้าใจคำถามของคุณ';
    }
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const userMessageText = messageText;
      const userMessage: Message = {
        id: Date.now().toString(),
        text: userMessageText,
        sender: 'user',
      };

      // เพิ่มข้อความของผู้ใช้ลงในรายการ
      setMessages(prevMessages => [userMessage, ...prevMessages]);
      setMessageText('');

      // ***ส่วนสำคัญ: เพิ่มการตอบกลับอัตโนมัติจาก AI***
      // จำลองการหน่วงเวลา 1 วินาที เพื่อให้เหมือนกับการประมวลผล
      setTimeout(() => {
        const aiResponseText = getAIResponse(userMessageText); // ดึงข้อความตอบกลับจากฟังก์ชัน
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(), // ใช้ ID ที่ไม่ซ้ำกับข้อความของผู้ใช้
          text: aiResponseText,
          sender: 'other',
        };
        // เพิ่มข้อความของ AI ลงในรายการ
        setMessages(prevMessages => [aiResponse, ...prevMessages]);
      }, 1000); // หน่วงเวลา 1000 มิลลิวินาที (1 วินาที)
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={
        item.sender === 'user'
          ? styles.userMessageContainer
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

        {/* KeyboardAvoidingView ต้องครอบคลุม FlatList และ NavChat */}
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
  messageText: {
    fontSize: 16,
  },
});

export default Chatpage;