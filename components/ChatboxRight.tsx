import {
    StyleSheet, // แทนที่ <div>
    Text,
    View
} from 'react-native';
const ChatboxRight = () => {
  return (
    <View style={styles.rightbox}>
        <Text>
            มีแฟนยังน้องเพื่อนพี่ชอบ
        </Text>

    </View>
  )
};

const styles=StyleSheet.create({
    rightbox : {
        backgroundColor: "#75F83E",
        padding: 20

    }

});
export default ChatboxRight