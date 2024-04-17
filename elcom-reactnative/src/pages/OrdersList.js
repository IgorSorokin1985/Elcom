import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchOrders } from "../http/ordersAPI";

const OrdersList = () => {
  const navigation = useNavigation();
  const [ordersList, setOrdersList] = useState([])

  const fetchOrdersData = async () => {    
    const fetchedData = await fetchOrders();
    setOrdersList(fetchedData);
  }

  useEffect(() => {
    fetchOrdersData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>Orders</Text>
      { ordersList.sort((order1, order2) => { if (order1.id > order2.id)
        {return -1}
        if (order1.id < order2.id) {
          return 1
        }
        return 0}).map((order) => (
            <TouchableOpacity key={order.id} style={styles.order}
            onPress={() => navigation.navigate('OrderDetails', {order: order})}>
              <Text style={styles.orderName}>Order N{order.id} from {order.data}</Text>
              <Text>Total Amount: ${order.summa}</Text>
              <Text>Readiness Status: {order.status}</Text>
              <Text>Payment Status: {order.payment_status}</Text>
            </TouchableOpacity>
      ))}
      </ScrollView>
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
  order: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default OrdersList;
