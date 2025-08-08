import BarChatHeader from '@/components/barchat';
import NavChat from '@/components/navchat';
import React, { useState } from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
<<<<<<< Updated upstream
  KeyboardAvoidingView, // Import KeyboardAvoidingView
=======
>>>>>>> Stashed changes
} from 'react-native';

// สร้าง Interface สำหรับกำหนดชนิดของข้อมูลในแต่ละข้อความ
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
}

const Chatpage = () => {
<<<<<<< Updated upstream
  // สถานะสำหรับเก็บข้อความที่ผู้ใช้กำลังพิมพ์
  const [messageText, setMessageText] = useState('');

  // สถานะสำหรับเก็บข้อความที่ถูกส่งไปแล้วทั้งหมด
  // โดยกำหนดชนิดเป็น Array ของ Message Interface ที่สร้างไว้
  const [messages, setMessages] = useState<Message[]>([]);

  // กำหนดผู้ส่งปัจจุบัน (user หรือ other)
=======
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
>>>>>>> Stashed changes
  const [currentSender, setCurrentSender] = useState<'user' | 'other'>('user');

  // ฟังก์ชันสำหรับส่งข้อความ
  const handleSendMessage = () => {
    // เช็คว่ามีข้อความหรือไม่
    if (messageText.trim()) {
      // สร้างออบเจ็กต์ข้อความใหม่
      const newMessage: Message = {
        id: Date.now().toString(), // ใช้ timestamp เป็น ID
        text: messageText,
        sender: currentSender, // กำหนดผู้ส่ง
      };

<<<<<<< Updated upstream
      // เพิ่มข้อความใหม่เข้าไปใน Array ของข้อความเดิม
      setMessages(prevMessages => [newMessage, ...prevMessages]);
      // ล้างช่องกรอกข้อความ
=======
      // 2. สร้างข้อความตอบกลับจาก AI
      const aiResponseText = `คุณพิมพ์มาว่า: "${messageText}"`; // นี่คือข้อความจำลองจาก AI
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(), // ใช้ timestamp ที่ต่างกันเพื่อให้มี ID ไม่ซ้ำกัน
        text: aiResponseText,
        sender: 'other', // กำหนดผู้ส่งเป็น 'other'
      };

      // 3. อัปเดต state ด้วยข้อความของผู้ใช้และข้อความของ AI
      // เราใช้ functional update เพื่อให้แน่ใจว่าได้ state ที่อัปเดตล่าสุด
      setMessages(prevMessages => [aiMessage, userMessage, ...prevMessages]);

      // 4. ล้างช่องกรอกข้อความ
>>>>>>> Stashed changes
      setMessageText('');
    }
  };

  // Render function สำหรับแสดงแต่ละข้อความ
  // กำหนดชนิดของ item ให้ตรงกับ Message Interface
  const renderMessage = ({ item }: { item: Message }) => (
<<<<<<< Updated upstream
    <View style={item.sender === 'user' ? styles.userMessageContainer : styles.otherMessageContainer}>
=======
    <View
      style={
        item.sender === 'user'
          ? styles.userMessageContainer
          : styles.otherMessageContainer
      }
    >
>>>>>>> Stashed changes
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

<<<<<<< Updated upstream
  // ฟังก์ชันสำหรับสลับผู้ส่ง
  const handleToggleSender = () => {
    setCurrentSender(prevSender => (prevSender === 'user' ? 'other' : 'user'));
  };

=======
>>>>>>> Stashed changes
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ใช้ KeyboardAvoidingView ครอบ View หลัก */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
<<<<<<< Updated upstream
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // ปรับ offset ถ้าจำเป็น
=======
        keyboardVerticalOffset={0}
>>>>>>> Stashed changes
      >
        <View style={styles.container}>
          {/* Header Component */}
          <BarChatHeader />

          {/* ส่วนแสดงข้อความแชท */}
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatContent}
            inverted={true}
          />

          {/* Bottom Navigation / Input Bar Component */}
          <NavChat
            messageText={messageText}
            setMessageText={setMessageText}
            onSend={handleSendMessage}
            onToggleSender={handleToggleSender}
            currentSender={currentSender}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  keyboardAvoidingView: {
    flex: 1, // ทำให้ KeyboardAvoidingView ครอบคลุมพื้นที่ทั้งหมด
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  chatContent: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
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
