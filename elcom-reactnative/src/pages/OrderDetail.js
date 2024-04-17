import React  from "react";
import { View, Text, Button, StyleSheet, ScrollView, Linking } from 'react-native';


const OrderDetails = ({ route }) => {
  const order = route.params.order;
  const positions = order.positions;

  const handlePayPress = () => {
    console.log(order.url_for_pay);
    Linking.openURL(order.url_for_pay.slice(0, -1));
  };

  const handleDownloadPress = () => {
    Linking.openURL(order.invoice);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.title}>Order N{order.id} from {order.data}</Text>
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
          </View>
        ))}
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>Total Amount: ${order.summa}</Text>
      </View>
      <View style={styles.links}>
        { order.url_for_pay != 'False' ?
         <Button title="Pay" onPress={handlePayPress} />
        :
        <View/>}
        { order.invoice && <Button title="Download Invoice" onPress={handleDownloadPress} />}
      </View>
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
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default OrderDetails;