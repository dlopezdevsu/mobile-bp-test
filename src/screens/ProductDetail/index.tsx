import * as React from 'react';
import { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from 'src/components/Button';
import * as Colors from 'src/utils/colors';
import Model from 'src/hooks/Model';
import { Store, InitialStateProps } from 'src/hooks/main_store';
import * as Routes from 'src/utils/routes';


const ProductDetailScreen = () => {
    const navigation = useNavigation()

    const { state }: { state: InitialStateProps } = useContext(Store)
    const [errorImage, setErrorImage] = useState<boolean>(false)

    const onEdit = () => {
        Model.setData('editMode', true)
        navigation.navigate(Routes.CREATE_FORM as never)
    }

    const onDelete = () => {
        Model.setData('openBottomSheet', true)
        Model.setData('callbackBottomSheet', () => navigation.navigate(Routes.PRODUCTS_LIST as never))
    }

    return (
        <SafeAreaView style={styles.screen} >
            <View style={styles.container}>
                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>ID: {state.selected?.id}</Text>
                    <Text style={styles.subtitle}>Información extra</Text>

                    <View style={styles.content}>
                        <View style={styles.rowInfo}>
                            <Text style={styles.labelRow}>Nombre</Text>
                            <Text style={styles.infoRow}>{state.selected?.name}</Text>
                        </View>
                        <View style={styles.rowInfo}>
                            <Text style={styles.labelRow}>Descripción</Text>
                            <Text style={styles.infoRow}>{state.selected?.description}</Text>
                        </View>
                        <Text style={styles.labelRow}>Logo</Text>
                        <View style={styles.containerLogo}>
                            <Image style={styles.logo} source={errorImage ? require('src/assets/images/placeholder.png') : { uri: state.selected?.logo }} onError={() => setErrorImage(true)} />
                        </View>
                        <View style={styles.rowInfo}>
                            <Text style={styles.labelRow}>Fecha liberación</Text>
                            <Text style={styles.infoRow}>{state.selected?.date_release}</Text>
                        </View>
                        <View style={styles.rowInfo}>
                            <Text style={styles.labelRow}>Fecha revisión</Text>
                            <Text style={styles.infoRow}>{state.selected?.date_revision}</Text>
                        </View>
                    </View>
                </ScrollView>
                <Button label='Editar' style={styles.editButton} onPress={onEdit} />
                <Button label='Eliminar' style={styles.deleteButton} onPress={onDelete} variant='delete' />
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
        paddingHorizontal: 18,
        flex: 1,
    },
    scroll: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 30
    },
    subtitle: {
        fontWeight: '300',
        fontSize: 12,
    },
    content: {
        marginHorizontal: 12,
        marginTop: 42,
        marginBottom: 30
    },
    rowInfo: {
        flexDirection: 'row',
        paddingVertical: 12
    },
    labelRow: {
        fontWeight: '300',
        fontSize: 12,
        flex: 1
    },
    infoRow: {
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'right'
    },
    containerLogo: {
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 120,
        width: '100%',
        resizeMode: 'contain',
    },
    editButton: {
        marginVertical: 12,
    },
    deleteButton: {
        marginBottom: 18,
    },
});

export default ProductDetailScreen;