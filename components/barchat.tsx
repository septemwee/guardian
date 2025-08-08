import { Link } from 'expo-router';
import React from "react";
import {
  Dimensions, // ใช้สำหรับข้อความทั้งหมด
  StyleSheet, // แทนที่ <div>
  Text, // สำหรับการรับขนาดหน้าจอเพื่อการตอบสนอง
  TouchableOpacity, // สำหรับปุ่มที่กดได้ (เช่น ปุ่มย้อนกลับ)
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg"; // สำหรับการแสดงผล SVG icon
const { width, height } = Dimensions.get('window');

const BarChatHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* ปุ่มย้อนกลับ */}
      <Link href="/" asChild>
      <TouchableOpacity style={styles.backButton}>
        {/* SVG Icon: ต้องใช้ไลบรารี 'react-native-svg' */}
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <Path
            d="M4 10L13 19L14.4 17.5L7 10L14.4 2.5L13 1L4 10Z"
            fill="#8D8B8B"
          />
        </Svg>
      </TouchableOpacity></Link>

      {/* ส่วนแสดงชื่อแชท */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>GUARDIAN AI</Text>
      </View>

      {/* Placeholder สำหรับพื้นที่ว่างทางขวา (เทียบเท่า w-[24px] ml-4) */}
      <View style={styles.rightPlaceholder} />
    </View>
  );
};

// การกำหนดสไตล์ด้วย StyleSheet.create
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    width: '100%',
    height: height * 0.1,
    borderTopWidth: 1,
    borderTopColor: '#D4D4D4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
  },
  backButton: {
    marginLeft: 16, // เทียบเท่า ml-4 (1 หน่วยของ Tailwind มักจะประมาณ 4px ใน React Native)
    padding: 8, // เพิ่ม padding เพื่อให้กดง่ายขึ้น
  },
  titleContainer: {
    flexGrow: 1, // เทียบเท่า flex-grow ทำให้กินพื้นที่ที่เหลือทั้งหมด
    justifyContent: "center", // จัดข้อความให้อยู่กึ่งกลางแนวนอน
    alignItems: "center", // จัดข้อความให้อยู่กึ่งกลางแนวนอน
  },
  titleText: {
    fontSize: 24, // เทียบเท่า text-2xl
    // สามารถเพิ่ม fontFamily, fontWeight ได้ที่นี่หากต้องการ
  },
  rightPlaceholder: {
    width: 24, // เทียบเท่า w-[24px]
    marginLeft: 16, // เทียบเท่า ml-4
  },
});

export default BarChatHeader;
