import BarChatHeader from '@/components/barchat';
import NavChat from '@/components/navchat';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

const Chatpage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Component - ตำแหน่งจะถูกตรึงไว้ด้านบน */}
        <BarChatHeader />

        {/* ส่วนเนื้อหาหลักของหน้าแชท - จะขยายเต็มพื้นที่ตรงกลางระหว่าง Header และ NavChat */}
        <View style={styles.chatContent}>
          {/* ตัวอย่าง: ใส่ ScrollView หรือ FlatList สำหรับข้อความแชท */}

          {/*<ScrollView>
            <Text>ข้อความแชท 1</Text>
            <Text>ข้อความแชท 2</Text>
          </ScrollView>*/}
        </View>

        {/* Bottom Navigation / Input Bar Component - ตำแหน่งจะถูกตรึงไว้ด้านล่าง */}
        <NavChat />
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
    flex: 1, // ทำให้ส่วนนี้ขยายเต็มพื้นที่ที่เหลือ
    paddingHorizontal: 16, // เพิ่ม padding ซ้าย-ขวา เพื่อให้ดูดีขึ้น
  }
});

export default Chatpage;