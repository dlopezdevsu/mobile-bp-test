import * as React from 'react';
import { View, StyleSheet, Text, Modal, Image, Pressable } from 'react-native';

import * as Colors from 'src/utils/colors';
import { InitialStateProps, Store } from 'src/hooks/main_store';
import { useContext } from 'react';
import Model from 'src/hooks/Model';
import Button from 'src/components/Button';
import Api from 'src/utils/api';

const BottomSheetModal = () => {
  const { state }: { state: InitialStateProps } = useContext(Store)

  const onConfirm = async () => {
    try {
      const response = (await (await Api.deleteProduct(state.selected?.id || '')).json())

      if (response?.message === "Product removed successfully") {
        state?.callbackBottomSheet?.()
      } else {
        throw new Error(response?.message)
      }
    } catch (error: any) {
      Model.setData('alert', error?.message || error)
    } finally {
      Model.setData('openBottomSheet', false)
    }
  }

  return (
    <>
      {state.openBottomSheet && <View style={styles.backdrop} />}

      <Modal
        animationType="slide"
        transparent={true}
        visible={state.openBottomSheet}
        onRequestClose={() => Model.setData('openBottomSheet', false)}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable style={({ pressed }) => [styles.containerIcon, { opacity: pressed ? 0.5 : 1 }]} onPress={() => Model.setData('openBottomSheet', false)} >

              <Image style={styles.icon} source={require('src/assets/icons/close.png')} />
            </Pressable>
          </View>
          <View style={styles.containerMessage}>
            <Text style={styles.message}>¿Estás seguro de eliminar el producto {state.selected?.name}?</Text>
          </View>
          <View style={styles.containerButtons}>
            <Button label='Confirmar' style={styles.confirmButton} onPress={onConfirm} variant='submit' />
            <Button label='Cancelar' style={styles.cancelButton} onPress={() => Model.setData('openBottomSheet', false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  header: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 6,
    alignItems: 'flex-end'
  },
  containerIcon: {
    padding: 12
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  },
  containerMessage: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    padding: 30
  },
  message: {
    textAlign: 'center',
    fontSize: 18
  },
  containerButtons: {
    backgroundColor: Colors.white,
    padding: 12
  },
  confirmButton: {
    marginVertical: 12,
  },
  cancelButton: {
    marginBottom: 18,
  },
});

export default BottomSheetModal;