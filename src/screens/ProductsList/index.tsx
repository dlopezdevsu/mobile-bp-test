import * as React from 'react';
import { useEffect, useContext, useState, useMemo } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import TextInput from 'src/components/TextInput';
import Button from 'src/components/Button';
import ItemProductList, { ItemProductListProps } from 'src/components/ItemProductList';
import Api from 'src/utils/api';
import * as Colors from 'src/utils/colors';
import Model from 'src/hooks/Model';
import { Store, InitialStateProps } from 'src/hooks/main_store';
import * as Routes from 'src/utils/routes';

const ProductsListScreen = () => {
    const navigation = useNavigation()
    const focused = useIsFocused();

    const { state }: { state: InitialStateProps } = useContext(Store)
    const [search, setSearch] = useState<string>('')

    const getProducts = async () => {
        try {
            const response = (await (await Api.getProducts()).json())?.data
            Model.setData('products', response || [])
        } catch (error: any) {
            Model.setData('alert', error?.message || error)
        }
    }

    const handleSearch = (value: string) => {
        setSearch(value)
    }

    const formatString = (text: string): string => text?.toLocaleLowerCase().replace(/\s/g, "")

    const filteredData = useMemo(() => state.products.filter((product) => {
        const hasName: boolean = formatString(product.name)?.includes(formatString(search))
        const hasId: boolean = formatString(product.id)?.includes(formatString(search))

        return hasName || hasId
    }), [state.products, search])

    useEffect(() => {
        getProducts()
    }, [focused])

    return (
        <SafeAreaView style={styles.screen} >
            <View style={styles.container}>
                <TextInput value={search} style={styles.searchInput} placeholder='Search...' onChangeText={handleSearch} />
                <FlatList
                    data={filteredData}
                    renderItem={({ item }: { item: ItemProductListProps }) => <ItemProductList {...item} />}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
                <Button label='Agregar' style={styles.addButton} onPress={() => navigation.navigate(Routes.CREATE_FORM as never)} variant='submit' />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
    },
    container: {
        padding: 18,
        flex: 1,
        paddingTop: 0
    },
    searchInput: {
        marginBottom: 36
    },
    list: {
        flex: 1
    },
    addButton: {
        marginTop: 18,
    }
});

export default ProductsListScreen;