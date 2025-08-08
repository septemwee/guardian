import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface NavChatProps {
  messageText: string;
  setMessageText: (text: string) => void;
  onSend: () => void;
}

const NavChat = ({ messageText, setMessageText, onSend }: NavChatProps) => {
  return (
    <View style={styles.navChatContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="พิมพ์ข้อความ"
          placeholderTextColor="#8D8B8B"
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.rightIconAbsolute}>
          <Svg width={width * 0.07} height={width * 0.07} viewBox="0 0 36 36" fill="none">
            <G clipPath="url(#clip0_7_11)">
              <Path d="M24 15C24 18.315 21.315 21 18 21C14.685 21 12 18.315 12 15C12 11.685 14.685 9 18 9C21.315 9 24 11.685 24 15Z" fill="#8D8B8B" />
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 36C27.945 36 36 27.945 36 18C36 8.055 27.945 0 18 0C8.055 0 0 8.055 0 18C0 27.945 8.055 36 18 36ZM27.405 31.56C31.695 28.575 34.5 23.625 34.5 18C34.5 8.88 27.12 1.5 18 1.5C8.88 1.5 1.5 8.88 1.5 18C1.5 23.625 4.305 28.575 8.595 31.56C9.6525 29.58 13.065 24 18 24C22.935 24 26.34 29.58 27.405 31.56Z"
                fill="#8D8B8B"
              />
            </G>
            <Defs>
              <ClipPath id="clip0_7_11">
                <Rect width="36" height="36" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <Svg width={width * 0.1} height={width * 0.1} viewBox="0 0 41 41" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.62212 5.65285C5.38542 5.55335 5.12428 5.52726 4.87257 5.57797C4.62087 5.62868 4.3902 5.75385 4.21049 5.93724C4.03078 6.12063 3.91032 6.35379 3.86472 6.60648C3.81913 6.85916 3.85051 7.11972 3.95479 7.35435L9.23867 19.2187H22.2083C22.5481 19.2187 22.874 19.3537 23.1143 19.594C23.3546 19.8343 23.4896 20.1602 23.4896 20.5C23.4896 20.8398 23.3546 21.1657 23.1143 21.406C22.874 21.6462 22.5481 21.7812 22.2083 21.7812H9.23867L3.95479 33.6456C3.85051 33.8802 3.81913 34.1408 3.86472 34.3935C3.91032 34.6462 4.03078 34.8793 4.21049 35.0627C4.3902 35.2461 4.62087 35.3713 4.87257 35.422C5.12428 35.4727 5.38542 35.4466 5.62212 35.3471L38.0805 21.6804C38.3126 21.5825 38.5107 21.4182 38.65 21.2083C38.7893 20.9983 38.8636 20.7519 38.8636 20.5C38.8636 20.248 38.7893 20.0016 38.65 19.7917C38.5107 19.5817 38.3126 19.4175 38.0805 19.3195L5.62212 5.65285Z"
            fill="#FF0303"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navChatContainer: {
    paddingVertical: 20,
    marginBottom:80,
    backgroundColor: 'white',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#D4D4D4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
  },
  inputContainer: {
    flex: 1,
    height: 48,
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
    right: 8,
  },
  sendButton: {
    marginLeft: width * 0.02,
  },
});

export default NavChat;