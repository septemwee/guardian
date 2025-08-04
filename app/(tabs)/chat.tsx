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
  KeyboardAvoidingView, // Import KeyboardAvoidingView
} from 'react-native';

// สร้าง Interface สำหรับกำหนดชนิดของข้อมูลในแต่ละข้อความ
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
}

const Chatpage = () => {
  // สถานะสำหรับเก็บข้อความที่ผู้ใช้กำลังพิมพ์
  const [messageText, setMessageText] = useState('');

  // สถานะสำหรับเก็บข้อความที่ถูกส่งไปแล้วทั้งหมด
  // โดยกำหนดชนิดเป็น Array ของ Message Interface ที่สร้างไว้
  const [messages, setMessages] = useState<Message[]>([]);

  // กำหนดผู้ส่งปัจจุบัน (user หรือ other)
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

      // เพิ่มข้อความใหม่เข้าไปใน Array ของข้อความเดิม
      setMessages(prevMessages => [newMessage, ...prevMessages]);
      // ล้างช่องกรอกข้อความ
      setMessageText('');
    }
  };

  // Render function สำหรับแสดงแต่ละข้อความ
  // กำหนดชนิดของ item ให้ตรงกับ Message Interface
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={item.sender === 'user' ? styles.userMessageContainer : styles.otherMessageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  // ฟังก์ชันสำหรับสลับผู้ส่ง
  const handleToggleSender = () => {
    setCurrentSender(prevSender => (prevSender === 'user' ? 'other' : 'user'));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ใช้ KeyboardAvoidingView ครอบ View หลัก */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // ปรับ offset ถ้าจำเป็น
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
