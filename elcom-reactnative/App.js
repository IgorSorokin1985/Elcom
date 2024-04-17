import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemsList from './src/pages/ItemsList';
import Navbar from './src/components/Navbar';
import Cart from './src/pages/Cart';
import OrdersList from './src/pages/OrdersList';
import Profile from './src/pages/Profile';
import ItemDetails from './src/pages/ItemDetails';
import Auth from './src/pages/Auth';
import OrderDetails from './src/pages/OrderDetail';
import Registration from './src/pages/Registration';
import { UserProvider } from './src/context/UserContext';
import AddCompany from './src/pages/AddCompany';


const Stack = createStackNavigator();

const App = () => {  

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ItemsList" component={ItemsList} />
          <Stack.Screen name="AddCompany" component={AddCompany} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="OrdersList" component={OrdersList} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ItemDetails" component={ItemDetails} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;