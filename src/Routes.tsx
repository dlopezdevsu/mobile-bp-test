import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsListScreen from 'src/screens/ProductsList';
import CreateFormScreen from 'src/screens/CreateForm';
import ProductDetailScreen from 'src/screens/ProductDetail';
import * as Routes from 'src/utils/routes';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={Routes.PRODUCTS_LIST}>
                <Stack.Screen name={Routes.PRODUCTS_LIST} component={ProductsListScreen} options={{ title: 'Productos' }} />
                <Stack.Screen name={Routes.CREATE_FORM} component={CreateFormScreen} options={{ title: '' }} />
                <Stack.Screen name={Routes.PRODUCT_DETAIL} component={ProductDetailScreen} options={{ title: '' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MyStack