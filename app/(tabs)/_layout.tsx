import { Ionicons } from '@expo/vector-icons';
import { Link, Slot, usePathname } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

// Layout component ที่จะใช้หุ้มหน้าอื่นๆ ใน Expo Router
const Layout = () => {
  const pathname = usePathname();

  // แก้ไข: กำหนด type 'string' ให้กับพารามิเตอร์ 'path' เพื่อแก้ปัญหา Implicit any
  const getIconColor = (path: string) => {
    return pathname === path ? '#fff' : '#A9A9A9';
  };

  // แก้ไข: กำหนด type 'string' ให้กับพารามิเตอร์ 'path' เพื่อแก้ปัญหา Implicit any
  const getIconBackground = (path: string) => {
    return pathname === path ? styles.activeNavIconContainer : styles.navIconContainer;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Slot />
      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          {/* Home Button */}
          <Link href="/" asChild>
            <TouchableOpacity style={styles.navButton}>
              <View style={[styles.navIconContainer, getIconBackground('/')]}>
                <Ionicons
                  name="home-outline"
                  size={28}
                  color={getIconColor('/')}
                />
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/webguardian" asChild>
            <TouchableOpacity style={styles.navButton}>
              <View style={[styles.navIconContainer, getIconBackground('/webguardian')]}>
                <Ionicons
                  name="search-outline"
                  size={28}
                  color={getIconColor('/webguardian')}
                />
              </View>
            </TouchableOpacity>
          </Link>
          
          <Link href="/chat" asChild>
            <TouchableOpacity style={styles.navButton}>
              <View style={[styles.navIconContainer, getIconBackground('/chat')]}>
                <Ionicons
                  name="chatbox-outline"
                  size={28}
                  color={getIconColor('/chat')}
                />
              </View>
            </TouchableOpacity>
          </Link>

          <Link href="/call" asChild>
            <TouchableOpacity style={styles.navButton}>
              <View style={[styles.navIconContainer, getIconBackground('/call')]}>
                <Ionicons
                  name="call-outline"
                  size={28}
                  color={getIconColor('/call')}
                />
              </View>
            </TouchableOpacity>
          </Link>
          
          {/* <Link href="/truemoney" asChild>
            <TouchableOpacity style={styles.navButton}>
              <View style={[styles.navIconContainer, getIconBackground('/truemoney')]}>
                <Ionicons
                  name="wallet-outline"
                  size={28}
                  color={getIconColor('/truemoney')}
                />
              </View>
            </TouchableOpacity>
          </Link> */}

          {/* <Link href="/display" asChild>
            <TouchableOpacity style={styles.navButton}>
              <View style={[styles.navIconContainer, getIconBackground('/display')]}>
                <Ionicons
                  name="wallet-outline"
                  size={28}
                  color={getIconColor('/display')}
                />
              </View>
            </TouchableOpacity>
          </Link> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    marginBottom: 15,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  bottomNav: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navButton: {
    padding: 10,
  },
  navIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeNavIconContainer: {
    backgroundColor: '#D60000',
  },
});

export default Layout;
