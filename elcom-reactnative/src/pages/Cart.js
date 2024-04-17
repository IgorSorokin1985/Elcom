import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchLastOrdeerID, fetchOneOrder, deletePosition, completeOrder, updatePosition } from "../http/ordersAPI";

const Cart = () => {
  const [cartData, setCartData] = useState(false);
  const [positions, setPositions] = useState([]);
  const [refresh, setRefresh] = useState(true)
  const navigation = useNavigation();

  const fetchCartData = async () => {
    const cartID = await fetchLastOrdeerID();
    const fetchedData = await fetchOneOrder(cartID.order_id);
    setCartData(fetchedData);
    setPositions([...fetchedData.positions]);
    setRefresh(false)
  }

  useEffect(() => {
    fetchCartData();
  }, [refresh]);

  const handleChangeQuantity = (position) => {
    updatePosition(position.id, position.quantity);
    setRefresh(true);  
  };

  const handleDeletePosition = (positionId) => {
    deletePosition(positionId);
    setRefresh(true);
  };

  const handleCompleteOrder = () => {
    completeOrder(cartData.id)
    navigation.navigate('OrdersList')
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>
        {positions.sort((position1, position2) => { if (position1.item_name > position2.item_name)
        {return 1}
        if (position1.item_name < position2.item_name) {
          return -1
        }
        return 0}).map((position) => (
          <View key={position.id} style={styles.item}>
            <Text style={styles.itemName}>{position.item_name}</Text>
            <Text>Quantity: {position.quantity}</Text>
            <Text>Price: ${position.price}</Text>
            <Text>Availability: {position.availability_info}</Text>
            <Text>Total: ${position.price * position.quantity}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="New Quantity"
              //value={position.quantity.toString()}
              onChangeText={(text) => {
                // Parse the input text to an integer
                position.quantity = parseInt(text);              
              }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleChangeQuantity(position)}
              >
                <Text style={styles.buttonText}>Change Quantity</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDeletePosition(position.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>

          </View>
        ))}
        <View style={styles.totalAmountContainer}>
          <Text style={styles.totalAmountText}>Total Amount: ${cartData.summa}</Text>
        </View>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => {
            handleCompleteOrder();
          }}
        >
          <Text style={styles.completeButtonText}>Complete Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  item: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    width: '48%', // Adjust the width as needed
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red', // Change the background color for delete button
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  totalAmountContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  totalAmountText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;