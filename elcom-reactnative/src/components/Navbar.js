import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar = () => {
    const navigation = useNavigation();
    const { isAuth, setAuth } = useUser();

    useEffect(() => {
    }, [isAuth]);

    const handleLogOut = async () => {      
      await AsyncStorage.removeItem('login');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('token');
      navigation.navigate('ItemsList');
      setAuth(false);
    }

    return (
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ItemsList')}>
          <Text style={styles.navText}>Catalog</Text>
        </TouchableOpacity>
        { isAuth && <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.navText}>Cart</Text>
          </TouchableOpacity>}
        { isAuth &&  <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('OrdersList')}>
            <Text style={styles.navText}>My Orders</Text>
          </TouchableOpacity>}
        { isAuth &&    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>}          
        { isAuth &&  <TouchableOpacity style={styles.navItem} onPress={handleLogOut}>
            <Text style={styles.navText}>Log out</Text>
          </TouchableOpacity>}
        { !isAuth &&  <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Auth')  }>
          <Text style={styles.navText}>Login</Text>
        </TouchableOpacity>}
      </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navItem: {
    padding: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Navbar;