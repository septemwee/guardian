import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { BlurView } from 'expo-blur';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header Card */}
      <BlurView intensity={80} tint="light" style={styles.headerCard}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>True Guardian</Text>
        </View>
      </BlurView>

      {/* Menu Flex Wrap */}
      <ScrollView
        contentContainerStyle={styles.menuWrapper}
        showsVerticalScrollIndicator={false}
      >
        <BlurView intensity={50} tint="light" style={styles.menuCard}>
          <TouchableOpacity style={styles.menuContent} activeOpacity={0.7}>
            <Svg width={32} height={32} viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" fill="none" >
              <Path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <Path d="M9 12h.01M15 12h.01" />
            </Svg>
            <Text style={styles.menuText}>Chat</Text>
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={50} tint="light" style={styles.menuCard}>
          <TouchableOpacity style={styles.menuContent} activeOpacity={0.7}>
            <Svg width={32} height={32} viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" fill="none">
              <Path d="M12 4.5v15m7.5-7.5h-15" />
            </Svg>
            <Text style={styles.menuText}>Browser</Text>
          </TouchableOpacity>
        </BlurView>

        <BlurView intensity={50} tint="light" style={[styles.menuCard, { width: '100%' }]}>
          <TouchableOpacity style={styles.menuContent} activeOpacity={0.7}>
            <Svg width={32} height={32} viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" fill="none">
              <Path d="M12 3v18m9-9H3" />
            </Svg>
            <Text style={styles.menuText}>True Money</Text>
          </TouchableOpacity>
        </BlurView>
      </ScrollView>

      {/* Bottom Navigation */}
      <BlurView intensity={70} tint="light" style={styles.bottomNav}>
        <TouchableOpacity>
          <Svg width={24} height={24} viewBox="0 0 24 24" stroke="red" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M3 9.5L12 3l9 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20.5z" />
            <Path d="M9 21V12h6v9" />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity>
          <Svg width={24} height={24} viewBox="0 0 24 24" stroke="black" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity>
          <Svg width={24} height={24} viewBox="0 0 24 24" stroke="black" fill="none" strokeWidth={1.5}>
            <Path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity>
          <Svg width={24} height={24} viewBox="0 0 24 24" stroke="black" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <Path d="M21 7v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7" />
            <Path d="M16 12h.01" />
            <Path d="M3 7h18v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2z" />
          </Svg>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    padding: 16,
  },
  headerCard: {
    width: '90%',
    height: 180,
    borderRadius: 20,
    padding: 16,
    marginTop: 100,
    overflow: 'hidden',  // สำคัญ! ต้องมีเพื่อให้ blur ทำงานถูกต้องบน Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // โปร่งแสง
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
  menuWrapper: {
    marginTop: 24,
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  menuCard: {
    width: '47%',
    height: 160,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 4,
    overflow: 'hidden', // สำคัญสำหรับ blur
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // โปร่งแสง
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  menuContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: 'red',
    fontWeight: '600',
    marginTop: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    padding: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.25)', // โปร่งแสง
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
});
