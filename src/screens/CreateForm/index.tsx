import * as React from 'react';
import { useEffect, useContext, useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView, KeyboardAvoidingView, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TextInput from 'src/components/TextInput';
import Button from 'src/components/Button';
import Api from 'src/utils/api';
import * as Colors from 'src/utils/colors';
import Model from 'src/hooks/Model';
import DatePicker from 'react-native-date-picker'
import { InitialStateProps, Store } from 'src/hooks/main_store';
import * as Routes from 'src/utils/routes';

const KEY_BOARD_OFFSET = 60;

interface FormProps {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string;
    date_revision: string;
}

const initialValues: FormProps = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
}

const CreateFormScreen = () => {
    const navigation = useNavigation()
    const { state }: { state: InitialStateProps } = useContext(Store)

    const [formValues, setFormValues] = useState<FormProps>(state.editMode ? state.selected as unknown as FormProps : initialValues)
    const [errorsForms, setErrorsForms] = useState<FormProps>(initialValues)
    const [dateSelected, setDateSelected] = useState<Date>(new Date)
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false)

    const formatDigits = (number: string) => parseInt(number) > 9 ? number : `0${number}`

    const saveProduct = async () => {
        try {
            const data = {
                ...formValues,
                date_release: formValues.date_release.split('/').reverse().map(item => formatDigits(item)).join('-'),
                date_revision: formValues.date_revision.split('/').reverse().map(item => formatDigits(item)).join('-'),
            }

            let response

            if (state.editMode) {
                response = (await (await Api.putProduct(data)).json())
            } else {
                response = (await (await Api.postProduct(data)).json())
            }

            if (response?.message === "Product added successfully") {
                navigation.goBack()
            } else if (response?.message === "Product updated successfully") {
                navigation.navigate(Routes.PRODUCTS_LIST as never)
            } else {
                throw new Error(response?.message)
            }
        } catch (error: any) {
            Model.setData('alert', error?.message || error)
        }
    }

    const confirmIdProduct = async () => {
        try {
            if (formValues.id) {
                const response = (await (await Api.confirmIdProduct(formValues.id)).json())

                if (response) {
                    setErrorsForms(prev => ({ ...prev, id: 'ID ya existe' }))
                }
            }
        } catch (error: any) {
            Model.setData('alert', error?.message || error)
        }
    }

    const handleInput = (label: string) => (value: string) => {
        setFormValues(prev => ({ ...prev, [label]: value }))
        setErrorsForms(prev => ({ ...prev, [label]: false }))
    }

    const handleDate = (date: Date) => {
        const newDate = new Date(date)

        setDateSelected(date)
        setOpenDatePicker(false)
        handleInput('date_release')(date.toLocaleDateString('es-ES'))

        const date_revision: Date = new Date(newDate.setFullYear(newDate.getFullYear() + 1))
        handleInput('date_revision')(date_revision.toLocaleDateString("es-ES"))
    }

    const resetForm = () => {
        setFormValues(state.editMode ? state.selected as unknown as FormProps : initialValues)
        setErrorsForms(initialValues)
    }

    const sendForm = useCallback(() => {
        let hasError = false;
        const errors: FormProps = { ...initialValues }

        Object.keys(errorsForms).forEach((key) => {
            const value = errorsForms[key as keyof FormProps]

            if (!!value) {
                errors[key as keyof FormProps] = value;
                hasError = true
            }
        })

        Object.keys(formValues).forEach((key) => {
            switch (key) {
                case 'id':
                    if (!formValues[key]) {
                        errors[key] = 'Este campo es requerido!';
                        hasError = true;
                    } else if ((formValues[key].length < 3)) {
                        errors[key] = 'Debe tener mínimo 3 caracteres';
                        hasError = true;
                    }
                    break;
                case 'name':
                    if (!formValues[key]) {
                        errors[key] = 'Este campo es requerido!';
                        hasError = true;
                    } else if ((formValues[key].length < 6)) {
                        errors[key] = 'Debe tener mínimo 6 caracteres';
                        hasError = true;
                    }
                    break;
                case 'description':
                    if (!formValues[key]) {
                        errors[key] = 'Este campo es requerido!';
                        hasError = true;
                    } else if ((formValues[key].length < 10)) {
                        errors[key] = 'Debe tener mínimo 10 caracteres';
                        hasError = true;
                    }
                    break;
                case 'logo':
                case 'date_release':
                case 'date_revision':
                    if (!formValues[key]) {
                        errors[key] = 'Este campo es requerido!';
                        hasError = true;
                    }
                    break;
            }
        })

        if (hasError) {
            setErrorsForms(errors)
        } else {
            saveProduct()
        }
    }, [formValues])

    useEffect(() => {
        return () => {
            Model.setData('editMode', false)
        }
    }, [])

    return (
        <SafeAreaView style={styles.screen} >
            <KeyboardAvoidingView
                behavior="height"
                keyboardVerticalOffset={KEY_BOARD_OFFSET}
                style={styles.screen}
            >
                <ScrollView style={styles.container}>
                    <Text style={styles.title}>
                        Formulario de {state.editMode ? 'Edición' : 'Registro'}
                    </Text>
                    <TextInput value={formValues.id} label='ID' onChangeText={handleInput('id')} errorLabel={errorsForms.id} maxLength={10} hasError={!!errorsForms.id} editable={!state.editMode} onBlur={confirmIdProduct} />
                    <TextInput value={formValues.name} label='Nombre' onChangeText={handleInput('name')} errorLabel={errorsForms.name} maxLength={100} hasError={!!errorsForms.name} />
                    <TextInput value={formValues.description} label='Descripción' onChangeText={handleInput('description')} errorLabel={errorsForms.description} maxLength={200} hasError={!!errorsForms.description} />
                    <TextInput value={formValues.logo} label='Logo' onChangeText={handleInput('logo')} errorLabel={errorsForms.logo} hasError={!!errorsForms.logo} />

                    <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]} onPress={() => setOpenDatePicker(true)}>
                        <TextInput value={formValues.date_release} label='Fecha Liberación' hasError={!!errorsForms.date_release} errorLabel={errorsForms.date_release} />
                        <View style={styles.overlayDateInput} />
                    </Pressable>

                    <View>
                        <TextInput value={formValues.date_revision} label='Fecha Revisión' editable={false} hasError={!!errorsForms.date_revision} errorLabel={errorsForms.date_revision} />
                        <View style={styles.overlayDateInput} />
                    </View>


                    <Button label='Enviar' style={styles.addButton} onPress={sendForm} variant='submit' />
                    <Button label='Reiniciar' style={styles.resetButton} onPress={resetForm} />
                </ScrollView>
            </KeyboardAvoidingView>

            <DatePicker
                modal
                mode='date'
                open={openDatePicker}
                date={dateSelected}
                onConfirm={handleDate}
                onCancel={() => {
                    setOpenDatePicker(false)
                }}
                minimumDate={new Date()}
            />
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
    },
    title: {
        fontSize: 24,
        fontWeight: '600'
    },
    searchInput: {
        marginTop: 24,
        marginBottom: 36
    },
    list: {
        flex: 1
    },
    addButton: {
        marginTop: 24,
    },
    resetButton: {
        marginTop: 18,
        marginBottom: 72
    },
    overlayDateInput: {
        position: 'absolute',
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        zIndex: 1
    }
});

export default CreateFormScreen;