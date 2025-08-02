import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// อัปเดต Interface เพื่อรับ props ใหม่
interface NavChatProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSend: () => void;
  onToggleSender: () => void;
  currentSender: 'user' | 'other';
}

const NavChat = ({ messageText, setMessageText, onSend, onToggleSender, currentSender }: NavChatProps) => {
  // กำหนดสีของไอคอนตามสถานะผู้ส่ง
  const iconFillColor = currentSender === 'user' ? '#007AFF' : '#FF0303';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingContainer}
    >
      <View style={styles.navChatContainer}>
        {/* ปุ่มไอคอนซ้ายมือสำหรับสลับผู้ส่ง */}
        <TouchableOpacity style={styles.leftIconContainer} onPress={onToggleSender}>
          <Svg width={width * 0.1} height={width * 0.1} viewBox="0 0 50 50" fill="none">
            <Path
              d="M28.5104 10.9375H28.5729C28.9873 10.9375 29.3848 11.1021 29.6778 11.3951C29.9708 11.6882 30.1354 12.0856 30.1354 12.5C30.1354 12.9144 29.9708 13.3118 29.6778 13.6049C29.3848 13.8979 28.9873 14.0625 28.5729 14.0625C25.8813 14.0625 23.8333 14.0625 22.2021 14.1938C20.5667 14.325 19.5292 14.575 18.7938 14.9667C17.2705 15.7922 16.0476 17.0786 15.3 18.6417C14.9042 19.4625 14.6667 20.475 14.5438 22.0542C14.4188 23.6458 14.4188 25.675 14.4188 28.5V28.7292L16.7521 26.3958C17.0483 26.1198 17.4401 25.9696 17.8449 25.9767C18.2496 25.9839 18.6359 26.1478 18.9221 26.4341C19.2084 26.7204 19.3724 27.1066 19.3795 27.5114C19.3867 27.9162 19.2364 28.308 18.9604 28.6042L13.9604 33.6042C13.8107 33.7538 13.6322 33.8714 13.4357 33.9499C13.2391 34.0284 13.0287 34.0662 12.8171 34.0609C12.6056 34.0557 12.3973 34.0075 12.2049 33.9193C12.0125 33.8311 11.84 33.7048 11.6979 33.5479L7.17502 28.5479C6.90924 28.2389 6.77475 27.8382 6.80024 27.4314C6.82573 27.0246 7.00917 26.6439 7.31143 26.3704C7.6137 26.097 8.01086 25.9524 8.41817 25.9677C8.82549 25.983 9.21072 26.1568 9.49168 26.4521L11.2938 28.4437V28.4333C11.2938 25.6896 11.2938 23.5375 11.4292 21.8104C11.5667 20.0521 11.85 18.5979 12.4896 17.2771C13.5253 15.1214 15.2164 13.3487 17.3208 12.2125C18.6229 11.5146 20.175 11.2208 21.9542 11.0792C23.725 10.9375 25.8938 10.9375 28.5104 10.9375ZM37.1813 15.9375C37.3932 15.9427 37.6019 15.9911 37.7946 16.0795C37.9873 16.168 38.16 16.2948 38.3021 16.4521L42.825 21.4521C43.0908 21.7611 43.2253 22.1618 43.1998 22.5686C43.1743 22.9754 42.9909 23.3561 42.6886 23.6296C42.3863 23.903 41.9892 24.0476 41.5819 24.0323C41.1745 24.017 40.7893 23.8432 40.5083 23.5479L38.7063 21.5562V21.5667C38.7063 24.3104 38.7063 26.4625 38.5708 28.1896C38.4333 29.9479 38.1521 31.4021 37.5104 32.7229C36.4747 34.8786 34.7836 36.6513 32.6792 37.7875C31.3771 38.4854 29.825 38.7792 28.0458 38.9208C26.275 39.0625 24.1063 39.0625 21.4917 39.0625H21.4292C21.0148 39.0625 20.6174 38.8979 20.3243 38.6049C20.0313 38.3118 19.8667 37.9144 19.8667 37.5C19.8667 37.0856 20.0313 36.6882 20.3243 36.3951C20.6174 36.1021 21.0148 35.9375 21.4292 35.9375C24.1188 35.9375 26.1667 35.9375 27.7979 35.8062C29.4333 35.675 30.4708 35.425 31.2063 35.0312C32.7292 34.2062 33.9521 32.9206 34.7 31.3583C35.0958 30.5375 35.3333 29.525 35.4563 27.9458C35.5813 26.3542 35.5813 24.325 35.5813 21.5V21.2708L33.2479 23.6042C32.9517 23.8802 32.56 24.0304 32.1552 24.0233C31.7504 24.0161 31.3642 23.8522 31.0779 23.5659C30.7916 23.2796 30.6276 22.8934 30.6205 22.4886C30.6133 22.0838 30.7636 21.692 31.0396 21.3958L36.0396 16.3958C36.189 16.2462 36.3672 16.1284 36.5634 16.0496C36.7597 15.9708 36.9699 15.9327 37.1813 15.9375Z"
              fill="#FF0303"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  navChatContainer: {
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
  leftIconContainer: {
    marginRight: width * 0.04,
  },
  inputContainer: {
    flexGrow: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8D8B8B',
    borderRadius: 30,
    paddingRight: width * 0.1,
  },
  textInput: {
    flex: 1,
    height: '100%',
    paddingVertical: 8,
    paddingLeft: 16,
  },
  rightIconAbsolute: {
    position: 'absolute',
    right: width * 0.04,
  },
  sendButton: {
    marginLeft: width * 0.02,
  },
});

export default NavChat;
