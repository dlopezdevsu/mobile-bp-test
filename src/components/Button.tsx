import * as React from 'react';
import { Pressable, PressableProps, StyleSheet, StyleProp, Text } from 'react-native';

import * as Colors from '../utils/colors';

interface ButtonProps extends PressableProps {
  style: StyleProp<any>;
  label: string;
  variant?: 'delete' | 'submit' | 'default';
}

const Button = ({ ...props }: ButtonProps) => {

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.container, styles[props?.variant || 'default'], { opacity: pressed ? 0.5 : 1 }, props.style]}
    >
      <Text style={[styles.label, props?.variant === 'delete' ? styles.textWhite : {}]}>
        {props.label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray,
    padding: 18,
  },
  label: {
    textAlign: 'center',
    fontWeight: '600'
  },
  delete: {
    backgroundColor: Colors.red
  },
  submit: {
    backgroundColor: Colors.yellow
  },
  default: {
    backgroundColor: Colors.gray
  },
  textWhite: {
    color: Colors.white
  }
});

export default Button;