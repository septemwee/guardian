import BarChatHeader from '@/components/barchat';
import NavChat from '@/components/navchat';
import React, { useState } from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
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

  // ฟังก์ชันสำหรับส่งข้อความ
  const handleSendMessage = () => {
    // เช็คว่ามีข้อความหรือไม่
    if (messageText.trim()) {
      // สร้างออบเจ็กต์ข้อความใหม่
      const newMessage: Message = {
        id: Date.now().toString(), // ใช้ timestamp เป็น ID
        text: messageText,
        sender: 'user', // กำหนดผู้ส่ง
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Component */}
        <BarChatHeader />

        {/* ส่วนแสดงข้อความแชท */}
        {/* ใช้ FlatList เพื่อประสิทธิภาพที่ดีกว่าในการแสดงรายการข้อความจำนวนมาก */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContent}
          inverted={true} // เพื่อให้ข้อความใหม่แสดงอยู่ด้านล่างสุด
        />

        {/* Bottom Navigation / Input Bar Component */}
        {/* ส่ง props ที่จำเป็นไปให้ NavChat */}
        <NavChat
          messageText={messageText}
          setMessageText={setMessageText}
          onSend={handleSendMessage}
        />
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
  chatContent: {
    // กำหนด padding ให้ไม่ทับ header และ bottom bar
    paddingTop: 20, // ความสูงของ BarChatHeader
    paddingBottom: 20, // ความสูงของ NavChat
    justifyContent: 'flex-end', // จัดให้ข้อความอยู่ด้านล่าง
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
