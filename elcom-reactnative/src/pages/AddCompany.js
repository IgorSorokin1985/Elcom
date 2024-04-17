import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { addCompany } from "../http/companyAPI";

const AddCompany = () => {
  const navigation = useNavigation();
  const [inn, setINN] = useState('');
  const [kpp, setKPP] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddCompany = async () => {
    await addCompany(name, inn, kpp, address, amount);
    navigation.navigate('Profile'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adding Company</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="INN"
          value={inn}
          onChangeText={setINN}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="KPP"
          value={kpp}
          onChangeText={setKPP}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Button
          title="Add Company"
          onPress={handleAddCompany}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddCompany;