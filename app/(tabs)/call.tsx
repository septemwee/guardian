import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const AntiScamVoiceApp = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [riskLevel, setRiskLevel] = useState<'none' | 'safe' | 'low' | 'high'>('none');
  const [riskDetails, setRiskDetails] = useState<string[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const timerIntervalRef = useRef<number | null>(null);
  const typingIntervalRef = useRef<number | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setTranscribedText('');
    setRiskLevel('none');
    setRiskDetails([]);
    setTimerSeconds(0);
    setIsProcessing(false);

    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);

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
    }, 1500);
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
    setIsProcessing(true);

    setTimeout(() => {
      const text = transcribedText.toLowerCase();
      let level: 'safe' | 'low' | 'high' = 'safe';
      const details: string[] = [];

      if (text.includes('โชคดีได้รับรางวัล') || text.includes('โอนเงินค่าธรรมเนียม') || text.includes('รีบหน่อยนะครับ') || text.includes('โอกาสสุดท้าย') || text.includes('บัตรประชาชน') || text.includes('ความลับ')) {
        level = 'high';
        if (text.includes('โชคดีได้รับรางวัล')) details.push('ข้อเสนอเกินจริง');
        if (text.includes('โอนเงินค่าธรรมเนียม')) details.push('เรียกเก็บค่าธรรมเนียมที่ไม่สมเหตุสมผล');
        if (text.includes('รีบหน่อยนะครับ') || text.includes('โอกาสสุดท้าย') || text.includes('ถ้าไม่ทำตอนนี้จะพลาดโอกาส')) details.push('การใช้คำพูดเร่งรัด/กดดัน');
        if (text.includes('บัตรประชาชน')) details.push('การขอข้อมูลส่วนตัวที่ละเอียดอ่อน');
        if (text.includes('ความลับ')) details.push('การขอให้เก็บเป็นความลับ');
      } else if (text.includes('สวัสดีครับ')) {
        level = 'safe';
      } else if (text.length > 0) {
        level = 'low';
        details.push('ไม่พบคำที่เข้าข่ายมิจฉาชีพชัดเจน แต่ควรระมัดระวัง');
      }

      setRiskLevel(level);
      setRiskDetails(details);
      setIsProcessing(false);

      if (level !== 'safe') {
        setShowDetailsModal(true);
      }
    }, 3000);
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
      case 'safe': return '#28A745';
      case 'low': return '#FFC107';
      case 'high': return '#DC3545';
      default: return '#8D8B8B';
    }
  };

  const getRiskText = (level: typeof riskLevel) => {
    switch (level) {
      case 'safe': return 'ปลอดภัย';
      case 'low': return 'ความเสี่ยงต่ำ';
      case 'high': return 'อันตราย! เข้าข่ายมิจฉาชีพ';
      case 'none': return 'ยังไม่มีการวิเคราะห์';
      default: return '';
    }
  };

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
        <View style={styles.header}>
          <Text style={styles.appName}>Anti-Scam Voice AI</Text>
          <TouchableOpacity style={styles.historyButton}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <Path d="M12 2v10.5h4"></Path>
              <Circle cx="12" cy="12" r="10"></Circle>
            </Svg>
          </TouchableOpacity>
        </View>

        <View style={styles.recordingArea}>
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordButtonActive]}
            onPress={handleRecordButtonPress}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <Svg width="60" height="60" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={isRecording ? '#FFFFFF' : '#8D8B8B'} />
                <Path d="M17 8l-5-5-5 5" stroke={isRecording ? '#FFFFFF' : '#8D8B8B'} />
                <Path d="M12 3v12" stroke={isRecording ? '#FFFFFF' : '#8D8B8B'} />
              </Svg>
            )}
          </TouchableOpacity>
          <Text style={styles.statusText}>
            {isProcessing
              ? 'กำลังประมวลผล...'
              : isRecording
                ? `กำลังบันทึก... ${formatTime(timerSeconds)}`
                : 'แตะเพื่ออัปโหลดเสียง'}
          </Text>
        </View>

        <ScrollView style={styles.transcribedTextContainer} contentContainerStyle={styles.transcribedTextContent}>
          {transcribedText ? (
            highlightScamWords(transcribedText)
          ) : (
            <Text style={styles.placeholderText}>
              ข้อความที่ถอดเสียงจะปรากฏที่นี่...
            </Text>
          )}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showDetailsModal}
          onRequestClose={() => setShowDetailsModal(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>รายละเอียดการวิเคราะห์</Text>
              <Text style={[styles.modalSubtitle, { color: getRiskColor(riskLevel) }]}>
                {getRiskText(riskLevel)}
              </Text>
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
                  ? 'ไม่ควรให้ข้อมูลส่วนตัวใด ๆ และควรติดต่อหน่วยงานที่ถูกอ้างอิงโดยตรงเพื่อตรวจสอบ หรือแจ้งความทันที'
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
    backgroundColor: '#DC3545',
  },
  statusText: {
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
  },
  transcribedTextContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  transcribedTextContent: {
    flexGrow: 1,
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
    color: '#DC3545',
    fontWeight: 'bold',
    backgroundColor: '#FFEBEE',
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