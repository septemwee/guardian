import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// ขนาดหน้าจอสำหรับ responsive UI
const { width, height } = Dimensions.get('window');

// -------------------------------------------------------------------
// Component: AntiScamVoiceApp
// -------------------------------------------------------------------
const AntiScamVoiceApp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [riskLevel, setRiskLevel] = useState<'none' | 'safe' | 'low' | 'high'>('none'); // none, safe, low, high
  const [riskDetails, setRiskDetails] = useState<string[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const timerIntervalRef = useRef<number | null>(null);
  const typingIntervalRef = useRef<number | null>(null);

  // ฟังก์ชันสำหรับจำลองการบันทึกเสียงและการวิเคราะห์
  const startRecording = () => {
    setIsRecording(true);
    setTranscribedText('');
    setRiskLevel('none');
    setRiskDetails([]);
    setTimerSeconds(0);
    setIsProcessing(false);

    // เริ่มจับเวลา
    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);

    // จำลองการรับเสียงและแปลงเป็นข้อความ
    let currentText = '';
    const mockTranscript = [
      "สวัสดีครับ",
      "คุณคือผู้โชคดีได้รับรางวัลใหญ่",
      "จากธนาคารของเรา",
      "เพียงแค่โอนเงินค่าธรรมเนียม",
      "เข้ามาที่บัญชีนี้",
      "แล้วเราจะดำเนินการให้ทันที",
      "อย่าบอกใครนะครับ",
      "นี่เป็นความลับ",
      "รีบหน่อยนะครับ โอกาสสุดท้ายแล้ว",
      "ถ้าไม่ทำตอนนี้จะพลาดโอกาส",
      "กรุณาให้ข้อมูลเลขบัตรประชาชนด้วยครับ",
    ];
    let transcriptIndex = 0;

    typingIntervalRef.current = setInterval(() => {
      if (transcriptIndex < mockTranscript.length) {
        currentText += mockTranscript[transcriptIndex] + ' ';
        setTranscribedText(currentText.trim());
        transcriptIndex++;
      } else {
        clearInterval(typingIntervalRef.current as number);
        typingIntervalRef.current = null;
      }
    }, 1500); // จำลองการพิมพ์ทีละประโยค

    // ในแอปจริง คุณจะใช้ไลบรารี Speech-to-Text เช่น @react-native-community/voice
    // หรือเชื่อมต่อกับ Google Cloud Speech-to-Text API ที่นี่
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setIsProcessing(true); // เริ่มสถานะประมวลผล

    // จำลองการวิเคราะห์ความเสี่ยง
    setTimeout(() => {
      const text = transcribedText.toLowerCase();
      let level: 'safe' | 'low' | 'high' = 'safe';
      const details: string[] = [];

      if (text.includes('โชคดีได้รับรางวัล') || text.includes('โอนเงินค่าธรรมเนียม') || text.includes('รีบหน่อยนะครับ') || text.includes('โอกาสสุดท้าย') || text.includes('บัตรประชาชน')) {
        level = 'high';
        if (text.includes('โชคดีได้รับรางวัล')) details.push('ข้อเสนอที่น่าเหลือเชื่อ');
        if (text.includes('โอนเงินค่าธรรมเนียม')) details.push('เรียกเก็บค่าธรรมเนียมที่ไม่สมเหตุสมผล');
        if (text.includes('รีบหน่อยนะครับ') || text.includes('โอกาสสุดท้าย') || text.includes('ถ้าไม่ทำตอนนี้จะพลาดโอกาส')) details.push('การใช้คำพูดเร่งรัด/กดดัน');
        if (text.includes('บัตรประชาชน')) details.push('การขอข้อมูลส่วนตัวที่ละเอียดอ่อน');
        if (text.includes('ความลับ')) details.push('การขอให้เก็บเป็นความลับ');
      } else if (text.includes('สวัสดีครับ')) {
        level = 'safe'; // ถ้ามีแค่สวัสดีครับ ถือว่าปลอดภัย
      } else if (text.length > 0) {
        level = 'low';
        details.push('ไม่พบคำที่เข้าข่ายมิจฉาชีพชัดเจน แต่ควรระมัดระวัง');
      }

      setRiskLevel(level);
      setRiskDetails(details);
      setIsProcessing(false); // สิ้นสุดสถานะประมวลผล

      // เพิ่มโค้ดใหม่: แสดง Modal ทันทีถ้าความเสี่ยงไม่เท่ากับ 'safe'
      if (level !== 'safe') {
        setShowDetailsModal(true);
      }

      // ในแอปจริง คุณจะส่ง transcribedText ไปให้ AI/NLP model วิเคราะห์ที่นี่
    }, 3000); // จำลองเวลาประมวลผล 3 วินาที
  };

  const handleRecordButtonPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getRiskColor = (level: typeof riskLevel) => {
    switch (level) {
      case 'safe': return '#28A745'; // เขียว
      case 'low': return '#FFC107';  // เหลือง
      case 'high': return '#DC3545'; // แดง
      default: return '#8D8B8B'; // เทา
    }
  };

  // const getRiskText = (level: typeof riskLevel) => {
  //   switch (level) {
  //     case 'safe': return 'ปลอดภัย';
  //     case 'low': return 'ความเสี่ยงต่ำ';
  //     case 'high': return 'อันตราย! เข้าข่ายมิจฉาชีพ';
  //     case 'none': return 'ยังไม่มีการวิเคราะห์';
  //     default: return '';
  //   }
  // };

  const getRiskIcon = (level: typeof riskLevel) => {
    switch (level) {
      case 'safe': return (
        <Svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={getRiskColor(level)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></Path>
          <Path d="M9 12l2 2 4-4"></Path>
        </Svg>
      ); // โล่ + ถูก
      case 'low': return (
        <Svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={getRiskColor(level)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></Path>
          <Path d="M12 9v4"></Path>
          <Path d="M12 17h.01"></Path>
        </Svg>
      ); // สามเหลี่ยมเตือน
      case 'high': return (
        <Svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={getRiskColor(level)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <Circle cx="12" cy="12" r="10"></Circle>
          <Path d="M15 9l-6 6"></Path>
          <Path d="M9 9l6 6"></Path>
        </Svg>
      ); // กากบาท
      default: return null;
    }
  };

  // แก้ไข: กำหนดประเภทของ array 'highlightedText' ให้เป็น React.ReactNode[] เพื่อแก้ปัญหา implicit any
  const highlightScamWords = (text: string): React.ReactNode => {
    const scamKeywords = ['โอนเงิน', 'รางวัล', 'ค่าธรรมเนียม', 'ด่วน', 'โอกาสสุดท้าย', 'บัตรประชาชน', 'ความลับ'];
    let highlightedText: React.ReactNode[] = [];

    text.split(' ').forEach((word, index, array) => {
      const lowerWord = word.toLowerCase();
      let isScamWord = false;
      for (const keyword of scamKeywords) {
        if (lowerWord.includes(keyword)) {
          isScamWord = true;
          break;
        }
      }

      if (isScamWord) {
        highlightedText.push(
          <Text key={`word-${index}`} style={styles.highlightedWord}>
            {word}
          </Text>
        );
      } else {
        highlightedText.push(
          <Text key={`word-${index}`} style={styles.normalWord}>
            {word}
          </Text>
        );
      }
      if (index < array.length - 1) {
        highlightedText.push(<Text key={`space-${index}`} style={styles.normalWord}> </Text>);
      }
    });
    return <Text>{highlightedText}</Text>;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>Anti-Scam Voice AI</Text>
          {/* Optional: ปุ่มประวัติ */}
          <TouchableOpacity style={styles.historyButton}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Path d="M12 2v10.5h4"></Path>
              <Circle cx="12" cy="12" r="10"></Circle>
            </Svg>
          </TouchableOpacity>
        </View>

        {/* Recording Area */}
        <View style={styles.recordingArea}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordButtonActive]}
            onPress={handleRecordButtonPress}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <Svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
                  fill={isRecording ? '#FFFFFF' : '#8D8B8B'}
                />
                <Path
                  d="M19 10v2a7 7 0 0 1-14 0v-2"
                  stroke={isRecording ? '#FFFFFF' : '#8D8B8B'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M12 19v4"
                  stroke={isRecording ? '#FFFFFF' : '#8D8B8B'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d="M8 23h8"
                  stroke={isRecording ? '#FFFFFF' : '#8D8B8B'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            )}
          </TouchableOpacity>
          <Text style={styles.statusText}>
            {isProcessing
              ? 'กำลังประมวลผล...'
              : isRecording
                ? `กำลังบันทึก... ${formatTime(timerSeconds)}`
                : 'แตะเพื่อเริ่มบันทึกเสียง'}
          </Text>
        </View>

        {/* Transcribed Text Display */}
        <ScrollView style={styles.transcribedTextContainer} contentContainerStyle={styles.transcribedTextContent}>
          {transcribedText ? (
            highlightScamWords(transcribedText)
          ) : (
            <Text style={styles.placeholderText}>
              ข้อความที่ถอดเสียงจะปรากฏที่นี่...
            </Text>
          )}
        </ScrollView>

        {/* Analysis Result */}
        {/* {riskLevel !== 'none' && !isProcessing && (
          <View style={[styles.analysisResultContainer, { backgroundColor: getRiskColor(riskLevel) }]}>
            <View style={styles.analysisHeader}>
              {getRiskIcon(riskLevel)}
              <Text style={styles.analysisResultText}>{getRiskText(riskLevel)}</Text>
            </View> */}
            {/* ปุ่มนี้จะไม่แสดง ถ้า Modal แสดงอัตโนมัติ */}
            {/* {riskLevel !== 'safe' && !showDetailsModal && (
              <TouchableOpacity style={styles.detailsButton} onPress={() => setShowDetailsModal(true)}>
                <Text style={styles.detailsButtonText}>ดูรายละเอียด / คำแนะนำ</Text>
              </TouchableOpacity>
            )}
          </View>
        )} */}

        {/* Modal for Risk Details */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDetailsModal}
          onRequestClose={() => setShowDetailsModal(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>รายละเอียดการวิเคราะห์</Text>
              {/* <Text style={[styles.modalSubtitle, { color: getRiskColor(riskLevel) }]}>
                {getRiskText(riskLevel)}
              </Text> */}
              {riskDetails.length > 0 ? (
                riskDetails.map((detail, index) => (
                  <Text key={index} style={styles.modalDetailText}>• {detail}</Text>
                ))
              ) : (
                <Text style={styles.modalDetailText}>ไม่พบปัจจัยความเสี่ยงที่ระบุ</Text>
              )}
              <Text style={styles.modalRecommendationTitle}>คำแนะนำ:</Text>
              <Text style={styles.modalRecommendationText}>
                {riskLevel === 'high'
                  ? 'ไม่ควรให้ข้อมูลส่วนตัวใดๆ และควรติดต่อหน่วยงานที่ถูกอ้างอิงโดยตรงเพื่อตรวจสอบ หรือแจ้งความทันที'
                  : riskLevel === 'low'
                    ? 'ควรระมัดระวังเป็นพิเศษ และตรวจสอบข้อมูลให้แน่ใจก่อนดำเนินการใดๆ'
                    : 'การสนทนาดูปลอดภัย แต่ควรระวังเสมอเมื่อมีบุคคลแปลกหน้าติดต่อมา'}
              </Text>

              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCloseButton]}
                  onPress={() => setShowDetailsModal(false)}
                >
                  <Text style={styles.buttonText}>ปิด</Text>
                </TouchableOpacity>
                {riskLevel !== 'safe' && (
                  <TouchableOpacity
                    style={[styles.modalButton, styles.modalReportButton]}
                    onPress={() => {
                      Alert.alert('แจ้งรายงาน', 'ฟังก์ชันแจ้งรายงานจะถูกพัฒนาต่อไป');
                      setShowDetailsModal(false);
                    }}
                  >
                    <Text style={styles.buttonText}>แจ้งรายงาน</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// -------------------------------------------------------------------
// Styles
// -------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  historyButton: {
    padding: 5,
  },
  recordingArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  recordButton: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: (width * 0.25) / 2,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  recordButtonActive: {
    backgroundColor: '#DC3545', // สีแดงเมื่อกำลังบันทึก
  },
  statusText: {
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
  },
  transcribedTextContainer: {
    flex: 1, // ให้กินพื้นที่ที่เหลือ
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  transcribedTextContent: {
    flexGrow: 1, // ทำให้ ScrollView ยืดได้
  },
  placeholderText: {
    fontSize: 16,
    color: '#AAAAAA',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  normalWord: {
    fontSize: 17,
    lineHeight: 28,
    color: '#333',
  },
  highlightedWord: {
    fontSize: 17,
    lineHeight: 28,
    color: '#DC3545', // สีแดงสำหรับคำที่น่าสงสัย
    fontWeight: 'bold',
    backgroundColor: '#FFEBEE', // พื้นหลังสีอ่อนสำหรับไฮไลต์
    borderRadius: 5,
    paddingHorizontal: 2,
  },
  analysisResultContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  analysisResultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  detailsButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Modal Styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalDetailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  modalRecommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  modalRecommendationText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
  },
  modalCloseButton: {
    backgroundColor: '#A0A0A0',
  },
  modalReportButton: {
    backgroundColor: '#D60000',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AntiScamVoiceApp;
