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

// *** 1. เพิ่มสถานะ 'guardian_alert' สำหรับการแจ้งเตือนโดยเฉพาะ ***
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other' | 'guardian_alert'; 
}

// กำหนดความสูงของเมนูนำทาง (tab bar)
<<<<<<< HEAD
=======
// ***สำคัญ: คุณต้องปรับค่านี้ให้พอดีกับความสูงของเมนูนำทางของคุณ***
// จากรูปภาพที่คุณส่งมา ลองใช้ค่า 110
>>>>>>> 3dfa76a76ceed62326eb5304e356c8b709bf7c7b
const TAB_BAR_HEIGHT = 0;

const Chatpage = () => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

<<<<<<< HEAD
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
    
    // ถ้าไม่เข้าเงื่อนไขใดๆ เลย จะตอบกลับข้อความนี้
    return { type: 'normal', text: 'ขอโทษค่ะ ฉันยังไม่เข้าใจคำถามของคุณ' };
=======
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
>>>>>>> 3dfa76a76ceed62326eb5304e356c8b709bf7c7b
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const userMessageText = messageText;
      const userMessage: Message = {
        id: Date.now().toString(),
        text: userMessageText,
        sender: 'user',
      };

<<<<<<< HEAD
      setMessages(prevMessages => [userMessage, ...prevMessages]);
      setMessageText('');

      // *** 3. ปรับปรุง Logic การสร้างข้อความตอบกลับ ***
      setTimeout(() => {
        const response = getGuardianResponse(userMessageText); // ดึง Object ตอบกลับ
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          // กำหนด sender ตามประเภทการตอบกลับ
          sender: response.type === 'scam' ? 'guardian_alert' : 'other',
        };

        setMessages(prevMessages => [responseMessage, ...prevMessages]);
      }, 1000);
=======
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
>>>>>>> 3dfa76a76ceed62326eb5304e356c8b709bf7c7b
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={
        // *** 4. เพิ่มเงื่อนไขการแสดงผลสำหรับ 'guardian_alert' ***
        item.sender === 'user'
          ? styles.userMessageContainer
          : item.sender === 'guardian_alert'
            ? styles.alertMessageContainer // ใช้ Style ใหม่
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
<<<<<<< HEAD
=======

        {/* KeyboardAvoidingView ต้องครอบคลุม FlatList และ NavChat */}
>>>>>>> 3dfa76a76ceed62326eb5304e356c8b709bf7c7b
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