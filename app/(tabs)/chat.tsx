import BarChatHeader from '@/components/barchat'; // อ้างอิงจากไฟล์ที่เราสร้างก่อนหน้า
import ChatboxRight from '@/components/ChatboxRight';
import NavChat from '@/components/navchat'; // อ้างอิงจากไฟล์ที่เราสร้างก่อนหน้า
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

const Chatpage = () => {
  return (
    // SafeAreaView ช่วยให้เนื้อหาไม่ทับส่วนที่เป็น notch หรือ status bar บน iOS
    // และ StatusBar.currentHeight สำหรับ Android เพื่อหลีกเลี่ยงการทับ status bar
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Component */}
        <BarChatHeader />

        {/* ส่วนเนื้อหาหลักของหน้าแชท */}
        {/* คุณสามารถเพิ่มคอมโพเนนต์สำหรับแสดงข้อความแชทที่นี่ */}
        <ChatboxRight/>
        <View style={styles.chatContent}>
          {/* ตัวอย่าง: ใส่ ScrollView หรือ FlatList สำหรับข้อความแชท */}
          {/* <ScrollView>
            <Text>ข้อความแชท 1</Text>
            <Text>ข้อความแชท 2</Text>
            ...
          </ScrollView> */}
        </View>

        {/* Bottom Navigation / Input Bar Component */}
        <NavChat />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // ทำให้ SafeAreaView กินพื้นที่เต็มจอ
    backgroundColor: '#F5F5F5', // สีพื้นหลังหลักของหน้า
    // เพิ่ม padding top สำหรับ Android เพื่อหลีกเลี่ยง status bar
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1, // ทำให้ View นี้กินพื้นที่ที่เหลือทั้งหมดใน SafeAreaView
    backgroundColor: '#F5F5F5', // กำหนดสีพื้นหลัง #F5F5F5 เทียบเท่า bg-[#F5F5F5]
    // min-h-screen ใน React Native มักจะทำโดยการให้ flex: 1 กับ container หลัก
  },
  chatContent: {
    flex: 1, // ทำให้ส่วนเนื้อหาแชทกินพื้นที่ตรงกลางที่เหลือ
    // padding เพื่อไม่ให้เนื้อหาทับ BarChatHeader และ NavChat
    paddingTop: 86, // ความสูงของ BarChatHeader
    paddingBottom: 86, // ความสูงของ NavChat
    // หากมีเนื้อหาแชทเยอะ ควรใช้ ScrollView หรือ FlatList ที่นี่
  }
});

export default Chatpage;