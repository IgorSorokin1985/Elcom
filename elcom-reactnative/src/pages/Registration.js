import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { login, registration } from '../http/userAPI';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';


const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [password, setPassword] = useState('');
  const { isAuth, setAuth } = useUser();
  const navigation = useNavigation();

  const handleRegistration = async () => {
    const response = await registration(name, email, password, telegram )
    if (response) {
      const token = await login(email, password);
      if (token) {
        setAuth(true);
        navigation.navigate("ItemsList");
      }
      console.log('Registration data:', { name, email, password, telegram });
    }    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telegram"
        value={telegram}
        onChangeText={setTelegram}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Register" onPress={handleRegistration} />
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
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default Registration;
