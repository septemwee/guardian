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

  // สถานะใหม่สำหรับเก็บว่าผู้ส่งคนปัจจุบันคือใคร
  const [currentSender, setCurrentSender] = useState<'user' | 'other'>('user');

  // ฟังก์ชันสำหรับส่งข้อความ
  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: currentSender, // ใช้สถานะ currentSender ที่ถูกสลับแล้ว
      };
      
      setMessages(prevMessages => [newMessage, ...prevMessages]);
      setMessageText('');
    }
  };

  // ฟังก์ชันใหม่สำหรับสลับผู้ส่ง
  const handleToggleSender = () => {
    setCurrentSender(prevSender => (prevSender === 'user' ? 'other' : 'user'));
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={item.sender === 'user' ? styles.userMessageContainer : styles.otherMessageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <BarChatHeader />
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContent}
          inverted={true}
        />
        {/* ส่ง props ที่จำเป็นไปให้ NavChat และเพิ่ม onToggleSender, currentSender */}
        <NavChat
          messageText={messageText}
          setMessageText={setMessageText}
          onSend={handleSendMessage}
          onToggleSender={handleToggleSender}
          currentSender={currentSender}
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
    paddingTop: 86,
    paddingBottom: 86,
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
