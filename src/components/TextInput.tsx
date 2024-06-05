import * as React from 'react';
import { TextInput, StyleSheet, TextInputProps, Text } from 'react-native';

import * as Colors from 'src/utils/colors';

interface TextInputComponentProps extends TextInputProps {
  label?: string;
  errorLabel?: string;
  hasError?: boolean;
}

const TextInputComponent = ({ label, errorLabel, hasError, editable, ...props }: TextInputComponentProps) => {

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={[styles.container, props.style, editable === false && styles.disabled, hasError && styles.inputError]}
        placeholderTextColor={Colors.black}
      />
      {hasError && <Text style={styles.error}>{errorLabel}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 6,
    marginTop: 18
  },
  container: {
    borderWidth: 2,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 6
  },
  disabled: {
    backgroundColor: Colors.gray
  },
  error: {
    color: Colors.red,
    fontWeight: '600',
    fontSize: 12,
    marginTop: 6
  },
  inputError: {
    borderColor: Colors.red
  }
});

export default TextInputComponent;