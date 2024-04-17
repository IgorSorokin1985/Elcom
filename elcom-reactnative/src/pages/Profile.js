import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { userInfo } from "../http/userAPI";
import { useNavigation } from '@react-navigation/native';
import { fetchLastOrdeerID } from "../http/ordersAPI";
import { companyInfo } from "../http/companyAPI";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [companyData, setCompanyData] = useState({});
  const navigation = useNavigation();

  const fetchUserData = async () => {
    const dataUser = await fetchLastOrdeerID();
    const data = await userInfo(dataUser.user_id);
    if (data.company) {
      const fetchCompanyData = await companyInfo(data.company);
      console.log(fetchCompanyData)
      setCompanyData(fetchCompanyData);
    }
    setUserData(data);
  }

  useEffect(() => {
    fetchUserData();
  }, [])
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Information</Text>
        <Text>Name: {userData.name}</Text>
        <Text>Email: {userData.email}</Text>
        <Text>Telegram: {userData.telegram_chat_id}</Text>
      </View>
      { userData.company ? <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Information</Text>
        <Text>Name: {companyData.name}</Text>
        <Text>INN: {companyData.inn}</Text>
        <Text>KPP: {companyData.kpp}</Text>
        <Text>Address: {companyData.address}</Text>
        <Text>Account: {companyData.amount}</Text>
      </View>
      :
      <Button title="Add Company" onPress={() => navigation.navigate('AddCompany')} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Profile;