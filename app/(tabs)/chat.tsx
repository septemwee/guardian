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

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: messageText,
        sender: 'user',
      };
      setMessages(prevMessages => [userMessage, ...prevMessages]);
      setMessageText('');
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
    flex: 1, // ***สำคัญ: container ต้องมี flex: 1 เพื่อให้ขยายเต็มหน้าจอ***
    backgroundColor: '#F5F5F5',
  },
  keyboardAvoidingView: {
    flex: 1, // ***สำคัญ: keyboardAvoidingView ต้องมี flex: 1 เพื่อให้ขยายเต็มพื้นที่ที่เหลือ***
  },
  chatContent: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    flexGrow: 1, // ***สำคัญ: flexGrow: 1 จะช่วยให้ FlatList ขยายเต็มพื้นที่ที่เหลือ***
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