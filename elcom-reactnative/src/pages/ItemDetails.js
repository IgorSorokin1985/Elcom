import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, ScrollView } from 'react-native';
import { addPosition } from '../http/ordersAPI';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';


const ItemDetails = ({ route }) => {
  const { isAuth, setAuth } = useUser();
  const itemData = route.params.itemData
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    addPosition(itemData.id, quantity, itemData.price)
    navigation.navigate("ItemsList")
  };

  return (
    <ScrollView>
      <View style={styles.container}>
       <Image source={{ uri: itemData.foto }} style={styles.image} />
       <Text style={styles.name}>{itemData.name}</Text>
       <Text style={styles.characteristics}>Characteristics:</Text>
       <Text style={styles.price}>Price: ${itemData.price}</Text>
       <Text style={styles.stock}>Stock: {itemData.stock}</Text>
           {isAuth &&<TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={quantity.toString()}
              onChangeText={(text) => {
                // Parse the input text to an integer
                const parsedValue = parseInt(text);
                // Update the quantity only if the parsedValue is a valid number
                if (!isNaN(parsedValue)) {
                  setQuantity(parsedValue);
                }
              }}
              />}
       {isAuth && <Button title="Order" onPress={handleOrder} color="#4CAF50" />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  characteristics: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  characteristic: {
    marginBottom: 5,
  },
  price: {
    marginBottom: 10,
  },
  stock: {
    marginBottom: 20,
  },
  input: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default ItemDetails;