import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { fetchItems, fetchCategories } from "../http/itemsAPI";
import { useNavigation } from '@react-navigation/native';


const ItemsList = () => {
    const [ items, setItems ] = useState([]);
    const [ categories, setCategories ] = useState([]);
    const [ selectedCategoryID, setSelectedCategory ] = useState(1)
    const navigation = useNavigation();

    const fetchAllItems = async () => {
      const allCategories = await fetchCategories();      
      const allItems = await fetchItems();
      setItems(allItems);
      setCategories(allCategories);
    }
  
    useEffect(() => {
        fetchAllItems()
    }, [])

    const handleCategorySelect = (categoryID) => {
      setSelectedCategory(categoryID);
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Product List</Text>
                <View style={styles.categoryContainer}>
                {categories.map((category) => (
                    <TouchableOpacity 
                      key={category.id} 
                      style={[styles.categoryButton, selectedCategoryID === category.id && styles.selectedCategoryButton]}
                      onPress={() => handleCategorySelect(category.id)}
                    >
                      <Text style={styles.categoryButtonText}>{category.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.productContainer}>
                  {items.filter((item) => item.category == selectedCategoryID).map((item) => (
                    <TouchableOpacity key={item.id} style={styles.productItem}
                    onPress={() => navigation.navigate('ItemDetails', { itemData: item })}>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productQuantity}>Quantity: {item.stock}</Text>
                      <Text style={styles.productPrice}>Price: ${item.price}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default ItemsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: 'green', // Change to your preferred color
  },
  categoryButtonText: {
    fontSize: 16,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  productItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: 16,
    marginBottom: 3,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
});
  