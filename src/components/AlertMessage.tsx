import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import * as Colors from 'src/utils/colors';
import { InitialStateProps, Store } from 'src/hooks/main_store';
import { useContext } from 'react';
import Model from 'src/hooks/Model';
import Button from 'src/components/Button';

const AlertMessage = () => {
  const { state }: { state: InitialStateProps } = useContext(Store)

  const onConfirm = async () => {
    Model.setData('alert', '')
  }

  return (
    <>
      {state.alert && <View style={styles.container}>

        <View style={styles.card}>
          <Text style={styles.message}>{state.alert}</Text>
          <Button label='Aceptar' style={styles.confirmButton} onPress={onConfirm} variant='submit' />
        </View>
      </View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    width: '75%'
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 12,
    marginVertical: 24
  },
  confirmButton: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
});

export default AlertMessage;