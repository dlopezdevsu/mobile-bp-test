import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import * as Routes from 'src/utils/routes';

import * as Colors from 'src/utils/colors';
import Model from 'src/hooks/Model';

export interface ItemProductListProps {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  date_release?: string;
  date_revision?: string;
}

const ItemProductList = (product: ItemProductListProps) => {
  const { name, id } = product;
  const navigation = useNavigation()

  const onSelect = () => {
    Model.setData('selected', product)
    navigation.navigate(Routes.PRODUCT_DETAIL as never)
  }

  return (
    <Pressable style={({ pressed }) => [styles.container, { opacity: pressed ? 0.5 : 1 }]} onPress={onSelect}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>ID: {id}</Text>
      </View>
      <Image style={styles.icon} source={require('src/assets/icons/chevron-right-icon.png')} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    flex: 1
  },
  name: {
    fontWeight: 'bold',
  },
  id: {
    marginTop: 6
  },
  icon: {
    resizeMode: 'contain',
    width: 12,
    height: 12,
  },
});

export default ItemProductList;